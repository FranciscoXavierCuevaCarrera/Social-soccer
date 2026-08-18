import { useEffect, useMemo } from "react";
import { Outlet, useLocation } from "react-router";
import { routes } from "wasp/client/router";
import { Toaster } from "../client/components/ui/toaster";
import "./Main.css";
import { NavBar } from "./components/NavBar/NavBar";
import {
  marketingNavigationItems,
  socialSoccerNavigationItems,
} from "./components/NavBar/constants";
import { CookieConsentBanner } from "./components/cookie-consent/Banner";

/**
 * Componente raíz de la aplicación.
 *
 * La Landing de Social Soccer utiliza la navegación pública de marketing.
 * Las páginas de la aplicación utilizan la navegación de Social Soccer.
 */
export function App() {
  const location = useLocation();

  const isLandingPage = useMemo(() => {
    return location.pathname === routes.LandingPageRoute.to;
  }, [location]);

  const navigationItems = isLandingPage
    ? marketingNavigationItems
    : socialSoccerNavigationItems;

  const shouldDisplayAppNavBar = useMemo(() => {
    return (
      !isLandingPage &&
      location.pathname !== routes.LoginRoute.build() &&
      location.pathname !== routes.SignupRoute.build()
    );
  }, [location, isLandingPage]);

  const isAdminDashboard = useMemo(() => {
    return location.pathname.startsWith(routes.AdminRoute.to);
  }, [location]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);

      if (element) {
        element.scrollIntoView();
      }
    }
  }, [location]);

  return (
    <>
      <div className="bg-background text-foreground min-h-screen">
        {isAdminDashboard ? (
          <Outlet />
        ) : (
          <>
            {shouldDisplayAppNavBar && (
              <NavBar navigationItems={navigationItems} />
            )}

            <div className="max-w-(--breakpoint-2xl) mx-auto">
              <Outlet />
            </div>
          </>
        )}
      </div>

      <Toaster position="bottom-right" />
      <CookieConsentBanner />
    </>
  );
}
