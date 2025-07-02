import { createFileRoute } from "@tanstack/react-router";
import CardList from "../components/CardList";
import ErrorBoundary from "../components/ErrorBoundary";
import { cardsQueryOptions, useCards } from "../queries/useCards";

export const Route = createFileRoute("/")({
	component: Home,
	loader: async ({ context }) => {
		await context.queryClient.ensureInfiniteQueryData(
			cardsQueryOptions({ pageSize: 25 }),
		);
	},
	errorComponent: () => <ErrorBoundary />,
});

function Home() {
	const { data, isFetchingNextPage, fetchNextPage, hasNextPage } = useCards({
		pageSize: 25,
	});

	return (
		<div className="h-screen">
			<CardList
				data={data}
				isFetchingNextPage={isFetchingNextPage}
				fetchNextPage={fetchNextPage}
				hasNextPage={hasNextPage}
			/>
		</div>
	);
}
