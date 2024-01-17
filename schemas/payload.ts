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

export const eventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  location: z.string(),
  summary: z.string(),
  description: z.array(z.record(z.unknown())).optional().nullable(),
  updatedAt: z.string(),
  createdAt: z.string(),
})

export const pageSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
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
