import { routes } from "wasp/client/router";

import type { NavigationItem } from "./NavBar";

export const marketingNavigationItems: NavigationItem[] = [
  { name: "Soluciones", to: "/#soluciones" },
  { name: "Cómo funciona", to: "/#como-funciona" },
  { name: "Plataforma", to: "/#plataforma" },
] as const;

export const socialSoccerNavigationItems: NavigationItem[] = [
  { name: "🏠 Inicio", to: routes.AppRoute.to },
  { name: "⚽ Partidos", to: routes.MatchListRoute.to },
  { name: "➕ Organizar Partido", to: routes.CreateMatchRoute.to },
  { name: "👤 Mi Perfil", to: routes.IdentityRoute.to },
  { name: "📊 Estadísticas", to: routes.StatsRoute.to },
  { name: "💳 Finanzas", to: routes.PaymentsRoute.to },
] as const;
