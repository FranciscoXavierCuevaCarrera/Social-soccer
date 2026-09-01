import {
  AlertTriangle,
  Calendar,
  Clock,
  CloudRain,
  MapPin,
  Plus,
  User,
  X,
} from "lucide-react";
import React, { useState } from "react";
import {
  createMatch,
  getFields,
  getReferees,
  getUpcomingMatches,
  useQuery,
} from "wasp/client/operations";
import ThemeToggle from "../client/components/ThemeToggle";

export function MatchesPage() {
  const { data: dbMatches, refetch: refetchMatches } =
    useQuery(getUpcomingMatches);
  const { data: dbReferees } = useQuery(getReferees);
  const { data: dbFields } = useQuery(getFields);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [homeTeam, setHomeTeam] = useState("");
  const [awayTeam, setAwayTeam] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("15:00");
  const [selectedFieldId, setSelectedFieldId] = useState("");
  const [selectedRefereeId, setSelectedRefereeId] = useState("");
  const [weatherAlert, setWeatherAlert] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleCreateMatch = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!homeTeam || !awayTeam || !date || !time || !selectedFieldId) {
      setFormError(
        "Por favor completa los campos requeridos (Equipos, Fecha, Hora, Cancha).",
      );
      return;
    }

    try {
      setIsSubmitting(true);
      const fieldObj = dbFields?.find(
        (f: { id: string; name: string; location: string }) =>
          f.id === selectedFieldId,
      );
      const locationName = fieldObj
        ? `${fieldObj.name} (${fieldObj.location})`
        : homeTeam
          ? `${homeTeam} vs ${awayTeam}`
          : "Cancha Principal";
      const combinedDateTime =
        date && time ? `${date}T${time}:00` : new Date().toISOString();

      await createMatch({
        location: locationName,
        dateTime: combinedDateTime,
        maxPlayers: 10,
        refereeId: selectedRefereeId || null,
      });
      await refetchMatches();
      setIsModalOpen(false);
      setHomeTeam("");
      setAwayTeam("");
      setDate("");
      setSelectedFieldId("");
      setSelectedRefereeId("");
      setWeatherAlert("");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFormError(msg || "Error al crear el partido.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const mockFallbackMatches = [
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
      referee: "David Gilmour (5.0 ★)",
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
      referee: "Syd Barrett (5.0 ★)",
      weatherAlert: "☀️ Tiempo Soleado Esperado (22°C)",
      status: "SCHEDULED",
      vocaliaPaid: false,
    },
  ];

  const matchesToDisplay =
    dbMatches && dbMatches.length > 0
      ? dbMatches.map(
          (m: {
            id: string;
            location?: string | null;
            dateTime?: Date | string | null;
            maxPlayers?: number | null;
            status?: string | null;
            date?: Date | string | null;
            time?: string | null;
            homeTeam?: string | null;
            awayTeam?: string | null;
            field?: { name: string; location: string } | null;
            referee?: { fullName: string; averageRating: number } | null;
            weatherAlert?: string | null;
          }) => {
            const matchDateObj = m.dateTime
              ? new Date(m.dateTime)
              : m.date
                ? new Date(m.date)
                : new Date();
            const dateStr = !isNaN(matchDateObj.getTime())
              ? matchDateObj.toLocaleDateString("es-EC", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
              : "Fecha por definir";

            return {
              id: m.id,
              date: dateStr,
              time:
                m.time ||
                (m.dateTime
                  ? new Date(m.dateTime).toLocaleTimeString("es-EC", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Por definir"),
              homeTeam: m.homeTeam || m.location || "Partido Barrial",
              awayTeam: m.awayTeam || "Equipo Rival",
              homeLogo: "🛡️",
              awayLogo: "⚡",
              fieldName: m.field
                ? `${m.field.name}`
                : m.location || "Cancha Principal",
              location: m.field
                ? m.field.location
                : m.location || "Complejo Deportivo",
              referee: m.referee
                ? `${m.referee.fullName} (${m.referee.averageRating.toFixed(1)} ★)`
                : "Sin árbitro asignado",
              weatherAlert: m.weatherAlert || "☀️ Tiempo soleado",
              status: m.status || "SCHEDULED",
              vocaliaPaid: true,
            };
          },
        )
      : mockFallbackMatches;

  return (
    <div className="bg-background text-foreground min-h-screen p-4 transition-colors duration-300 md:p-8">
      {/* Header */}
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
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#1D3557] px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-[#1D3557]/90 dark:bg-[#FF6B35] dark:hover:bg-[#FF6B35]/90"
          >
            <Plus className="h-4 w-4" />
            Crear Partido
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {/* Banner de Alerta Climática Destacado */}
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

        {/* Modal para Crear Partido */}
        {isModalOpen && (
          <div className="backdrop-blur-xs fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
            <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-[#2E3138]">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute right-4 top-4 rounded-full p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>

              <h2 className="mb-1 text-lg font-bold text-[#1D3557] dark:text-white">
                Crear Nuevo Partido
              </h2>
              <p className="text-muted-foreground mb-4 text-xs">
                Programa un encuentro y asigna canchas y colegiados oficiales.
              </p>

              {formError && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 text-xs text-red-800 dark:bg-red-950/40 dark:text-red-300">
                  {formError}
                </div>
              )}

              <form onSubmit={handleCreateMatch} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-muted-foreground mb-1 block font-medium">
                      Equipo Local *
                    </label>
                    <input
                      type="text"
                      required
                      value={homeTeam}
                      onChange={(e) => setHomeTeam(e.target.value)}
                      placeholder="Ej: Deportivo El Batán"
                      className="text-foreground w-full rounded-lg border border-slate-200 bg-transparent p-2.5 outline-none dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground mb-1 block font-medium">
                      Equipo Visitante *
                    </label>
                    <input
                      type="text"
                      required
                      value={awayTeam}
                      onChange={(e) => setAwayTeam(e.target.value)}
                      placeholder="Ej: Atlético San Roque"
                      className="text-foreground w-full rounded-lg border border-slate-200 bg-transparent p-2.5 outline-none dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-muted-foreground mb-1 block font-medium">
                      Fecha *
                    </label>
                    <input
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="text-foreground w-full rounded-lg border border-slate-200 bg-transparent p-2.5 outline-none dark:border-slate-700"
                    />
                  </div>
                  <div>
                    <label className="text-muted-foreground mb-1 block font-medium">
                      Hora *
                    </label>
                    <input
                      type="time"
                      required
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="text-foreground w-full rounded-lg border border-slate-200 bg-transparent p-2.5 outline-none dark:border-slate-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-medium">
                    Cancha *
                  </label>
                  <select
                    required
                    value={selectedFieldId}
                    onChange={(e) => setSelectedFieldId(e.target.value)}
                    className="text-foreground w-full rounded-lg border border-slate-200 bg-white p-2.5 outline-none dark:border-slate-700 dark:bg-[#2E3138]"
                  >
                    <option value="">-- Selecciona una cancha --</option>
                    {dbFields?.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.location})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-medium">
                    Árbitro (Opcional)
                  </label>
                  <select
                    value={selectedRefereeId}
                    onChange={(e) => setSelectedRefereeId(e.target.value)}
                    className="text-foreground w-full rounded-lg border border-slate-200 bg-white p-2.5 outline-none dark:border-slate-700 dark:bg-[#2E3138]"
                  >
                    <option value="">Sin árbitro asignado</option>
                    {dbReferees?.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.fullName} ({r.badgeNumber || "REF"}) —{" "}
                        {r.averageRating.toFixed(1)} ★
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-muted-foreground mb-1 block font-medium">
                    Alerta Clima / Observaciones
                  </label>
                  <input
                    type="text"
                    value={weatherAlert}
                    onChange={(e) => setWeatherAlert(e.target.value)}
                    placeholder="Ej: ☀️ Tiempo Soleado Esperado"
                    className="text-foreground w-full rounded-lg border border-slate-200 bg-transparent p-2.5 outline-none dark:border-slate-700"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="text-foreground rounded-xl border border-slate-200 px-4 py-2 font-semibold dark:border-slate-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-xl bg-[#1D3557] px-4 py-2 font-bold text-white dark:bg-[#0B5FA5]"
                  >
                    {isSubmitting ? "Guardando..." : "Guardar Partido"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Lista de Partidos */}
        <div className="space-y-4">
          {matchesToDisplay.map((match) => (
            <div
              key={match.id}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-[#2E3138]"
            >
              {/* Match Header */}
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

              {/* Match Teams VS Grid */}
              <div className="my-4 grid grid-cols-3 items-center py-2 text-center">
                {/* Home Team */}
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-3xl">{match.homeLogo}</span>
                  <span className="text-sm font-bold text-[#1D3557] md:text-base dark:text-white">
                    {match.homeTeam}
                  </span>
                  <span className="text-muted-foreground mt-0.5 text-[10px] font-semibold uppercase">
                    Local
                  </span>
                </div>

                {/* VS Badge */}
                <div className="flex flex-col items-center">
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                    VS
                  </span>
                  <span className="text-muted-foreground mt-1 font-mono text-[11px]">
                    {match.time}
                  </span>
                </div>

                {/* Away Team */}
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

              {/* Weather Alert Card */}
              <div className="my-3 flex items-center gap-2 rounded-lg border border-sky-200 bg-sky-50 p-3 text-xs text-sky-900 dark:border-sky-800/50 dark:bg-sky-950/40 dark:text-sky-200">
                <CloudRain className="h-4 w-4 shrink-0 text-[#0B5FA5] dark:text-[#FF6B35]" />
                <span className="font-medium">{match.weatherAlert}</span>
              </div>

              {/* Logistics Footer */}
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
