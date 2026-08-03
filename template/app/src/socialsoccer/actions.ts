import { type PrismaClient } from "@prisma/client";
import { HttpError } from "wasp/server";
import type { 
  PlayerProfile, 
  Payment,
  Ticket,
  RefereeRating,
  PlayerStats,
  Referee,
  User
} from "wasp/entities";
import type {
  UpdatePlayerProfile,
  ProcessPayment,
  SubmitRefereeRating,
  UpdateMatchStats,
} from "wasp/server/operations";

type SocialSoccerActionContext = {
  user?: (User & { isAdmin?: boolean }) | null;
  entities: {
    PlayerProfile: PrismaClient["playerProfile"];
    Payment: PrismaClient["payment"];
    Ticket: PrismaClient["ticket"];
    RefereeRating: PrismaClient["refereeRating"];
    Referee: PrismaClient["referee"];
    PlayerStats: PrismaClient["playerStats"];
  };
};

type UpdatePlayerProfileInput = {
  cedula?: string;
  fullName?: string;
  photoUrl?: string;
  currentClub?: string;
  position?: string;
  number?: number;
};

export const updatePlayerProfile: UpdatePlayerProfile<UpdatePlayerProfileInput, PlayerProfile> = async (args: UpdatePlayerProfileInput, context: SocialSoccerActionContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  try {
    const profile = await context.entities.PlayerProfile.findUnique({
      where: { userId: context.user.id },
    });

    if (!profile) {
      throw new HttpError(404, "Perfil de jugador no encontrado");
    }

    return await context.entities.PlayerProfile.update({
      where: { userId: context.user.id },
      data: {
        ...args,
      },
    });
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al actualizar perfil de jugador: ${msg}`);
  }
};

type ProcessPaymentInput = {
  amount: number;
  concept: string; // 'VOCALIA', 'INSCRIPCION', 'MULTA', 'TICKET'
  paymentMethod: string;
  matchId?: string;
};

export const processPayment: ProcessPayment<ProcessPaymentInput, Payment & { ticket?: Ticket | null }> = async (args: ProcessPaymentInput, context: SocialSoccerActionContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  try {
    const payment = await context.entities.Payment.create({
      data: {
        userId: context.user.id,
        matchId: args.matchId,
        amount: args.amount,
        concept: args.concept,
        paymentMethod: args.paymentMethod,
        status: "COMPLETED", // Simulamos pago completado
      },
    });

    let ticket = null;
    if (args.concept === "TICKET" && args.matchId) {
      const profile = await context.entities.PlayerProfile.findUnique({
        where: { userId: context.user.id }
      });
      
      ticket = await context.entities.Ticket.create({
        data: {
          userId: context.user.id,
          matchId: args.matchId,
          playerProfileId: profile?.id,
          price: args.amount,
        }
      });
    }

    return { ...payment, ticket };
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al procesar la transacción de pago: ${msg}`);
  }
};

type SubmitRefereeRatingInput = {
  refereeId: string;
  matchId: string;
  stars: number;
  comment?: string;
};

export const submitRefereeRating: SubmitRefereeRating<SubmitRefereeRatingInput, RefereeRating> = async (args: SubmitRefereeRatingInput, context: SocialSoccerActionContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  try {
    const rating = await context.entities.RefereeRating.create({
      data: {
        userId: context.user.id,
        refereeId: args.refereeId,
        matchId: args.matchId,
        stars: args.stars,
        comment: args.comment,
      },
    });

    // Recalcular el promedio
    const allRatings = await context.entities.RefereeRating.findMany({
      where: { refereeId: args.refereeId },
    });

    const avg = allRatings.length > 0 
      ? allRatings.reduce((acc: number, r: RefereeRating) => acc + r.stars, 0) / allRatings.length
      : 5.0;

    await context.entities.Referee.update({
      where: { id: args.refereeId },
      data: { averageRating: avg },
    });

    return rating;
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al registrar la calificación arbitral: ${msg}`);
  }
};

type UpdateMatchStatsInput = {
  playerId: string;
  matchId?: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  fairPlayScore: number;
};

export const updateMatchStats: UpdateMatchStats<UpdateMatchStatsInput, PlayerStats> = async (args: UpdateMatchStatsInput, context: SocialSoccerActionContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  // RBAC: Solo administradores pueden actualizar estadísticas de partidos
  if (!context.user.isAdmin) {
    throw new HttpError(403, "Acceso denegado: Se requieren permisos de administrador (isAdmin) para modificar estadísticas de partidos");
  }

  try {
    const stats = await context.entities.PlayerStats.findUnique({
      where: { playerId: args.playerId },
    });

    if (!stats) {
      throw new HttpError(404, "Estadísticas de jugador no encontradas");
    }

    return await context.entities.PlayerStats.update({
      where: { playerId: args.playerId },
      data: {
        goals: { increment: args.goals },
        assists: { increment: args.assists },
        yellowCards: { increment: args.yellowCards },
        redCards: { increment: args.redCards },
        fairPlayScore: args.fairPlayScore,
        matchesPlayed: { increment: 1 },
      },
    });
  } catch (error: unknown) {
    if (error instanceof HttpError) throw error;
    const msg = error instanceof Error ? error.message : String(error);
    throw new HttpError(500, `Error al actualizar estadísticas del partido: ${msg}`);
  }
};
