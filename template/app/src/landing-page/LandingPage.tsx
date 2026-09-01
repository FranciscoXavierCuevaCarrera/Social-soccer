import ThemeToggle from "../client/components/ThemeToggle";

const mainFeatures = [
  {
    icon: "⚽",
    title: "Partidos & Logística",
    description: "Creación, horarios, canchas y convocatorias en tiempo real.",
    color: "from-[#0B5FA5] to-[#1678C8]",
  },
  {
    icon: "🪪",
    title: "Jugadores & Carnet",
    description: "Identidad deportiva digital y código QR único de jugador.",
    color: "from-[#FF6B35] to-[#F04B2F]",
  },
  {
    icon: "⚖️",
    title: "Árbitros & Fair Play",
    description:
      "Asignación de jueces y evaluaciones arbitrales transparentes.",
    color: "from-[#1D3557] to-[#274C77]",
  },
  {
    icon: "💳",
    title: "Estadísticas & Finanzas",
    description:
      "Historial de pagos, tickets digitales y métricas de rendimiento.",
    color: "from-[#E63946] to-[#C92A38]",
  },
];

const steps = [
  {
    step: "1",
    title: "Regístrate en segundos",
    description: "Crea tu cuenta de jugador de forma rápida y sencilla.",
  },
  {
    step: "2",
    title: "Encuentra tu partido",
    description:
      "Consulta próximos encuentros o crea el tuyo en tu cancha habitual.",
  },
  {
    step: "3",
    title: "Controla tu rendimiento",
    description:
      "Sigue tus estadísticas, evalúa árbitros y gestiona tus pagos.",
  },
];

export function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-[#1D3557] transition-colors duration-300 dark:bg-[#0B1017] dark:text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-white/10 dark:bg-[#0B1017]/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0B5FA5] text-lg text-white shadow-md">
              ⚽
            </div>
            <span className="text-lg font-black tracking-tight text-[#1D3557] dark:text-white">
              Social<span className="text-[#FF6B35]">Soccer</span>
            </span>
          </a>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="/login"
              className="px-3 py-2 text-xs font-bold text-[#1D3557] hover:underline dark:text-white"
            >
              Iniciar sesión
            </a>
            <a
              href="/signup"
              className="rounded-xl bg-[#E63946] px-4 py-2 text-xs font-bold text-white shadow-md transition-all hover:bg-[#cf3040]"
            >
              Registrarme
            </a>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        {/* 1. HERO */}
        <section className="py-8 text-center sm:py-14">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-[#0B5FA5]/20 bg-[#0B5FA5]/10 px-3.5 py-1.5 text-xs font-bold text-[#0B5FA5] dark:border-[#FF6B35]/30 dark:bg-[#FF6B35]/10 dark:text-[#FF6B35]">
            <span>⚽</span> Ecosistema Digital para Fútbol Barrial
          </div>

          <h1 className="mx-auto max-w-3xl text-3xl font-black leading-tight tracking-tight text-[#1D3557] sm:text-5xl lg:text-6xl dark:text-white">
            El fútbol barrial,{" "}
            <span className="text-[#0B5FA5] dark:text-[#FF6B35]">
              conectado.
            </span>
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
            Centraliza tus partidos, jugadores, árbitros, estadísticas y
            finanzas en una sola plataforma rápida y fácil de usar.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="/signup"
              className="w-full rounded-xl bg-[#0B5FA5] px-7 py-3.5 text-center text-sm font-extrabold text-white shadow-lg transition-all hover:bg-[#094F89] sm:w-auto dark:bg-[#FF6B35] dark:hover:bg-[#f05a24]"
            >
              Ingresar al Dashboard →
            </a>
            <a
              href="#problema"
              className="w-full rounded-xl border border-slate-300 bg-white px-7 py-3.5 text-center text-sm font-bold text-[#1D3557] hover:bg-slate-100 sm:w-auto dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              Ver Funcionalidades
            </a>
          </div>
        </section>

        {/* 2. QUÉ PROBLEMA RESUELVE */}
        <section
          id="problema"
          className="my-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-[#151B24]"
        >
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B35]">
              Gestión Integral
            </span>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#1D3557] sm:text-3xl dark:text-white">
              Di adiós al desorden en grupos de chat
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-xs leading-relaxed text-slate-600 sm:text-sm dark:text-slate-300">
              Social Soccer elimina la dispersión de información organizando
              cada aspecto de tu comunidad deportiva en un único lugar accesible
              desde tu teléfono.
            </p>
          </div>
        </section>

        {/* 3. 4 FUNCIONALIDADES PRINCIPALES */}
        <section className="my-12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black text-[#1D3557] sm:text-3xl dark:text-white">
              Todo lo que necesitas en el campo
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {mainFeatures.map((feat) => (
              <div
                key={feat.title}
                className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-[#151B24]"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl dark:bg-slate-800">
                  {feat.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1D3557] dark:text-white">
                    {feat.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. CÓMO FUNCIONA */}
        <section className="my-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10 dark:border-slate-800 dark:bg-[#151B24]">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-black text-[#1D3557] sm:text-3xl dark:text-white">
              ¿Cómo funciona?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {steps.map((st) => (
              <div key={st.step} className="text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#0B5FA5] font-black text-white dark:bg-[#FF6B35]">
                  {st.step}
                </div>
                <h3 className="text-sm font-bold text-[#1D3557] dark:text-white">
                  {st.title}
                </h3>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {st.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CTA FINAL */}
        <section className="my-12 rounded-2xl bg-[#1D3557] p-8 text-center text-white shadow-xl dark:bg-[#1A2332]">
          <h2 className="text-2xl font-black sm:text-3xl">
            ¿Listo para organizar tus partidos?
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-xs text-slate-300 sm:text-sm">
            Únete a la comunidad de Social Soccer y lleva tu fútbol al siguiente
            nivel.
          </p>

          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href="/signup"
              className="rounded-xl bg-[#E63946] px-6 py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-[#cf3040]"
            >
              Crear Cuenta Gratis
            </a>
            <a
              href="/login"
              className="rounded-xl border border-white/20 px-6 py-3 text-xs font-bold text-white hover:bg-white/10"
            >
              Iniciar Sesión
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-[#0B1017]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 text-xs text-slate-500">
          <span>⚽ SocialSoccer MVP © 2026</span>
          <a href="/login" className="hover:underline">
            Acceso
          </a>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
