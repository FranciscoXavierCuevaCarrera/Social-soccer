import { z } from "zod";

export const googleAnalyticsEnvSchema = z.object({
  GOOGLE_ANALYTICS_CLIENT_EMAIL: z.string().default("dummy@example.com"),
  GOOGLE_ANALYTICS_PRIVATE_KEY: z.string().default("dummy-key"),
  GOOGLE_ANALYTICS_PROPERTY_ID: z.string().default("dummy-id"),
});

export const plausibleEnvSchema = z.object({
  PLAUSIBLE_API_KEY: z.string().default("dummy-key"),
  PLAUSIBLE_SITE_ID: z.string().default("dummy-id"),
  PLAUSIBLE_BASE_URL: z.string().default("http://localhost:3000"),
});
