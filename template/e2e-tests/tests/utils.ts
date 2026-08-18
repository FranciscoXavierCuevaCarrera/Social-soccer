import { type Page } from "@playwright/test";
import { randomUUID } from "crypto";

export type User = {
  id?: number;
  email: string;
  password?: string;
};

export const DEFAULT_PASSWORD = "password123";

export const createRandomUser = (): User => {
  return {
    email: `${randomUUID()}@test.com`,
    password: DEFAULT_PASSWORD,
  };
};

export const signUserUp = async ({
  page,
  user,
}: {
  page: Page;
  user: User;
}) => {
  await page.goto("/signup", {
    waitUntil: "domcontentloaded",
  });

  await page.fill('input[name="email"]', user.email);

  await page.fill(
    'input[name="password"]',
    user.password ?? DEFAULT_PASSWORD,
  );

  const signupResponse = page.waitForResponse(
    (response) =>
      response.url().includes("signup") &&
      response.status() >= 200 &&
      response.status() < 300,
    { timeout: 15000 },
  );

  await page.getByRole("button", { name: "Sign up" }).click();

  await signupResponse;

  await page.waitForLoadState("domcontentloaded");
};

export const logUserIn = async ({
  page,
  user,
}: {
  page: Page;
  user: User;
}) => {
  await page.goto("/login", {
    waitUntil: "domcontentloaded",
  });

  await page.fill('input[name="email"]', user.email);

  await page.fill(
    'input[name="password"]',
    user.password ?? DEFAULT_PASSWORD,
  );

  const loginResponse = page.waitForResponse(
    (response) =>
      response.url().includes("login") &&
      response.status() >= 200 &&
      response.status() < 300,
    { timeout: 15000 },
  );

  await page.getByRole("button", { name: "Log in" }).click();

  await loginResponse;

  await page.waitForLoadState("domcontentloaded");
};