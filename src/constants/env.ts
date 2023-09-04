import { z } from "zod"

const envSchema = z.object({
  EXPO_PUBLIC_SOCIAL_API_URL: z
    .string()
    .url()
    .default("http://10.0.2.2:3000/api"),
  EXPO_PUBLIC_FILES_API_URL: z
    .string()
    .url()
    .default("http://10.0.2.2:3001/api"),
  EXPO_PUBLIC_SENTRY_DSN: z.string().url(),
})

const parseResult = envSchema.safeParse(process.env)

if (!parseResult.success) {
  throw new Error("Incorrect Environment Variables.")
}

export const env = parseResult.data
