# Specification Sheet — Social Soccer MVP

## 1. Resumen ejecutivo

**Social Soccer** es una plataforma web orientada a la gestión y organización del fútbol amateur, barrial y parroquial.

El proyecto nace a partir de una problemática identificada durante la investigación con usuarios: la gestión de partidos, jugadores, árbitros, documentación deportiva, estadísticas y pagos suele estar distribuida entre grupos de mensajería, registros físicos y procesos manuales.

El objetivo del MVP es centralizar las funciones deportivas más relevantes en una única plataforma, reduciendo la dependencia de procesos manuales y mejorando la disponibilidad y trazabilidad de la información.

Actualmente el proyecto se encuentra en una **fase de MVP / beta cerrada**, destinada a ser probada con un grupo reducido de usuarios antes de realizar una presentación empresarial y continuar con las siguientes etapas de desarrollo.

---

## 2. Problema identificado

### 2.1 Burocracia y falta de autonomía

Los procesos tradicionales de inscripción pueden requerir fotografías, documentos físicos y registros repetidos. Esta situación dificulta que el jugador mantenga un historial deportivo centralizado y puede generar dependencia de los administradores de las ligas.

### 2.2 Incertidumbre logística

La información sobre partidos suele distribuirse mediante canales que pueden quedar desactualizados. Los cambios de horario, cancha, árbitro o cancelaciones pueden provocar desplazamientos innecesarios y una mala experiencia para los jugadores.

### 2.3 Falta de trazabilidad del rendimiento

En muchos contextos de fútbol amateur no existe un registro individual consolidado de goles, asistencias, tarjetas, partidos jugados y Fair Play.

La ausencia de datos limita la posibilidad de reconocer el rendimiento y construir un historial deportivo.

### 2.4 Gestión financiera

El uso de efectivo y la falta de trazabilidad de pagos pueden dificultar la administración de inscripciones, vocalías, multas y otros conceptos relacionados con la actividad deportiva.

---

## 3. Usuario objetivo

El usuario principal de Social Soccer es el **jugador de fútbol amateur, barrial o parroquial**.

La plataforma está diseñada para usuarios que necesitan consultar y gestionar su actividad deportiva desde dispositivos móviles y computadores.

Entre sus necesidades principales se encuentran:

- disponer de una identidad y perfil deportivo centralizados;
- consultar partidos y logística;
- inscribirse y retirarse de encuentros;
- conocer árbitros y canchas;
- consultar estadísticas;
- revisar información financiera;
- participar en mecanismos de evaluación y Fair Play.

La aplicación prioriza una experiencia sencilla, rápida y orientada a tareas concretas.

---

## 4. Objetivos del MVP

El MVP busca validar cinco objetivos principales:

1. Centralizar la información deportiva básica del jugador.
2. Facilitar la creación y consulta de partidos.
3. Permitir la gestión básica de jugadores y árbitros.
4. Registrar estadísticas y evaluaciones arbitrales.
5. Probar una experiencia inicial de gestión financiera y ticketing.

El MVP no pretende implementar desde la primera versión todas las integraciones empresariales previstas para una plataforma de producción completa.

---

# 5. Pilares funcionales

## Pilar 1 — Identidad deportiva

Social Soccer proporciona un perfil deportivo asociado a la cuenta del usuario.

Actualmente el perfil contempla información como:

- nombre completo;
- fotografía;
- número;
- posición;
- club actual;
- estado del perfil;
- estadísticas asociadas.

El modelo de datos también contempla un identificador QR para futuras funciones de identificación y validación.

### Estado actual

**🟡 Parcial / MVP**

El perfil deportivo está implementado, pero las funcionalidades avanzadas de interoperabilidad entre múltiples ligas y validación empresarial del DataWallet requieren desarrollo posterior.

---

## Pilar 2 — Partidos y logística

El módulo de partidos constituye uno de los componentes principales de Social Soccer.

Actualmente permite:

- consultar próximos partidos;
- crear partidos;
- establecer fecha y hora;
- definir ubicación;
- establecer el número máximo de jugadores;
- asignar un árbitro;
- consultar el detalle de un partido;
- consultar jugadores inscritos;
- inscribirse en un partido;
- abandonar un partido;
- cancelar partidos;
- impedir nuevas inscripciones en partidos cancelados;
- restringir la cancelación al creador del partido o a un administrador.

La cancelación utiliza un cambio de estado:

```text
SCHEDULED
    ↓
CANCELLED
```

Los registros históricos no se eliminan físicamente.

### Estado actual

**✅ Implementado en el MVP**

### Pendiente

Queda para una fase posterior la implementación de:

- notificaciones push reales;
- actualización meteorológica automática;
- alertas automáticas de cambios de cancha y horario;
- mecanismos de comunicación masiva con los jugadores.

---

# 6. Árbitros y evaluación arbitral

Social Soccer incorpora un módulo de gestión básica de árbitros.

Actualmente permite:

- consultar árbitros;
- mostrar su calificación promedio;
- asignar un árbitro a un partido;
- registrar evaluaciones posteriores al encuentro;
- calcular nuevamente el promedio de valoración.

Las evaluaciones contemplan una puntuación de 1 a 5 estrellas y comentarios.

### Estado actual

**✅ Implementado en el MVP**

### Evolución futura

Podrán añadirse posteriormente:

- historial avanzado de actuaciones;
- métricas adicionales de desempeño;
- mecanismos de validación administrativa;
- reportes comparativos.

---

# 7. Estadísticas y Fair Play

El modelo deportivo contempla estadísticas individuales como:

- goles;
- asistencias;
- tarjetas amarillas;
- tarjetas rojas;
- Fair Play;
- partidos jugados.

También existe control administrativo para la actualización de estadísticas de partidos.

### Estado actual

**✅ Parcialmente implementado**

Las entidades y las operaciones principales existen, pero el sistema avanzado de gamificación planteado inicialmente todavía no está completamente implementado.

### Pendiente

- badges y logros;
- sistema completo de puntos;
- recompensas;
- ranking avanzado;
- reglas automáticas de Fair Play.

---

# 8. Fintech y Ticketing

Social Soccer dispone de un módulo inicial para gestionar información relacionada con pagos y tickets.

El sistema contempla conceptos como:

- vocalías;
- inscripciones;
- multas;
- tickets;
- historial de pagos;
- estados de transacción.

El modelo de datos también contempla tickets digitales asociados a usuarios y partidos.

### Estado actual

**🟡 Parcial / demostrativo**

La estructura funcional y de datos está preparada, pero las integraciones financieras empresariales reales todavía requieren configuración y validación.

### Pendiente

- integración definitiva con una pasarela de pago;
- procesamiento financiero real;
- conciliación de pagos;
- webhooks de producción;
- emisión y validación empresarial de tickets;
- políticas de reembolso y cancelación.

---

# 9. Autenticación y cuentas

La aplicación utiliza autenticación mediante correo electrónico y contraseña.

El flujo contempla:

- registro;
- inicio de sesión;
- recuperación de contraseña;
- verificación de correo;
- cierre de sesión;
- redirección al dashboard.

Después de iniciar sesión, el usuario es dirigido al dashboard:

```text
/app
```

Durante la beta local se utiliza:

```env
SKIP_EMAIL_VERIFICATION_IN_DEV=true
```

para permitir que los usuarios de prueba entren directamente sin depender de un proveedor de correo externo.

Esta variable es exclusivamente para desarrollo y no debe configurarse en producción.

### Estado actual

**✅ Implementado**

---

# 10. Dashboard

El dashboard de Social Soccer constituye el centro de operaciones del usuario autenticado.

La ruta actual es:

```text
/app
```

Desde allí se puede acceder a:

- Partidos;
- Organizar Partido;
- Mi Perfil;
- Estadísticas;
- Finanzas.

Los usuarios administradores disponen de un flujo específico hacia el área administrativa.

### Estado actual

**✅ Implementado**

---

# 11. Roles y seguridad

El modelo de usuario contempla el atributo:

```text
isAdmin
```

El sistema utiliza este valor para restringir operaciones administrativas.

Actualmente las estadísticas de partidos requieren permisos de administrador y la cancelación de partidos puede realizarla:

- el usuario creador del partido;
- un administrador.

Las operaciones del backend también validan la autenticación del usuario antes de acceder a información protegida.

### Estado actual

**✅ Implementado en el alcance actual del MVP**

### Pendiente

Para una versión empresarial deberán ampliarse las políticas RBAC y las capacidades administrativas de acuerdo con las necesidades reales de las ligas.

---

# 12. Arquitectura técnica

Social Soccer utiliza actualmente la siguiente arquitectura:

### Frontend

- React
- TypeScript
- Tailwind CSS
- componentes reutilizables de la aplicación
- Wasp Client

### Backend

- Wasp
- Node.js
- operaciones y acciones del lado servidor
- validación de autenticación y autorización

### ORM

- Prisma

### Base de datos

- PostgreSQL

### Framework de aplicación

- **Wasp 0.25**

La especificación del proyecto se organiza mediante archivos `.wasp.ts`.

### Estructura principal

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

El módulo de partidos utiliza actualmente:

```text
src/matches/
├── MatchListPage.tsx
├── CreateMatchPage.tsx
├── MatchDetailPage.tsx
├── MatchesPage.tsx
├── matches.wasp.ts
└── operations.ts
```

`MatchListPage.tsx` es la interfaz principal actual del módulo de partidos.

---

# 13. Modelo de datos principal

El modelo `Match` se relaciona con:

- `User` como creador;
- `MatchPlayer`;
- `Field`;
- `Referee`;
- `Payment`;
- `Ticket`;
- `PlayerStats`;
- `RefereeRating`.

Los perfiles deportivos están asociados mediante `PlayerProfile`.

Las evaluaciones arbitrales se almacenan mediante `RefereeRating`.

Los tickets digitales se almacenan mediante `Ticket`.

---

# 14. Experiencia de usuario

El flujo principal del usuario es:

```text
Landing Page
      ↓
Registro / Login
      ↓
Dashboard /app
      ↓
┌───────────────┬───────────────┬───────────────┐
│   Partidos    │   Mi Perfil   │ Estadísticas  │
└───────────────┴───────────────┴───────────────┘
      │
      ├── Organizar Partido
      ├── Ver Partido
      ├── Inscribirse
      ├── Salirse
      └── Cancelar
```

El diseño utiliza una identidad visual propia de Social Soccer y soporte para modo claro y oscuro.

---

# 15. Estado funcional del MVP

| Funcionalidad                        | Estado          |
| ------------------------------------ | --------------- |
| Registro y login                     | ✅ Implementado |
| Dashboard                            | ✅ Implementado |
| Perfil deportivo                     | ✅ Implementado |
| Gestión de partidos                  | ✅ Implementado |
| Inscripción a partidos               | ✅ Implementado |
| Salida de partidos                   | ✅ Implementado |
| Cancelación de partidos              | ✅ Implementado |
| Gestión básica de árbitros           | ✅ Implementado |
| Evaluación arbitral                  | ✅ Implementado |
| Estadísticas básicas                 | 🟡 Parcial      |
| Fair Play avanzado                   | 🟡 Parcial      |
| Pagos y tickets                      | 🟡 Demostrativo |
| QR / DataWallet avanzado             | 🟡 Parcial      |
| Notificaciones push                  | 🔴 Pendiente    |
| Integración meteorológica automática | 🔴 Pendiente    |
| Pasarela financiera de producción    | 🔴 Pendiente    |
| Gamificación avanzada                | 🔴 Pendiente    |
| Infraestructura de producción        | 🔴 Pendiente    |

---

# 16. Alcance de la beta cerrada

La siguiente etapa consiste en una **beta cerrada con un grupo reducido de usuarios**.

El objetivo de esta beta es validar:

- facilidad de registro;
- facilidad de navegación;
- creación y consulta de partidos;
- inscripción y salida;
- cancelación;
- experiencia con perfiles;
- utilidad de las estadísticas;
- evaluación arbitral;
- experiencia financiera;
- rendimiento general;
- problemas de usabilidad;
- errores funcionales.

Los comentarios obtenidos durante esta etapa se utilizarán para priorizar las siguientes mejoras.

---

# 17. Producción

El despliegue previsto utilizará:

```text
Aplicación Social Soccer
        ↓
Railway

PostgreSQL
        ↓
Railway PostgreSQL
```

La configuración de producción deberá incluir:

- base de datos PostgreSQL;
- variables de entorno;
- URL pública del cliente;
- URL pública del servidor;
- configuración de autenticación;
- proveedor de correo real;
- configuración de servicios de pago que se decidan utilizar.

Los secretos y credenciales nunca deben almacenarse en el repositorio.

---

# 18. Principios para la siguiente fase

La evolución del proyecto deberá priorizar:

1. **Confiabilidad:** la información logística debe ser correcta y actualizada.
2. **Simplicidad:** las acciones principales deben requerir pocos pasos.
3. **Transparencia:** pagos, estadísticas y decisiones deportivas deben ser trazables.
4. **Autonomía del jugador:** el usuario debe tener control sobre su perfil e historial.
5. **Seguridad:** las operaciones sensibles deben validarse en el backend.
6. **Escalabilidad:** las funcionalidades futuras deben construirse sobre módulos independientes.
7. **Validación con usuarios:** las decisiones de producto deberán incorporar los resultados de la beta cerrada.

---

# 19. Estado de la especificación

Esta especificación representa el estado técnico y funcional del proyecto **Social Soccer MVP** al inicio de la beta cerrada.

La especificación deberá actualizarse cuando una funcionalidad pase de pendiente a implementada o cuando las pruebas con usuarios modifiquen las prioridades del producto.

===================================================================================================

===================================================================================================

Como Tech Lead, presento el siguiente **Resumen Ejecutivo** basado exclusivamente en los hallazgos de las entrevistas de investigación de la primera semana:

### 1. El Problema: Fragmentación, Burocracia e Incertidumbre Logística

La investigación revela que el "dolor" principal de los usuarios no es la falta de información, sino la **ineficiencia y falta de confiabilidad de los procesos actuales**, los cuales se dividen en tres áreas críticas:

- **Burocracia Manual y Falta de Autonomía:** El proceso de inscripción es calificado como un "dolor de cabeza" debido a la exigencia de fotos físicas y copias de cédula. Existe una frustración significativa por la retención física de carnets y "pases" por parte de los dirigentes para impedir que los jugadores cambien de equipo.
- **Incertidumbre Logística:** Los jugadores dependen de grupos de WhatsApp o páginas de Facebook que a menudo entregan información desactualizada. Esto provoca traslados innecesarios a las canchas ("ir de gana") cuando hay cambios de horario o cancelaciones de última hora que no se notifican a tiempo.
- **Invisibilidad del Rendimiento y Seguridad:** No existe un registro centralizado y preciso de estadísticas individuales (goles, asistencias, tarjetas), lo que limita la motivación y el reconocimiento del jugador. Además, el manejo de efectivo en las canchas genera una percepción de inseguridad por riesgo de robos.

### 2. El Usuario Objetivo (User Persona)

El usuario identificado es el **Jugador de Fútbol Amateur (Barrial/Parroquial)**, con las siguientes características clave observadas:

- **Perfil Demográfico y Motivacional:** Hombres de entre 18 y 26 años (según los entrevistados directos) que compiten por una mezcla de socialización y reconocimiento deportivo.
- **Comportamiento Tecnológico:** Son usuarios pragmáticos; adoptan la tecnología solo si es funcional, liviana y precisa. Desinstalarían de inmediato una app que tenga "pantallas de carga infinitas", ocupe mucho espacio o muestre datos erróneos.
- **Necesidades Psicológicas:** Buscan autonomía sobre su "pase" e identidad digital para no depender del "visto bueno" del dirigente. Valoran la transparencia y el reconocimiento de su progreso a través de datos.

### 3. La Solución MVP (Minimum Viable Product)

Para resolver los dolores prioritarios mencionados, la primera versión del software debe implementar las siguientes funcionalidades mínimas:

- **Registro e Identidad Digital Única:** Módulo de auto-registro rápido que permita cargar documentos una sola vez para que sean válidos en múltiples ligas, eliminando el papeleo físico y devolviendo la autonomía del "pase" al jugador.
- **Centralización Logística con Notificaciones Push:** Panel con horarios, rivales, árbitros asignados y, crucialmente, la **cancha específica** (ej. Cancha 1 o 2). Debe incluir alertas automáticas en tiempo real sobre cambios de última hora.
- **Perfil Estadístico Individual:** Un apartado personalizado que registre de forma precisa goles, asistencias, tarjetas e historial de equipos para medir el rendimiento y facilitar traspasos.
- **Módulo de Pagos Seguros:** Integración de pasarelas digitales (ej. Deuna, transferencias) para el pago de inscripciones, vocalías y multas, reduciendo el uso de efectivo en los complejos.
- **Sistema de Incentivos (Gamificación):** Implementación de un sistema de "tokens" o puntos por **Fair Play** (juego limpio), puntualidad y asistencia, canjeables por beneficios tangibles como descuentos en indumentaria deportiva o implementos.
- **Feedback Arbitral:** Funcionalidad para calificar el desempeño de los árbitros después de cada encuentro para mejorar la transparencia.# Specification Sheet (spec.md) — SocialSoccer MVP

## Resumen Ejecutivo

Como Tech Lead, presento el siguiente **Resumen Ejecutivo** basado en los hallazgos de las entrevistas de investigación y la definición técnica del proyecto:

### 1. El Problema: Fragmentación, Burocracia e Incertidumbre Logística

La investigación revela que el "dolor" principal de los usuarios es la ineficiencia y falta de confiabilidad de los procesos actuales en el fútbol amateur:

- **Burocracia Manual y Retención de Pases:** El proceso de inscripción exige fotos físicas y papeleo repetitivo. Existe una alta frustración por la retención física de carnets por parte de dirigentes para impedir que los jugadores cambien de equipo.
- **Incertidumbre Logística:** Los jugadores dependen de chats desorganizados en WhatsApp o páginas de Facebook desactualizadas, provocando traslados inútiles a las canchas por cambios de hora o reprogramaciones por clima no notificadas a tiempo.
- **Manejo de Efectivo e Invisibilidad:** El uso de efectivo en las canchas genera inseguridad. Además, la falta de un registro oficial de estadísticas (goles, tarjetas, Fair Play) limita el reconocimiento y la motivación del deportista.

---

### 2. El Usuario Objetivo (User Persona)

El usuario primario es el **Jugador de Fútbol Amateur (Barrial/Parroquial)**:

- **Perfil:** Hombres y mujeres de entre 18 y 35 años que compiten por socialización, salud y reconocimiento deportivo.
- **Comportamiento Tecnológico:** Usuarios pragmáticos. Exigen aplicaciones rápidas, livianas y de uso intuitivo desde sus dispositivos móviles.
- **Necesidad Principal:** Autonomía sobre su historial deportivo, transparencia en cobros/logística y validación de su rendimiento.

---

### 3. Solución MVP y los 4 Pilares Fundamentales

Para resolver estos problemas, el MVP de **SocialSoccer** se estructura en 4 módulos integrados:

1. **DataWallet (Perfil e Identidad Digital Única Interligas):**
   - Carnet digital único con código de verificación / QR.
   - Auto-registro para usar en múltiples ligas sin repetir papeleo.
   - El jugador recupera el control de su "pase" e historial de rendimiento.

2. **Fintech & Ticketing (Gestión Financiera Transparente):**
   - Cobro y pago digital de vocalías, multas e inscripciones (ej. botón Deuna / Tarjeta).
   - Venta y reserva de entradas (tickets digitales) para partidos definitorios o finales de liga.
   - Historial transaccional con badges de estado de pago.

3. **Agencia de AI & Logística Inteligente:**
   - Notificaciones push en tiempo real para cambios de hora, estado de la cancha o afectaciones por clima.
   - Panel de partidos con rival, cancha exacta y árbitro asignado.

4. **Gamificación, Fair Play & Evaluación Arbitral:**
   - Registro individual de estadísticas (goles, asistencias, tarjetas).
   - Sistema de puntuación Fair Play (0-100) y badges/logros desbloqueables.
   - Módulo de calificación por estrellas para evaluar el desempeño arbitral post-partido.

---

### 4. Stack Técnico y Arquitectura

- **Frontend:** Next.js (React) con Tailwind CSS para soporte dual (Modo Oscuro `#0B5FA5` y Modo Claro `#1D3557`).
- **Backend & ORM:** Node.js con Prisma ORM.
- **Base de Datos:** PostgreSQL.
- **Infraestructura Base:** Open SaaS.
- **Prototipado Visual (Google Stitch):** [Google Stitch Prototype](https://stitch.withgoogle.com/projects/11720181075081878902) (5 pantallas con variantes Modo Oscuro #0B5FA5 y Modo Claro #1D3557)
