# Tasks: Social Soccer MVP

## Phase 1: Database & Data Model Setup
- [ ] Task 1.1: Verify Prisma models in `schema.prisma` for `User`, `Match`, `Registration`, and `Field`.
- [ ] Task 1.2: Execute Prisma migration (`npx wasp db migrate-dev`).

## Phase 2: Core Backend Logic (Wasp Actions & Queries)
- [ ] Task 2.1: Define query to fetch available matches (`getMatches`).
- [ ] Task 2.2: Define action to create a match (`createMatch`).
- [ ] Task 2.3: Define action for player registration (`joinMatch`).
- [ ] Task 2.4: Declare queries and actions inside `main.wasp.ts`.

## Phase 3: Frontend Views & Navigation
- [ ] Task 3.1: Build `MatchListPage` component to display active games.
- [ ] Task 3.2: Build `MatchDetailPage` component to handle player joins/leaves.
- [ ] Task 3.3: Link routes in `main.wasp.ts`.

## Phase 4: Integration & Testing
- [ ] Task 4.1: Run `wasp start` to test end-to-end functionality in Codespaces.
