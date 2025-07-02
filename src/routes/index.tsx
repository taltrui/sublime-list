import { createFileRoute, useRouter } from "@tanstack/react-router";
import CardList from "../components/cardList";
import { cardsQueryOptions, useCards } from "../queries/useCards";
import { useCard } from "../queries/useCard";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    await context.queryClient.ensureInfiniteQueryData(
      cardsQueryOptions({ pageSize: 25 })
    );
  },
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
