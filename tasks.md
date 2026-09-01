# SpecKit Tasks — Social Soccer MVP

Este documento contiene el desglose de tareas técnicas y funcionales del proyecto **Social Soccer MVP**.

El documento debe mantenerse alineado con la implementación real del repositorio. Una tarea se considera completada solamente cuando la funcionalidad correspondiente existe, está integrada y puede ejecutarse correctamente en el entorno actual.

---

# Estado general del proyecto

**Fase actual:** Beta cerrada / preparación pre-producción.

**Fases técnicas completadas:**

- ✅ Configuración de base de datos y modelos principales.
- ✅ Sistema visual y navegación principal.
- ✅ Dashboard de usuario.
- ✅ Módulos principales del MVP.
- ✅ Queries y actions backend.
- ✅ Autenticación.
- ✅ Control básico de permisos.
- ✅ Gestión de partidos.
- ✅ Cancelación de partidos.
- ✅ Evaluación arbitral.
- ✅ Correcciones de compilación TypeScript.
- ✅ Compilación Wasp exitosa.

**En curso:**

- 🟡 Actualización y consolidación de documentación.
- 🟡 Actualización de pruebas E2E.
- 🟡 Auditoría funcional pre-producción.
- 🟡 Preparación del despliegue en Railway.
- 🟡 Pruebas con usuarios beta.

**Pendiente para una fase posterior:**

- 🔴 Correo de producción con proveedor real.
- 🔴 Dominio propio.
- 🔴 Integraciones financieras reales.
- 🔴 Notificaciones push.
- 🔴 Integración meteorológica automática.
- 🔴 Gamificación avanzada.
- 🔴 DataWallet interoperable entre ligas.

---

# Fase 1 — Configuración de base de datos

## Task 1.1 — Modelo de usuario y perfil deportivo

- [x] Crear `User`.
- [x] Crear `PlayerProfile`.
- [x] Relacionar `User` y `PlayerProfile` mediante relación 1-a-1.
- [x] Incorporar información deportiva básica.
- [x] Incorporar identificador QR del perfil.

**Estado:** ✅ Completado.

---

## Task 1.2 — Modelo de partidos y logística

- [x] Crear `Match`.
- [x] Crear `Field`.
- [x] Crear `Referee`.
- [x] Relacionar partido con cancha.
- [x] Relacionar partido con árbitro.
- [x] Registrar fecha y hora.
- [x] Registrar límite de jugadores.
- [x] Registrar usuario creador.
- [x] Registrar estado del partido.
- [x] Permitir estado `CANCELLED`.

**Estado:** ✅ Completado.

---

## Task 1.3 — Modelo de jugadores inscritos

- [x] Crear `MatchPlayer`.
- [x] Relacionar jugador con partido.
- [x] Crear restricción única `(matchId, userId)`.
- [x] Permitir inscripción.
- [x] Permitir salida del partido.

**Estado:** ✅ Completado.

---

## Task 1.4 — Modelo financiero y ticketing

- [x] Crear `Payment`.
- [x] Crear `Ticket`.
- [x] Relacionar pagos con usuario.
- [x] Relacionar pagos opcionalmente con partido.
- [x] Relacionar tickets con partido.
- [x] Registrar monto y concepto.
- [x] Registrar estado de la transacción.

**Estado:** 🟡 Parcial / demostrativo.

La estructura está implementada, pero las integraciones financieras reales todavía están pendientes.

---

## Task 1.5 — Estadísticas y evaluación arbitral

- [x] Crear `PlayerStats`.
- [x] Crear `RefereeRating`.
- [x] Registrar goles.
- [x] Registrar asistencias.
- [x] Registrar tarjetas.
- [x] Registrar Fair Play.
- [x] Registrar calificación arbitral de 1 a 5 estrellas.

**Estado:** ✅ Completado para el alcance actual del MVP.

---

## Task 1.6 — Migraciones y sincronización

- [x] Ejecutar migraciones de desarrollo.
- [x] Generar cliente Prisma mediante Wasp.
- [x] Validar compilación del esquema.
- [x] Verificar funcionamiento de PostgreSQL local.

**Estado:** ✅ Completado.

---

# Fase 2 — UI, identidad visual y navegación

## Task 2.1 — Sistema visual

- [x] Configurar Tailwind CSS.
- [x] Implementar identidad visual de Social Soccer.
- [x] Implementar colores institucionales.
- [x] Mantener soporte de modo claro.
- [x] Mantener soporte de modo oscuro.

**Estado:** ✅ Completado.

---

## Task 2.2 — Landing Page

- [x] Crear identidad visual propia.
- [x] Crear hero de Social Soccer.
- [x] Crear sección de soluciones.
- [x] Crear sección “Cómo funciona”.
- [x] Crear sección de plataforma.
- [x] Crear llamadas a registro y login.
- [x] Crear footer propio.
- [x] Eliminar contenido visible heredado de Open SaaS.

**Estado:** ✅ Completado.

---

## Task 2.3 — Dashboard

- [x] Crear ruta `/app`.
- [x] Crear dashboard autenticado.
- [x] Mostrar accesos a los principales módulos.
- [x] Redirigir al administrador al área administrativa correspondiente.

**Estado:** ✅ Completado.

---

## Task 2.4 — Navegación

- [x] Crear navegación pública.
- [x] Crear navegación autenticada.
- [x] Añadir acceso a Partidos.
- [x] Añadir acceso a Organizar Partido.
- [x] Añadir acceso a Mi Perfil.
- [x] Añadir acceso a Estadísticas.
- [x] Añadir acceso a Finanzas.
- [x] Eliminar enlaces heredados de Documentation y Blog.
- [x] Corregir enlaces de navegación de la landing.

**Estado:** ✅ Completado.

---

# Fase 3 — Autenticación e identidad

## Task 3.1 — Registro y login

- [x] Implementar registro por email.
- [x] Implementar login.
- [x] Implementar recuperación de contraseña.
- [x] Configurar redirección posterior al login a `/app`.
- [x] Validar sesión autenticada.

**Estado:** ✅ Completado.

---

## Task 3.2 — Verificación de correo durante beta

- [x] Mantener preparado el flujo de verificación de correo.
- [x] Configurar `SKIP_EMAIL_VERIFICATION_IN_DEV=true` para desarrollo.
- [x] Verificar que los usuarios beta pueden registrarse sin depender del correo durante las pruebas locales.
- [x] Mantener el bypass fuera de producción.

**Estado:** ✅ Completado para la beta local.

---

## Task 3.3 — Perfil deportivo

- [x] Mostrar información del jugador.
- [x] Permitir actualización de perfil.
- [x] Mostrar información deportiva.
- [x] Integrar estadísticas del jugador.

**Estado:** ✅ Completado para el alcance actual.

---

# Fase 4 — Gestión de partidos

## Task 4.1 — Lista de partidos

- [x] Crear `MatchListPage`.
- [x] Consultar próximos partidos.
- [x] Mostrar fecha y hora.
- [x] Mostrar cancha.
- [x] Mostrar árbitro.
- [x] Mostrar cantidad de jugadores.
- [x] Mostrar disponibilidad de cupos.
- [x] Acceder al detalle del partido.

**Estado:** ✅ Completado.

---

## Task 4.2 — Crear partido

- [x] Crear formulario de partido.
- [x] Validar ubicación.
- [x] Validar fecha y hora.
- [x] Validar máximo de jugadores.
- [x] Permitir asignar árbitro opcional.
- [x] Registrar creador del partido.
- [x] Impedir creación con fecha pasada.

**Estado:** ✅ Completado.

---

## Task 4.3 — Detalle del partido

- [x] Mostrar información del encuentro.
- [x] Mostrar cancha.
- [x] Mostrar jugadores inscritos.
- [x] Mostrar disponibilidad.
- [x] Mostrar estado del partido.

**Estado:** ✅ Completado.

---

## Task 4.4 — Inscripción

- [x] Permitir inscripción.
- [x] Impedir doble inscripción.
- [x] Impedir inscripción cuando el partido está lleno.
- [x] Impedir inscripción después del inicio.
- [x] Impedir inscripción en partidos cancelados.

**Estado:** ✅ Completado.

---

## Task 4.5 — Salida del partido

- [x] Permitir al usuario salir del partido.
- [x] Validar que exista una inscripción.
- [x] Eliminar correctamente la inscripción.

**Estado:** ✅ Completado.

---

## Task 4.6 — Cancelación de partidos

- [x] Crear action `cancelMatch`.
- [x] Validar autenticación.
- [x] Validar existencia del partido.
- [x] Validar que el partido no esté previamente cancelado.
- [x] Impedir cancelación de partidos ya iniciados.
- [x] Permitir cancelación al creador.
- [x] Permitir cancelación a administradores.
- [x] Impedir cancelación por usuarios no autorizados.
- [x] Cambiar estado a `CANCELLED`.
- [x] Mantener los registros históricos.
- [x] Ocultar partidos cancelados de la lista de próximos partidos.
- [x] Mostrar claramente el estado CANCELADO en el detalle.

**Estado:** ✅ Completado.

---

# Fase 5 — Árbitros y Fair Play

## Task 5.1 — Gestión básica de árbitros

- [x] Consultar árbitros.
- [x] Mostrar nombre.
- [x] Mostrar placa.
- [x] Mostrar promedio de valoración.
- [x] Asignar árbitro a un partido.

**Estado:** ✅ Completado.

---

## Task 5.2 — Evaluación arbitral

- [x] Seleccionar árbitro.
- [x] Seleccionar partido.
- [x] Registrar estrellas.
- [x] Registrar comentarios.
- [x] Recalcular promedio del árbitro.

**Estado:** ✅ Completado.

---

## Task 5.3 — Fair Play avanzado

- [ ] Implementar sistema completo de puntos.
- [ ] Implementar badges.
- [ ] Implementar logros.
- [ ] Implementar ranking.
- [ ] Implementar recompensas.

**Estado:** 🔴 Pendiente.

---

# Fase 6 — Estadísticas

## Task 6.1 — Estadísticas básicas

- [x] Mostrar goles.
- [x] Mostrar asistencias.
- [x] Mostrar tarjetas amarillas.
- [x] Mostrar tarjetas rojas.
- [x] Mostrar Fair Play.
- [x] Mostrar partidos jugados.

**Estado:** ✅ Completado para el alcance actual.

---

## Task 6.2 — Estadísticas avanzadas

- [ ] Historial por temporada.
- [ ] Comparación de rendimiento.
- [ ] Rankings.
- [ ] Estadísticas por equipo.
- [ ] Estadísticas por liga.

**Estado:** 🔴 Pendiente.

---

# Fase 7 — Finanzas y Ticketing

## Task 7.1 — Historial financiero

- [x] Mostrar pagos.
- [x] Mostrar concepto.
- [x] Mostrar monto.
- [x] Mostrar estado.
- [x] Asociar pagos con partidos cuando corresponda.

**Estado:** ✅ Implementado.

---

## Task 7.2 — Ticketing

- [x] Crear ticket digital.
- [x] Asociar ticket con usuario.
- [x] Asociar ticket con partido.
- [x] Generar token QR.

**Estado:** 🟡 Implementado a nivel MVP / demostrativo.

---

## Task 7.3 — Pagos reales

- [ ] Integrar proveedor de pagos definitivo.
- [ ] Configurar credenciales de producción.
- [ ] Implementar webhooks.
- [ ] Validar transacciones.
- [ ] Implementar conciliación.
- [ ] Definir política de reembolsos.

**Estado:** 🔴 Pendiente.

---

# Fase 8 — Notificaciones y logística inteligente

## Task 8.1 — Alertas logísticas

- [ ] Notificaciones push reales.
- [ ] Notificación de cambios de horario.
- [ ] Notificación de cambio de cancha.
- [ ] Notificación de cancelación.
- [ ] Notificación a jugadores inscritos.

**Estado:** 🔴 Pendiente.

---

## Task 8.2 — Meteorología

- [ ] Integrar API meteorológica.
- [ ] Obtener condiciones del partido.
- [ ] Detectar alertas meteorológicas.
- [ ] Notificar cambios relevantes.

**Estado:** 🔴 Pendiente.

---

# Fase 9 — Beta cerrada

## Task 9.1 — Preparar beta

- [x] Definir grupo inicial reducido de usuarios.
- [x] Permitir registro simplificado durante desarrollo.
- [x] Validar flujo de login.
- [x] Validar dashboard.
- [x] Validar partidos.
- [x] Validar inscripción.
- [x] Validar cancelación.

**Estado:** 🟡 En curso.

---

## Task 9.2 — Recopilar feedback

- [ ] Preparar formulario de feedback.
- [ ] Registrar errores reportados.
- [ ] Registrar problemas de navegación.
- [ ] Registrar problemas de usabilidad móvil.
- [ ] Priorizar mejoras.
- [ ] Ejecutar segunda ronda de pruebas.

**Estado:** 🔴 Pendiente.

---

# Fase 10 — Calidad y pruebas pre-producción

## Task 10.1 — TypeScript y build

- [x] Corregir errores TypeScript.
- [x] Ejecutar compilación Wasp.
- [x] Ejecutar bundle del servidor.
- [x] Verificar Vite.

**Estado:** ✅ Completado.

---

## Task 10.2 — Formato y lint

- [ ] Ejecutar lint.
- [ ] Ejecutar Prettier check.
- [ ] Corregir errores restantes.
- [ ] Validar working tree limpio después del commit.

**Estado:** 🟡 Pendiente de auditoría final.

---

## Task 10.3 — E2E

- [ ] Actualizar pruebas para utilizar `/app`.
- [ ] Actualizar pruebas de partidos a `MatchListPage`.
- [ ] Añadir prueba de creación.
- [ ] Añadir prueba de inscripción.
- [ ] Añadir prueba de salida.
- [ ] Añadir prueba de cancelación.
- [ ] Añadir prueba de permisos.
- [ ] Añadir prueba del flujo de evaluación arbitral.

**Estado:** 🟡 Pendiente de actualización.

---

# Fase 11 — Documentación y limpieza del repositorio

## Task 11.1 — Documentación técnica

- [x] Actualizar `spec.md`.
- [x] Actualizar `plan.md`.
- [x] Actualizar README principal de la aplicación.
- [ ] Actualizar `tasks.md`.
- [ ] Actualizar documentación de Spec Kit específica del MVP.
- [ ] Revisar documentos adicionales del proyecto.

**Estado:** 🟡 En curso.

---

## Task 11.2 — Identidad del proyecto

- [x] Cambiar nombre visible a Social Soccer.
- [x] Cambiar título de la aplicación.
- [x] Eliminar identidad visible de Open SaaS.
- [x] Eliminar enlaces a Documentation y Blog del template.
- [x] Eliminar contenido heredado no utilizado de la landing.
- [x] Actualizar metadata SEO.
- [x] Actualizar Schema.org.
- [ ] Revisar nombre del paquete npm.
- [ ] Revisar documentación heredada restante.

**Estado:** 🟡 En curso.

---

# Fase 12 — Preparación para Railway

## Task 12.1 — Producción

- [ ] Crear proyecto en Railway.
- [ ] Crear PostgreSQL de producción.
- [ ] Configurar `DATABASE_URL`.
- [ ] Configurar `WASP_WEB_CLIENT_URL`.
- [ ] Configurar `WASP_SERVER_URL`.
- [ ] Revisar variables de entorno.
- [ ] Eliminar bypass de verificación de correo.
- [ ] Configurar proveedor de correo real.
- [ ] Configurar autenticación de producción.

**Estado:** 🔴 Pendiente.

---

## Task 12.2 — Seguridad

- [ ] Revisar secretos.
- [ ] Confirmar que `.env.server` no está versionado.
- [ ] Confirmar que `.env.client` no está versionado.
- [ ] Revisar permisos administrativos.
- [ ] Revisar endpoints sensibles.
- [ ] Revisar validaciones de backend.
- [ ] Revisar políticas de acceso.

**Estado:** 🟡 Pendiente de auditoría final.

---

# Fase 13 — Presentación empresarial

## Task 13.1 — Preparación del MVP para presentación

- [ ] Finalizar beta cerrada.
- [ ] Recopilar experiencias de los usuarios.
- [ ] Analizar errores.
- [ ] Priorizar mejoras.
- [ ] Implementar mejoras críticas.
- [ ] Ejecutar regresión completa.
- [ ] Preparar demo empresarial.
- [ ] Preparar documentación técnica.
- [ ] Preparar presentación funcional.

**Estado:** 🔴 Pendiente.

---

# Matriz de estado actual

| Área                    | Estado |
| ----------------------- | ------ |
| Base de datos           | ✅     |
| Prisma                  | ✅     |
| Autenticación           | ✅     |
| Dashboard               | ✅     |
| Perfil deportivo        | ✅     |
| Partidos                | ✅     |
| Inscripciones           | ✅     |
| Cancelación             | ✅     |
| Árbitros                | ✅     |
| Evaluación arbitral     | ✅     |
| Estadísticas básicas    | ✅     |
| Finanzas                | 🟡     |
| Ticketing               | 🟡     |
| Fair Play avanzado      | 🔴     |
| Notificaciones push     | 🔴     |
| Meteorología automática | 🔴     |
| Pagos reales            | 🔴     |
| Correo de producción    | 🔴     |
| E2E actualizado         | 🟡     |
| Documentación           | 🟡     |
| Railway                 | 🔴     |
| Beta cerrada            | 🟡     |

---

# Criterio de entrada a producción

Social Soccer no debe considerarse listo para producción hasta cumplir como mínimo:

- [ ] Build Wasp exitoso.
- [ ] TypeScript sin errores.
- [ ] Lint sin errores bloqueantes.
- [ ] Prettier check correcto.
- [ ] E2E actualizado y ejecutado correctamente.
- [ ] Flujos de autenticación validados.
- [ ] Creación de partido validada.
- [ ] Inscripción validada.
- [ ] Salida de partido validada.
- [ ] Cancelación validada.
- [ ] Permisos de cancelación validados.
- [ ] Evaluación arbitral validada.
- [ ] Variables de producción configuradas.
- [ ] PostgreSQL de producción configurado.
- [ ] Correo de producción configurado.
- [ ] Bypass de verificación eliminado de producción.
- [ ] Secretos fuera de GitHub.
- [ ] Documentación actualizada.

---

# Estado del documento

Este archivo representa el estado de implementación del **Social Soccer MVP** y debe actualizarse cada vez que una funcionalidad pase de pendiente a implementada o cambie de alcance.

# La prioridad inmediata es completar la **beta cerrada, la auditoría pre-producción y el despliegue controlado en Railway**.

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
