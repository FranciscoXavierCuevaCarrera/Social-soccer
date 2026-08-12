type CreateMatchArgs = {
  location: string;
  dateTime: string;
  maxPlayers: number;
};

type MatchIdArgs = {
  matchId: string;
};

export const getMatches = async (_args: void, context: any) => {
  if (!context.user) throw new Error('No autorizado');
  return context.entities.Match.findMany({
    include: {
      players: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { dateTime: 'asc' },
  });
};

export const createMatch = async (args: CreateMatchArgs, context: any) => {
  if (!context.user) throw new Error('No autorizado');
  return context.entities.Match.create({
    data: {
      location: args.location,
      dateTime: new Date(args.dateTime),
      maxPlayers: args.maxPlayers,
      createdById: context.user.id,
    },
  });
};

export const joinMatch = async ({ matchId }: MatchIdArgs, context: any) => {
  if (!context.user) throw new Error('No autorizado');
  const match = await context.entities.Match.findUnique({
    where: { id: matchId },
    include: { players: true },
  });
  if (!match) throw new Error('Partido no encontrado');
  if (match.players.length >= match.maxPlayers) throw new Error('El partido está lleno');

  return context.entities.MatchPlayer.create({
    data: {
      matchId,
      userId: context.user.id,
    },
  });
};

export const leaveMatch = async ({ matchId }: MatchIdArgs, context: any) => {
  if (!context.user) throw new Error('No autorizado');
  return context.entities.MatchPlayer.deleteMany({
    where: {
      matchId,
      userId: context.user.id,
    },
  });
};