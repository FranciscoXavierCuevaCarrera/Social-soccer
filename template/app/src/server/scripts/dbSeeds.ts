import { faker } from "@faker-js/faker";
import type { PrismaClient } from "@prisma/client";
import { type User } from "wasp/entities";

type MockUserData = Omit<User, "id">;

export async function seedMockUsers(prismaClient: PrismaClient) {
  await Promise.all(
    generateMockUsersData(50).map((data) =>
      prismaClient.user.create({ data }),
    ),
  );

  const referees = [
    {
      fullName: "David Gilmour",
      badgeNumber: "REF-001",
      averageRating: 4.8,
    },
    {
      fullName: "Syd Barrett",
      badgeNumber: "REF-002",
      averageRating: 4.6,
    },
    {
      fullName: "Richard Wright",
      badgeNumber: "REF-003",
      averageRating: 4.9,
    },
    {
      fullName: "Nick Mason",
      badgeNumber: "REF-004",
      averageRating: 4.7,
    },
  ];

  for (const referee of referees) {
    const existing = await prismaClient.referee.findFirst({
      where: {
        fullName: referee.fullName,
      },
    });

    if (!existing) {
      await prismaClient.referee.create({
        data: referee,
      });
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