import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { apiClient } from "../lib/api";

export const getRelatedCards = createServerFn()
	.validator(
		z.object({
			id: z.number().min(1),
			pageParam: z.number().min(1).default(1),
			pageSize: z.number().min(1).default(10),
		}),
	)
	.handler(async ({ data }) => {
		const response = await apiClient.get(`/cards/${data.id}/related_cards`, {
			params: {
				page: data.pageParam,
				page_size: data.pageSize,
			},
		});
		return response.data;
	});
