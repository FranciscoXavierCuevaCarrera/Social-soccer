import React from "react";
import { useQuery, getUpcomingMatches } from "wasp/client/operations";
import { Award, Heart, Loader2, Trophy } from "lucide-react";
import ThemeToggle from "../client/components/ThemeToggle";
import RefereeRatingForm from "./RefereeRatingForm";

type MatchForRating = {
  id: string;
  location: string;
  dateTime: string | Date;
  homeTeam?: string | null;
  awayTeam?: string | null;
  referee?: {
    id: string;
    fullName: string;
    averageRating: number;
  } | null;
};

export function StatsPage() {
  const {
    data: upcomingMatches,
    isLoading: isMatchesLoading,
    error: matchesError,
  } = useQuery(getUpcomingMatches);

  const stats = {
    goals: 12,
    assists: 8,
    yellowCards: 2,
    redCards: 0,
    matchesPlayed: 14,
    fairPlayScore: 95,
  };

  const badges = [
    {
      title: "Fair Play Top",
      desc: "Sin tarjetas rojas en la temporada",
      icon: "🛡️",
    },
    {
      title: "Goleador del Mes",
      desc: "Más de 10 goles anotados",
      icon: "⚽",
    },
    {
      title: "Asistente Clave",
      desc: "+8 asistencias registradas",
      icon: "👟",
    },
    {
      title: "Asistencia Perfecta",
      desc: "100% partidos jugados",
      icon: "⭐",
    },
  ];

  const matches = (upcomingMatches ?? []) as MatchForRating[];

  const matchForRating =
    matches.find((match) => Boolean(match.referee)) ?? null;

  const refereeName =
    matchForRating?.referee?.fullName ?? "Sin árbitro asignado";

  const matchTitle = matchForRating
    ? [matchForRating.homeTeam, matchForRating.awayTeam]
        .filter(Boolean)
        .join(" vs ") || matchForRating.location
    : "No hay partidos disponibles";

  return (
    <div className="min-h-screen bg-background p-4 text-foreground transition-colors duration-300 md:p-8">
      <div className="mx-auto mb-8 flex max-w-4xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Trophy className="h-7 w-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">
              Gamificación & Estadísticas Individuales
            </h1>
          </div>

          <p className="text-muted-foreground text-sm">
            Reconocimiento de rendimiento, puntuación Fair Play y evaluación
            arbitral
          </p>
        </div>

        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-md dark:border-slate-700 dark:bg-[#2E3138]">
            <span className="mb-1 text-2xl">⚽</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">
              {stats.goals}
            </span>
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Goles Anotados
            </span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-md dark:border-slate-700 dark:bg-[#2E3138]">
            <span className="mb-1 text-2xl">👟</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">
              {stats.assists}
            </span>
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Asistencias
            </span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-md dark:border-slate-700 dark:bg-[#2E3138]">
            <span className="mb-1 text-2xl">🟨</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">
              {stats.yellowCards}
            </span>
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Tarjetas Amarillas
            </span>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center shadow-md dark:border-slate-700 dark:bg-[#2E3138]">
            <span className="mb-1 text-2xl">🟥</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">
              {stats.redCards}
            </span>
            <span className="text-muted-foreground text-xs font-semibold uppercase">
              Tarjetas Rojas
            </span>
          </div>
        </div>

        <div className="rounded-xl border bg-gradient-to-r from-emerald-900 to-teal-900 p-6 text-white shadow-xl transition-all duration-300 dark:border-slate-700 dark:from-[#2E3138] dark:to-emerald-950">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <div className="mb-1 flex items-center gap-2">
                <Heart className="h-6 w-6 fill-emerald-400 text-emerald-400" />
                <h3 className="text-lg font-bold">
                  Puntuación Fair Play (Juego Limpio)
                </h3>
              </div>

              <p className="max-w-md text-xs leading-relaxed text-slate-200">
                Incentivo por comportamiento deportivo y puntualidad. Acumula
                puntos para beneficios en indumentaria e implementos.
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-white/20 bg-white/10 px-6 py-3 text-center backdrop-blur-md">
              <span className="text-3xl font-black text-emerald-400">
                {stats.fairPlayScore}
              </span>
              <span className="block text-xs font-bold text-slate-200">
                / 100 Puntos
              </span>
            </div>
          </div>

          <div className="mt-4 h-3 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${stats.fairPlayScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-lg dark:border-slate-700 dark:bg-[#2E3138]">
          <div className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-[#FF6B35]" />
            <h3 className="text-base font-bold">
              Insignias & Logros Desbloqueados
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-4">
            {badges.map((badge) => (
              <div
                key={badge.title}
                className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800/40"
              >
                <span className="text-2xl">{badge.icon}</span>

                <div>
                  <h4 className="text-xs font-bold text-[#1D3557] dark:text-white">
                    {badge.title}
                  </h4>

                  <p className="text-muted-foreground text-[11px] leading-tight">
                    {badge.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isMatchesLoading ? (
          <div className="flex items-center justify-center rounded-xl border bg-white p-8 shadow-lg dark:border-slate-700 dark:bg-[#2E3138]">
            <Loader2 className="h-6 w-6 animate-spin text-[#0B5FA5] dark:text-[#FF6B35]" />
            <span className="ml-2 text-sm text-muted-foreground">
              Cargando partidos y árbitros...
            </span>
          </div>
        ) : matchesError ? (
          <div className="rounded-xl border border-red-500/40 bg-red-50 p-6 text-sm text-red-700 dark:bg-red-950/30 dark:text-red-300">
            No se pudieron cargar los partidos para la evaluación arbitral.
          </div>
        ) : matchForRating ? (
          <RefereeRatingForm
            refereeId={matchForRating.referee!.id}
            matchId={matchForRating.id}
            refereeName={refereeName}
            matchTitle={matchTitle}
          />
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-lg dark:border-slate-700 dark:bg-[#2E3138]">
            <Award className="mx-auto mb-3 h-8 w-8 text-[#FF6B35]" />

            <h3 className="text-base font-bold">
              No hay evaluación arbitral disponible
            </h3>

            <p className="mt-1 text-xs text-muted-foreground">
              Cuando exista un partido con árbitro asignado, podrás registrar
              aquí la evaluación de su desempeño.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default StatsPage;