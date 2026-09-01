import { action, page, query, route } from "@wasp.sh/spec";

import { CreateMatchPage } from "./CreateMatchPage" with { type: "ref" };
import { MatchDetailPage } from "./MatchDetailPage" with { type: "ref" };
import { MatchListPage } from "./MatchListPage" with { type: "ref" };

import {
  createMatch,
  deleteMatch,
  getMatch,
  getMatches,
  joinMatch,
  leaveMatch,
  updateMatch,
} from "./operations" with { type: "ref" };

export const matchesSpec = [
  route(
    "MatchListRoute",
    "/matches",
    page(MatchListPage, { authRequired: true }),
  ),

  route(
    "CreateMatchRoute",
    "/matches/create",
    page(CreateMatchPage, { authRequired: true }),
  ),

  route(
    "MatchDetailRoute",
    "/matches/:id",
    page(MatchDetailPage, { authRequired: true }),
  ),

  query(getMatches, {
    entities: ["Match", "MatchPlayer"],
  }),

  query(getMatch, {
    entities: ["Match", "MatchPlayer"],
  }),

  action(createMatch, {
    entities: ["Match", "MatchPlayer", "Referee"],
  }),

  action(updateMatch, {
    entities: ["Match", "Referee"],
  }),

  action(deleteMatch, {
    entities: ["Match", "MatchPlayer", "Payment", "Ticket", "RefereeRating"],
  }),

  action(joinMatch, {
    entities: ["Match", "MatchPlayer"],
  }),

  action(leaveMatch, {
    entities: ["Match", "MatchPlayer"],
  }),
];
