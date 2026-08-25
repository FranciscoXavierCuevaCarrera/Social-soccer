import { expect, test } from "@playwright/test";

test.describe("Social Soccer landing page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has Social Soccer title", async ({ page }) => {
    await expect(page).toHaveTitle(/Social Soccer/i);
  });

  test("allows user to register", async ({ page }) => {
    await page.getByRole("link", { name: "Registrarme" }).click();

    await page.waitForURL("**/signup");

    await expect(page).toHaveURL(/\/signup$/);
  });

  test("allows user to start from hero", async ({ page }) => {
    await page.getByRole("link", { name: /Comenzar ahora/i }).click();

    await page.waitForURL("**/signup");

    await expect(page).toHaveURL(/\/signup$/);
  });

  test("shows Social Soccer navigation sections", async ({ page }) => {
    const navigation = page.getByRole("navigation");

    await expect(
      navigation.getByRole("link", { name: "Soluciones" }),
    ).toBeVisible();

    await expect(
      navigation.getByRole("link", { name: "Cómo funciona" }),
    ).toBeVisible();

    await expect(
      navigation.getByRole("link", { name: "Plataforma" }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", { name: "El fútbol barrial, conectado." }),
    ).toBeVisible();
  });
});
