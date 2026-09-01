# Tasks: Social Soccer MVP

Este documento contiene las tareas específicas de implementación del MVP inicial de Social Soccer para el módulo de gestión de partidos y sus integraciones principales.

El documento refleja la arquitectura actual basada en Wasp, React, TypeScript, Prisma y PostgreSQL.

---

# Phase 1 — Database & Data Model

## Task 1.1 — Verify core user models

- [x] Verificar `User`.
- [x] Verificar `PlayerProfile`.
- [x] Relacionar `User` con `PlayerProfile`.
- [x] Verificar soporte para administración mediante `isAdmin`.

**Estado:** ✅ Completado.

## Task 1.2 — Verify match models

- [x] Verificar `Match`.
- [x] Verificar `MatchPlayer`.
- [x] Verificar `Field`.
- [x] Verificar `Referee`.
- [x] Verificar relación entre partido y creador.
- [x] Verificar estado del partido.
- [x] Verificar estado `CANCELLED`.

**Estado:** ✅ Completado.

## Task 1.3 — Database migration

- [x] Ejecutar migraciones de desarrollo.
- [x] Generar cliente Prisma mediante Wasp.
- [x] Validar sincronización con PostgreSQL.

**Estado:** ✅ Completado.

---

# Phase 2 — Backend Operations

## Task 2.1 — Query `getMatches`

- [x] Consultar partidos futuros.
- [x] Filtrar partidos `SCHEDULED`.
- [x] Ordenar por fecha.
- [x] Incluir jugadores.
- [x] Incluir cancha.
- [x] Incluir árbitro.
- [x] Validar autenticación.

**Estado:** ✅ Completado.

## Task 2.2 — Query `getMatch`

- [x] Consultar partido por identificador.
- [x] Incluir jugadores y sus perfiles.
- [x] Incluir cancha.
- [x] Incluir árbitro.
- [x] Incluir creador.
- [x] Validar partido inexistente.

**Estado:** ✅ Completado.

## Task 2.3 — Action `createMatch`

- [x] Validar autenticación.
- [x] Validar ubicación.
- [x] Validar fecha y hora.
- [x] Impedir partidos en el pasado.
- [x] Validar número máximo de jugadores.
- [x] Validar árbitro cuando sea seleccionado.
- [x] Registrar creador del partido.

**Estado:** ✅ Completado.

## Task 2.4 — Action `joinMatch`

- [x] Validar autenticación.
- [x] Verificar existencia del partido.
- [x] Impedir inscripción duplicada.
- [x] Impedir inscripción cuando el partido está lleno.
- [x] Impedir inscripción después del inicio.
- [x] Impedir inscripción en partidos cancelados.

**Estado:** ✅ Completado.

## Task 2.5 — Action `leaveMatch`

- [x] Validar autenticación.
- [x] Verificar inscripción existente.
- [x] Eliminar correctamente `MatchPlayer`.

**Estado:** ✅ Completado.

## Task 2.6 — Action `cancelMatch`

- [x] Validar autenticación.
- [x] Verificar existencia del partido.
- [x] Impedir cancelar dos veces.
- [x] Impedir cancelar un partido iniciado.
- [x] Permitir cancelación al creador.
- [x] Permitir cancelación a administradores.
- [x] Denegar usuarios no autorizados.
- [x] Cambiar estado a `CANCELLED`.
- [x] Mantener los registros históricos.

**Estado:** ✅ Completado.

---

# Phase 3 — Wasp Specification

## Task 3.1 — Match routes

- [x] Registrar `MatchListRoute`.
- [x] Registrar `CreateMatchRoute`.
- [x] Registrar `MatchDetailRoute`.
- [x] Configurar `authRequired: true`.

**Estado:** ✅ Completado.

## Task 3.2 — Match operations

- [x] Registrar `getMatches`.
- [x] Registrar `getMatch`.
- [x] Registrar `createMatch`.
- [x] Registrar `joinMatch`.
- [x] Registrar `leaveMatch`.
- [x] Registrar `cancelMatch`.

**Estado:** ✅ Completado.

---

# Phase 4 — Frontend Views

## Task 4.1 — MatchListPage

- [x] Mostrar partidos disponibles.
- [x] Mostrar fecha y hora.
- [x] Mostrar cancha.
- [x] Mostrar árbitro.
- [x] Mostrar cupos.
- [x] Acceder al detalle.
- [x] Acceder a creación de partido.

**Estado:** ✅ Completado.

## Task 4.2 — CreateMatchPage

- [x] Crear formulario.
- [x] Seleccionar fecha y hora.
- [x] Definir ubicación.
- [x] Definir límite de jugadores.
- [x] Seleccionar árbitro opcional.
- [x] Mostrar errores.
- [x] Redirigir al detalle después de crear.

**Estado:** ✅ Completado.

## Task 4.3 — MatchDetailPage

- [x] Mostrar información del partido.
- [x] Mostrar jugadores confirmados.
- [x] Mostrar cupos.
- [x] Permitir inscripción.
- [x] Permitir salida.
- [x] Mostrar estado `CANCELLED`.
- [x] Mostrar botón de cancelación al creador o administrador.
- [x] Confirmar la cancelación antes de ejecutarla.
- [x] Actualizar la vista después de cancelar.

**Estado:** ✅ Completado.

---

# Phase 5 — Related MVP Features

## Task 5.1 — Referees

- [x] Consultar árbitros.
- [x] Mostrar calificación promedio.
- [x] Asignar árbitro a un partido.
- [x] Evaluar árbitro.

**Estado:** ✅ Completado.

## Task 5.2 — Player statistics

- [x] Consultar estadísticas.
- [x] Registrar goles.
- [x] Registrar asistencias.
- [x] Registrar tarjetas.
- [x] Registrar Fair Play.
- [x] Registrar partidos jugados.

**Estado:** 🟡 Parcial según el alcance actual.

## Task 5.3 — Payments & Ticketing

- [x] Consultar historial de pagos.
- [x] Registrar operaciones de demostración.
- [x] Crear tickets.
- [x] Asociar tickets con partidos.

**Estado:** 🟡 Demostrativo / pendiente de integración financiera real.

---

# Phase 6 — Testing & Validation

## Task 6.1 — Local integration testing

- [x] Ejecutar `wasp start`.
- [x] Verificar compilación Wasp.
- [x] Verificar bundle del servidor.
- [x] Verificar cliente Vite.
- [x] Verificar creación de partidos.
- [x] Verificar inscripción.
- [x] Verificar salida.
- [x] Verificar cancelación.

**Estado:** ✅ Completado.

## Task 6.2 — E2E

- [ ] Actualizar tests para el flujo `/app`.
- [ ] Actualizar tests de partidos.
- [ ] Añadir prueba de cancelación.
- [ ] Añadir prueba de permisos de cancelación.
- [ ] Ejecutar suite completa.

**Estado:** 🟡 Pendiente de actualización.

---

# Phase 7 — Pre-production

## Task 7.1 — Quality checks

- [ ] Ejecutar lint.
- [ ] Ejecutar Prettier check.
- [ ] Ejecutar E2E actualizado.
- [ ] Revisar errores de consola.
- [ ] Revisar errores de backend.

**Estado:** 🟡 Pendiente.

## Task 7.2 — Production readiness

- [ ] Configurar PostgreSQL de producción.
- [ ] Configurar variables de entorno.
- [ ] Retirar `SKIP_EMAIL_VERIFICATION_IN_DEV` del entorno de producción.
- [ ] Configurar proveedor de correo real.
- [ ] Configurar Railway.
- [ ] Realizar despliegue de prueba.

**Estado:** 🔴 Pendiente.

---

# Estado del documento

Este archivo representa las tareas específicas del MVP de Social Soccer relacionadas con la gestión de partidos y sus integraciones inmediatas.

# El seguimiento global del proyecto se mantiene en el `tasks.md` raíz del repositorio.

===========================================================================================

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
