import React, { useState } from 'react';
import { Link } from 'wasp/client/router';
import { useQuery, useAction, getMatch, joinMatch, leaveMatch } from 'wasp/client/operations';
import { useAuth } from 'wasp/client/auth';

export const MatchDetailPage = (props: any) => {
  const matchId = props.match?.params?.id || props.params?.id;
  const { data: user } = useAuth();
  const { data: match, isLoading, error, refetch } = useQuery(getMatch, { id: matchId });

  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const joinAction = useAction(joinMatch);
  const leaveAction = useAction(leaveMatch);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0B5FA5] dark:border-[#FF6B35]"></div>
      </div>
    );
  }

  if (error || !match) {
    return (
      <div className="max-w-xl mx-auto my-12 p-6 bg-red-50 dark:bg-[#2E3138] border border-[#E63946] rounded-xl text-center">
        <p className="text-[#E63946] font-medium">No se pudo cargar la información del partido.</p>
        <Link to={"/matches" as any} className="mt-4 inline-block text-sm text-[#1D3557] dark:text-[#FF6B35] font-semibold hover:underline">
          ← Regresar a partidos
        </Link>
      </div>
    );
  }

  const isUserJoined = match.players?.some((p: any) => p.userId === user?.id);
  const isFull = (match.players?.length || 0) >= match.maxPlayers;

  const handleJoin = async () => {
    try {
      setIsProcessing(true);
      setMessage(null);
      await joinAction({ matchId: match.id });
      setMessage({ type: 'success', text: '¡Te has inscrito al partido exitosamente!' });
      refetch();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error al unirse al partido' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleLeave = async () => {
    try {
      setIsProcessing(true);
      setMessage(null);
      await leaveAction({ matchId: match.id });
      setMessage({ type: 'success', text: 'Has salido del partido' });
      refetch();
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Error al salir del partido' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Navegación */}
      <Link
        to={"/matches" as any}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D3557] dark:text-[#FF6B35] hover:opacity-80 transition-opacity"
      >
        <span>←</span> Volver a la lista
      </Link>

      {/* Alertas */}
      {message && (
        <div
          className={`p-4 rounded-xl border text-sm font-medium ${
            message.type === 'error'
              ? 'bg-red-50 dark:bg-red-950/30 text-[#E63946] border-[#E63946]'
              : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-500'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Tarjeta Principal Stitch */}
      <div className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-xl p-6 sm:p-8 shadow-md space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`px-3 py-1 text-white text-xs font-bold rounded-full ${isFull ? 'bg-[#E63946]' : 'bg-[#FF6B35]'}`}>
                {isFull ? 'COMPLETO' : 'CUPO DISPONIBLE'}
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#1D3557] dark:text-white tracking-tight">
              {match.location}
            </h1>
          </div>

          <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Cupos</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-[#FF6B35]">
              {match.players?.length || 0} / {match.maxPlayers}
            </span>
          </div>
        </div>

        {/* Detalles Logísticos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">📅 FECHA Y HORA</span>
            <p className="text-base font-bold text-gray-800 dark:text-gray-200">
              {new Date(match.dateTime).toLocaleString(undefined, {
                dateStyle: 'full',
                timeStyle: 'short',
              })}
            </p>
          </div>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-semibold block mb-1">📍 CANCHA / UBICACIÓN</span>
            <p className="text-base font-bold text-gray-800 dark:text-gray-200">
              {match.field?.name || match.location}
            </p>
          </div>
        </div>

        {/* Botón de Acción Principal */}
        <div className="pt-2">
          {isUserJoined ? (
            <button
              onClick={handleLeave}
              disabled={isProcessing}
              className="w-full py-3 px-6 bg-[#E63946] hover:bg-red-700 text-white font-bold rounded-xl shadow transition-all disabled:opacity-50"
            >
              {isProcessing ? 'Procesando...' : 'Salirse del Partido'}
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={isProcessing || isFull}
              className={`w-full py-3 px-6 font-bold rounded-xl shadow transition-all text-white ${
                isFull
                  ? 'bg-gray-400 dark:bg-gray-700 cursor-not-allowed'
                  : 'bg-[#1D3557] dark:bg-[#0B5FA5] hover:opacity-90'
              }`}
            >
              {isFull ? 'Partido Lleno' : isProcessing ? 'Procesando...' : 'Inscribirme al Partido'}
            </button>
          )}
        </div>
      </div>

      {/* Lista de Jugadores Inscritos */}
      <div className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-xl p-6 sm:p-8 shadow-md">
        <h2 className="text-xl font-bold text-[#1D3557] dark:text-white mb-4">
          Jugadores Confirmados ({match.players?.length || 0})
        </h2>

        {!match.players || match.players.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400 py-4 text-center">
            Aún no hay jugadores inscritos en este partido.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {match.players.map((p: any) => {
              const playerName =
                p.user?.playerProfile?.name ||
                p.user?.email ||
                p.user?.username ||
                'Jugador Confirmado';
              const position = p.user?.playerProfile?.position || 'Jugador';

              return (
                <div
                  key={p.id || p.userId}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/40 border border-gray-200 dark:border-gray-700 rounded-xl"
                >
                  <div className="w-9 h-9 rounded-full bg-[#1D3557]/10 dark:bg-[#0B5FA5]/30 text-[#1D3557] dark:text-[#FF6B35] flex items-center justify-center font-black text-sm">
                    ⚽
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{playerName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{position}</p>
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