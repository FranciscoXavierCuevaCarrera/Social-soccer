import {
  page,
  route,
  type Auth,
  type Spec,
} from "@wasp.sh/spec";

import { AppPage } from "../app/AppPage" with { type: "ref" };
import { LoginPage } from "./LoginPage" with { type: "ref" };
import { SignupPage } from "./SignupPage" with { type: "ref" };
import { getUsernameUserFields } from "./userSignupFields" with {
  type: "ref",
};

export const authConfig: Auth = {
  userEntity: "User",
  methods: {
    usernameAndPassword: {
      userSignupFields: getUsernameUserFields,
    },
  },
  onAuthFailedRedirectTo: "/login",
  onAuthSucceededRedirectTo: "/app",
};

export const authSpec: Spec = [
  route("AppRoute", "/app", page(AppPage, { authRequired: true })),
  route("LoginRoute", "/login", page(LoginPage)),
  route("SignupRoute", "/signup", page(SignupPage)),
];