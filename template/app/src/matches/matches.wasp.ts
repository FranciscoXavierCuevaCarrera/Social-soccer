import { action, page, query, route } from "@wasp.sh/spec";

import { CreateMatchPage } from "./CreateMatchPage" with { type: "ref" };
import { MatchDetailPage } from "./MatchDetailPage" with { type: "ref" };
import { MatchListPage } from "./MatchListPage" with { type: "ref" };

import { createMatch, getMatch, getMatches, joinMatch, leaveMatch } from "./operations" with { type: "ref" };

export const matchesSpec = [
  route("MatchListRoute", "/matches", page(MatchListPage, { authRequired: true })),
  route("CreateMatchRoute", "/matches/create", page(CreateMatchPage, { authRequired: true })),
  route("MatchDetailRoute", "/matches/:id", page(MatchDetailPage, { authRequired: true })),

  query(getMatches, { entities: ["Match"] }),
  query(getMatch, { entities: ["Match"] }),
  action(createMatch, { entities: ["Match"] }),
  action(joinMatch, { entities: ["Match", "MatchPlayer"] }),
  action(leaveMatch, { entities: ["MatchPlayer"] }),
];