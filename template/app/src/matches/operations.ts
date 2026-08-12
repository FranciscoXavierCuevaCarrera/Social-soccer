type CreateMatchInput = {
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  fieldId: string;
};

export const getMatches = async (_args: void, context: any) => {
  return context.entities.Match.findMany({
    include: {
      field: true,
      referee: true,
    },
    orderBy: {
      date: 'asc',
    },
  });
};

export const createMatch = async (args: CreateMatchInput, context: any) => {
  if (!context.user) {
    throw new Error('Debes iniciar sesión para crear un partido.');
  }

  const {
 homeTeam, awayTeam, date, time, fieldId } = args;

  if (!homeTeam || !awayTeam || !date || !time || !fieldId) {
    throw new Error('Todos los campos son obligatorios.');
  }

  return context.entities.Match.create({
    data: {
      homeTeam,
      awayTeam,
      date: new Date(date),
      time,
      fieldId,
    },
  });
};
