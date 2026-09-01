import { faker } from "@faker-js/faker";
import type { PrismaClient } from "@prisma/client";
import { type User } from "wasp/entities";

type MockUserData = Omit<User, "id">;

/**
 * Social Soccer Database Seeds
 *
 * Credenciales de Desarrollo / Demostración:
 * ----------------------------------------------------
 * Administrador:
 * - Email: admin@socialsoccer.local
 * - Rol: Admin (isAdmin: true) -> Acceso a /admin
 *
 * Jugador de prueba:
 * - Email: jugador@socialsoccer.local
 * - Rol: Jugador (isAdmin: false) -> Acceso a /app
 * ----------------------------------------------------
 */
export async function seedMockUsers(prismaClient: PrismaClient) {
  // 1. Administrador de demostración
  const adminEmail = "admin@socialsoccer.local";
  const existingAdmin = await prismaClient.user.findFirst({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    await prismaClient.user.create({
      data: {
        email: adminEmail,
        username: "admin",
        isAdmin: true,
        credits: 10,
        subscriptionStatus: "active",
        subscriptionPlan: "pro",
      },
    });
  }

  // 2. Jugador de demostración
  const playerEmail = "jugador@socialsoccer.local";
  let playerUser = await prismaClient.user.findFirst({
    where: { email: playerEmail },
    include: { playerProfile: true },
  });

  if (!playerUser) {
    playerUser = await prismaClient.user.create({
      data: {
        email: playerEmail,
        username: "jugador_demo",
        isAdmin: false,
        credits: 5,
        subscriptionStatus: "active",
        subscriptionPlan: "default",
        playerProfile: {
          create: {
            fullName: "Jugador Demo SocialSoccer",
            currentClub: "Club Deportivo El Batán",
            position: "Mediocampista",
            number: 10,
            stats: {
              create: {
                goals: 12,
                assists: 8,
                yellowCards: 1,
                redCards: 0,
                fairPlayScore: 98,
                matchesPlayed: 15,
              },
            },
          },
        },
      },
      include: { playerProfile: true },
    });
  }

  // 3. Usuarios de prueba adicionales con faker
  const mockUsersCount = await prismaClient.user.count();
  if (mockUsersCount < 10) {
    await Promise.all(
      generateMockUsersData(10).map((data) =>
        prismaClient.user.create({ data }),
      ),
    );
  }

  // 4. Árbitros de prueba
  const refereesData = [
    { fullName: "David Gilmour", badgeNumber: "REF-001", averageRating: 5.0 },
    { fullName: "Syd Barrett", badgeNumber: "REF-002", averageRating: 4.8 },
    { fullName: "Richard Wright", badgeNumber: "REF-003", averageRating: 4.9 },
    { fullName: "Nick Mason", badgeNumber: "REF-004", averageRating: 4.7 },
  ];

  for (const ref of refereesData) {
    const existing = await prismaClient.referee.findFirst({
      where: { badgeNumber: ref.badgeNumber },
    });
    if (!existing) {
      await prismaClient.referee.create({ data: ref });
    }
  }

  // 5. Canchas de prueba
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
