import * as z from "zod"

import { handler, HTTPError, safeFetch } from "@/lib/safe-fetch"

export const me = handler({
  schema: z.undefined(),
  cb: async () => {
    try {
      const request = await safeFetch(
        z.any(),
        `${process.env.NEXT_PUBLIC_API_URL}/users/me`,
        {
          method: "GET",
          credentials: "include",
          next: {
            tags: ["me"],
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

export const users = handler({
  schema: z.undefined(),
  cb: async () => {
    try {
      const request = await safeFetch(
        z.any(),
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          method: "GET",
          credentials: "include",
          next: {
            tags: ["users"],
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
