import { expect, test } from "@playwright/test";

test.describe("Social Soccer - Landing Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("muestra el título de Social Soccer", async ({ page }) => {
    await expect(page).toHaveTitle(/Social Soccer/i);
  });

  test("muestra el contenido principal de Social Soccer", async ({ page }) => {
    await expect(
      page.getByText("SOCIAL SOCCER", { exact: true }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: /Social Soccer/i,
      }),
    ).toBeVisible();
  });

  test("permite acceder al registro", async ({ page }) => {
    const signupLink = page.getByRole("link", {
      name: /crear cuenta|registrarse|get started|sign up/i,
    });

    await expect(signupLink).toBeVisible();

    await signupLink.click();

    await page.waitForURL("**/signup");
  });

  test("permite acceder al inicio de sesión", async ({ page }) => {
    const loginLink = page.getByRole("link", {
      name: /iniciar sesión|login|log in/i,
    });

    await expect(loginLink).toBeVisible();

    await loginLink.click();

    await page.waitForURL("**/login");
  });
});
