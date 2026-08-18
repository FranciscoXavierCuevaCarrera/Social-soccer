import ThemeToggle from "../client/components/ThemeToggle";

const solutions = [
  {
    number: "01",
    icon: "🪪",
    title: "Identidad deportiva",
    description:
      "Verifica tu identidad y mantén tu información deportiva organizada en un solo lugar.",
    accent: "from-[#0B5FA5] to-[#1678C8]",
  },
  {
    number: "02",
    icon: "⚽",
    title: "Partidos y logística",
    description:
      "Consulta tus próximos partidos, horarios, canchas y la información necesaria para cada encuentro.",
    accent: "from-[#FF6B35] to-[#F04B2F]",
  },
  {
    number: "03",
    icon: "💳",
    title: "Pagos y tickets",
    description:
      "Consulta pagos, vocalías, multas, inscripciones y tickets digitales desde una misma plataforma.",
    accent: "from-[#1D3557] to-[#274C77]",
  },
  {
    number: "04",
    icon: "📊",
    title: "Estadísticas y Fair Play",
    description:
      "Consulta goles, asistencias, tarjetas y tu evolución deportiva mediante estadísticas claras.",
    accent: "from-[#E63946] to-[#C92A38]",
  },
  {
    number: "05",
    icon: "⚖️",
    title: "Evaluación arbitral",
    description:
      "Participa en la evaluación del desempeño arbitral y contribuye a una competición más transparente.",
    accent: "from-[#E07A5F] to-[#C85C42]",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-slate-100 text-[#1D3557] transition-colors duration-300 dark:bg-[#0B1017] dark:text-white">
      {/* Fondo decorativo */}
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[500px] w-[500px] rounded-full bg-[#0B5FA5]/10 blur-3xl dark:bg-[#0B5FA5]/20" />
        <div className="absolute right-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-[#FF6B35]/10 blur-3xl dark:bg-[#FF6B35]/10" />
        <div className="absolute bottom-[-200px] left-[30%] h-[450px] w-[450px] rounded-full bg-[#E63946]/10 blur-3xl dark:bg-[#E63946]/10" />

        <div
          className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(#1D3557 1px, transparent 1px), linear-gradient(90deg, #1D3557 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-[#0B1017]/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B5FA5] text-xl shadow-lg shadow-[#0B5FA5]/20">
              ⚽
            </div>

            <div>
              <div className="text-xl font-black tracking-tight text-[#1D3557] dark:text-white">
                Social
                <span className="text-[#0B5FA5] dark:text-[#FF6B35]">
                  Soccer
                </span>
              </div>

              <div className="hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500 sm:block dark:text-slate-400">
                Fútbol · Tecnología · Comunidad
              </div>
            </div>
          </a>

          {/* Menú */}
          <nav className="hidden items-center gap-8 md:flex">
            <a
              href="#inicio"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0B5FA5] dark:text-slate-300 dark:hover:text-[#FF6B35]"
            >
              Inicio
            </a>

            <a
              href="#soluciones"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0B5FA5] dark:text-slate-300 dark:hover:text-[#FF6B35]"
            >
              Soluciones
            </a>

            <a
              href="#como-funciona"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0B5FA5] dark:text-slate-300 dark:hover:text-[#FF6B35]"
            >
              Cómo funciona
            </a>

            <a
              href="#plataforma"
              className="text-sm font-semibold text-slate-600 transition hover:text-[#0B5FA5] dark:text-slate-300 dark:hover:text-[#FF6B35]"
            >
              Plataforma
            </a>
          </nav>

          {/* Acciones */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <a
              href="/login"
              className="hidden rounded-xl px-4 py-2 text-sm font-bold text-[#1D3557] transition hover:bg-slate-100 sm:block dark:text-white dark:hover:bg-white/10"
            >
              Iniciar sesión
            </a>

            <a
              href="/signup"
              className="rounded-xl bg-[#E63946] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#E63946]/20 transition hover:-translate-y-0.5 hover:bg-[#cf3040]"
            >
              Registrarme
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        {/* HERO */}
        <section
          id="inicio"
          className="mx-auto max-w-7xl px-5 pb-20 pt-14 lg:px-8 lg:pb-28 lg:pt-20"
        >
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
            {/* Texto */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0B5FA5]/20 bg-[#0B5FA5]/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#0B5FA5] dark:border-[#0B5FA5]/40 dark:bg-[#0B5FA5]/10 dark:text-[#5AA9E6]">
                <span className="h-2 w-2 rounded-full bg-[#FF6B35] shadow-[0_0_10px_#FF6B35]" />
                Plataforma digital para ligas barriales
              </div>

              <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-[#1D3557] sm:text-6xl lg:text-7xl dark:text-white">
                El fútbol barrial,
                <span className="block text-[#0B5FA5] dark:text-[#FF6B35]">
                  conectado.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 sm:text-xl dark:text-slate-300">
                SocialSoccer centraliza la identidad deportiva, los partidos, la
                logística, los pagos y el rendimiento de los jugadores en una
                sola plataforma.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="/signup"
                  className="rounded-xl bg-[#0B5FA5] px-7 py-3.5 text-center text-sm font-extrabold text-white shadow-xl shadow-[#0B5FA5]/25 transition hover:-translate-y-1 hover:bg-[#094F89] dark:bg-[#0B5FA5] dark:hover:bg-[#1678C8]"
                >
                  Comenzar ahora →
                </a>

                <a
                  href="#soluciones"
                  className="rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-center text-sm font-extrabold text-[#1D3557] transition hover:-translate-y-1 hover:border-[#0B5FA5]/40 hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
                >
                  Conocer la plataforma
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="text-[#FF6B35]">✓</span>
                  Identidad digital
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-[#FF6B35]">✓</span>
                  Gestión de partidos
                </span>

                <span className="flex items-center gap-2">
                  <span className="text-[#FF6B35]">✓</span>
                  Estadísticas
                </span>
              </div>
            </div>

            {/* Panel visual */}
            <div className="relative">
              <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-[#0B5FA5]/20 via-transparent to-[#FF6B35]/20 blur-2xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/10 dark:border-white/10 dark:bg-[#171C24] dark:shadow-black/40">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Mi actividad
                    </p>

                    <h2 className="mt-1 text-xl font-black text-[#1D3557] dark:text-white">
                      Próximo partido
                    </h2>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    ● Confirmado
                  </span>
                </div>

                <div className="rounded-2xl bg-gradient-to-br from-[#0B5FA5] to-[#1D3557] p-5 text-white shadow-lg">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-white/60">
                        Próximo encuentro
                      </p>

                      <h3 className="mt-2 text-2xl font-black">Cancha 1</h3>

                      <p className="mt-1 text-sm text-white/70">
                        Liga Barrial · Partido programado
                      </p>
                    </div>

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl backdrop-blur">
                      ⚽
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/10 p-3">
                      <p className="text-[10px] font-bold uppercase text-white/50">
                        Fecha
                      </p>

                      <p className="mt-1 font-bold">Próximo partido</p>
                    </div>

                    <div className="rounded-xl bg-white/10 p-3">
                      <p className="text-[10px] font-bold uppercase text-white/50">
                        Jugadores
                      </p>

                      <p className="mt-1 font-bold">8 / 10</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#20252D]">
                    <div className="text-xl">⚽</div>

                    <p className="mt-2 text-2xl font-black text-[#1D3557] dark:text-white">
                      8
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Goles
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#20252D]">
                    <div className="text-xl">👟</div>

                    <p className="mt-2 text-2xl font-black text-[#1D3557] dark:text-white">
                      5
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Asistencias
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-[#20252D]">
                    <div className="text-xl">⭐</div>

                    <p className="mt-2 text-2xl font-black text-[#FF6B35]">
                      92
                    </p>

                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Fair Play
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between rounded-xl border border-[#FF6B35]/20 bg-[#FF6B35]/5 px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FF6B35]/10">
                      📍
                    </div>

                    <div>
                      <p className="text-xs font-bold text-slate-400">
                        Ubicación
                      </p>

                      <p className="text-sm font-bold text-[#1D3557] dark:text-white">
                        Cancha deportiva
                      </p>
                    </div>
                  </div>

                  <span className="text-[#FF6B35]">→</span>
                </div>

                {/* Badge integrado dentro del panel */}
                <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-[#20252D]">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      SOCIALSOCCER
                    </p>

                    <p className="mt-1 text-sm font-black text-[#1D3557] dark:text-white">
                      Tu fútbol, conectado.
                    </p>
                  </div>

                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#0B5FA5]/10 text-sm dark:bg-[#FF6B35]/10">
                    ⚽
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SOLUCIONES */}
        <section
          id="soluciones"
          className="border-y border-slate-200/70 bg-white/70 py-20 dark:border-white/5 dark:bg-[#11161E]/70"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF6B35]">
                Soluciones
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1D3557] sm:text-5xl dark:text-white">
                Todo lo que necesitas para gestionar tu actividad deportiva.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                Una plataforma pensada para conectar jugadores, equipos y ligas
                barriales alrededor de la información que realmente necesitan.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {solutions.map((solution) => (
                <article
                  key={solution.number}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-white/10 dark:bg-[#1A2028]"
                >
                  <div
                    className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${solution.accent}`}
                  />

                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-2xl transition group-hover:scale-110 dark:bg-[#252B34]">
                      {solution.icon}
                    </div>

                    <span className="text-xs font-black tracking-widest text-slate-300 dark:text-slate-600">
                      {solution.number}
                    </span>
                  </div>

                  <h3 className="mt-6 text-xl font-black text-[#1D3557] dark:text-white">
                    {solution.title}
                  </h3>

                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-400">
                    {solution.description}
                  </p>

                  <div className="mt-6 text-sm font-bold text-[#0B5FA5] transition group-hover:translate-x-1 dark:text-[#FF6B35]">
                    Descubrir más →
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* COMO FUNCIONA */}
        <section
          id="como-funciona"
          className="mx-auto max-w-7xl px-5 py-20 lg:px-8"
        >
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF6B35]">
                Cómo funciona
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#1D3557] sm:text-5xl dark:text-white">
                Una experiencia más simple para el jugador.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
                SocialSoccer reúne en un mismo ecosistema la información que
                normalmente se encuentra dispersa entre equipos, ligas y
                jugadores.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  number: "01",
                  title: "Verifica tu identidad",
                  text: "Completa y consulta tu registro e información deportiva.",
                },
                {
                  number: "02",
                  title: "Consulta tus partidos",
                  text: "Revisa tus próximos encuentros, horarios, canchas y logística.",
                },
                {
                  number: "03",
                  title: "Gestiona tu actividad",
                  text: "Consulta pagos, tickets, estadísticas y evaluaciones desde un solo lugar.",
                },
              ].map((step) => (
                <div
                  key={step.number}
                  className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1A2028]"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0B5FA5] font-black text-white">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-black text-[#1D3557] dark:text-white">
                      {step.title}
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PLATAFORMA */}
        <section id="plataforma" className="px-5 pb-20 lg:px-8">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#1D3557] p-8 text-white shadow-2xl sm:p-12 lg:p-16 dark:bg-[#171C24] dark:ring-1 dark:ring-white/10">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-[#FF6B35]">
                  Una plataforma deportiva
                </p>

                <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">
                  Tu información deportiva, siempre a mano.
                </h2>

                <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
                  Desde tu identidad hasta tus estadísticas, SocialSoccer
                  convierte la gestión del fútbol barrial en una experiencia
                  digital más clara y organizada.
                </p>

                <a
                  href="/signup"
                  className="mt-8 inline-flex rounded-xl bg-[#FF6B35] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:bg-[#F4511E]"
                >
                  Empezar con SocialSoccer →
                </a>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl">🪪</div>

                  <p className="mt-4 font-black">Identidad</p>

                  <p className="mt-1 text-sm text-white/60">
                    Registro deportivo digital
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl">⚽</div>

                  <p className="mt-4 font-black">Partidos</p>

                  <p className="mt-1 text-sm text-white/60">
                    Calendario y logística
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl">💳</div>

                  <p className="mt-4 font-black">Pagos</p>

                  <p className="mt-1 text-sm text-white/60">
                    Finanzas y tickets
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="text-3xl">📈</div>

                  <p className="mt-4 font-black">Rendimiento</p>

                  <p className="mt-1 text-sm text-white/60">
                    Estadísticas y Fair Play
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-4xl px-5 pb-24 pt-4 text-center lg:px-8">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-[#1A2028]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#0B5FA5] text-2xl shadow-lg shadow-[#0B5FA5]/20">
              ⚽
            </div>

            <h2 className="mt-6 text-3xl font-black tracking-tight text-[#1D3557] sm:text-4xl dark:text-white">
              Tu fútbol, conectado.
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
              Forma parte de una experiencia deportiva más organizada,
              transparente y conectada.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href="/signup"
                className="rounded-xl bg-[#E63946] px-7 py-3.5 text-sm font-black text-white shadow-lg shadow-[#E63946]/20 transition hover:-translate-y-1 hover:bg-[#cf3040]"
              >
                Crear mi cuenta
              </a>

              <a
                href="/login"
                className="rounded-xl border border-slate-300 px-7 py-3.5 text-sm font-black text-[#1D3557] transition hover:bg-slate-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
              >
                Ya tengo una cuenta
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white dark:border-white/10 dark:bg-[#0B1017]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⚽</span>

              <span className="font-black text-[#1D3557] dark:text-white">
                SocialSoccer
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500 dark:text-slate-500">
              Plataforma Digital de Ligas Barriales
            </p>
          </div>

          <div className="flex flex-wrap gap-5 text-xs font-semibold text-slate-500 dark:text-slate-400">
            <a href="#inicio" className="hover:text-[#0B5FA5]">
              Inicio
            </a>

            <a href="#soluciones" className="hover:text-[#0B5FA5]">
              Soluciones
            </a>

            <a href="#como-funciona" className="hover:text-[#0B5FA5]">
              Cómo funciona
            </a>

            <a href="#plataforma" className="hover:text-[#0B5FA5]">
              Plataforma
            </a>
          </div>

          <p className="text-xs text-slate-400">© 2026 SocialSoccer</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
