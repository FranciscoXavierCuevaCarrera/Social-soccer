# ⚽ Social Soccer

**Social Soccer** es una plataforma web para la gestión y organización del fútbol amateur, barrial y parroquial.

El proyecto busca centralizar en una sola aplicación la información que normalmente se encuentra dispersa entre grupos de mensajería, registros físicos y procesos manuales: jugadores, partidos, canchas, árbitros, estadísticas y operaciones relacionadas con pagos y tickets.

Actualmente Social Soccer se encuentra en una **fase de MVP / beta cerrada**, orientada a validar la experiencia con un grupo reducido de usuarios antes de continuar con la evolución del producto y su presentación empresarial.

---

## 🚀 Funcionalidades actuales

### 🔐 Autenticación

- Registro de usuarios.
- Inicio de sesión.
- Recuperación de contraseña.
- Verificación de correo.
- Dashboard autenticado.
- Control básico de usuarios administradores.

Durante la beta local puede utilizarse:

```env
SKIP_EMAIL_VERIFICATION_IN_DEV=true
```

Esta variable es exclusivamente para desarrollo y no debe utilizarse en producción.

### 🏠 Dashboard

Después de iniciar sesión, el usuario accede a:

```text
/app
```

Desde allí puede acceder a:

- ⚽ Partidos.
- ➕ Organizar Partido.
- 👤 Mi Perfil.
- 📊 Estadísticas.
- 💳 Finanzas.

### ⚽ Gestión de partidos

Actualmente permite:

- Crear partidos.
- Consultar próximos partidos.
- Consultar fecha y hora.
- Consultar cancha.
- Consultar árbitro.
- Definir límite de jugadores.
- Inscribirse.
- Salirse del partido.
- Consultar jugadores inscritos.
- Cancelar partidos.

La cancelación utiliza un cambio de estado:

```text
SCHEDULED → CANCELLED
```

Los partidos cancelados no se eliminan físicamente de la base de datos.

La cancelación está protegida en el backend y solo puede realizarla el creador del partido o un administrador.

### 🟨 Árbitros

- Consulta de árbitros.
- Calificación promedio.
- Asignación a partidos.
- Evaluación posterior al encuentro.
- Comentarios sobre el desempeño.

### 📊 Estadísticas

El MVP contempla:

- Goles.
- Asistencias.
- Tarjetas amarillas.
- Tarjetas rojas.
- Fair Play.
- Partidos jugados.

### 💳 Finanzas y Ticketing

El proyecto incluye un módulo inicial para:

- Historial de pagos.
- Vocalías.
- Inscripciones.
- Multas.
- Tickets digitales.

Parte de estas funciones se encuentra actualmente en modo demostrativo y las integraciones financieras reales forman parte de una fase posterior.

---

# 🧱 Arquitectura

Social Soccer utiliza actualmente:

| Tecnología       | Uso                  |
| ---------------- | -------------------- |
| **Wasp 0.25**    | Framework full-stack |
| **React**        | Interfaz             |
| **TypeScript**   | Lenguaje             |
| **Node.js**      | Backend              |
| **Prisma**       | ORM                  |
| **PostgreSQL**   | Base de datos        |
| **Tailwind CSS** | Estilos              |
| **Playwright**   | Pruebas E2E          |

La arquitectura general es:

```text
Usuario
   ↓
React / Wasp Client
   ↓
Wasp Router + Operations
   ↓
Node.js / Wasp Server
   ↓
Prisma
   ↓
PostgreSQL
```

---

# 📁 Estructura principal

```text
Social-soccer/
├── template/
│   └── app/
│       ├── src/
│       │   ├── admin/
│       │   ├── app/
│       │   ├── auth/
│       │   ├── client/
│       │   ├── identity/
│       │   ├── matches/
│       │   ├── payments/
│       │   ├── socialsoccer/
│       │   ├── stats/
│       │   └── user/
│       ├── schema.prisma
│       ├── main.wasp.ts
│       └── package.json
├── specs/
├── e2e-tests/
├── spec.md
├── plan.md
└── tasks.md
```

---

# ⚽ Módulo de partidos

El módulo principal se encuentra en:

```text
template/app/src/matches/
```

Sus componentes principales son:

```text
MatchListPage.tsx
CreateMatchPage.tsx
MatchDetailPage.tsx
MatchesPage.tsx
matches.wasp.ts
operations.ts
```

`MatchListPage.tsx` es actualmente la interfaz principal de consulta de partidos.

`MatchesPage.tsx` funciona como compatibilidad con código anterior y reutiliza `MatchListPage`.

---

# 🗄️ Base de datos

Social Soccer utiliza PostgreSQL mediante Prisma.

Entre las entidades principales se encuentran:

```text
User
PlayerProfile
Match
MatchPlayer
Field
Referee
PlayerStats
RefereeRating
Payment
Ticket
```

`Match` mantiene relaciones con:

- usuario creador;
- jugadores;
- cancha;
- árbitro;
- pagos;
- tickets;
- estadísticas;
- evaluaciones arbitrales.

---

# 🛠️ Desarrollo local

## Requisitos

Necesitas tener instalado:

- Node.js.
- npm.
- Wasp CLI.
- PostgreSQL local o utilizar la base gestionada por Wasp.

## Instalar Wasp

```bash
npm i -g @wasp.sh/wasp-cli
```

## Entrar al proyecto

```bash
cd template/app
```

## Variables de entorno

El proyecto utiliza:

```text
.env.client
.env.server
```

Estos archivos contienen configuración local y secretos y **no deben subirse a GitHub**.

El proyecto ya verifica que los archivos `.env.*` estén excluidos del control de versiones.

## Base de datos

En una terminal:

```bash
wasp start db
```

En otra:

```bash
wasp db migrate-dev
```

Después:

```bash
wasp start
```

La aplicación normalmente queda disponible en:

```text
http://localhost:3000
```

El servidor de desarrollo utiliza:

```text
http://localhost:3001
```

---

# 🧪 Pruebas

Social Soccer utiliza Playwright para pruebas end-to-end.

El flujo principal que debe validarse es:

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
   ↓
Evaluación arbitral
```

La suite E2E se encuentra en:

```text
e2e-tests/
```

La actualización final de las pruebas forma parte de la fase de preparación pre-producción.

---

# 🧹 Calidad de código

El proyecto utiliza Prettier y ESLint.

### Prettier

Comprobar formato:

```bash
npm run prettier:check
```

Formatear:

```bash
npm run prettier:format
```

### ESLint

Comprobar problemas:

```bash
npm run lint
```

Corregir problemas solucionables automáticamente:

```bash
npm run lint:fix
```

---

# 🔒 Seguridad

Los secretos nunca deben almacenarse en GitHub.

Entre las variables sensibles se encuentran, según los servicios utilizados:

```text
DATABASE_URL
RESEND_API_KEY
STRIPE_API_KEY
STRIPE_WEBHOOK_SECRET
LEMONSQUEEZY_API_KEY
LEMONSQUEEZY_WEBHOOK_SECRET
OPENAI_API_KEY
```

No todas son necesarias para ejecutar la beta actual.

Antes de producción se configurará únicamente el conjunto requerido por los servicios habilitados.

---

# 📧 Correo electrónico

Durante la beta local se utiliza el proveedor de correo de desarrollo de Wasp y el flujo de verificación puede omitirse mediante:

```env
SKIP_EMAIL_VERIFICATION_IN_DEV=true
```

Para producción pública será necesario:

1. utilizar un proveedor de correo real;
2. configurar las variables correspondientes;
3. activar nuevamente la verificación de correo;
4. utilizar un remitente autorizado;
5. configurar las URLs públicas de la aplicación.

---

# 🧪 Estado del MVP

### ✅ Implementado

- Autenticación.
- Dashboard.
- Perfil deportivo.
- Gestión de partidos.
- Creación de partidos.
- Inscripción.
- Salida de partidos.
- Cancelación.
- Árbitros.
- Evaluación arbitral.
- Estadísticas básicas.
- Finanzas y ticketing a nivel MVP.
- PostgreSQL + Prisma.
- Control básico de administración.
- Identidad visual propia de Social Soccer.

### 🟡 Parcial / demostrativo

- Fintech real.
- Ticketing empresarial.
- DataWallet interoperable.
- Gamificación avanzada.
- Fair Play avanzado.

### 🔴 Pendiente

- Notificaciones push reales.
- Integración meteorológica automática.
- Pasarela financiera de producción.
- Correo de producción.
- Dominio propio.
- E2E completamente actualizado.
- Despliegue definitivo.
- Monitorización y endurecimiento final de producción.

---

# 👥 Beta cerrada

La siguiente etapa del proyecto consiste en una beta con un grupo reducido de usuarios.

El objetivo es recoger información sobre:

- facilidad de registro;
- navegación;
- creación de partidos;
- inscripción;
- cancelación;
- perfiles;
- estadísticas;
- evaluación arbitral;
- experiencia financiera;
- rendimiento;
- problemas de usabilidad;
- funcionamiento en dispositivos móviles.

Los resultados de esta beta determinarán las prioridades de la siguiente versión.

---

# 🚂 Producción

El despliegue previsto utiliza **Railway**.

La arquitectura inicial será:

```text
                  Internet
                     │
                     ▼
                  Railway
              ┌──────┴──────┐
              │             │
        Social Soccer   PostgreSQL
        Wasp + React      Prisma
```

Railway permitirá ejecutar el frontend y backend de la aplicación junto con PostgreSQL.

GitHub se utilizará como repositorio de código; no como servidor de la aplicación.

Antes del despliegue deberán completarse la auditoría de seguridad, pruebas E2E, configuración de correo y variables de entorno de producción.

---

# 📚 Documentación del proyecto

Los documentos principales son:

```text
spec.md
plan.md
tasks.md
```

Además existe documentación específica del MVP dentro de:

```text
template/app/specs/001-social-soccer-mvp/
```

La documentación debe mantenerse alineada con la implementación real del proyecto y distinguir entre funcionalidades implementadas, demostrativas y futuras.

---

# 🎯 Próximo objetivo

El objetivo inmediato es completar:

```text
Beta cerrada
      ↓
Feedback de usuarios
      ↓
Correcciones
      ↓
Auditoría técnica
      ↓
Pruebas E2E
      ↓
Railway
      ↓
Presentación empresarial
```

**Social Soccer — Tu fútbol, conectado.**
