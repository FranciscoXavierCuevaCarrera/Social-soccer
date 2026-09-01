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

type RefereeContext = {
  user?: User;
  entities: {
    Referee: PrismaClient["referee"];
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

export const getReferees = async (_args: void, context: RefereeContext) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  return context.entities.Referee.findMany({
    orderBy: {
      fullName: "asc",
    },
  });
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

export const updateMatch = async (
  args: {
    id: string;
    location?: string;
    dateTime?: string;
    maxPlayers?: number;
    refereeId?: string | null;
    status?: string;
  },
  context: BaseMatchesContext & {
    entities: {
      Match: PrismaClient["match"];
      Referee: PrismaClient["referee"];
    };
  },
) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  const existingMatch = await context.entities.Match.findUnique({
    where: { id: args.id },
  });

  if (!existingMatch) {
    throw new HttpError(404, "Partido no encontrado");
  }

  const isCreator = existingMatch.createdById === context.user.id;
  const isAdmin = context.user.isAdmin;
  if (!isCreator && !isAdmin) {
    throw new HttpError(
      403,
      "No tienes permisos para editar este partido. Solo el creador o un administrador pueden modificarlo.",
    );
  }

  const dataToUpdate: Record<string, unknown> = {};

  if (args.location !== undefined) {
    if (!args.location.trim()) {
      throw new HttpError(400, "La ubicación no puede estar vacía");
    }
    dataToUpdate.location = args.location.trim();
  }

  if (args.dateTime !== undefined) {
    const matchDate = new Date(args.dateTime);
    if (Number.isNaN(matchDate.getTime())) {
      throw new HttpError(400, "La fecha no es válida");
    }
    dataToUpdate.dateTime = matchDate;
  }

  if (args.maxPlayers !== undefined) {
    if (
      !Number.isInteger(args.maxPlayers) ||
      args.maxPlayers < 2 ||
      args.maxPlayers > 30
    ) {
      throw new HttpError(
        400,
        "El número de jugadores debe estar entre 2 y 30",
      );
    }
    dataToUpdate.maxPlayers = args.maxPlayers;
  }

  if (args.refereeId !== undefined) {
    if (args.refereeId) {
      const referee = await context.entities.Referee.findUnique({
        where: { id: args.refereeId },
      });
      if (!referee) {
        throw new HttpError(404, "Árbitro no encontrado");
      }
      dataToUpdate.refereeId = args.refereeId;
    } else {
      dataToUpdate.refereeId = null;
    }
  }

  if (args.status !== undefined) {
    dataToUpdate.status = args.status;
  }

  return context.entities.Match.update({
    where: { id: args.id },
    data: dataToUpdate,
  });
};

export const deleteMatch = async (
  args: { id: string },
  context: BaseMatchesContext & {
    entities: {
      Match: PrismaClient["match"];
      MatchPlayer: PrismaClient["matchPlayer"];
      Payment: PrismaClient["payment"];
      Ticket: PrismaClient["ticket"];
      RefereeRating: PrismaClient["refereeRating"];
    };
  },
) => {
  if (!context.user) {
    throw new HttpError(401, "Usuario no autenticado");
  }

  const existingMatch = await context.entities.Match.findUnique({
    where: { id: args.id },
  });

  if (!existingMatch) {
    throw new HttpError(404, "Partido no encontrado");
  }

  const isCreator = existingMatch.createdById === context.user.id;
  const isAdmin = context.user.isAdmin;
  if (!isCreator && !isAdmin) {
    throw new HttpError(
      403,
      "No tienes permisos para eliminar este partido. Solo el creador o un administrador pueden eliminarlo.",
    );
  }

  const hasPayments =
    (await context.entities.Payment.count({
      where: { matchId: args.id },
    })) > 0;
  const hasTickets =
    (await context.entities.Ticket.count({
      where: { matchId: args.id },
    })) > 0;
  const hasRatings =
    (await context.entities.RefereeRating.count({
      where: { matchId: args.id },
    })) > 0;

  if (hasPayments || hasTickets || hasRatings) {
    return context.entities.Match.update({
      where: { id: args.id },
      data: { status: "CANCELLED" },
    });
  } else {
    await context.entities.MatchPlayer.deleteMany({
      where: { matchId: args.id },
    });
    await context.entities.Match.delete({
      where: { id: args.id },
    });
    return { success: true };
  }
};
