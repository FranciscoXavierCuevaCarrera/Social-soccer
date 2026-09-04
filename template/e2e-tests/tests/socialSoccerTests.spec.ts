import { expect, test, type Page } from "@playwright/test";
import { createRandomUser, logUserIn, signUserUp, type User } from "./utils";

let page: Page;
let testUser: User;

test.describe.configure({
  mode: "serial",
  timeout: 120_000,
});

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  testUser = createRandomUser();
  await signUserUp({ page, user: testUser });
  await logUserIn({ page, user: testUser });
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Social Soccer MVP E2E Tests", () => {
  test("User lands on /app dashboard after login", async () => {
    await page.goto("/app");

    await expect(page.getByText("Bienvenido a Social Soccer")).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Partidos", exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Mi Perfil", exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Estadísticas", exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "Finanzas", exact: true }),
    ).toBeVisible();
  });

  test("User can access /matches page", async () => {
    await page.goto("/matches");

    await expect(page.getByText("Próximos Partidos")).toBeVisible();
  });

  test("User can access Carnet Digital & Player Profile (/identity)", async () => {
    await page.goto("/identity");

    await expect(
      page.getByRole("heading", {
        name: "DataWallet — Carnet Digital",
        exact: true,
      }),
    ).toBeVisible();

    await expect(page.getByText("Pase Autonómico Habilitado")).toBeVisible();
  });

  test("User can access Finanzas & Ticketing (/payments)", async () => {
    await page.goto("/payments");

    await expect(
      page.getByRole("heading", {
        name: "Fintech & Ticketing Digital",
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Historial Transaccional Transparente",
        exact: true,
      }),
    ).toBeVisible();
  });

  test("User can access Stats and submit Referee Rating with required comment for low rating (/stats)", async () => {
    await page.goto("/stats");

    await expect(
      page.getByRole("heading", {
        name: "Gamificación & Estadísticas Individuales",
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Puntuación Fair Play (Juego Limpio)",
        exact: true,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: "Evaluación Arbitral Post-Partido",
        exact: true,
      }),
    ).toBeVisible();

    const starButtons = page
      .locator('form button[type="button"]')
      .filter({ has: page.locator("svg") });

    await expect(starButtons).toHaveCount(5);

    await starButtons.nth(0).click();

    await expect(
      page.getByText(
        "Comentario * (el comentario es obligatorio para calificaciones menores a 3 estrellas):",
        { exact: true },
      ),
    ).toBeVisible();
  });
});
