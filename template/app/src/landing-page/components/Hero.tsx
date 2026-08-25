import { Link as WaspRouterLink, routes } from "wasp/client/router";
import { Button } from "../../client/components/ui/button";

export function Hero() {
  return (
    <div className="relative w-full overflow-hidden pt-14">
      <TopGradient />
      <BottomGradient />

      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center rounded-full border border-[#1D3557]/20 bg-[#1D3557]/5 px-4 py-2 text-sm font-semibold text-[#1D3557] dark:border-[#FF6B35]/30 dark:bg-[#FF6B35]/10 dark:text-[#FF6B35]">
            ⚽ La comunidad del fútbol amateur
          </div>

          <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Vive el fútbol.
            <span className="text-gradient-primary block">
              Organiza. Juega. Compite.
            </span>
          </h1>

          <p className="text-muted-foreground mx-auto mt-6 max-w-3xl text-lg leading-8 sm:text-xl">
            Social Soccer conecta jugadores, partidos, canchas, árbitros y
            estadísticas en un solo lugar para hacer que cada encuentro sea más
            fácil de organizar y disfrutar.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="default" asChild>
              <WaspRouterLink to={routes.SignupRoute.to}>
                Crear mi cuenta <span aria-hidden="true">→</span>
              </WaspRouterLink>
            </Button>

            <Button size="lg" variant="outline" asChild>
              <WaspRouterLink to={routes.MatchListRoute.to}>
                ⚽ Ver partidos
              </WaspRouterLink>
            </Button>
          </div>

          <div className="mt-14 grid gap-4 text-left sm:grid-cols-3">
            <FeatureCard
              icon="⚽"
              title="Partidos"
              description="Encuentra encuentros, consulta detalles y reserva tu lugar."
            />

            <FeatureCard
              icon="🟨"
              title="Árbitros"
              description="Consulta árbitros y evalúa su desempeño después de cada partido."
            />

            <FeatureCard
              icon="📊"
              title="Estadísticas"
              description="Sigue tu rendimiento y la evolución de tu juego."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white/80 p-5 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-[#2E3138]/80">
      <div className="mb-3 text-2xl">{icon}</div>

      <h2 className="text-base font-bold text-[#1D3557] dark:text-white">
        {title}
      </h2>

      <p className="text-muted-foreground mt-2 text-sm leading-6">
        {description}
      </p>
    </div>
  );
}

function TopGradient() {
  return (
    <div
      className="absolute right-0 top-0 -z-10 w-full transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        className="aspect-1020/880 w-280 bg-linear-to-tr relative left-1/2 -translate-x-1/2 from-[#1D3557] to-[#FF6B35] opacity-10 sm:left-1/4 sm:translate-x-1/2"
        style={{
          clipPath:
            "polygon(80% 20%, 90% 55%, 50% 100%, 70% 30%, 20% 50%, 50% 0)",
        }}
      />
    </div>
  );
}

function BottomGradient() {
  return (
    <div
      className="absolute inset-x-0 top-[calc(100%-40rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      aria-hidden="true"
    >
      <div
        className="aspect-1020/880 w-360 bg-linear-to-br relative left-1/2 -translate-x-1/2 from-[#FF6B35] to-[#1D3557] opacity-10 sm:-left-1/4 sm:translate-x-0"
        style={{
          clipPath: "ellipse(80% 30% at 80% 50%)",
        }}
      />
    </div>
  );
}
