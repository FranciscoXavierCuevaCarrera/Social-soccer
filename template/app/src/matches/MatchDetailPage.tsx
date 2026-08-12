import React from 'react';
import { Link } from 'wasp/client/router';
import { useAuth } from 'wasp/client/auth';
import { useQuery, useAction, getMatches, joinMatch, leaveMatch } from 'wasp/client/operations';

export const MatchDetailPage = (props: any) => {
  const id = props.match?.params?.id || props.params?.id || window.location.pathname.split('/').pop() || '';
  const { data: user } = useAuth();
  const { data: matches, isLoading, error } = useQuery(getMatches);

  const match = matches?.find((m: any) => m.id === id);

  const joinMatchAction = useAction(joinMatch);
  const leaveMatchAction = useAction(leaveMatch);

  if (isLoading) return <div className="p-6 text-center">Cargando partido...</div>;
  if (error || !match) return <div className="p-6 text-center text-red-500">Partido no encontrado</div>;

  const isJoined = match.players?.some((p: any) => p.userId === (user as any)?.id);
  const isFull = (match.players?.length || 0) >= match.maxPlayers;

  const handleJoin = async () => {
    try {
      await joinMatchAction({ matchId: match.id });
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleLeave = async () => {
    try {
      await leaveMatchAction({ matchId: match.id });
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <Link to="/matches" className="text-blue-500 hover:underline">
        ← Volver a la lista de partidos
      </Link>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
        <h1 className="text-3xl font-bold">{match.location}</h1>
        <p className="text-gray-600 dark:text-gray-300">
          📅 <strong>Fecha y hora:</strong> {new Date(match.dateTime).toLocaleString()}
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          👥 <strong>Jugadores inscritos:</strong> {match.players?.length || 0} / {match.maxPlayers}
        </p>
        {match.field && (
          <p className="text-gray-600 dark:text-gray-300">
            🏟️ <strong>Cancha:</strong> {match.field.name} ({match.field.surface || 'Sintético'})
          </p>
        )}
        {match.referee && (
          <p className="text-gray-600 dark:text-gray-300">
            ⚖️ <strong>Árbitro:</strong> {match.referee.fullName}
          </p>
        )}

        <div className="pt-4">
          {isJoined ? (
            <button
              onClick={handleLeave}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Salir del Partido
            </button>
          ) : (
            <button
              onClick={handleJoin}
              disabled={isFull}
              className={`w-full font-bold py-2 px-4 rounded ${
                isFull
                  ? 'bg-gray-400 cursor-not-allowed text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              }`}
            >
              {isFull ? 'Partido Lleno' : 'Unirme al Partido'}
            </button>
          )}
        </div>
      </div>

      <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold">Lista de Jugadores</h2>
        {match.players?.length === 0 ? (
          <p className="text-gray-500">Aún no hay jugadores inscritos en este partido.</p>
        ) : (
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {match.players?.map((p: any) => (
              <li key={p.id} className="py-3 flex items-center justify-between">
                <div>
                  <p className="font-semibold">
                    {p.user?.playerProfile?.fullName || p.user?.username || p.user?.email || 'Jugador Anónimo'}
                  </p>
                  <p className="text-sm text-gray-500">
                    Posición: {p.user?.playerProfile?.position || 'Sin definir'} | Club: {p.user?.playerProfile?.currentClub || 'Libre'}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};