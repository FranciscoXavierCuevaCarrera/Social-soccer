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

  console.log("URL DESPUÉS DEL LOGIN:", page.url());
});

test.afterAll(async () => {
  await page.close();
});

test.describe("Social Soccer - Auth Redirects", () => {
  test("usuario autenticado que visita /login es redirigido a /app", async () => {
    console.log("URL ANTES DE /login:", page.url());

    await page.goto("/login");
    await page.waitForTimeout(2000);

    console.log("URL DESPUÉS DE /login:", page.url());

    await expect(page).toHaveURL(/\/app/);
  });

  test("usuario autenticado que visita /signup es redirigido a /app", async () => {
    console.log("URL ANTES DE /signup:", page.url());

    await page.goto("/signup");
    await page.waitForTimeout(2000);

    console.log("URL DESPUÉS DE /signup:", page.url());

    await expect(page).toHaveURL(/\/app/);
  });
});
