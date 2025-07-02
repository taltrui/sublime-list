import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect, useRef } from "react";
import type { CardData } from "../../types/card";
import InfiniteScrollLoader from "../ui/InfiniteScrollLoader";
import CardContent from "./components/CardContent";
import CardListItem from "./components/CardListItem";

function CardList({
	data,
	isFetchingNextPage,
	fetchNextPage,
	hasNextPage,
	initialCard = null,
}: {
	data: { pages: { results: CardData[] }[] };
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	hasNextPage: boolean;
	initialCard?: CardData | null;
}) {
	const parentRef = useRef<HTMLDivElement>(null);

	const { pages } = data;
	const cards: CardData[] = pages.flatMap((page) => page.results);

	const virtualizer = useVirtualizer({
		count: cards.length,
		getScrollElement: () => parentRef.current,
		estimateSize: () => 280,
		overscan: 3,
	});

	const virtualItems = virtualizer.getVirtualItems();

	useEffect(() => {
		const lastItem = virtualItems[virtualItems.length - 1];

		if (!lastItem || !hasNextPage || isFetchingNextPage) {
			return;
		}

		if (lastItem.index >= cards.length - 1) {
			fetchNextPage();
		}
	}, [
		hasNextPage,
		fetchNextPage,
		cards.length,
		isFetchingNextPage,
		virtualItems,
	]);

	return (
		<div
			ref={parentRef}
			className="bg-gray-100 p-4"
			style={{
				height: `calc(100vh - ${initialCard ? 56 : 0}px)`,
				width: `100%`,
				overflow: "auto",
			}}
		>
			{initialCard && (
				<div className="max-w-2xl mx-auto mb-6">
					<CardContent card={initialCard} classes="" />
					<p className="font-light text-gray-600">
						Related cards: {initialCard.related.length}
					</p>
				</div>
			)}
			<div
				className="max-w-2xl mx-auto "
				style={{
					height: `${virtualizer.getTotalSize()}px`,
					width: "100%",
					position: "relative",
				}}
			>
				{virtualizer.getVirtualItems().map((virtualItem) => {
					const card = cards[virtualItem.index];

					if (!card) {
						return null;
					}
					return (
						<div
							key={virtualItem.index}
							ref={virtualizer.measureElement}
							style={{
								position: "absolute",
								top: 0,
								left: 0,
								width: "100%",
								transform: `translateY(${virtualItem.start}px)`,
							}}
							data-index={virtualItem.index}
						>
							<CardListItem card={card} />
						</div>
					);
				})}

				{isFetchingNextPage && (
					<div
						style={{
							position: "absolute",
							top: `${virtualizer.getTotalSize()}px`,
							left: 0,
							width: "100%",
						}}
					>
						<InfiniteScrollLoader isLoading={isFetchingNextPage} />
					</div>
				)}
			</div>
		</div>
	);
}

export default CardList;
