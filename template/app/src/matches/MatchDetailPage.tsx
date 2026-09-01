import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAuth } from "wasp/client/auth";
import {
  deleteMatch,
  getMatch,
  getReferees,
  joinMatch,
  leaveMatch,
  updateMatch,
  useAction,
  useQuery,
} from "wasp/client/operations";
import { Link, routes } from "wasp/client/router";

export const MatchDetailPage = () => {
  const { id: matchId } = useParams<{ id: string }>();
  const { data: user } = useAuth();
  const navigate = useNavigate();

  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Modal de edición
  const [isEditing, setIsEditing] = useState(false);
  const [editLocation, setEditLocation] = useState("");
  const [editDateTime, setEditDateTime] = useState("");
  const [editMaxPlayers, setEditMaxPlayers] = useState(10);
  const [editRefereeId, setEditRefereeId] = useState("");

  const joinAction = useAction(joinMatch);
  const leaveAction = useAction(leaveMatch);
  const updateMatchAction = useAction(updateMatch);
  const deleteMatchAction = useAction(deleteMatch);

  const {
    data: match,
    isLoading,
    error,
    refetch,
  } = useQuery(getMatch, { id: matchId ?? "" });

  const { data: referees } = useQuery(getReferees, undefined, {
    enabled: isEditing,
  });

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
  const canManage =
    user &&
    (user.isAdmin || (match.createdById && match.createdById === user.id));

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
      setMessage({ type: "error", text: errorMessage });
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
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleOpenEdit = () => {
    setEditLocation(match.location || "");
    const dateObj = new Date(match.dateTime);
    const isoStr = !Number.isNaN(dateObj.getTime())
      ? dateObj.toISOString().slice(0, 16)
      : "";
    setEditDateTime(isoStr);
    setEditMaxPlayers(match.maxPlayers || 10);
    setEditRefereeId(match.refereeId || "");
    setIsEditing(true);
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsProcessing(true);
      setMessage(null);
      await updateMatchAction({
        id: match.id,
        location: editLocation,
        dateTime: editDateTime,
        maxPlayers: editMaxPlayers,
        refereeId: editRefereeId || null,
      });
      setMessage({
        type: "success",
        text: "Partido actualizado correctamente.",
      });
      setIsEditing(false);
      refetch();
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al actualizar el partido";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm(
        "¿Estás seguro de que deseas cancelar/eliminar este partido?",
      )
    ) {
      return;
    }
    try {
      setIsProcessing(true);
      setMessage(null);
      await deleteMatchAction({ id: match.id });
      navigate("/matches");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Error al cancelar el partido";
      setMessage({ type: "error", text: errorMessage });
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8">
      <div className="flex items-center justify-between">
        <Link
          to={routes.MatchListRoute.to}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D3557] transition-opacity hover:opacity-80 dark:text-[#FF6B35]"
        >
          <span>←</span> Volver a la lista
        </Link>

        {canManage && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenEdit}
              className="rounded-xl border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-[#1D3557] shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
            >
              ✏️ Editar Partido
            </button>
            <button
              onClick={handleDelete}
              disabled={isProcessing}
              className="rounded-xl bg-[#E63946] px-3 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-red-700 disabled:opacity-50"
            >
              ❌ Cancelar Partido
            </button>
          </div>
        )}
      </div>

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

      {isEditing && (
        <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#2E3138]">
            <h2 className="mb-4 text-lg font-bold text-[#1D3557] dark:text-white">
              Editar Partido
            </h2>
            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div>
                <label className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                  📍 Ubicación / Cancha
                </label>
                <input
                  type="text"
                  value={editLocation}
                  onChange={(e) => setEditLocation(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-transparent p-2.5 outline-none dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                  📅 Fecha y Hora
                </label>
                <input
                  type="datetime-local"
                  value={editDateTime}
                  onChange={(e) => setEditDateTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-transparent p-2.5 outline-none dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                  👥 Máximo de Jugadores
                </label>
                <input
                  type="number"
                  min={2}
                  max={30}
                  value={editMaxPlayers}
                  onChange={(e) => setEditMaxPlayers(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 bg-transparent p-2.5 outline-none dark:border-gray-600"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-gray-700 dark:text-gray-300">
                  ⚖️ Árbitro Asignado
                </label>
                <select
                  value={editRefereeId}
                  onChange={(e) => setEditRefereeId(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-white p-2.5 outline-none dark:border-gray-600 dark:bg-[#2E3138]"
                >
                  <option value="">Sin árbitro asignado</option>
                  {referees?.map((ref) => (
                    <option key={ref.id} value={ref.id}>
                      {ref.fullName} — ⭐ {ref.averageRating.toFixed(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="rounded-xl border border-gray-300 px-4 py-2 font-semibold text-gray-700 dark:border-gray-600 dark:text-gray-300"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="rounded-xl bg-[#1D3557] px-4 py-2 font-bold text-white dark:bg-[#0B5FA5]"
                >
                  {isProcessing ? "Guardando..." : "Guardar Cambios"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md sm:p-8 dark:border-gray-700 dark:bg-[#2E3138]">
        <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 sm:flex-row sm:items-center dark:border-gray-700">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
                  match.status === "CANCELLED"
                    ? "bg-gray-500"
                    : isFull
                      ? "bg-[#E63946]"
                      : "bg-[#FF6B35]"
                }`}
              >
                {match.status === "CANCELLED"
                  ? "CANCELADO"
                  : isFull
                    ? "COMPLETO"
                    : "CUPO DISPONIBLE"}
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

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <span className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">
              📅 FECHA Y HORA
            </span>

            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
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

            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {match.field?.name || match.location}
            </p>
          </div>

          <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/50">
            <span className="mb-1 block text-xs font-semibold text-gray-500 dark:text-gray-400">
              ⚖️ ÁRBITRO
            </span>

            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">
              {match.referee?.fullName
                ? `⚖️ ${match.referee.fullName}`
                : "⚖️ Sin árbitro"}
            </p>
          </div>
        </div>

        <div className="pt-2">
          {match.status === "CANCELLED" ? (
            <div className="rounded-xl bg-gray-100 p-4 text-center text-sm font-bold text-gray-600 dark:bg-gray-800 dark:text-gray-400">
              Este partido ha sido cancelado.
            </div>
          ) : isUserJoined ? (
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
