import React from 'react';
import { Link } from 'wasp/client/router';
import { useQuery, getMatches } from 'wasp/client/operations';

export const MatchListPage = () => {
  const { data: matches, isLoading, error } = useQuery(getMatches);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0B5FA5] dark:border-[#FF6B35]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-red-50 dark:bg-[#2E3138] border border-[#E63946] rounded-xl text-center">
        <p className="text-[#E63946] font-medium">Error al obtener la lista de partidos.</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-[#1D3557] dark:text-white tracking-tight">
            Próximos Partidos
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Consulta convocatorias activas, canchas asignadas e inscríbete a tu encuentro.
          </p>
        </div>

        <Link
          to={"/matches/create" as any}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#FF6B35] hover:opacity-90 text-white font-bold rounded-xl shadow transition-all text-sm"
        >
          <span>⚽</span> Organizar Partido
        </Link>
      </div>

      {!matches || matches.length === 0 ? (
        <div className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-xl p-8 text-center space-y-3">
          <p className="text-gray-500 dark:text-gray-400 font-medium">No hay partidos programados en este momento.</p>
          <Link
            to={"/matches/create" as any}
            className="inline-block text-sm text-[#1D3557] dark:text-[#FF6B35] font-bold hover:underline"
          >
            Sé el primero en crear uno →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {matches.map((m: any) => {
            const playerCount = m.players?.length || 0;
            const isFull = playerCount >= m.maxPlayers;

            return (
              <div
                key={m.id}
                className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2.5 py-0.5 text-white text-[10px] font-extrabold rounded-full ${isFull ? 'bg-[#E63946]' : 'bg-[#FF6B35]'}`}>
                      {isFull ? 'COMPLETO' : 'CUPO DISPONIBLE'}
                    </span>
                    <span className="text-xs font-bold text-[#1D3557] dark:text-[#FF6B35]">
                      👥 {playerCount} / {m.maxPlayers}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
                    {m.field?.name || m.location}
                  </h2>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📅 {new Date(m.dateTime).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>

                <Link
                  to={`/matches/${m.id}` as any}
                  className="w-full text-center py-2.5 px-4 bg-gray-100 dark:bg-gray-800 hover:bg-[#1D3557] hover:text-white dark:hover:bg-[#0B5FA5] text-[#1D3557] dark:text-gray-200 font-bold rounded-lg text-sm transition-colors block"
                >
                  Ver Detalle
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};