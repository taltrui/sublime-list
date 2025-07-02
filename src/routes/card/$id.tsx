import { createFileRoute, HeadContent, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import CardList from "../../components/CardList";
import ErrorBoundary from "../../components/ErrorBoundary";
import { cardQueryOptions, useCard } from "../../queries/useCard";
import {
	relatedCardsQueryOptions,
	useRelatedCards,
} from "../../queries/useRelatedCards";

export const Route = createFileRoute("/card/$id")({
	component: RouteComponent,
	head: (ctx) => {
		const loaderData = ctx.loaderData as
			| { content?: { title?: string; description?: string; text?: string } }
			| null
			| undefined;

		return {
			meta: [
				{
					name: "description",
					content:
						loaderData?.content?.description ||
						loaderData?.content?.text?.slice(0, 160) ||
						"View details of a specific card and related cards.",
				},
				{
					title: `${
						loaderData?.content?.title || "Card Details"
					} - Sublime List`,
				},
			],
		};
	},
	loader: async ({ context, params }) => {
		const { queryClient } = context;
		const { id } = params;
		if (id) {
			const relatedCardsQuery = relatedCardsQueryOptions({
				pageSize: 25,
				id: Number(id),
			});
			const cardQuery = cardQueryOptions({ id: Number(id) });

			const [cardData] = await Promise.all([
				queryClient.ensureQueryData(cardQuery),
				queryClient.ensureInfiniteQueryData(relatedCardsQuery),
			]);

			return cardData;
		}
		return null;
	},
	errorComponent: () => <ErrorBoundary />,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useRelatedCards({
			pageSize: 25,
			id: Number(id),
		});

	const { data: card } = useCard({
		id: Number(id),
	});

	return (
		<>
			<HeadContent />
			<div className="h-screen bg-gray-100">
				<Link to="/" className="flex items-center p-4 hover:underline gap-2 ">
					<ArrowLeft size={24} /> All cards
				</Link>
				<CardList
					data={data}
					isFetchingNextPage={isFetchingNextPage}
					fetchNextPage={fetchNextPage}
					hasNextPage={hasNextPage}
					initialCard={card}
				/>
			</div>
		</>
	);
}
