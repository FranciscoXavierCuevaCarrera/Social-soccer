import { action, page, query, route, type Spec } from "@wasp.sh/spec";

import { AppPage } from "../app/AppPage" with { type: "ref" };
import { IdentityPage } from "../identity/IdentityPage" with { type: "ref" };
import { MatchesPage } from "../matches/MatchesPage" with { type: "ref" };
import { PaymentsPage } from "../payments/PaymentsPage" with { type: "ref" };
import { StatsPage } from "../stats/StatsPage" with { type: "ref" };

import {
  getFields,
  getPaymentHistory,
  getPlayerProfile,
  getPlayerStats,
  getReferees,
  getUpcomingMatches,
} from "./queries" with { type: "ref" };

import {
  createMatch,
  processPayment,
  submitRefereeRating,
  updateMatchStats,
  updatePlayerProfile,
} from "./actions" with { type: "ref" };

export const socialsoccerSpec: Spec = [
  // Rutas y Páginas
  route("AppRoute", "/app", page(AppPage, { authRequired: true })),
  route(
    "IdentityRoute",
    "/identity",
    page(IdentityPage, { authRequired: true }),
  ),
  route("MatchesRoute", "/matches", page(MatchesPage, { authRequired: true })),
  route(
    "PaymentsRoute",
    "/payments",
    page(PaymentsPage, { authRequired: true }),
  ),
  route("StatsRoute", "/stats", page(StatsPage, { authRequired: true })),

  // Queries
  query(getPlayerProfile, {
    entities: [
      "User",
      "PlayerProfile",
      "PlayerStats",
      "Match",
      "Field",
      "Referee",
      "Payment",
      "Ticket",
    ],
  }),
  query(getUpcomingMatches, {
    entities: [
      "User",
      "PlayerProfile",
      "PlayerStats",
      "Match",
      "Field",
      "Referee",
      "Payment",
      "Ticket",
    ],
  }),
  query(getPaymentHistory, {
    entities: [
      "User",
      "PlayerProfile",
      "PlayerStats",
      "Match",
      "Field",
      "Referee",
      "Payment",
      "Ticket",
    ],
  }),
  query(getPlayerStats, {
    entities: [
      "User",
      "PlayerProfile",
      "PlayerStats",
      "Match",
      "Field",
      "Referee",
      "Payment",
      "Ticket",
    ],
  }),
  query(getReferees, {
    entities: [
      "User",
      "PlayerProfile",
      "PlayerStats",
      "Match",
      "Field",
      "Referee",
      "Payment",
      "Ticket",
    ],
  }),
  query(getFields, {
    entities: [
      "User",
      "PlayerProfile",
      "PlayerStats",
      "Match",
      "Field",
      "Referee",
      "Payment",
      "Ticket",
    ],
  }),

  // Actions
  action(updatePlayerProfile, {
    entities: [
      "PlayerProfile",
      "Payment",
      "Ticket",
      "RefereeRating",
      "Referee",
      "PlayerStats",
      "Match",
    ],
  }),
  action(processPayment, {
    entities: [
      "PlayerProfile",
      "Payment",
      "Ticket",
      "RefereeRating",
      "Referee",
      "PlayerStats",
      "Match",
    ],
  }),
  action(submitRefereeRating, {
    entities: [
      "PlayerProfile",
      "Payment",
      "Ticket",
      "RefereeRating",
      "Referee",
      "PlayerStats",
      "Match",
    ],
  }),
  action(updateMatchStats, {
    entities: [
      "PlayerProfile",
      "Payment",
      "Ticket",
      "RefereeRating",
      "Referee",
      "PlayerStats",
      "Match",
    ],
  }),
  action(createMatch, {
    entities: [
      "PlayerProfile",
      "Payment",
      "Ticket",
      "RefereeRating",
      "Referee",
      "PlayerStats",
      "Match",
    ],
  }),
];
