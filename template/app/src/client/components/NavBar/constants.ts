import { routes } from "wasp/client/router";
import { BlogUrl, DocsUrl } from "../../../shared/common";
import type { NavigationItem } from "./NavBar";

const staticNavigationItems: NavigationItem[] = [
  { name: "Documentation", to: DocsUrl },
  { name: "Blog", to: BlogUrl },
];

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Features", to: "/#features" },
  { name: "Finanzas & Ticketing", to: routes.PaymentsRoute.to },
  ...staticNavigationItems,
] as const;

export const socialSoccerNavigationItems: NavigationItem[] = [
  { name: "🏠 Inicio", to: routes.AppRoute.to },
  { name: "⚽ Partidos", to: routes.MatchListRoute.to },
  { name: "➕ Organizar Partido", to: routes.CreateMatchRoute.to },
  { name: "👤 Mi Perfil", to: routes.IdentityRoute.to },
  { name: "📊 Estadísticas", to: routes.StatsRoute.to },
  { name: "💳 Finanzas", to: routes.PaymentsRoute.to },
] as const;