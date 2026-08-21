import { faker } from "@faker-js/faker";
import type { PrismaClient } from "@prisma/client";
import { type User } from "wasp/entities";

type MockUserData = Omit<User, "id">;

/**
 * This function, which we've imported in `app.db.seeds` in the `main.wasp` file,
 * seeds the database with mock users via the `wasp db seed` command.
 * For more info see: https://wasp.sh/docs/data-model/backends#seeding-the-database
 */
export async function seedMockUsers(prismaClient: PrismaClient) {
  await Promise.all(
    generateMockUsersData(50).map((data) => prismaClient.user.create({ data })),
  );

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

  for (const f of fieldsData) {
    const existing = await prismaClient.field.findFirst({
      where: { name: f.name },
    });
    if (!existing) {
      await prismaClient.field.create({ data: f });
    }
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
