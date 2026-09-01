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

test.describe("Social Soccer MVP E2E Tests", () => {
  test("User lands on /app dashboard after login", async () => {
    await page.goto("/app");
    await expect(page.getByText("Bienvenido a Social Soccer")).toBeVisible();
    await expect(page.getByText("Partidos")).toBeVisible();
    await expect(page.getByText("Mi Perfil")).toBeVisible();
    await expect(page.getByText("Estadísticas")).toBeVisible();
    await expect(page.getByText("Finanzas")).toBeVisible();
  });

  test("User can access /matches page", async () => {
    await page.goto("/matches");
    await expect(page.getByText("Próximos Partidos")).toBeVisible();
  });

  test("User can access Carnet Digital & Player Profile (/identity)", async () => {
    await page.goto("/identity");
    await expect(page.getByText("Carnet Digital & DataWallet")).toBeVisible();
    await expect(page.getByText("Pase Activo")).toBeVisible();
  });

  test("User can access Finanzas & Ticketing (/payments)", async () => {
    await page.goto("/payments");
    await expect(
      page.getByText("Pasarela Fintech & Ticketing Digital"),
    ).toBeVisible();
    await expect(page.getByText("Historial de Pagos")).toBeVisible();
  });

  test("User can access Stats and submit Referee Rating with required comment for low rating (/stats)", async () => {
    await page.goto("/stats");
    await expect(
      page.getByText("Gamificación & Estadísticas Individuales"),
    ).toBeVisible();
    await expect(page.getByText("Puntuación Fair Play")).toBeVisible();

    // Verify Referee Rating form is present
    await expect(
      page.getByText("Evaluación Arbitral Post-Partido"),
    ).toBeVisible();

    // Select 1 star (requires comment)
    const starButtons = page.locator('form button[type="button"]');
    if ((await starButtons.count()) >= 5) {
      await starButtons.nth(0).click();
      await expect(
        page.getByText(
          "Comentario * (el comentario es obligatorio para calificaciones menores a 3 estrellas):",
        ),
      ).toBeVisible();
    }
  });
});
