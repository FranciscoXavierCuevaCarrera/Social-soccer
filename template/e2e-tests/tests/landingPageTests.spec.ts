import { expect, test } from "@playwright/test";

test.describe("Social Soccer landing page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has main hero heading", async ({ page }) => {
    await expect(page.getByText("El fútbol barrial")).toBeVisible();
  });

  test("registrarme link navigates to signup", async ({ page }) => {
    await page.getByRole("link", { name: "Registrarme" }).first().click();
    await page.waitForURL("**/signup");
  });

  test("dashboard button navigates to signup/app", async ({ page }) => {
    await page.getByRole("link", { name: "Ingresar al Dashboard →" }).click();
    await page.waitForURL("**/signup");
  });
});
