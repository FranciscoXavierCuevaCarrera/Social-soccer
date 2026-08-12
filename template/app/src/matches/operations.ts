import { HttpError } from 'wasp/server';

export const getMatches = async (_args: void, context: any) => {
  return context.entities.Match.findMany({
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
      dateTime: 'asc',
    },
  });
};

export const getMatch = async (args: { id: string }, context: any) => {
  if (!context.user) {
    throw new HttpError(401, 'Usuario no autenticado');
  }

  const match = await context.entities.Match.findUnique({
    where: { id: args.id },
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
    throw new HttpError(404, 'Partido no encontrado');
  }

  return match;
};

export const createMatch = async (
  args: { location: string; dateTime: string; maxPlayers: number },
  context: any
) => {
  if (!context.user) {
    throw new HttpError(401, 'Usuario no autenticado');
  }

  return context.entities.Match.create({
    data: {
      location: args.location,
      dateTime: new Date(args.dateTime),
      maxPlayers: args.maxPlayers,
      createdById: context.user.id,
    },
  });
};

export const joinMatch = async (args: { matchId: string }, context: any) => {
  if (!context.user) {
    throw new HttpError(401, 'Usuario no autenticado');
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
    throw new HttpError(400, 'Ya estás inscrito en este partido');
  }

  return context.entities.MatchPlayer.create({
    data: {
      matchId: args.matchId,
      userId: context.user.id,
    },
  });
};

export const leaveMatch = async (args: { matchId: string }, context: any) => {
  if (!context.user) {
    throw new HttpError(401, 'Usuario no autenticado');
  }

  return context.entities.MatchPlayer.delete({
    where: {
      matchId_userId: {
        matchId: args.matchId,
        userId: context.user.id,
      },
    },
  });
};