import React from 'react';
import { Trophy, Activity, Target, AlertSquare, Heart, Award, Shield, CheckCircle2 } from 'lucide-react';
import ThemeToggle from '../client/components/ThemeToggle';
import RefereeRatingForm from './RefereeRatingForm';

export function StatsPage() {
  const stats = {
    goals: 12,
    assists: 8,
    yellowCards: 2,
    redCards: 0,
    matchesPlayed: 14,
    fairPlayScore: 95, // 0 to 100
  };

  const badges = [
    { title: 'Fair Play Top', desc: 'Sin tarjetas rojas en la temporada', icon: '🛡️' },
    { title: 'Goleador del Mes', desc: 'Más de 10 goles anotados', icon: '⚽' },
    { title: 'Asistente Clave', desc: '+8 asistencias registradas', icon: '👟' },
    { title: 'Asistencia Perfecta', desc: '100% partidos jugados', icon: '⭐' },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 bg-background text-foreground transition-colors duration-300">
      {/* Header */}
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-7 h-7 text-[#0B5FA5] dark:text-[#FF6B35]" />
            <h1 className="text-2xl font-bold tracking-tight">Gamificación & Estadísticas Individuales</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Reconocimiento de rendimiento, puntuación Fair Play y evaluación arbitral
          </p>
        </div>
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {/* Metric Cards Grid (4 Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4 shadow-md bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700 flex flex-col items-center text-center">
            <span className="text-2xl mb-1">⚽</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">{stats.goals}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Goles Anotados</span>
          </div>

          <div className="rounded-xl border p-4 shadow-md bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700 flex flex-col items-center text-center">
            <span className="text-2xl mb-1">👟</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">{stats.assists}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Asistencias</span>
          </div>

          <div className="rounded-xl border p-4 shadow-md bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700 flex flex-col items-center text-center">
            <span className="text-2xl mb-1">🟨</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">{stats.yellowCards}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Tarjetas Amarillas</span>
          </div>

          <div className="rounded-xl border p-4 shadow-md bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700 flex flex-col items-center text-center">
            <span className="text-2xl mb-1">🟥</span>
            <span className="text-2xl font-black text-[#1D3557] dark:text-white">{stats.redCards}</span>
            <span className="text-xs font-semibold text-muted-foreground uppercase">Tarjetas Rojas</span>
          </div>
        </div>

        {/* Fair Play Score Gauge Card */}
        <div className="rounded-xl border p-6 shadow-xl transition-all duration-300
          bg-gradient-to-r from-emerald-900 to-teal-900 text-white dark:from-[#2E3138] dark:to-emerald-950 dark:border-slate-700"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-6 h-6 text-emerald-400 fill-emerald-400" />
                <h3 className="text-lg font-bold">Puntuación Fair Play (Juego Limpio)</h3>
              </div>
              <p className="text-xs text-slate-200 max-w-md leading-relaxed">
                Incentivo por comportamiento deportivo y puntualidad. Acumula puntos para beneficios en indumentaria e implementos.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-xl border border-white/20 text-center shrink-0">
              <span className="text-3xl font-black text-emerald-400">{stats.fairPlayScore}</span>
              <span className="text-xs font-bold text-slate-200 block">/ 100 Puntos</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-3 mt-4 overflow-hidden">
            <div
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${stats.fairPlayScore}%` }}
            />
          </div>
        </div>

        {/* Badges / Achievements Grid */}
        <div className="rounded-xl border p-6 shadow-lg bg-white border-slate-200 dark:bg-[#2E3138] dark:border-slate-700">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#FF6B35]" />
            <h3 className="font-bold text-base">Insignias & Logros Desbloqueados</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {badges.map((badge, idx) => (
              <div key={idx} className="p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 flex items-start gap-3">
                <span className="text-2xl">{badge.icon}</span>
                <div>
                  <h4 className="font-bold text-xs text-[#1D3557] dark:text-white">{badge.title}</h4>
                  <p className="text-[11px] text-muted-foreground leading-tight">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referee Evaluation Form Component */}
        <RefereeRatingForm refereeName="Carlos Pérez" matchTitle="Fecha 4: El Batán vs San Roque" />
      </div>
    </div>
  );
}

export default StatsPage;
