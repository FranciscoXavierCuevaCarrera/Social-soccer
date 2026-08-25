import { expect, test, type Page } from "@playwright/test";

import { createRandomUser, logUserIn, signUserUp, type User } from "./utils";

let page: Page;
let testUser: User;

test.describe.configure({ mode: "serial" });

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();

  testUser = createRandomUser();

  await signUserUp({ page, user: testUser });
  await logUserIn({ page, user: testUser });
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Social Soccer MVP E2E tests", () => {
  test("authenticated user can access the dashboard", async () => {
    await page.goto("/app");

    await expect(page).toHaveURL(/\/app$/);
  });

  test("user can access the matches page", async () => {
    await page.goto("/matches");

    await expect(
      page.getByRole("heading", { name: "Próximos Partidos" }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", { name: "⚽ Organizar Partido" }),
    ).toBeVisible();
  });

  test("user can create a match", async () => {
    await page.goto("/matches/create");

    await expect(
      page.getByRole("heading", { name: "Crear Nuevo Partido" }),
    ).toBeVisible();

    const location = `Cancha E2E ${Date.now()}`;

    await page.fill(
      'input[placeholder="Ej: Complejo Deportivo San Pedro - Cancha 2"]',
      location,
    );

    await page.fill('input[type="datetime-local"]', "2026-09-01T16:00");

    await page.fill('input[type="number"]', "10");

    const refereeSelect = page.locator("select");

    if ((await refereeSelect.locator("option").count()) > 1) {
      await refereeSelect.selectOption({ index: 1 });
    }

    await page.getByRole("button", { name: "Publicar Partido" }).click();

    await page.waitForURL(/\/matches\/[^/]+$/);

    await expect(page.getByRole("heading", { name: location })).toBeVisible();
  });

  test("user can access identity profile", async () => {
    await page.goto("/identity");

    await expect(page).toHaveURL(/\/identity$/);
  });

  test("user can access payments", async () => {
    await page.goto("/payments");

    await expect(page).toHaveURL(/\/payments$/);
  });

  test("user can access statistics and referee rating", async () => {
    await page.goto("/stats");

    await expect(page).toHaveURL(/\/stats$/);

    await expect(
      page.getByText("Evaluación Arbitral Post-Partido"),
    ).toBeVisible();
  });
});
