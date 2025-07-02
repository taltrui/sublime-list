import {
	infiniteQueryOptions,
	useSuspenseInfiniteQuery,
} from "@tanstack/react-query";

import { getRelatedCards } from "../serverFunctions/getRelatedCards";

export const relatedCardsQueryOptions = ({
	pageSize,
	id,
}: {
	pageSize: number;
	id: number;
}) =>
	infiniteQueryOptions({
		queryKey: ["relatedCards", id],
		queryFn: ({ pageParam }: { pageParam: number }) =>
			getRelatedCards({ data: { pageParam, id, pageSize } }),
		getNextPageParam: (lastPage) => {
			const nextPage = lastPage.current_page + 1;
			if (nextPage > lastPage.total_pages) {
				return undefined;
			}
			return nextPage;
		},
		initialPageParam: 1,
	});

export const useRelatedCards = ({
	pageSize,
	id,
}: {
	pageSize: number;
	id: number;
}) => {
	const query = relatedCardsQueryOptions({ pageSize, id });
	return useSuspenseInfiniteQuery(query);
};
