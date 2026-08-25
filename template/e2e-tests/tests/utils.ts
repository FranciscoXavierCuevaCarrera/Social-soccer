import { expect, type Page } from "@playwright/test";
import { randomUUID } from "crypto";

export type User = {
  id?: string;
  email: string;
  password?: string;
};

const DEFAULT_PASSWORD = "password123";

export const logUserIn = async ({ page, user }: { page: Page; user: User }) => {
  await page.goto("/login", { waitUntil: "domcontentloaded" });

  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', DEFAULT_PASSWORD);

  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/auth/email/login") &&
        response.status() === 200,
    ),
    page.locator('button[type="submit"]').click(),
  ]);

  await page.waitForURL("**/app", { timeout: 10000 });
  await expect(page).toHaveURL(/\/app$/);
};

export const signUserUp = async ({
  page,
  user,
}: {
  page: Page;
  user: User;
}) => {
  await page.goto("/signup", { waitUntil: "domcontentloaded" });

  await page.evaluate(() => {
    try {
      const sessionId = localStorage.getItem("wasp:sessionId");

      if (sessionId) {
        localStorage.removeItem("wasp:sessionId");
      }
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  });

  await page.fill('input[name="email"]', user.email);
  await page.fill('input[name="password"]', DEFAULT_PASSWORD);

  await Promise.all([
    page.waitForResponse(
      (response) =>
        response.url().includes("/auth/email/signup") &&
        response.status() === 200,
    ),
    page.locator('button[type="submit"]').click(),
  ]);
};

export const createRandomUser = (): User => ({
  email: `${randomUUID()}@test.com`,
  password: DEFAULT_PASSWORD,
});

export const acceptAllCookies = async (page: Page) => {
  const button = page.getByRole("button", { name: /Accept all/i });

  if (await button.count()) {
    await button.click();
  }
};
