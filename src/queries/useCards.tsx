import {
  infiniteQueryOptions,
  queryOptions,
  useSuspenseInfiniteQuery,
} from "@tanstack/react-query";
import { getCards } from "../server-functions/getCards";

export const cardsQueryOptions = ({ pageSize }: { pageSize: number }) =>
  infiniteQueryOptions({
    queryKey: ["cards"],
    queryFn: ({ pageParam }) => getCards({ data: { pageParam, pageSize } }),
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.current_page + 1;
      if (nextPage > lastPage.total_pages) {
        return undefined;
      }
      return nextPage;
    },
    initialPageParam: 1,
  });

export const useCards = ({ pageSize }: { pageSize: number }) => {
  const query = cardsQueryOptions({ pageSize });
  return useSuspenseInfiniteQuery(query);
};
