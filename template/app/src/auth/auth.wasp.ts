import {
  page,
  route,
  type Auth,
  type AuthMethods,
  type Spec,
} from "@wasp.sh/spec";

import { LoginPage } from "./LoginPage" with { type: "ref" };
import { SignupPage } from "./SignupPage" with { type: "ref" };
import { getUsernameUserFields } from "./userSignupFields" with { type: "ref" };

const usernameAndPasswordAuthMethod: NonNullable<
  AuthMethods["usernameAndPassword"]
> = {
  userSignupFields: getUsernameUserFields,
};

// 🔐 Auth out of the box! https://wasp.sh/docs/auth/overview
export const authConfig: Auth = {
  userEntity: "User",
  methods: {
    usernameAndPassword: usernameAndPasswordAuthMethod,
  },
  onAuthFailedRedirectTo: "/login",
  onAuthSucceededRedirectTo: "/app",
};

export const authSpec: Spec = [
  route("LoginRoute", "/login", page(LoginPage)),
  route("SignupRoute", "/signup", page(SignupPage)),
];
