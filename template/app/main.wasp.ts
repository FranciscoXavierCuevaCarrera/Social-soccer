import { app, page, route } from "@wasp.sh/spec";

import { App } from "./src/client/App" with { type: "ref" };
import { NotFoundPage } from "./src/client/components/NotFoundPage" with { type: "ref" };
import { serverEnvValidationSchema } from "./src/env" with { type: "ref" };
import { LandingPage } from "./src/landing-page/LandingPage" with { type: "ref" };
import { seedMockUsers } from "./src/server/scripts/dbSeeds" with { type: "ref" };

import { adminSpec } from "./src/admin/admin.wasp";
import { analyticsSpec } from "./src/analytics/analytics.wasp";
import { authConfig, authSpec } from "./src/auth/auth.wasp";
import { head } from "./src/client/head.wasp";
import { demoAiAppSpec } from "./src/demo-ai-app/demo-ai-app.wasp";
import { fileUploadSpec } from "./src/file-upload/file-upload.wasp";
import { matchesSpec } from "./src/matches/matches.wasp";
import { emailSender } from "./src/server/emailSender.wasp";
import { socialsoccerSpec } from "./src/socialsoccer/socialsoccer.wasp";
import { userSpec } from "./src/user/user.wasp";

export default app({
  name: "SocialSoccer",
  wasp: { version: "^0.25.0" },
  title: "Social Soccer",
  head,
  auth: authConfig,

  db: {
    seeds: [seedMockUsers],
  },

  client: {
    rootComponent: App,
  },

  server: {
    envValidationSchema: serverEnvValidationSchema,
  },

  emailSender,

  spec: [
    route("LandingPageRoute", "/", page(LandingPage), { prerender: true }),
    route("NotFoundRoute", "*", page(NotFoundPage)),
    authSpec,
    userSpec,
    demoAiAppSpec,
    fileUploadSpec,
    analyticsSpec,
    adminSpec,
    socialsoccerSpec,
    matchesSpec,
  ],
});
