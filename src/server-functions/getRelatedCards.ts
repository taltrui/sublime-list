import { createServerFn } from "@tanstack/react-start";
import { apiClient } from "../lib/api";
import { z } from "zod";

export const getRelatedCards = createServerFn()
  .validator(
    z.object({
      id: z.number().min(1),
      pageParam: z.number().min(1).default(1),
      pageSize: z.number().min(1).default(10),
    })
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
