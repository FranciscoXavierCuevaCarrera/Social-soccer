import {
  AlertTriangle,
  Calendar,
  Clock,
  CloudRain,
  MapPin,
  User,
} from "lucide-react";
import ThemeToggle from "../client/components/ThemeToggle";

type Match = {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeLogo: string;
  awayLogo: string;
  fieldName: string;
  location: string;
  referee: string;
  weatherAlert: string;
  status: string;
  vocaliaPaid: boolean;
};

export function MatchesPage() {
  const upcomingMatches: Match[] = [
    {
      id: "M-101",
      date: "Sábado 1 de Agosto, 2026",
      time: "14:30 PM",
      homeTeam: "Club Deportivo El Batán",
      awayTeam: "Atlético San Roque",
      homeLogo: "🛡️",
      awayLogo: "⚡",
      fieldName: "Cancha 1 — Césped Sintético Principal",
      location: "Complejo Deportivo El Batán (Av. Granados)",
      referee: "Carlos Pérez (4.8 ★)",
      weatherAlert:
        "🌧️ Alerta Meteorológica: Lluvia Fuerte Prevista a las 15:00 — Partido Confirmado en Drenaje Sintético",
      status: "SCHEDULED",
      vocaliaPaid: true,
    },
    {
      id: "M-102",
      date: "Domingo 9 de Agosto, 2026",
      time: "11:00 AM",
      homeTeam: "Real Parroquial FC",
      awayTeam: "Club Deportivo El Batán",
      homeLogo: "👑",
      awayLogo: "🛡️",
      fieldName: "Cancha 2 — Césped Natural",
      location: "Estadio Parroquial Nayón",
      referee: "Roberto Gomez (4.6 ★)",
      weatherAlert: "☀️ Tiempo Soleado Esperado (22°C)",
      status: "SCHEDULED",
      vocaliaPaid: false,
    },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen p-4 transition-colors duration-300 md:p-8">
      <div className="mx-auto mb-8 flex max-w-4xl flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <Calendar className="h-7 w-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">
              Próximos Partidos & Logística AI
            </h1>
          </div>

          <p className="text-muted-foreground text-sm">
            Asignación exacta de canchas, colegiados y alertas meteorológicas en
            tiempo real
          </p>
        </div>

        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-start gap-3 rounded-xl border border-amber-500/40 bg-amber-50 p-4 text-amber-900 shadow-md dark:bg-amber-950/40 dark:text-amber-200">
          <AlertTriangle className="mt-0.5 h-6 w-6 shrink-0 animate-bounce text-[#FF6B35]" />

          <div>
            <h3 className="text-sm font-bold">
              Notificación AI en Tiempo Real
            </h3>

            <p className="mt-0.5 text-xs leading-relaxed">
              Monitoreo meteorológico activo: Las notificaciones push notifican
              de inmediato cualquier cambio de hora o cancha para evitar
              traslados inútiles (&quot;ir de gana&quot;).
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingMatches.map((match: Match) => (
            <div
              key={match.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-[#2E3138]"
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1D3557] dark:text-[#FF6B35]">
                  <Calendar className="h-4 w-4" />

                  <span>{match.date}</span>

                  <span className="mx-1">•</span>

                  <Clock className="h-4 w-4" />

                  <span>{match.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${
                      match.vocaliaPaid
                        ? "border-emerald-500/30 bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                        : "border-amber-500/30 bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300"
                    }`}
                  >
                    {match.vocaliaPaid
                      ? "Vocalía Pagada ✓"
                      : "Vocalía Pendiente"}
                  </span>
                </div>
              </div>

              <div className="my-4 grid grid-cols-3 items-center py-2 text-center">
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-3xl">{match.homeLogo}</span>

                  <span className="text-sm font-bold text-[#1D3557] md:text-base dark:text-white">
                    {match.homeTeam}
                  </span>

                  <span className="text-muted-foreground mt-0.5 text-[10px] font-semibold uppercase">
                    Local
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    VS
                  </span>

                  <span className="text-muted-foreground mt-1 font-mono text-[11px]">
                    {match.time}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="mb-1 text-3xl">{match.awayLogo}</span>

                  <span className="text-sm font-bold text-[#1D3557] md:text-base dark:text-white">
                    {match.awayTeam}
                  </span>

                  <span className="text-muted-foreground mt-0.5 text-[10px] font-semibold uppercase">
                    Visitante
                  </span>
                </div>
              </div>

              <div className="my-3 flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900 dark:border-sky-800/50 dark:bg-sky-950/40 dark:text-sky-200">
                <CloudRain className="h-4 w-4 shrink-0 text-[#0B5FA5] dark:text-[#FF6B35]" />

                <span className="font-medium">{match.weatherAlert}</span>
              </div>

              <div className="mt-2 grid grid-cols-1 gap-2 border-t border-slate-100 pt-3 text-xs sm:grid-cols-2 dark:border-slate-700/60">
                <div className="text-muted-foreground flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-[#1D3557] dark:text-[#FF6B35]" />

                  <span className="text-foreground font-medium">
                    {match.fieldName}
                  </span>
                </div>

                <div className="text-muted-foreground flex items-center gap-1.5 sm:justify-end">
                  <User className="h-4 w-4 text-[#1D3557] dark:text-[#FF6B35]" />

                  <span>
                    Árbitro Asignado:{" "}
                    <strong className="text-foreground">{match.referee}</strong>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchesPage;
