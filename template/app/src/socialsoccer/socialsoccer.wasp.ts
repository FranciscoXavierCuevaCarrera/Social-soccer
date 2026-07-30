import { action, page, query, route, type Spec } from "@wasp.sh/spec";

import { IdentityPage } from "../identity/IdentityPage" with { type: "ref" };
import { MatchesPage } from "../matches/MatchesPage" with { type: "ref" };
import { PaymentsPage } from "../payments/PaymentsPage" with { type: "ref" };
import { StatsPage } from "../stats/StatsPage" with { type: "ref" };

import {
  getPlayerProfile,
  getUpcomingMatches,
  getPaymentHistory,
  getPlayerStats,
} from "./queries" with { type: "ref" };

import {
  updatePlayerProfile,
  processPayment,
  submitRefereeRating,
  updateMatchStats,
} from "./actions" with { type: "ref" };

export const socialsoccerSpec: Spec = [
  // Rutas y Páginas
  route("IdentityRoute", "/identity", page(IdentityPage, { authRequired: true })),
  route("MatchesRoute", "/matches", page(MatchesPage, { authRequired: true })),
  route("PaymentsRoute", "/payments", page(PaymentsPage, { authRequired: true })),
  route("StatsRoute", "/stats", page(StatsPage, { authRequired: true })),

  // Queries
  query(getPlayerProfile, { entities: ["User", "PlayerProfile", "PlayerStats"] }),
  query(getUpcomingMatches, { entities: ["Match", "Field", "Referee"] }),
  query(getPaymentHistory, { entities: ["Payment", "Match", "Ticket"] }),
  query(getPlayerStats, { entities: ["PlayerProfile", "PlayerStats"] }),

  // Actions
  action(updatePlayerProfile, { entities: ["PlayerProfile"] }),
  action(processPayment, { entities: ["Payment", "Ticket", "PlayerProfile"] }),
  action(submitRefereeRating, { entities: ["RefereeRating", "Referee"] }),
  action(updateMatchStats, { entities: ["PlayerStats", "Match"] }),
];
