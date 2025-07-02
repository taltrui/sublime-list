import { createServerFn } from "@tanstack/react-start";
import { apiClient } from "../lib/api";
import { GetCardsResponse } from "../types/card";
import { z } from "zod";

export const getCards = createServerFn()
  .validator(
    z.object({
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    })
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
