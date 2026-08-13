import React, { useState } from 'react';
import { Link } from 'wasp/client/router';
import { useAction, createMatch } from 'wasp/client/operations';

export const CreateMatchPage = () => {
  const createMatchAction = useAction(createMatch);

  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!location.trim() || !dateTime) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    try {
      setIsSubmitting(true);
      const newMatch = await createMatchAction({
        location,
        dateTime,
        maxPlayers: Number(maxPlayers),
      });
      window.location.href = `/matches/${newMatch.id}`;
    } catch (err: any) {
      setError(err.message || 'Error al crear el partido');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6">
      <Link
        to={"/matches" as any}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D3557] dark:text-[#FF6B35] hover:opacity-80 transition-opacity"
      >
        <span>←</span> Volver a la lista
      </Link>

      <div className="bg-white dark:bg-[#2E3138] border border-gray-200 dark:border-gray-700 rounded-xl p-6 sm:p-8 shadow-md space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1D3557] dark:text-white tracking-tight">
            Crear Nuevo Partido
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Organiza una pichanga o partido oficial especificando la cancha y horario.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl border bg-red-50 dark:bg-red-950/30 text-[#E63946] border-[#E63946] text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
              📍 Ubicación / Nombre de la Cancha
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Complejo Deportivo San Pedro - Cancha 2"
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0B5FA5] focus:outline-none transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
              📅 Fecha y Hora del Encuentro
            </label>
            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0B5FA5] focus:outline-none transition-all text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 mb-2">
              👥 Límite Máximo de Jugadores
            </label>
            <input
              type="number"
              min={2}
              max={30}
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#0B5FA5] focus:outline-none transition-all text-sm"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-6 bg-[#1D3557] dark:bg-[#0B5FA5] hover:opacity-90 text-white font-bold rounded-xl shadow transition-all disabled:opacity-50 mt-4"
          >
            {isSubmitting ? 'Guardando partido...' : 'Publicar Partido'}
          </button>
        </form>
      </div>
    </div>
  );
};