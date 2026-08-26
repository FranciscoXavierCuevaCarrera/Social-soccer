import { defineUserSignupFields } from "wasp/auth/providers/types";

const ADMIN_USERNAMES = new Set(["admin"]);

export const getUsernameUserFields = defineUserSignupFields({
  username: (data: unknown) => {
    if (
      typeof data !== "object" ||
      data === null ||
      !("username" in data) ||
      typeof data.username !== "string"
    ) {
      throw new Error("Username is required.");
    }

    return data.username.trim().toLowerCase();
  },

  isAdmin: (data: unknown) => {
    if (
      typeof data !== "object" ||
      data === null ||
      !("username" in data) ||
      typeof data.username !== "string"
    ) {
      return false;
    }

    return ADMIN_USERNAMES.has(data.username.trim().toLowerCase());
  },
});