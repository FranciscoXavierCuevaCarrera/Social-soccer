import { faker } from "@faker-js/faker";
import type { PrismaClient } from "@prisma/client";
import { type User } from "wasp/entities";
import { sanitizeAndSerializeProviderData } from "wasp/server/auth";

type MockUserData = Omit<User, "id">;

const TESTER_PASSWORD = "soccer2026";

const TESTER_USERNAMES = Array.from(
  { length: 18 },
  (_, index) => `tester${String(index + 1).padStart(2, "0")}`,
);

/**
 * This function, which we've imported in `app.db.seeds` in the `main.wasp` file,
 * seeds the database with mock users via the `wasp db seed` command.
 */
export async function seedMockUsers(prismaClient: PrismaClient) {
  await Promise.all(
    generateMockUsersData(50).map((data) => prismaClient.user.create({ data })),
  );

  await seedBetaTesters(prismaClient);

  const refereesData = [
    { fullName: "David Gilmour", badgeNumber: "REF-001", averageRating: 5.0 },
    { fullName: "Syd Barrett", badgeNumber: "REF-002", averageRating: 5.0 },
    { fullName: "Richard Wright", badgeNumber: "REF-003", averageRating: 5.0 },
    { fullName: "Nick Mason", badgeNumber: "REF-004", averageRating: 5.0 },
  ];

  for (const ref of refereesData) {
    const existing = await prismaClient.referee.findFirst({
      where: { badgeNumber: ref.badgeNumber },
    });

    if (!existing) {
      await prismaClient.referee.create({ data: ref });
    }
  }

  const fieldsData = [
    {
      name: "Cancha 1 — Césped Sintético Principal",
      location: "Complejo Deportivo El Batán (Av. Granados)",
      surface: "Sintetico",
    },
    {
      name: "Cancha 2 — Césped Natural",
      location: "Estadio Parroquial Nayón",
      surface: "Natural",
    },
  ];

  for (const field of fieldsData) {
    const existing = await prismaClient.field.findFirst({
      where: { name: field.name },
    });

    if (!existing) {
      await prismaClient.field.create({ data: field });
    }
  }
}

async function seedBetaTesters(prismaClient: PrismaClient) {
  const providerData = await sanitizeAndSerializeProviderData<"username">({
    hashedPassword: TESTER_PASSWORD,
  });

  for (const username of TESTER_USERNAMES) {
    const existingUser = await prismaClient.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      continue;
    }

    await prismaClient.user.create({
      data: {
        username,
        email: null,
        createdAt: new Date(),
        isAdmin: false,
        credits: 3,
        subscriptionStatus: "active",
        lemonSqueezyCustomerPortalUrl: null,
        paymentProcessorUserId: null,
        datePaid: null,
        subscriptionPlan: "default",
        auth: {
          create: {
            identities: {
              create: {
                providerName: "username",
                providerUserId: username,
                providerData,
              },
            },
          },
        },
      },
    });
  }
}

function generateMockUsersData(numOfUsers: number): MockUserData[] {
  return faker.helpers.multiple(generateMockUserData, { count: numOfUsers });
}

function generateMockUserData(): MockUserData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const now = new Date();
  const createdAt = faker.date.past({ refDate: now });

  return {
    email: faker.internet.email({ firstName, lastName }),
    username: faker.internet.userName({ firstName, lastName }),
    createdAt,
    isAdmin: false,
    credits: 3,
    subscriptionStatus: "active",
    lemonSqueezyCustomerPortalUrl: null,
    paymentProcessorUserId: null,
    datePaid: null,
    subscriptionPlan: "default",
  };
}