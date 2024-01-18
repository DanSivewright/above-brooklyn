import * as z from "zod"

export const userSchema = z.object({
  id: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  email: z.string(),
  resetPasswordToken: z.string().optional().nullable(),
  resetPasswordExpiration: z.string().optional().nullable(),
  salt: z.string().optional().nullable(),
  hash: z.string().optional().nullable(),
  loginAttempts: z.number().optional().nullable(),
  lockUntil: z.string().optional().nullable(),
  password: z.string().nullable(),
})

export const mediaSchema = z.object({
  id: z.string(),
  alt: z.string(),
  updatedAt: z.string(),
  createdAt: z.string(),
  url: z.string().optional().nullable(),
  filename: z.string().optional().nullable(),
  mimeType: z.string().optional().nullable(),
  filesize: z.number().optional().nullable(),
  width: z.number().optional().nullable(),
  height: z.number().optional().nullable(),
  sizes: z
    .object({
      card: z
        .object({
          url: z.string().optional().nullable(),
          width: z.number().optional().nullable(),
          height: z.number().optional().nullable(),
          mimeType: z.string().optional().nullable(),
          filesize: z.number().optional().nullable(),
          filename: z.string().optional().nullable(),
        })
        .optional(),
      portrait: z
        .object({
          url: z.string().optional().nullable(),
          width: z.number().optional().nullable(),
          height: z.number().optional().nullable(),
          mimeType: z.string().optional().nullable(),
          filesize: z.number().optional().nullable(),
          filename: z.string().optional().nullable(),
        })
        .optional(),
      square: z
        .object({
          url: z.string().optional().nullable(),
          width: z.number().optional().nullable(),
          height: z.number().optional().nullable(),
          mimeType: z.string().optional().nullable(),
          filesize: z.number().optional().nullable(),
          filename: z.string().optional().nullable(),
        })
        .optional(),
      feature: z
        .object({
          url: z.string().optional().nullable(),
          width: z.number().optional().nullable(),
          height: z.number().optional().nullable(),
          mimeType: z.string().optional().nullable(),
          filesize: z.number().optional().nullable(),
          filename: z.string().optional().nullable(),
        })
        .optional(),
    })
    .optional(),
})

export const topicSchema = z.object({
  id: z.string(),
  title: z.string(),
  slug: z.string().optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const payloadPreferenceSchema = z.object({
  id: z.string(),
  user: z.object({
    relationTo: z.literal("users"),
    value: z.union([z.string(), userSchema]),
  }),
  key: z.string().optional().nullable(),
  value: z
    .union([
      z.record(z.unknown()),
      z.array(z.unknown()),
      z.string(),
      z.number(),
      z.boolean(),
    ])
    .optional()
    .nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const payloadMigrationSchema = z.object({
  id: z.string(),
  name: z.string().optional().nullable(),
  batch: z.number().optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  image: z.union([z.string(), mediaSchema]).optional().nullable(),
  date: z.string(),
  location: z.string(),
  summary: z.string(),
  topics: z
    .array(z.union([z.string(), topicSchema]))
    .optional()
    .nullable(),
  description: z.array(z.record(z.unknown())).optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const pageSchema: z.ZodSchema = z.lazy(() =>
  z.object({
    id: z.string(),
    name: z.string(),
    title: z.string(),
    heroType: z.union([
      z.literal("minimal"),
      z.literal("contentAboveMedia"),
      z.literal("contentLeftOfMedia"),
    ]),
    layout: z
      .array(
        z.union([
          z.object({
            displayType: z.literal("grid"),
            id: z.string().optional().nullable(),
            blockName: z.string().optional().nullable(),
            blockType: z.literal("events-block"),
          }),
          z.object({
            items: z
              .array(
                z.object({
                  blocks: z
                    .object({
                      relationTo: z.literal("events"),
                      value: z.union([z.string(), eventSchema]),
                    })
                    .optional()
                    .nullable(),
                  id: z.string().optional().nullable(),
                })
              )
              .optional()
              .nullable(),
            id: z.string().optional().nullable(),
            blockName: z.string().optional().nullable(),
            blockType: z.literal("bento-block"),
          }),
          z.object({
            text: z.string(),
            link: z.object({
              type: z
                .union([z.literal("page"), z.literal("custom")])
                .optional(),
              label: z.string(),
              page: z.union([z.string().nullable(), pageSchema]).optional(),
              url: z.string().optional().nullable(),
            }),
            id: z.string().optional().nullable(),
            blockName: z.string().optional().nullable(),
            blockType: z.literal("cta-text-block"),
          }),
        ])
      )
      .optional()
      .nullable(),
    updatedAt: z.string(),
    createdAt: z.string(),
  })
)

export const menuSchema = z.object({
  id: z.string(),
  nav: z
    .array(
      z.object({
        link: z.object({
          type: z.union([z.literal("page"), z.literal("custom")]).optional(),
          label: z.string(),
          page: z.union([z.string().nullable(), pageSchema]).optional(),
          url: z.string().optional().nullable(),
        }),
        id: z.string().optional().nullable(),
      })
    )
    .optional()
    .nullable(),
  updatedAt: z.string().optional().nullable(),
  createdAt: z.string().optional().nullable(),
})

export const collectionSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    totalDocs: z.number(),
    limit: z.number(),
    totalPages: z.number(),
    page: z.number(),
    pagingCounter: z.number(),
    hasPrevPage: z.boolean(),
    hasNextPage: z.boolean(),
    prevPage: z.number().optional().nullable(),
    nextPage: z.number().optional().nullable(),
    docs: z.array(dataSchema),
  })

export const globalSchema = <T>(dataSchema: z.ZodType<T>, key: keyof T) =>
  z.object({
    [key]: z.array(dataSchema),
    id: z.string(),
    globalType: z.string(),
    updatedAt: z.string(),
    createdAt: z.string(),
  })
