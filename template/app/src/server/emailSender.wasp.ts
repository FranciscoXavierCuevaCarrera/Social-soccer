import { type EmailSender } from "@wasp.sh/spec";

export const emailSender: EmailSender = {
  // Dummy is used only for local beta development.
  // Production must use a real email provider.
  provider: "Dummy",
  defaultFrom: {
    name: "Social Soccer",
    email: "no-reply@socialsoccer.local",
  },
};
