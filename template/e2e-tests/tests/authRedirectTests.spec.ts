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

test.describe("auth redirect tests", () => {
  test("logged-in user visiting /login should redirect to /app", async () => {
    await page.goto("/login");

    await page.waitForURL("**/app", { timeout: 10_000 });

    expect(page.url()).toContain("/app");
  });

  test("logged-in user visiting /signup should redirect to /app", async () => {
    await page.goto("/signup");

    await page.waitForURL("**/app", { timeout: 10_000 });

    expect(page.url()).toContain("/app");
  });
});
