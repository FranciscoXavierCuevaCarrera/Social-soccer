import { action, page, query, route, type Spec } from "@wasp.sh/spec";

import { MatchListPage } from "./MatchListPage" with { type: "ref" };
import {
  createMatch,
  getMatches,
  joinMatch,
  leaveMatch,
} from "./operations" with { type: "ref" };
export const matchesSpec: Spec = [
  route("MatchListRoute", "/matches", page(MatchListPage, { authRequired: true })),

  query(getMatches, { entities: ["Match", "MatchPlayer"] }),
  action(createMatch, { entities: ["Match"] }),
  action(joinMatch, { entities: ["Match", "MatchPlayer"] }),
  action(leaveMatch, { entities: ["MatchPlayer"] }),
];
