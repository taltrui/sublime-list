import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { getCard } from "../serverFunctions/getCard";

export const cardQueryOptions = ({ id }: { id: number }) =>
	queryOptions({
		queryKey: ["card", id],
		queryFn: () => getCard({ data: { id } }),
	});

export const useCard = ({ id }: { id: number }) => {
	const query = cardQueryOptions({ id });
	return useSuspenseQuery(query);
};
