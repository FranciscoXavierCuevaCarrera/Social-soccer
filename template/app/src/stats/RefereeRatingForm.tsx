import { AlertCircle, Award, CheckCircle2, Star } from "lucide-react";
import React, { useState } from "react";
import {
  getReferees,
  getUpcomingMatches,
  submitRefereeRating,
  useQuery,
} from "wasp/client/operations";

interface RefereeRatingFormProps {
  refereeId?: string;
  matchId?: string;
  refereeName?: string;
  matchTitle?: string;
  onSubmitted?: () => void;
}

export function RefereeRatingForm({
  refereeId: propRefereeId,
  matchId: propMatchId,
  refereeName: propRefereeName,
  matchTitle: propMatchTitle,
  onSubmitted,
}: RefereeRatingFormProps) {
  const [selectedMatchId, setSelectedMatchId] = useState<string>(
    propMatchId || "",
  );
  const [selectedRefereeId, setSelectedRefereeId] = useState<string>(
    propRefereeId || "",
  );
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: referees } = useQuery(getReferees, undefined, {
    enabled: !propRefereeId,
  });
  const { data: upcomingMatches } = useQuery(getUpcomingMatches, undefined, {
    enabled: !propMatchId,
  });

  const activeMatchId = propMatchId || selectedMatchId;
  const activeRefereeId = propRefereeId || selectedRefereeId;

  const activeRefereeName =
    propRefereeName ||
    referees?.find((r) => r.id === activeRefereeId)?.fullName ||
    "Árbitro Seleccionado";
  const activeMatchTitle =
    propMatchTitle ||
    upcomingMatches?.find((m) => m.id === activeMatchId)?.homeTeam
      ? `${upcomingMatches?.find((m) => m.id === activeMatchId)?.homeTeam} vs ${upcomingMatches?.find((m) => m.id === activeMatchId)?.awayTeam}`
      : "Partido Seleccionado";

  const presets = [
    "Puntualidad excelente",
    "Manejo de juego imparcial",
    "Criterio claro en tarjetas",
    "Buena comunicación",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (rating < 1 || rating > 5) {
      setErrorMessage(
        "Por favor selecciona una calificación entre 1 y 5 estrellas.",
      );
      return;
    }

    if (!activeRefereeId) {
      setErrorMessage("Por favor selecciona un árbitro para calificar.");
      return;
    }

    if (!activeMatchId) {
      setErrorMessage("Por favor selecciona el partido correspondiente.");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitRefereeRating({
        refereeId: activeRefereeId,
        matchId: activeMatchId,
        stars: rating,
        comment: comment || undefined,
      });
      setSubmitted(true);
      if (onSubmitted) {
        onSubmitted();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg || "Error al enviar la evaluación arbitral.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xl transition-all duration-300 dark:border-slate-700 dark:bg-[#2E3138]">
      <div className="mb-2 flex items-center gap-2">
        <Award className="h-5 w-5 text-[#FF6B35]" />
        <h3 className="text-base font-bold text-[#1D3557] dark:text-white">
          Evaluación Arbitral Post-Partido
        </h3>
      </div>
      <p className="text-muted-foreground mb-4 text-xs">
        Califica el desempeño del colegiado asignado para fomentar la
        transparencia y el Fair Play
      </p>

      <div className="mb-4 space-y-2 rounded-lg bg-slate-50 p-3 text-xs dark:bg-slate-800/60">
        {!propMatchId ? (
          <div>
            <label className="text-muted-foreground mb-1 block font-medium">
              Seleccionar Partido:
            </label>
            <select
              value={selectedMatchId}
              onChange={(e) => setSelectedMatchId(e.target.value)}
              className="text-foreground w-full rounded-lg border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-[#2E3138]"
            >
              <option value="">-- Selecciona un partido --</option>
              {upcomingMatches?.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.homeTeam} vs {m.awayTeam} (
                  {new Date(m.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>
        ) : (
          <span className="text-muted-foreground block font-medium">
            Encuentro:{" "}
            <strong className="text-foreground">{activeMatchTitle}</strong>
          </span>
        )}

        {!propRefereeId ? (
          <div>
            <label className="text-muted-foreground mb-1 block font-medium">
              Seleccionar Árbitro:
            </label>
            <select
              value={selectedRefereeId}
              onChange={(e) => setSelectedRefereeId(e.target.value)}
              className="text-foreground w-full rounded-lg border border-slate-200 bg-white p-2 text-xs dark:border-slate-700 dark:bg-[#2E3138]"
            >
              <option value="">-- Selecciona un árbitro --</option>
              {referees?.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.fullName} ({r.badgeNumber || "Sin placa"}) —{" "}
                  {r.averageRating.toFixed(1)} ★
                </option>
              ))}
            </select>
          </div>
        ) : (
          <span className="text-muted-foreground mt-0.5 block font-medium">
            Árbitro Central:{" "}
            <strong className="text-foreground">{activeRefereeName}</strong>
          </span>
        )}
      </div>

      {errorMessage && (
        <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-800 dark:border-red-800 dark:bg-red-950/40 dark:text-red-300">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {submitted ? (
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-50 p-4 text-center text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200">
          <CheckCircle2 className="mx-auto mb-2 h-8 w-8 text-emerald-500" />
          <h4 className="text-sm font-bold">
            ¡Evaluación Arbitral Registrada!
          </h4>
          <p className="mt-1 text-xs">
            Otorgaste {rating} estrellas a {activeRefereeName}. Gracias por tu
            retroalimentación.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Selection */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-slate-50 p-3 dark:bg-slate-800/40">
            <span className="text-muted-foreground mb-2 text-xs font-semibold">
              Calificación por Estrellas (1 a 5):
            </span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="cursor-pointer p-1 transition-transform hover:scale-125 focus:outline-none"
                >
                  <Star
                    className={`h-7 w-7 transition-colors ${
                      (hoverRating || rating) >= star
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300 dark:text-slate-600"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="mt-2 text-xs font-bold text-amber-600 dark:text-amber-400">
                {rating} de 5 Estrellas seleccionadas
              </span>
            )}
          </div>

          {/* Preset Feedback Tags */}
          <div>
            <span className="text-muted-foreground mb-1.5 block text-[11px] font-semibold">
              Comentarios Rápidos:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() =>
                    setComment((prev) => (prev ? `${prev}, ${preset}` : preset))
                  }
                  className="cursor-pointer rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-[11px] transition-colors hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700"
                >
                  + {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Field */}
          <div>
            <textarea
              value={comment}
              onChange={(e) =>
                setComment((e.target as unknown as { value: string }).value)
              }
              placeholder="Escribe comentarios u observaciones adicionales sobre el arbitraje..."
              className="w-full rounded-xl border border-slate-200 bg-transparent p-2.5 text-xs outline-none focus:ring-2 focus:ring-[#0B5FA5] dark:border-slate-700"
              rows={2}
            />
          </div>

          <button
            type="submit"
            disabled={
              rating === 0 || !activeRefereeId || !activeMatchId || isSubmitting
            }
            className={`w-full cursor-pointer rounded-xl px-4 py-2.5 text-xs font-bold shadow-md transition-all ${
              rating > 0 && activeRefereeId && activeMatchId && !isSubmitting
                ? "bg-[#1D3557] text-white hover:bg-[#1D3557]/90 dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80"
                : "cursor-not-allowed bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600"
            }`}
          >
            {isSubmitting
              ? "Enviando Evaluación..."
              : `Enviar Evaluación de ${rating} Estrellas`}
          </button>
        </form>
      )}
    </div>
  );
}

export default RefereeRatingForm;
