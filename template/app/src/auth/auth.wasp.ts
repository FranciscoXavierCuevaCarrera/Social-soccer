import {
  page,
  route,
  type Auth,
  type AuthMethods,
  type Spec,
} from "@wasp.sh/spec";

import { LoginPage } from "./LoginPage" with { type: "ref" };
import { SignupPage } from "./SignupPage" with { type: "ref" };
import {
  getDiscordAuthConfig,
  getDiscordUserFields,
  getEmailUserFields,
  getGitHubAuthConfig,
  getGitHubUserFields,
  getGoogleAuthConfig,
  getGoogleUserFields,
} from "./userSignupFields" with { type: "ref" };

const emailAuthMethod: NonNullable<AuthMethods["email"]> = {
  userSignupFields: getEmailUserFields,
};

// Plug the following authentication methods in the `authConfig` below to enable them.
// Do note that `email` and `usernameAndPassword` are mutually exclusive.
// @ts-expect-error Demo purposes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const usernameAndPasswordAuthMethod: NonNullable<
  AuthMethods["usernameAndPassword"]
> = {};
// @ts-expect-error Demo purposes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const googleAuthMethod: NonNullable<AuthMethods["google"]> = {
  userSignupFields: getGoogleUserFields,
  configFn: getGoogleAuthConfig,
};
// @ts-expect-error Demo purposes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const gitGubAuthMethod: NonNullable<AuthMethods["gitHub"]> = {
  userSignupFields: getGitHubUserFields,
  configFn: getGitHubAuthConfig,
};
// @ts-expect-error Demo purposes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const discordAuthMethod: NonNullable<AuthMethods["discord"]> = {
  userSignupFields: getDiscordUserFields,
  configFn: getDiscordAuthConfig,
};

// 🔐 Auth out of the box! https://wasp.sh/docs/auth/overview
export const authConfig: Auth = {
  userEntity: "User",
  methods: {
    email: emailAuthMethod,
  },
  onAuthFailedRedirectTo: "/login",
  onAuthSucceededRedirectTo: "/app",
};

export const authSpec: Spec = [
  route("LoginRoute", "/login", page(LoginPage)),
  route("SignupRoute", "/signup", page(SignupPage)),
];
