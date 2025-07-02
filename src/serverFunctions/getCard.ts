import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { apiClient } from "../lib/api";
import type { CardData } from "../types/card";

export const getCard = createServerFn()
	.validator(
		z.object({
			id: z.number().min(1),
		}),
	)
	.handler(async ({ data }) => {
		const { id } = data;
		const response = await apiClient.get<CardData>(`/cards/${id}`, {});
		return response.data;
	});
