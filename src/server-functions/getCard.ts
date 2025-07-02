import { createServerFn } from "@tanstack/react-start";
import { apiClient } from "../lib/api";
import { CardData } from "../types/card";
import { z } from "zod";

export const getCard = createServerFn()
  .validator(
    z.object({
      id: z.number().min(1),
    })
  )
  .handler(async ({ data }) => {
    const { id } = data;
    const response = await apiClient.get<CardData>(`/cards/${id}`, {});
    return response.data;
  });
