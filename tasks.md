# SpecKit Tasks — SocialSoccer MVP

Este documento contiene el desglose granular de tareas técnicas para la implementación de **SocialSoccer MVP**, derivado de [`spec.md`](file:///c:/Users/Yavirac%201/mi-proyecto/spec.md), [`plan.md`](file:///c:/Users/Yavirac%201/mi-proyecto/plan.md), [`desing.md`](file:///c:/Users/Yavirac%201/mi-proyecto/desing.md) y el prototipo oficial en [Google Stitch](https://stitch.withgoogle.com/projects/11720181075081878902).

---

## 📌 Estado General del Proyecto

- **Fase Actual:** Fases 1 a 4 completadas (Configuración DB, UI Dual, Módulos Frontend, Queries & Actions con RBAC y Wasp Spec arreglado).
- **Prototipo Oficial:** [Google Stitch UI Prototype](https://stitch.withgoogle.com/projects/11720181075081878902) (5 pantallas en Modo Oscuro `#0B5FA5` y Modo Claro `#1D3557`).

---

## 🗂️ Fase 1: Configuración de Base de Datos (Prisma / PostgreSQL)

- [x] **Task 1.1: Definir modelos DataWallet & Jugador (`User` & `PlayerProfile`)**
  - **Archivo:** [`schema.prisma`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/schema.prisma)
  - **Descripción:** Agregar `PlayerProfile` con campos para cédula, foto URL, club actual, posición, código QR interligas y estado del pase (`ACTIVE`, `PENDING_TRANSFER`, `LOCKED`).
  - **Criterio de Aceptación:** El perfil de jugador se relaciona 1-a-1 con `User`.

- [x] **Task 1.2: Definir modelos de Logística y Partidos (`Match`, `Field`, `Referee`)**
  - **Archivo:** [`schema.prisma`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/schema.prisma)
  - **Descripción:** Modelar encuentros deportivos con campos de fecha, hora, cancha asignada, alerta de clima y relación con árbitro.
  - **Criterio de Aceptación:** Permite consultar la ubicación exacta de la cancha y alertas meteorológicas.

- [x] **Task 1.3: Definir modelos de Pasarela Fintech & Ticketing (`Payment`, `Ticket`)**
  - **Archivo:** [`schema.prisma`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/schema.prisma)
  - **Descripción:** Modelar transacciones financieras (vocalías de $5.00, multas, inscripciones, tickets) con estados (`PENDING`, `COMPLETED`, `FAILED`) y token QR para entradas.
  - **Criterio de Aceptación:** Historial financiero trazable por jugador y equipo.

- [x] **Task 1.4: Definir modelos de Gamificación & Evaluación Arbitral (`PlayerStats`, `RefereeRating`)**
  - **Archivo:** [`schema.prisma`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/schema.prisma)
  - **Descripción:** Almacenar estadísticas individuales (goles, asistencias, tarjetas amarillas/rojas, Fair Play Score 0-100) y calificaciones de árbitros (1-5 estrellas).
  - **Criterio de Aceptación:** Permite actualizar métricas post-partido y promediar desempeño arbitral.

- [x] **Task 1.5: Migración de Base de Datos y Generación de Cliente Prisma**
  - **Comando:** `npx wasp db migrate-dev`
  - **Descripción:** Aplicar los esquemas a PostgreSQL y actualizar los tipos de TypeScript.

---

## 🎨 Fase 2: UI & Sistema de Temas (DESIGN.md / Tailwind CSS)

- [x] **Task 2.1: Configurar colores del tema dual en Tailwind CSS**
  - **Archivo:** [`tailwind.config.cjs`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/tailwind.config.cjs)
  - **Descripción:** Definir variables de Modo Oscuro (`#0B5FA5`, `#2E3138`, `#FF6B35`, `#E63946`) y Modo Claro (`#1D3557`, `#F4A261`, `#E63946`, `#E07A5F`).
  - **Criterio de Aceptación:** Clases útiles disponibles para ambos modos.

- [x] **Task 2.2: Implementar estilos globales y tipografía Inter**
  - **Archivo:** [`Main.css`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/src/client/Main.css)
  - **Descripción:** Aplicar fuente `Inter`, reglas de alto contraste y esquinas redondeadas `rounded-xl`.
  - **Criterio de Aceptación:** UI responsiva acorde con el diseño en Google Stitch.

- [x] **Task 2.3: Crear componente Toggle de Modo Oscuro / Claro**
  - **Archivo:** `template/app/src/client/components/ThemeToggle.tsx`
  - **Descripción:** Conmutador interactivo para cambiar entre el tema Oscuro (`#0B5FA5`) y Claro (`#1D3557`).

---

## 📱 Fase 3: Desarrollo de Módulos Frontend (5 Pantallas de Google Stitch)

- [x] **Task 3.1: Construir Vista Carnet Digital (DataWallet & Identidad Interligas)**
  - **Archivo:** `template/app/src/identity/IdentityPage.tsx`
  - **Descripción:** Pantalla del carnet digital con foto, QR de verificación, datos del jugador y estado del pase.
  - **Criterio de Aceptación:** Réplica del prototipo Stitch con QR funcional.

- [x] **Task 3.2: Construir Vista Próximos Partidos & Logística Inteligente**
  - **Archivo:** `template/app/src/matches/MatchesPage.tsx`
  - **Descripción:** Tarjetas de partidos asignados, cancha exacta (Cancha 1/2), horario y banner dinámico de clima.
  - **Criterio de Aceptación:** Alertas climáticas visibles y actualización clara de cancha.

- [x] **Task 3.3: Construir Vista Pasarela Fintech & Ticketing**
  - **Archivo:** `template/app/src/payments/PaymentsPage.tsx`
  - **Descripción:** Panel de pagos para vocalías ($5.00), multas e inscripciones con desglose y generación de ticket digital.
  - **Criterio de Aceptación:** Simulación de pagos (Deuna/Tarjeta) con cambio de estado visual a `COMPLETED`.

- [x] **Task 3.4: Construir Vista Dashboard de Gamificación & Estadísticas**
  - **Archivo:** `template/app/src/stats/StatsPage.tsx`
  - **Descripción:** Resumen visual de goles, asistencias, tarjetas y contador de Fair Play (0-100).
  - **Criterio de Aceptación:** Tarjetas interactivas responsivas.

- [x] **Task 3.5: Construir Módulo de Evaluación Arbitral**
  - **Archivo:** `template/app/src/stats/RefereeRatingForm.tsx`
  - **Descripción:** Componente de calificación por estrellas (1 a 5) y comentario sobre el desempeño arbitral.
  - **Criterio de Aceptación:** Captura dinámica de estrellas e integración fluida.

---

## ⚡ Fase 4: Integración de Server Actions & Lógica Backend

- [x] **Task 4.1: Desarrollar Wasp Queries para lectura de datos**
  - **Archivo:** [`queries.ts`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/src/socialsoccer/queries.ts)
  - **Descripción:** Implementar `getPlayerProfile`, `getUpcomingMatches`, `getPaymentHistory` y `getPlayerStats` con manejo de excepciones (try/catch).

- [x] **Task 4.2: Desarrollar Server Actions para mutaciones**
  - **Archivo:** [`actions.ts`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/src/socialsoccer/actions.ts)
  - **Descripción:** Implementar `updatePlayerProfile`, `processPayment`, `submitRefereeRating` y `updateMatchStats` con protección RBAC (`isAdmin`) y manejo de excepciones en Prisma.

- [x] **Task 4.3: Configurar rutas y entidades en Wasp Main**
  - **Archivo:** [`main.wasp.ts`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/main.wasp.ts) y [`socialsoccer.wasp.ts`](file:///c:/Users/Yavirac%201/mi-proyecto/template/app/src/socialsoccer/socialsoccer.wasp.ts)
  - **Descripción:** Registrar rutas `/identity`, `/matches`, `/payments`, `/stats`, modularizar `socialsoccerSpec` y corregir configuración TypeScript (`tsconfig.wasp.json`).

- [x] **Task 4.4: Pruebas de integración, linters y build final**
  - **Comandos:** `npm run lint` y `npx wasp build`
  - **Descripción:** Validar sintaxis, tipos y correcto despliegue del MVP SocialSoccer.
