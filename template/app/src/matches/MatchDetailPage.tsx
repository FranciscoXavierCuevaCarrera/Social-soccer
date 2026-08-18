import { useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "wasp/client/auth";
import {
  getMatch,
  joinMatch,
  leaveMatch,
  useAction,
  useQuery,
} from "wasp/client/operations";
import { Link, routes } from "wasp/client/router";

export const MatchDetailPage = () => {
  const { id: matchId } = useParams<{ id: string }>();
  const { data: user } = useAuth();

  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const joinAction = useAction(joinMatch);
  const leaveAction = useAction(leaveMatch);

  const {
    data: match,
    isLoading,
    error,
    refetch,
  } = useQuery(getMatch, { id: matchId ?? "" });

  if (!matchId) {
    return (
      <div className="mx-auto my-12 max-w-xl rounded-xl border border-[#E63946] bg-red-50 p-6 text-center dark:bg-[#2E3138]">
        <p className="font-medium text-[#E63946]">
          No se especificó el partido.
        </p>

        <Link
          to={routes.MatchListRoute.to}
          className="mt-4 inline-block text-sm font-semibold text-[#1D3557] hover:underline dark:text-[#FF6B35]"
        >
          ← Regresar a partidos
        </Link>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-[#0B5FA5] dark:border-[#FF6B35]" />
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="mx-auto my-12 max-w-xl rounded-xl border border-[#E63946] bg-red-50 p-6 text-center dark:bg-[#2E3138]">
        <p className="font-medium text-[#E63946]">
          No se pudo cargar la información del partido.
        </p>

        <Link
          to={routes.MatchListRoute.to}
          className="mt-4 inline-block text-sm font-semibold text-[#1D3557] hover:underline dark:text-[#FF6B35]"
        >
          ← Regresar a partidos
        </Link>
      </div>
    );
  }

  const isUserJoined =
    match.players?.some((player) => player.userId === user?.id) ?? false;

  const isFull = (match.players?.length || 0) >= match.maxPlayers;

  const handleJoin = async () => {
    try {
      setIsProcessing(true);
      setMessage(null);

      await joinAction({ matchId: match.id });

      setMessage({
        type: "success",
        text: "¡Te has inscrito al partido exitosamente!",
      });

      refetch();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al unirse al partido";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLeave = async () => {
    try {
      setIsProcessing(true);
      setMessage(null);

      await leaveAction({ matchId: match.id });

      setMessage({
        type: "success",
        text: "Has salido del partido",
      });

      refetch();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al salir del partido";

      setMessage({
        type: "error",
        text: errorMessage,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <Link
        to={routes.MatchListRoute.to}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D3557] transition-opacity hover:opacity-80 dark:text-[#FF6B35]"
      >
        <span>←</span> Volver a la lista
      </Link>

      {message && (
        <div
          className={`rounded-xl border p-4 text-sm font-medium ${
            message.type === "error"
              ? "border-[#E63946] bg-red-50 text-[#E63946] dark:bg-red-950/30"
              : "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8 dark:border-gray-700 dark:bg-[#2E3138]">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center dark:border-gray-700">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
                  isFull ? "bg-[#E63946]" : "bg-[#FF6B35]"
                }`}
              >
                {isFull ? "COMPLETO" : "CUPO DISPONIBLE"}
              </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-[#1D3557] dark:text-white">
              {match.location}
            </h1>
          </div>

          <div className="flex items-start justify-between sm:flex-col sm:items-end sm:justify-center">
            <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
              Cupos
            </span>

            <span className="text-2xl font-black text-[#1D3557] dark:text-[#FF6B35]">
              {match.players?.length || 0} / {match.maxPlayers}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <span className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">
              📅 FECHA Y HORA
            </span>

            <p className="text-base font-bold text-gray-800 dark:text-gray-200">
              {new Date(match.dateTime).toLocaleString(undefined, {
                dateStyle: "full",
                timeStyle: "short",
              })}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <span className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">
              📍 CANCHA / UBICACIÓN
            </span>

            <p className="text-base font-bold text-gray-800 dark:text-gray-200">
              {match.field?.name || match.location}
            </p>
          </div>
        </div>

        <div className="pt-2">
          {isUserJoined ? (
            <button
              onClick={handleLeave}
              disabled={isProcessing}
              className="w-full rounded-xl bg-[#E63946] px-6 py-3 font-bold text-white shadow transition-all hover:bg-red-700 disabled:opacity-50"
            >
              {isProcessing ? "Procesando..." : "Salirse del Partido"}
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={isProcessing || isFull}
              className={`w-full rounded-xl px-6 py-3 font-bold text-white shadow transition-all ${
                isFull
                  ? "cursor-not-allowed bg-gray-400 dark:bg-gray-700"
                  : "bg-[#1D3557] hover:opacity-90 dark:bg-[#0B5FA5]"
              }`}
            >
              {isFull
                ? "Partido Lleno"
                : isProcessing
                  ? "Procesando..."
                  : "Inscribirme al Partido"}
            </button>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8 dark:border-gray-700 dark:bg-[#2E3138]">
        <h2 className="mb-4 text-xl font-bold text-[#1D3557] dark:text-white">
          Jugadores Confirmados ({match.players?.length || 0})
        </h2>

        {!match.players || match.players.length === 0 ? (
          <p className="py-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Aún no hay jugadores inscritos en este partido.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {match.players.map((player) => {
              const playerName =
                player.user?.playerProfile?.fullName ||
                player.user?.email ||
                player.user?.username ||
                "Jugador Confirmado";

              const position =
                player.user?.playerProfile?.position || "Jugador";

              return (
                <div
                  key={player.id || player.userId}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800/40"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1D3557]/10 text-sm font-black text-[#1D3557] dark:bg-[#0B5FA5]/30 dark:text-[#FF6B35]">
                    ⚽
                  </div>

                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
                      {playerName}
                    </p>

                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {position}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
