import React from 'react';
import { Calendar, CloudRain, MapPin, User, AlertTriangle, Clock } from 'lucide-react';
import ThemeToggle from '../client/components/ThemeToggle';

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
      id: 'M-101',
      date: 'Sábado 1 de Agosto, 2026',
      time: '14:30 PM',
      homeTeam: 'Club Deportivo El Batán',
      awayTeam: 'Atlético San Roque',
      homeLogo: '🛡️',
      awayLogo: '⚡',
      fieldName: 'Cancha 1 — Césped Sintético Principal',
      location: 'Complejo Deportivo El Batán (Av. Granados)',
      referee: 'Carlos Pérez (4.8 ★)',
      weatherAlert:
        '🌧️ Alerta Meteorológica: Lluvia Fuerte Prevista a las 15:00 — Partido Confirmado en Drenaje Sintético',
      status: 'SCHEDULED',
      vocaliaPaid: true,
    },
    {
      id: 'M-102',
      date: 'Domingo 9 de Agosto, 2026',
      time: '11:00 AM',
      homeTeam: 'Real Parroquial FC',
      awayTeam: 'Club Deportivo El Batán',
      homeLogo: '👑',
      awayLogo: '🛡️',
      fieldName: 'Cancha 2 — Césped Natural',
      location: 'Estadio Parroquial Nayón',
      referee: 'Roberto Gomez (4.6 ★)',
      weatherAlert: '☀️ Tiempo Soleado Esperado (22°C)',
      status: 'SCHEDULED',
      vocaliaPaid: false,
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-7 h-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">
              Próximos Partidos & Logística AI
            </h1>
          </div>

          <p className="text-sm text-muted-foreground">
            Asignación exacta de canchas, colegiados y alertas meteorológicas en tiempo real
          </p>
        </div>

        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        <div className="p-4 rounded-xl border border-amber-500/40 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 flex items-start gap-3 shadow-md">
          <AlertTriangle className="w-6 h-6 text-[#FF6B35] shrink-0 mt-0.5 animate-bounce" />

          <div>
            <h3 className="font-bold text-sm">Notificación AI en Tiempo Real</h3>

            <p className="text-xs mt-0.5 leading-relaxed">
              Monitoreo meteorológico activo: Las notificaciones push notifican de inmediato
              cualquier cambio de hora o cancha para evitar traslados inútiles
              (&quot;ir de gana&quot;).
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {upcomingMatches.map((match: Match) => (
            <div
              key={match.id}
              className="rounded-xl border p-5 shadow-lg transition-all duration-300 hover:shadow-xl bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700"
            >
              <div className="flex flex-wrap justify-between items-center gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#1D3557] dark:text-[#FF6B35]">
                  <Calendar className="w-4 h-4" />

                  <span>{match.date}</span>

                  <span className="mx-1">•</span>

                  <Clock className="w-4 h-4" />

                  <span>{match.time}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      match.vocaliaPaid
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {match.vocaliaPaid
                      ? 'Vocalía Pagada ✓'
                      : 'Vocalía Pendiente'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 items-center text-center my-4 py-2">
                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-1">{match.homeLogo}</span>

                  <span className="font-bold text-sm md:text-base text-[#1D3557] dark:text-white">
                    {match.homeTeam}
                  </span>

                  <span className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">
                    Local
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-xs font-black px-3 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    VS
                  </span>

                  <span className="text-[11px] font-mono text-muted-foreground mt-1">
                    {match.time}
                  </span>
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-3xl mb-1">{match.awayLogo}</span>

                  <span className="font-bold text-sm md:text-base text-[#1D3557] dark:text-white">
                    {match.awayTeam}
                  </span>

                  <span className="text-[10px] text-muted-foreground font-semibold uppercase mt-0.5">
                    Visitante
                  </span>
                </div>
              </div>

              <div className="my-3 p-3 rounded-lg bg-sky-50 dark:bg-sky-950/40 text-sky-900 dark:text-sky-200 border border-sky-200 dark:border-sky-800/50 text-xs flex items-center gap-2">
                <CloudRain className="w-4 h-4 text-[#0B5FA5] dark:text-[#FF6B35] shrink-0" />

                <span className="font-medium">{match.weatherAlert}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-3 mt-2 border-t border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-4 h-4 text-[#1D3557] dark:text-[#FF6B35]" />

                  <span className="font-medium text-foreground">
                    {match.fieldName}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-muted-foreground sm:justify-end">
                  <User className="w-4 h-4 text-[#1D3557] dark:text-[#FF6B35]" />

                  <span>
                    Árbitro Asignado:{' '}
                    <strong className="text-foreground">
                      {match.referee}
                    </strong>
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