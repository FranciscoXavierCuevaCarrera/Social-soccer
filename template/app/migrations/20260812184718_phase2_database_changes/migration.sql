-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_fieldId_fkey";

-- AlterTable
ALTER TABLE "Match" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location" TEXT NOT NULL DEFAULT 'Cancha Principal',
ADD COLUMN     "maxPlayers" INTEGER NOT NULL DEFAULT 10,
ALTER COLUMN "date" DROP NOT NULL,
ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "time" DROP NOT NULL,
ALTER COLUMN "time" SET DEFAULT '19:00',
ALTER COLUMN "homeTeam" DROP NOT NULL,
ALTER COLUMN "homeTeam" SET DEFAULT 'Local',
ALTER COLUMN "awayTeam" DROP NOT NULL,
ALTER COLUMN "awayTeam" SET DEFAULT 'Visitante',
ALTER COLUMN "fieldId" DROP NOT NULL;

-- CreateTable
CREATE TABLE "MatchPlayer" (
    "id" TEXT NOT NULL,
    "matchId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MatchPlayer_matchId_userId_key" ON "MatchPlayer"("matchId", "userId");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchPlayer" ADD CONSTRAINT "MatchPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
