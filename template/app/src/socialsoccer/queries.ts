import { type PrismaClient } from "@prisma/client";
import { HttpError } from "wasp/server";
import type { 
  PlayerProfile, 
  PlayerStats, 
  Match, 
  Payment,
  Field,
  Referee,
  User
} from "wasp/entities";
import type {
  GetPlayerProfile,
  GetUpcomingMatches,
  GetPaymentHistory,
  GetPlayerStats,
} from "wasp/server/operations";

type SocialSoccerQueryContext = {
  user?: (User & { isAdmin?: boolean }) | null;
  entities: {
    PlayerProfile: PrismaClient["playerProfile"];
    PlayerStats: PrismaClient["playerStats"];
    Match: PrismaClient["match"];
    Payment: PrismaClient["payment"];
    Field: PrismaClient["field"];
    Referee: PrismaClient["referee"];
  };
};

export const getPlayerProfile: GetPlayerProfile<void, PlayerProfile & { stats: PlayerStats | null }> = async (_args: unknown, context: SocialSoccerQueryContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  try {
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
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al obtener el perfil del jugador: ${msg}`);
  }
};

export const getUpcomingMatches: GetUpcomingMatches<void, (Match & { field: Field, referee: Referee | null })[]> = async (_args: unknown, context: SocialSoccerQueryContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  try {
    return await context.entities.Match.findMany({
      where: { status: "SCHEDULED" },
      include: { field: true, referee: true },
      orderBy: { date: "asc" },
    });
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al obtener próximos partidos: ${msg}`);
  }
};

export const getPaymentHistory: GetPaymentHistory<void, (Payment & { match: Match | null })[]> = async (_args: unknown, context: SocialSoccerQueryContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  try {
    return await context.entities.Payment.findMany({
      where: { userId: context.user.id },
      include: { match: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al obtener historial de pagos: ${msg}`);
  }
};

export const getPlayerStats: GetPlayerStats<void, PlayerStats> = async (_args: unknown, context: SocialSoccerQueryContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  try {
    const profile = await context.entities.PlayerProfile.findUnique({
      where: { userId: context.user.id },
      include: { stats: true }
    });

    if (!profile || !profile.stats) {
      throw new HttpError(404, "Estadísticas de jugador no encontradas");
    }

    return profile.stats;
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al obtener estadísticas del jugador: ${msg}`);
  }
};
