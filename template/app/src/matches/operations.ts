import { type PrismaClient } from "@prisma/client";
import { type User } from "wasp/entities";
import { HttpError } from "wasp/server";

type BaseMatchesContext = {
  user?: User;
  entities: {
    Match: PrismaClient["match"];
    MatchPlayer: PrismaClient["matchPlayer"];
  };
};

type CreateMatchContext = {
  user?: User;
  entities: {
    Match: PrismaClient["match"];
    MatchPlayer: PrismaClient["matchPlayer"];
    Referee: PrismaClient["referee"];
  };
};

type CancelMatchContext = {
  user?: User;
  entities: {
    Match: PrismaClient["match"];
  };
};

export const getMatches = async (_args: void, context: BaseMatchesContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  return context.entities.Match.findMany({
    where: {
      dateTime: {
        gte: new Date(),
      },
      status: "SCHEDULED",
    },
    include: {
      players: {
        include: {
          user: {
            include: {
              playerProfile: true,
            },
          },
        },
      },
      field: true,
      referee: true,
    },
    orderBy: {
      dateTime: "asc",
    },
  });
};

export const getMatch = async (
  args: { id: string },
  context: BaseMatchesContext,
) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  const match = await context.entities.Match.findUnique({
    where: {
      id: args.id,
    },
    include: {
      players: {
        include: {
          user: {
            include: {
              playerProfile: true,
            },
          },
        },
      },
      field: true,
      referee: true,
      createdBy: true,
    },
  });

  if (!match) {
    throw new HttpError(404, "Partido no encontrado");
  }

  return match;
};

export const createMatch = async (
  args: {
    location: string;
    dateTime: string;
    maxPlayers: number;
    refereeId?: string | null;
  },
  context: CreateMatchContext,
) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  if (!args.location.trim()) {
    throw new HttpError(400, "La ubicación es obligatoria");
  }

  if (!args.dateTime) {
    throw new HttpError(400, "La fecha y hora son obligatorias");
  }

  const matchDate = new Date(args.dateTime);

  if (Number.isNaN(matchDate.getTime())) {
    throw new HttpError(400, "La fecha del partido no es válida");
  }

  if (matchDate <= new Date()) {
    throw new HttpError(
      400,
      "El partido debe programarse para una fecha futura",
    );
  }

  if (
    !Number.isInteger(args.maxPlayers) ||
    args.maxPlayers < 2 ||
    args.maxPlayers > 30
  ) {
    throw new HttpError(400, "El número de jugadores debe estar entre 2 y 30");
  }

  if (args.refereeId) {
    const referee = await context.entities.Referee.findUnique({
      where: {
        id: args.refereeId,
      },
    });

    if (!referee) {
      throw new HttpError(404, "Árbitro no encontrado");
    }
  }

  return context.entities.Match.create({
    data: {
      location: args.location.trim(),
      dateTime: matchDate,
      maxPlayers: args.maxPlayers,
      createdById: context.user.id,
      refereeId: args.refereeId || null,
    },
  });
};

export const joinMatch = async (
  args: { matchId: string },
  context: BaseMatchesContext,
) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  const match = await context.entities.Match.findUnique({
    where: {
      id: args.matchId,
    },
    include: {
      players: true,
    },
  });

  if (!match) {
    throw new HttpError(404, "Partido no encontrado");
  }

  if (match.status !== "SCHEDULED") {
    throw new HttpError(
      400,
      "Este partido no está disponible para inscripción",
    );
  }

  if (match.dateTime <= new Date()) {
    throw new HttpError(
      400,
      "No puedes inscribirte a un partido que ya comenzó",
    );
  }

  const existing = await context.entities.MatchPlayer.findUnique({
    where: {
      matchId_userId: {
        matchId: args.matchId,
        userId: context.user.id,
      },
    },
  });

  if (existing) {
    throw new HttpError(400, "Ya estás inscrito en este partido");
  }

  if (match.players.length >= match.maxPlayers) {
    throw new HttpError(400, "El partido ya está lleno");
  }

  return context.entities.MatchPlayer.create({
    data: {
      matchId: args.matchId,
      userId: context.user.id,
    },
  });
};

export const leaveMatch = async (
  args: { matchId: string },
  context: BaseMatchesContext,
) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  const existing = await context.entities.MatchPlayer.findUnique({
    where: {
      matchId_userId: {
        matchId: args.matchId,
        userId: context.user.id,
      },
    },
  });

  if (!existing) {
    throw new HttpError(400, "No estás inscrito en este partido");
  }

  await context.entities.MatchPlayer.delete({
    where: {
      matchId_userId: {
        matchId: args.matchId,
        userId: context.user.id,
      },
    },
  });

  return {
    success: true,
  };
};

export const cancelMatch = async (
  args: { matchId: string },
  context: CancelMatchContext,
) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  const match = await context.entities.Match.findUnique({
    where: {
      id: args.matchId,
    },
  });

  if (!match) {
    throw new HttpError(404, "Partido no encontrado");
  }

  if (match.status === "CANCELLED") {
    throw new HttpError(400, "El partido ya está cancelado");
  }

  if (match.dateTime <= new Date()) {
    throw new HttpError(400, "No puedes cancelar un partido que ya comenzó");
  }

  const isCreator = match.createdById === context.user.id;

  if (!isCreator && !context.user.isAdmin) {
    throw new HttpError(403, "No tienes permisos para cancelar este partido");
  }

  return context.entities.Match.update({
    where: {
      id: args.matchId,
    },
    data: {
      status: "CANCELLED",
    },
  });
};
