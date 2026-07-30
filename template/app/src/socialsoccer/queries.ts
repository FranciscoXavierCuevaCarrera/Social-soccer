import { HttpError } from "wasp/server";
import type { 
  PlayerProfile, 
  PlayerStats, 
  Match, 
  Payment,
  Field,
  Referee,
  Ticket
} from "wasp/entities";
import type {
  GetPlayerProfile,
  GetUpcomingMatches,
  GetPaymentHistory,
  GetPlayerStats,
} from "wasp/server/operations";

export const getPlayerProfile: GetPlayerProfile<void, PlayerProfile & { stats: PlayerStats | null }> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401, "User is not authenticated");
  }

  let profile = await context.entities.PlayerProfile.findUnique({
    where: { userId: context.user.id },
    include: { stats: true }
  });

  if (!profile) {
    profile = await context.entities.PlayerProfile.create({
      data: {
        userId: context.user.id,
        fullName: context.user.username || context.user.email || "Jugador",
        stats: {
          create: {
            goals: 0, assists: 0, yellowCards: 0, redCards: 0, fairPlayScore: 100, matchesPlayed: 0
          }
        }
      },
      include: { stats: true }
    });
  }

  return profile;
};

export const getUpcomingMatches: GetUpcomingMatches<void, (Match & { field: Field, referee: Referee | null })[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401, "User is not authenticated");
  }

  return context.entities.Match.findMany({
    where: { status: "SCHEDULED" },
    include: { field: true, referee: true },
    orderBy: { date: "asc" },
  });
};

export const getPaymentHistory: GetPaymentHistory<void, (Payment & { match: Match | null })[]> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401, "User is not authenticated");
  }

  return context.entities.Payment.findMany({
    where: { userId: context.user.id },
    include: { match: true },
    orderBy: { createdAt: "desc" },
  });
};

export const getPlayerStats: GetPlayerStats<void, PlayerStats> = async (_args, context) => {
  if (!context.user) {
    throw new HttpError(401, "User is not authenticated");
  }

  const profile = await context.entities.PlayerProfile.findUnique({
    where: { userId: context.user.id },
    include: { stats: true }
  });

  if (!profile || !profile.stats) {
    throw new HttpError(404, "Player stats not found");
  }

  return profile.stats;
};
