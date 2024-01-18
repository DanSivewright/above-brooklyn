import qs from "qs"
import * as z from "zod"

import { handler, HTTPError, safeFetch } from "@/lib/safe-fetch"

export const menu = handler({
  schema: z.object({}),
  cb: async (input) => {
    const query = qs.stringify(input)
    try {
      const request = await safeFetch(
        z.object({
          id: z.string(),
          globalType: z.string(),
          updatedAt: z.string(),
          createdAt: z.string(),
          nav: z.array(
            z.object({
              link: z.object({
                type: z
                  .union([z.literal("page"), z.literal("custom")])
                  .optional(),
                label: z.string(),
                // page: z.union([z.string().nullable(), pageSchema]).optional(),
                // url: z.string().optional().nullable(),
              }),
              id: z.string().optional().nullable(),
            })
          ),
        }),
        `${process.env.NEXT_PUBLIC_API_URL}/globals/menu${
          query ? `?${query}` : ""
        }`,
        {
          method: "GET",
          credentials: "include",
          next: {
            tags: ["menu"],
          },
        }
      )
      return request
    } catch (error) {
      if (error instanceof HTTPError) {
        console.error("HTTP Error:", error.status, error.message)
      } else {
        throw new Error("Failed to fetch data")
      }
    }
  },
})
