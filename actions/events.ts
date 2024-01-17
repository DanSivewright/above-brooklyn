import { collectionSchema, eventSchema } from "@/schemas/payload"
import * as z from "zod"

import { handler, HTTPError, safeFetch } from "@/lib/safe-fetch"

export const events = handler({
  schema: z.any(),
  cb: async () => {
    try {
      const request = await safeFetch(
        collectionSchema(eventSchema),
        `${process.env.NEXT_PUBLIC_API_URL}/events`,
        {
          method: "GET",
          credentials: "include",
          next: {
            tags: ["events"],
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
