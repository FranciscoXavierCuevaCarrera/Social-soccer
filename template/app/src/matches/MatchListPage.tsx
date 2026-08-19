import { getMatches, useQuery } from "wasp/client/operations";
import { Link, routes } from "wasp/client/router";

export const MatchListPage = () => {
  const { data: matches, isLoading, error } = useQuery(getMatches);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#0B5FA5] dark:border-[#FF6B35]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto my-12 max-w-xl rounded-xl border border-[#E63946] bg-red-50 p-6 text-center dark:bg-[#2E3138]">
        <p className="font-medium text-[#E63946]">
          Error al obtener la lista de partidos.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center dark:border-gray-700">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1D3557] dark:text-white">
            Próximos Partidos
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Consulta convocatorias activas, canchas asignadas e inscríbete a tu
            encuentro.
          </p>
        </div>

        <Link
          to={routes.CreateMatchRoute.to}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-5 py-3 text-sm font-bold text-white shadow transition-all hover:opacity-90"
        >
          <span>⚽</span> Organizar Partido
        </Link>
      </div>

      {!matches || matches.length === 0 ? (
        <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-[#2E3138]">
          <p className="font-medium text-gray-500 dark:text-gray-400">
            No hay partidos programados en este momento.
          </p>

          <Link
            to={routes.CreateMatchRoute.to}
            className="inline-block text-sm font-bold text-[#1D3557] hover:underline dark:text-[#FF6B35]"
          >
            Sé el primero en crear uno →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {matches.map((match) => {
            const playerCount = match.players?.length || 0;
            const isFull = playerCount >= match.maxPlayers;

            return (
              <div
                key={match.id}
                className="flex flex-col justify-between space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-[#2E3138]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold text-white ${
                        isFull ? "bg-[#E63946]" : "bg-[#FF6B35]"
                      }`}
                    >
                      {isFull ? "COMPLETO" : "CUPO DISPONIBLE"}
                    </span>

                    <span className="text-xs font-bold text-[#1D3557] dark:text-[#FF6B35]">
                      👥 {playerCount} / {match.maxPlayers}
                    </span>
                  </div>

                  <h2 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
                    {match.field?.name || match.location}
                  </h2>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    📅{" "}
                    {new Date(match.dateTime).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>

                  <p className="text-xs font-semibold text-gray-600 dark:text-gray-300">
                    ⚖️ Árbitro:{" "}
                    {match.referee?.fullName || "Sin árbitro asignado"}
                  </p>
                </div>

                <Link
                  to={routes.MatchDetailRoute.to}
                  params={{ id: match.id }}
                  className="block w-full rounded-lg bg-gray-100 px-4 py-2.5 text-center text-sm font-bold text-[#1D3557] transition-colors hover:bg-[#1D3557] hover:text-white dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-[#0B5FA5]"
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