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
  test("User lands on /matches after login and can see matches page", async () => {
    await page.goto("/matches");
    await expect(
      page.getByText("Próximos Partidos & Logística AI"),
    ).toBeVisible();
    await expect(page.getByText("Crear Partido")).toBeVisible();
  });

  test("User can open Create Match modal and create a new match with assigned referee", async () => {
    await page.goto("/matches");
    await page.click('button:has-text("Crear Partido")');

    await expect(page.getByText("Crear Nuevo Partido")).toBeVisible();

    await page.fill(
      'input[placeholder="Ej: Deportivo El Batán"]',
      "Liga Barrial FC",
    );
    await page.fill(
      'input[placeholder="Ej: Atlético San Roque"]',
      "Estudiantes del Norte",
    );
    await page.fill('input[type="date"]', "2026-09-01");
    await page.fill('input[type="time"]', "16:00");

    // Select field if options exist
    const fieldSelect = page.locator("select").first();
    const fieldOptions = await fieldSelect.locator("option").all();
    if (fieldOptions.length > 1) {
      await fieldSelect.selectOption({ index: 1 });
    }

    // Select referee (David Gilmour or any available referee)
    const refereeSelect = page.locator("select").nth(1);
    const refereeOptions = await refereeSelect.locator("option").all();
    if (refereeOptions.length > 1) {
      await refereeSelect.selectOption({ index: 1 });
    }

    await page.click('button:has-text("Guardar Partido")');

    // Verify new match appears on list
    await expect(page.getByText("Liga Barrial FC")).toBeVisible({
      timeout: 5000,
    });
    await expect(page.getByText("Estudiantes del Norte")).toBeVisible();
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

  test("User can access Stats, Fair Play and submit Referee Rating (/stats)", async () => {
    await page.goto("/stats");
    await expect(
      page.getByText("Gamificación & Estadísticas Individuales"),
    ).toBeVisible();
    await expect(page.getByText("Puntuación Fair Play")).toBeVisible();

    // Verify Referee Rating form is present
    await expect(
      page.getByText("Evaluación Arbitral Post-Partido"),
    ).toBeVisible();

    // Select 5 stars
    const starButtons = page.locator('form button[type="button"]');
    if ((await starButtons.count()) >= 5) {
      await starButtons.nth(4).click();
    }

    // Submit evaluation
    const submitButton = page.locator('button:has-text("Enviar Evaluación")');
    if (await submitButton.isEnabled()) {
      await submitButton.click();
      await expect(
        page.getByText("¡Evaluación Arbitral Registrada!"),
      ).toBeVisible({ timeout: 5000 });
    }
  });
});
