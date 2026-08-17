import React, { useState } from "react";
import { Link, routes } from "wasp/client/router";
import { createMatch, useAction } from "wasp/client/operations";

export const CreateMatchPage = () => {
  const createMatchAction = useAction(createMatch);

  const [location, setLocation] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [maxPlayers, setMaxPlayers] = useState(10);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!location.trim() || !dateTime) {
      setError("Por favor completa todos los campos requeridos.");
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
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al crear el partido";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 px-4 py-8">
      <Link
        to={routes.MatchListRoute.to}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D3557] transition-opacity hover:opacity-80 dark:text-[#FF6B35]"
      >
        <span>←</span> Volver a la lista
      </Link>

      <div className="space-y-6 rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#2E3138] sm:p-8">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1D3557] dark:text-white">
            Crear Nuevo Partido
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Organiza una pichanga o partido oficial especificando la cancha y
            horario.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-[#E63946] bg-red-50 p-4 text-sm font-medium text-[#E63946] dark:bg-red-950/30">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              📍 Ubicación / Nombre de la Cancha
            </label>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ej: Complejo Deportivo San Pedro - Cancha 2"
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#0B5FA5] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              📅 Fecha y Hora del Encuentro
            </label>

            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#0B5FA5] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
              👥 Límite Máximo de Jugadores
            </label>

            <input
              type="number"
              min={2}
              max={30}
              value={maxPlayers}
              onChange={(e) => setMaxPlayers(Number(e.target.value))}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 transition-all focus:outline-none focus:ring-2 focus:ring-[#0B5FA5] dark:border-gray-600 dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full rounded-xl bg-[#1D3557] px-6 py-3 font-bold text-white shadow transition-all hover:opacity-90 disabled:opacity-50 dark:bg-[#0B5FA5]"
          >
            {isSubmitting ? "Guardando partido..." : "Publicar Partido"}
          </button>
        </form>
      </div>
    </div>
  );
};