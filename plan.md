# Architectural Plan — Social Soccer MVP

## 1. Objetivo arquitectónico

Social Soccer se desarrolla como una aplicación web modular orientada a la gestión del fútbol amateur, barrial y parroquial.

La arquitectura busca mantener separadas las responsabilidades de autenticación, perfiles, partidos, estadísticas, finanzas y administración, permitiendo evolucionar progresivamente desde el MVP hacia una plataforma empresarial.

El proyecto se encuentra actualmente en fase de **MVP / beta cerrada**.

---

## 2. Stack tecnológico actual

La implementación real utiliza:

- **Wasp 0.25** como framework principal.
- **React** para la interfaz.
- **TypeScript** como lenguaje.
- **Node.js** para el backend.
- **Prisma ORM** para acceso a datos.
- **PostgreSQL** como base de datos.
- **Tailwind CSS** para estilos.
- **Playwright** para pruebas end-to-end.

### Arquitectura de ejecución

```text
Usuario
   ↓
React / Wasp Client
   ↓
Wasp Router + operaciones
   ↓
Node.js / Wasp Server
   ↓
Prisma ORM
   ↓
PostgreSQL
```

Wasp genera y conecta las capas cliente y servidor a partir de las especificaciones `.wasp.ts`.

---

# 3. Estructura de módulos

La aplicación se organiza por dominios funcionales:

```text
src/
├── admin/
├── app/
├── auth/
├── client/
├── identity/
├── matches/
├── payments/
├── socialsoccer/
├── stats/
└── user/
```

### `auth`

Responsable de:

- registro;
- login;
- recuperación de contraseña;
- verificación de correo;
- redirección posterior al login.

Ruta principal posterior a autenticación:

```text
/app
```

### `app`

Contiene el dashboard principal de Social Soccer.

```text
/app
```

El dashboard permite acceder a los módulos principales.

### `identity`

Gestiona el perfil deportivo del jugador.

### `matches`

Es el módulo principal de gestión de partidos.

Incluye:

- lista de partidos;
- creación;
- detalle;
- inscripción;
- salida;
- árbitro;
- cancelación.

### `payments`

Gestiona información relacionada con pagos y tickets.

### `stats`

Gestiona estadísticas deportivas y evaluación arbitral.

### `admin`

Contiene las funciones administrativas y mecanismos asociados al control de permisos.

### `socialsoccer`

Contiene consultas y acciones transversales del dominio Social Soccer.

---

# 4. Rutas principales

La aplicación utiliza rutas generadas por Wasp.

```text
/                   → Landing Page
/login              → Login
/signup             → Registro
/app                → Dashboard
/identity           → Perfil deportivo
/matches            → Lista de partidos
/matches/create     → Crear partido
/matches/:id        → Detalle del partido
/payments           → Finanzas
/stats              → Estadísticas
```

Las rutas que requieren usuario autenticado utilizan `authRequired: true`.

---

# 5. Modelo de datos

La persistencia utiliza PostgreSQL mediante Prisma.

## 5.1 User

Representa la cuenta de usuario.

Contiene:

- identificador;
- correo;
- username;
- indicador administrativo;
- relaciones con perfil, partidos, pagos, tickets y evaluaciones.

```text
User
 ├── PlayerProfile
 ├── MatchPlayer[]
 ├── Match[]       (partidos creados)
 ├── Payment[]
 ├── Ticket[]
 └── RefereeRating[]
```

---

## 5.2 PlayerProfile

Representa la identidad deportiva.

Incluye:

- nombre;
- cédula;
- foto;
- club;
- posición;
- número;
- estado del perfil;
- identificador QR.

También puede asociarse con estadísticas y tickets.

---

## 5.3 Match

Representa un encuentro deportivo.

Incluye:

- ubicación;
- fecha y hora;
- máximo de jugadores;
- creador;
- cancha;
- árbitro;
- estado;
- información adicional del encuentro.

El estado principal utilizado actualmente es:

```text
SCHEDULED
CANCELLED
```

La cancelación es lógica: el registro permanece almacenado.

---

## 5.4 MatchPlayer

Representa la inscripción de un usuario a un partido.

Se utiliza una restricción única:

```text
(matchId, userId)
```

para impedir que un mismo usuario se registre dos veces en el mismo encuentro.

---

## 5.5 Field

Representa una cancha deportiva.

Incluye:

- nombre;
- ubicación;
- superficie.

---

## 5.6 Referee

Representa al árbitro.

Incluye:

- nombre;
- número de placa;
- calificación promedio.

Se relaciona con partidos y evaluaciones.

---

## 5.7 PlayerStats

Representa estadísticas acumuladas del jugador:

- goles;
- asistencias;
- tarjetas amarillas;
- tarjetas rojas;
- Fair Play;
- partidos jugados.

---

## 5.8 RefereeRating

Registra la evaluación de un árbitro por partido.

Incluye:

- usuario evaluador;
- árbitro;
- partido;
- estrellas;
- comentario.

---

## 5.9 Payment

Representa una operación financiera.

Contempla:

- usuario;
- partido;
- monto;
- concepto;
- método de pago;
- estado;
- comprobante.

---

## 5.10 Ticket

Representa una entrada digital asociada a:

- usuario;
- partido;
- perfil de jugador;
- precio;
- token QR;
- asiento;
- estado de utilización.

---

# 6. Relaciones principales

```text
User
 │
 ├──────────── PlayerProfile
 │                    │
 │                    └── PlayerStats
 │
 ├──────────── MatchPlayer ───── Match
 │                                │
 │              ┌─────────────────┼─────────────────┐
 │              │                 │                 │
 │            Field             Referee           Payment
 │                                                  │
 │                                                 Ticket
 │
 └──────────── RefereeRating ─── Referee
```

---

# 7. Seguridad y autorización

La autenticación se realiza mediante Wasp.

Las operaciones protegidas verifican que exista un usuario autenticado.

Las operaciones sensibles también incluyen validaciones de autorización.

### Administrador

El usuario posee:

```text
isAdmin: Boolean
```

Los administradores pueden realizar operaciones adicionales, como la actualización de determinadas estadísticas y la cancelación de partidos.

### Creador del partido

El partido conserva:

```text
createdById
```

Esto permite identificar al usuario responsable de su organización.

El creador puede cancelar su propio partido antes de que comience.

---

# 8. Diseño del módulo de partidos

El flujo principal es:

```text
Crear partido
      ↓
SCHEDULED
      ↓
Usuarios consultan el partido
      ↓
Inscripción
      ↓
Partido
      │
      ├── Salirse
      │
      └── Cancelar
              ↓
          CANCELLED
```

### Reglas de negocio

Un usuario no puede:

- inscribirse dos veces;
- inscribirse cuando el partido está lleno;
- inscribirse en un partido que ya comenzó;
- inscribirse en un partido cancelado.

Un usuario no autorizado no puede cancelar un partido.

Un partido que ya comenzó no puede ser cancelado mediante esta operación.

---

# 9. Dashboard

El dashboard `/app` funciona como punto central de navegación.

Incluye accesos a:

```text
Partidos
Organizar Partido
Mi Perfil
Estadísticas
Finanzas
```

El diseño utiliza la identidad visual de Social Soccer y soporta modo claro y oscuro.

---

# 10. Landing Page

La ruta raíz presenta la propuesta de valor de Social Soccer.

La landing actual contiene:

- identidad de marca;
- descripción del problema;
- soluciones;
- explicación de funcionamiento;
- presentación de la plataforma;
- llamadas a registro y login.

Se evita utilizar contenido ficticio del template original.

---

# 11. Autenticación durante la beta

Durante desarrollo y pruebas locales puede utilizarse:

```env
SKIP_EMAIL_VERIFICATION_IN_DEV=true
```

Esto permite probar rápidamente el flujo de registro con usuarios beta.

La variable no debe utilizarse en producción.

Para producción futura se deberá utilizar un proveedor de correo real.

---

# 12. Finanzas y ticketing

El módulo financiero actual proporciona una base funcional para:

```text
Pagos
Vocalías
Inscripciones
Multas
Tickets
Historial
```

Actualmente parte de este sistema se encuentra en modo demostrativo.

La arquitectura queda preparada para añadir posteriormente proveedores de pago y webhooks reales.

---

# 13. Funcionalidades futuras

Las siguientes funciones forman parte de la visión de evolución del producto y no deben considerarse completamente implementadas en el MVP actual:

### Notificaciones

- notificaciones push;
- cambios de horario;
- cambios de cancha;
- cancelaciones automáticas;
- avisos meteorológicos.

### DataWallet avanzado

- identidad interoperable entre ligas;
- validación documental avanzada;
- uso empresarial del QR;
- historial completo de transferencias deportivas.

### Gamificación

- puntos Fair Play avanzados;
- badges;
- logros;
- ranking;
- recompensas.

### Fintech

- pasarela de pagos real;
- conciliación automática;
- webhooks;
- tickets pagados;
- reembolsos.

---

# 14. Estrategia de pruebas

Antes de producción deben validarse:

```text
Compilación Wasp
      ↓
TypeScript
      ↓
Lint
      ↓
Prettier
      ↓
Pruebas E2E
      ↓
Pruebas funcionales manuales
```

La suite E2E debe mantenerse alineada con el flujo actual:

```text
Landing
  ↓
Registro / Login
  ↓
/app
  ↓
Partidos
  ↓
Detalle
  ↓
Inscripción / salida
  ↓
Cancelación
```

---

# 15. Estrategia de despliegue

La infraestructura prevista para producción es:

```text
                  Internet
                     │
                     ▼
                  Railway
              ┌──────┴──────┐
              │             │
           Wasp App     PostgreSQL
              │
              ▼
          Servicios externos
```

Las variables sensibles se configurarán directamente en Railway.

No se deben almacenar secretos en GitHub.

---

# 16. Fases de evolución

## Fase 1 — Base técnica

Estado: **✅ Completada**

Incluye:

- configuración del proyecto;
- PostgreSQL;
- Prisma;
- entidades principales;
- estructura inicial.

## Fase 2 — Identidad y UI

Estado: **✅ Completada**

Incluye:

- identidad visual;
- modo claro/oscuro;
- navegación;
- landing;
- dashboard.

## Fase 3 — Módulos funcionales

Estado: **✅ Completada para el alcance actual**

Incluye:

- identidad;
- partidos;
- estadísticas;
- finanzas;
- árbitros.

## Fase 4 — Backend y operaciones

Estado: **✅ Completada para el alcance actual**

Incluye:

- queries;
- actions;
- validación;
- autenticación;
- autorización;
- operaciones de partidos;
- cancelación de partidos.

## Fase 5 — Beta cerrada

Estado: **🟡 En curso**

Objetivo:

- probar con usuarios reales;
- identificar errores;
- analizar experiencia de usuario;
- validar los flujos principales;
- recoger feedback;
- priorizar mejoras.

## Fase 6 — Producción inicial

Estado: **🔴 Pendiente**

Incluye:

- PostgreSQL de producción;
- Railway;
- correo real;
- variables de entorno;
- dominio/URL definitiva;
- E2E actualizado;
- monitorización;
- endurecimiento de seguridad.

## Fase 7 — Evolución empresarial

Estado: **🔴 Futura**

Incluye:

- notificaciones reales;
- meteorología;
- fintech real;
- DataWallet interoperable;
- gamificación avanzada;
- escalabilidad;
- analítica avanzada.

---

# 17. Principios arquitectónicos

El desarrollo de Social Soccer seguirá estos principios:

### Modularidad

Cada dominio funcional debe permanecer separado.

### Seguridad

Las validaciones importantes deben realizarse en el backend, no solamente en la interfaz.

### Trazabilidad

Los registros deportivos, financieros y administrativos deben conservar historial.

### Simplicidad

El flujo de las funciones principales debe ser corto e intuitivo.

### Evolución incremental

Las funcionalidades experimentales se incorporan progresivamente después de validar su utilidad con usuarios.

### Separación entre MVP y funcionalidades futuras

La documentación debe distinguir claramente entre:

- implementado;
- demostrativo;
- pendiente;
- experimental.

---

# 18. Estado del plan

Este documento representa la arquitectura actual de **Social Soccer MVP** y sirve como referencia para las siguientes etapas del proyecto.

Antes del despliegue público, el plan deberá actualizarse con la infraestructura concreta de producción y las decisiones definitivas de correo, dominio, pagos y monitorización.

========================================================================================================

# Architectural Plan (plan.md) — SocialSoccer MVP

## 1. Arquitectura General y Stack Tecnológico

SocialSoccer se construye utilizando el boilerplate **Open SaaS** para garantizar una arquitectura moderna, escalable y segura.

- **Frontend:** Next.js (App Router), React, Tailwind CSS (soporte dual para Modo Oscuro/Claro).
- **Backend:** Next.js Server Actions / API Routes.
- **Base de Datos:** PostgreSQL administrado vía **Prisma ORM**.
- **Autenticación:** NextAuth.js / Supabase Auth.
- **Prototipado UI (Google Stitch):** [Prototipo Oficial Google Stitch](https://stitch.withgoogle.com/projects/11720181075081878902) (Estándar visual de 5 pantallas en Modo Oscuro #0B5FA5 y Modo Claro #1D3557).

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
```
