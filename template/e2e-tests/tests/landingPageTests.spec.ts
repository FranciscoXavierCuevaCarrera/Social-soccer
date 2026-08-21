import { expect, test } from "@playwright/test";

test.describe("Social Soccer landing page tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/SaaS|Social/);
  });

  test("get started link", async ({ page }) => {
    await page.getByRole("link", { name: "Get Started" }).click();
    await page.waitForURL("**/signup");
  });

  test("ver partidos link", async ({ page }) => {
    await page.getByRole("link", { name: "Ver Partidos" }).click();
    await page.waitForURL("**/matches");
  });

  test("headings and navigation", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Frequently asked questions" }),
    ).toBeVisible();
  });
});
