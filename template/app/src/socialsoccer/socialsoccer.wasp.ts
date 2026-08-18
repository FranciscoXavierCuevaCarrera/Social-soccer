import { action, page, query, route, type Spec } from "@wasp.sh/spec";

import { AppPage } from "../app/AppPage" with { type: "ref" };
import { IdentityPage } from "../identity/IdentityPage" with { type: "ref" };
import { PaymentsPage } from "../payments/PaymentsPage" with { type: "ref" };
import { StatsPage } from "../stats/StatsPage" with { type: "ref" };

import {
  getPaymentHistory,
  getPlayerProfile,
  getPlayerStats,
  getUpcomingMatches,
} from "./queries" with { type: "ref" };

import {
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
      "MatchPlayer",
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
      "MatchPlayer",
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
      "MatchPlayer",
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
      "MatchPlayer",
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
      "MatchPlayer",
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
      "MatchPlayer",
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
      "MatchPlayer",
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
      "MatchPlayer",
    ],
  }),
];
