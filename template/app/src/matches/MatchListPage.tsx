import React, { useState } from 'react';
import { useAuth } from 'wasp/client/auth';
import {
  useQuery,
  useAction,
  getMatches,
  createMatch,
  joinMatch,
  leaveMatch,
} from 'wasp/client/operations';

export const MatchListPage = () => {
  const { data: user } = useAuth();
  const { data: matches, isLoading, error } = useQuery(getMatches);
  const createMatchAction = useAction(createMatch);
  const joinMatchAction = useAction(joinMatch);
  const leaveMatchAction = useAction(leaveMatch);

  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createMatchAction({
        location,
        dateTime: new Date(date).toISOString(),
        maxPlayers: Number(maxPlayers),
      });
      setLocation('');
      setDate('');
      setMaxPlayers(10);
    } catch (err: any) {
      alert('Error al crear partido: ' + err.message);
    }
  };

  const handleJoin = async (matchId: string) => {
    try {
      await joinMatchAction({ matchId });
    } catch (err: any) {
      alert('Error al unirse: ' + err.message);
    }
  };

  const handleLeave = async (matchId: string) => {
    try {
      await leaveMatchAction({ matchId });
    } catch (err: any) {
      alert('Error al salir: ' + err.message);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Partidos de Fútbol</h1>

      <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold">Crear Nuevo Partido</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Cancha / Ubicación</label>
          <input
            type="text"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            placeholder="Ej. Cancha Central Sintética"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Fecha y Hora</label>
            <input
              type="datetime-local"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Número Máximo de Jugadores</label>
            <input
              type="number"
              min="2"
              max="30"
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear Partido
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-4">Partidos Disponibles</h2>
      {isLoading && <p>Cargando partidos...</p>}
      {error && <p className="text-red-500">Error: {(error as any)?.message || String(error)}</p>}
      {matches && (matches as any[]).length === 0 && <p className="text-gray-500">No hay partidos programados.</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(matches as any[])?.map((match: any) => {
          const isJoined = match.players?.some((p: any) => p.userId === (user as any)?.id);
          const isFull = (match.players?.length || 0) >= match.maxPlayers;

          return (
            <div key={match.id} className="p-4 border rounded-lg shadow dark:bg-gray-800 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-lg">{match.location}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  📅 {new Date(match.dateTime).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  👥 Inscritos: {match.players?.length || 0} / {match.maxPlayers}
                </p>
              </div>

              <div className="mt-4">
                {isJoined ? (
                  <button
                    onClick={() => handleLeave(match.id)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Salir del Partido
                  </button>
                ) : (
                  <button
                    onClick={() => handleJoin(match.id)}
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
          );
        })}
      </div>
    </div>
  );
};