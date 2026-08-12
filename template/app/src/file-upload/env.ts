import { z } from "zod";

export const fileUploadEnvSchema = z.object({
  AWS_S3_REGION: z.string().default("us-east-1"),
  AWS_S3_IAM_ACCESS_KEY: z.string().default("dummy-access-key"),
  AWS_S3_IAM_SECRET_KEY: z.string().default("dummy-secret-key"),
  AWS_S3_FILES_BUCKET: z.string().default("dummy-bucket"),
});
