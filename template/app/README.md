# Social Soccer

Social Soccer es una plataforma web para la gestión de fútbol amateur y ligas barriales. Centraliza la organización de partidos, jugadores, árbitros, estadísticas, identidad deportiva y operaciones relacionadas con pagos y tickets.

## Stack tecnológico

- **Wasp 0.25**
- **React + TypeScript**
- **Node.js**
- **Prisma ORM**
- **PostgreSQL**
- **Tailwind CSS**
- **Playwright** para pruebas E2E

## Funcionalidades actuales

### Autenticación

Social Soccer utiliza autenticación mediante correo electrónico y contraseña.

El flujo incluye:

- Registro de usuarios.
- Inicio de sesión.
- Recuperación de contraseña.
- Verificación de correo.
- Redirección al dashboard después del inicio de sesión.

Durante la fase de pruebas de la beta local puede utilizarse:

```env
SKIP_EMAIL_VERIFICATION_IN_DEV=true
```

Esta variable debe utilizarse únicamente durante desarrollo. No debe configurarse en el entorno de producción.

### Dashboard

Después de iniciar sesión, el usuario accede a:

```text
/app
```

Desde el dashboard puede acceder a los principales módulos de Social Soccer:

- Partidos.
- Organizar partido.
- Mi perfil.
- Estadísticas.
- Finanzas.

### Gestión de partidos

El sistema permite:

- Crear partidos.
- Consultar próximos partidos.
- Consultar el detalle de un partido.
- Consultar la cancha asignada.
- Asignar árbitro.
- Inscribirse a un partido.
- Salirse de un partido.
- Consultar los jugadores inscritos.
- Cancelar un partido.

La cancelación no elimina físicamente el registro. El partido pasa al estado:

```text
CANCELLED
```

La cancelación está restringida al creador del partido y a los administradores.

### Árbitros

Social Soccer incluye:

- Consulta de árbitros disponibles.
- Visualización de su calificación promedio.
- Asignación de árbitros a partidos.
- Evaluación de árbitros después de los encuentros.
- Actualización del promedio de valoración arbitral.

### Estadísticas

El sistema contempla estadísticas deportivas de los jugadores, incluyendo:

- Goles.
- Asistencias.
- Tarjetas amarillas.
- Tarjetas rojas.
- Fair Play.
- Partidos jugados.

### Perfil deportivo

Cada jugador dispone de un perfil deportivo con información como:

- Nombre completo.
- Número.
- Posición.
- Club actual.
- Fotografía.
- Estado del perfil.
- Estadísticas asociadas.

### Finanzas y tickets

El proyecto incluye un módulo de demostración para:

- Historial de pagos.
- Conceptos relacionados con partidos.
- Vocalías.
- Inscripciones.
- Multas.
- Tickets.

Las integraciones de pago reales deben considerarse una etapa posterior de producción y no deben confundirse con las funcionalidades actualmente simuladas o preparadas para integración.

## Estructura principal

El código de Social Soccer está organizado por módulos dentro de `src`:

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

El módulo `matches` contiene el flujo principal de partidos:

```text
src/matches/
├── MatchListPage.tsx
├── CreateMatchPage.tsx
├── MatchDetailPage.tsx
├── MatchesPage.tsx
├── matches.wasp.ts
└── operations.ts
```

`MatchListPage` es la página principal actual del módulo de partidos. `MatchesPage` se conserva como compatibilidad con código anterior y reutiliza `MatchListPage`.

## Base de datos

El proyecto utiliza PostgreSQL mediante Prisma.

El modelo principal `Match` mantiene relaciones con:

- Usuario creador.
- Jugadores inscritos.
- Cancha.
- Árbitro.
- Pagos.
- Tickets.
- Estadísticas.
- Evaluaciones arbitrales.

Para trabajar con la base de datos durante desarrollo:

```bash
wasp start db
```

En otra terminal:

```bash
wasp db migrate-dev
```

Después:

```bash
wasp start
```

## Desarrollo local

Desde la carpeta:

```text
template/app
```

asegúrate de disponer de los archivos de entorno locales:

```text
.env.client
.env.server
```

Estos archivos contienen configuración y secretos locales y no deben subirse al repositorio.

Para iniciar el proyecto:

```bash
wasp start
```

La aplicación estará disponible normalmente en:

```text
http://localhost:3000
```

El servidor de desarrollo utiliza el puerto:

```text
3001
```

## Variables de entorno

Las variables sensibles deben mantenerse fuera del repositorio.

Entre las variables utilizadas por el proyecto se encuentran configuraciones para:

```text
DATABASE_URL
STRIPE_API_KEY
STRIPE_WEBHOOK_SECRET
LEMONSQUEEZY_API_KEY
LEMONSQUEEZY_STORE_ID
LEMONSQUEEZY_WEBHOOK_SECRET
POLAR_ORGANIZATION_ACCESS_TOKEN
POLAR_WEBHOOK_SECRET
ADMIN_EMAILS
OPENAI_API_KEY
WASP_WEB_CLIENT_URL
WASP_SERVER_URL
```

No todas son necesarias para ejecutar la beta actual. Antes del despliegue se debe configurar únicamente el conjunto requerido por las funcionalidades que estén activas.

Los archivos `.env.server` y `.env.client` están excluidos del control de versiones.

## Correo electrónico

Durante la beta local se utiliza el proveedor de correo de desarrollo de Wasp y se puede omitir la verificación de correo mediante:

```env
SKIP_EMAIL_VERIFICATION_IN_DEV=true
```

Para una futura producción pública deberá configurarse un proveedor de correo real y eliminarse el bypass de verificación del entorno de producción.

## Pruebas

El proyecto utiliza Playwright para las pruebas end-to-end.

Las pruebas deben mantenerse alineadas con el flujo actual de Social Soccer:

```text
Registro / Login
      ↓
/app
      ↓
Partidos
      ↓
Detalle del partido
      ↓
Inscripción / salida
      ↓
Cancelación
      ↓
Evaluación arbitral
```

Antes de un despliegue se deben ejecutar las comprobaciones de compilación, lint, formato y pruebas E2E.

## Estado del proyecto

Social Soccer se encuentra actualmente en una fase de **MVP / beta cerrada**.

La aplicación ya cuenta con los principales flujos funcionales para probar la experiencia con usuarios reales, pero algunas integraciones de producción todavía requieren configuración adicional, especialmente:

- proveedor de correo real;
- dominio de producción;
- servicios de pago reales;
- configuración de PostgreSQL de producción;
- variables de entorno de producción;
- actualización y validación final de la suite E2E.

El objetivo de esta beta es probar la experiencia con un grupo reducido de usuarios, recoger sus comentarios y realizar las mejoras necesarias antes de una presentación o lanzamiento empresarial.

## Producción

El despliegue previsto para la siguiente etapa utilizará:

```text
Frontend + Backend
        ↓
Railway

PostgreSQL
        ↓
Railway PostgreSQL
```

Las credenciales y variables sensibles deberán configurarse directamente en el entorno de Railway y nunca almacenarse en GitHub.
