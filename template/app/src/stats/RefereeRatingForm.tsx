import React, { useState } from 'react';
import { Star, CheckCircle2, Award } from 'lucide-react';

interface RefereeRatingFormProps {
  refereeName?: string;
  matchTitle?: string;
}

export function RefereeRatingForm({
  refereeName = 'Carlos Pérez',
  matchTitle = 'Fecha 4: El Batán vs San Roque',
}: RefereeRatingFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const presets = ['Puntualidad excelente', 'Manejo de juego imparcial', 'Criterio claro en tarjetas', 'Buena comunicación'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      setSubmitted(true);
    }
  };

  return (
    <div className="rounded-xl border p-6 shadow-xl transition-all duration-300
      bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700"
    >
      <div className="flex items-center gap-2 mb-2">
        <Award className="w-5 h-5 text-[#FF6B35]" />
        <h3 className="font-bold text-base text-[#1D3557] dark:text-white">Evaluación Arbitral Post-Partido</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">
        Califica el desempeño del colegiado asignado para fomentar la transparencia y el Fair Play
      </p>

      <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 mb-4 text-xs">
        <span className="block text-muted-foreground font-medium">Encuentro: <strong className="text-foreground">{matchTitle}</strong></span>
        <span className="block text-muted-foreground font-medium mt-0.5">Árbitro Central: <strong className="text-foreground">{refereeName}</strong></span>
      </div>

      {submitted ? (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-500/40 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200 text-center">
          <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
          <h4 className="font-bold text-sm">¡Evaluación Arbitral Registrada!</h4>
          <p className="text-xs mt-1">Otorgaste {rating} estrellas a {refereeName}. Gracias por tu retroalimentación.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Star Selection */}
          <div className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
            <span className="text-xs font-semibold mb-2 text-muted-foreground">Calificación por Estrellas (1 a 5):</span>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      (hoverRating || rating) >= star
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 mt-2">
                {rating} de 5 Estrellas seleccionadas
              </span>
            )}
          </div>

          {/* Preset Feedback Tags */}
          <div>
            <span className="block text-[11px] font-semibold text-muted-foreground mb-1.5">Comentarios Rápidos:</span>
            <div className="flex flex-wrap gap-1.5">
              {presets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setComment((prev) => (prev ? `${prev}, ${preset}` : preset))}
                  className="text-[11px] px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
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
              onChange={(e) => setComment((e.target as unknown as { value: string }).value)}
              placeholder="Escribe comentarios u observaciones adicionales sobre el arbitraje..."
              className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-transparent focus:ring-2 focus:ring-[#0B5FA5] outline-none"
              rows={2}
            />
          </div>

          <button
            type="submit"
            disabled={rating === 0}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer ${
              rating > 0
                ? 'bg-[#1D3557] text-white hover:bg-[#1D3557]/90 dark:bg-[#0B5FA5] dark:hover:bg-[#0B5FA5]/80'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
            }`}
          >
            Enviar Evaluación de {rating} Estrellas
          </button>
        </form>
      )}
    </div>
  );
}

export default RefereeRatingForm;
