import { type EmailSender } from "@wasp.sh/spec";

export const emailSender: EmailSender = {
  provider: "Resend",
  defaultFrom: {
    name: "Social Soccer",
    email: "onboarding@resend.dev",
  },
};