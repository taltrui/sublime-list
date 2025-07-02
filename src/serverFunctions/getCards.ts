import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { apiClient } from "../lib/api";
import type { GetCardsResponse } from "../types/card";

export const getCards = createServerFn()
	.validator(
		z.object({
			pageParam: z.number().min(1).default(1),
			pageSize: z.number().min(1).default(10),
		}),
	)
	.handler(async ({ data }) => {
		const { pageParam, pageSize } = data;
		const response = await apiClient.get<GetCardsResponse>(`/cards`, {
			params: {
				page: pageParam,
				page_size: pageSize,
			},
		});
		return response.data;
	});
