# Architectural Plan (plan.md) — SocialSoccer MVP

## 1. Arquitectura General y Stack Tecnológico
SocialSoccer se construye utilizando el boilerplate **Open SaaS** para garantizar una arquitectura moderna, escalable y segura.

* **Frontend:** Next.js (App Router), React, Tailwind CSS (soporte dual para Modo Oscuro/Claro).
* **Backend:** Next.js Server Actions / API Routes.
* **Base de Datos:** PostgreSQL administrado vía **Prisma ORM**.
* **Autenticación:** NextAuth.js / Supabase Auth.
* **Prototipado UI (Google Stitch):** [Prototipo Oficial Google Stitch](https://stitch.withgoogle.com/projects/11720181075081878902) (Estándar visual de 5 pantallas en Modo Oscuro #0B5FA5 y Modo Claro #1D3557).

---

## 2. Modelado de Datos de la Base de Datos (Prisma Schema Overview)

El sistema se estructura en torno a los 4 pilares fundamentales:

1. **Usuario y DataWallet (`User`, `PlayerProfile`):**
   - Almacena información personal, foto, club actual, código único QR/ID interligas y estado del "pase".
2. **Partidos y Logística (`Match`, `Field`, `Referee`):**
   - Registra fecha, hora, ubicación exacta de la cancha, árbitro asignado y alertas de clima/reprogramación.
3. **Fintech y Ticketing (`Payment`, `Ticket`):**
   - Gestión de cobros de vocalías ($5.00), inscripciones y venta de entradas con estado de transacción (`PENDING`, `COMPLETED`).
4. **Gamificación y Evaluación Arbitral (`PlayerStats`, `RefereeRating`):**
   - Métricas de rendimiento (goles, asistencias, tarjetas), contador de Puntos Fair Play (0-100) y puntuación con estrellas para los árbitros.

---

## 3. Estructura de Módulos y Rutas (Next.js App Router)

```text
app/
├── (auth)/                  # Registro e Inicio de Sesión
├── dashboard/
│   ├── identity/            # [Pilar 1] DataWallet & Carnet Digital
│   ├── matches/             # [Pilar 3] Logística, Canchas & Notificaciones AI
│   ├── payments/            # [Pilar 2] Módulo Fintech & Ticketing
│   └── stats/               # [Pilar 4] Fair Play & Evaluación Arbitral
└── api/                     # Webhooks de pago y Server Actions