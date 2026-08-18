import {
  BarChart3,
  CalendarDays,
  CreditCard,
  PlusCircle,
  UserCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "wasp/client/auth";
import { routes } from "wasp/client/router";

const appSections = [
  {
    title: "Partidos",
    description: "Consulta tus próximos partidos y toda su logística.",
    icon: CalendarDays,
    to: routes.MatchListRoute.to,
  },
  {
    title: "Organizar Partido",
    description: "Crea y gestiona un nuevo partido.",
    icon: PlusCircle,
    to: routes.CreateMatchRoute.to,
  },
  {
    title: "Mi Perfil",
    description: "Consulta y administra tu información de jugador.",
    icon: UserCircle,
    to: routes.IdentityRoute.to,
  },
  {
    title: "Estadísticas",
    description: "Revisa tu rendimiento y evolución como jugador.",
    icon: BarChart3,
    to: routes.StatsRoute.to,
  },
  {
    title: "Finanzas",
    description: "Consulta tus pagos y movimientos relacionados.",
    icon: CreditCard,
    to: routes.PaymentsRoute.to,
  },
];

export function AppPage() {
  const { data: user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user?.isAdmin) {
      navigate(routes.AdminRoute.to, { replace: true });
    }
  }, [isLoading, user, navigate]);

  if (isLoading || user?.isAdmin) {
    return null;
  }

  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 md:py-12">
        <section className="mb-10">
          <p className="text-sm font-semibold tracking-wide text-[#FF6B35]">
            SOCIAL SOCCER
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
            Bienvenido a Social Soccer
          </h1>

          <p className="text-muted-foreground mt-3 max-w-2xl">
            Este es tu centro de operaciones. Desde aquí puedes acceder a tus
            partidos, organizar encuentros, consultar tus estadísticas y
            gestionar tu perfil y finanzas.
          </p>
        </section>

        <section
          aria-label="Módulos de Social Soccer"
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {appSections.map((section) => {
            const Icon = section.icon;

            return (
              <Link
                key={section.title}
                to={section.to}
                className="bg-card group rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#1D3557] text-white transition-colors duration-200 group-hover:bg-[#FF6B35]">
                  <Icon className="h-6 w-6" />
                </div>

                <h2 className="text-lg font-bold">{section.title}</h2>

                <p className="text-muted-foreground mt-2 text-sm leading-6">
                  {section.description}
                </p>
              </Link>
            );
          })}
        </section>
      </div>
    </main>
  );
}

export default AppPage;
