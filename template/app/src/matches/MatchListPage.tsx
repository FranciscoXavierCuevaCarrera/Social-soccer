import React from 'react';
import { Link } from 'wasp/client/router';
import { useQuery, getMatches } from 'wasp/client/operations';

export const MatchListPage = () => {
  const { data: matches, isLoading, error } = useQuery(getMatches);

  if (isLoading) return <div className="p-6 text-center">Cargando partidos...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error al cargar partidos</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Partidos Disponibles</h1>
      </div>

      {!matches || matches.length === 0 ? (
        <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
          <p className="text-gray-500">No hay partidos registrados en este momento.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {matches.map((match: any) => (
            <div key={match.id} className="p-5 bg-white dark:bg-gray-800 rounded-lg shadow space-y-2 border border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">{match.location}</h2>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                📅 {new Date(match.dateTime).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                👥 Jugadores: {match.players?.length || 0} / {match.maxPlayers}
              </p>
              <div className="pt-2">
                <Link
                  to={`/matches/${match.id}` as any}
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Ver detalle del partido →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};