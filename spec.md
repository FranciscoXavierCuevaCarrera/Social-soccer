Como Tech Lead, presento el siguiente **Resumen Ejecutivo** basado exclusivamente en los hallazgos de las entrevistas de investigación de la primera semana:

### 1. El Problema: Fragmentación, Burocracia e Incertidumbre Logística
La investigación revela que el "dolor" principal de los usuarios no es la falta de información, sino la **ineficiencia y falta de confiabilidad de los procesos actuales**, los cuales se dividen en tres áreas críticas:

*   **Burocracia Manual y Falta de Autonomía:** El proceso de inscripción es calificado como un "dolor de cabeza" debido a la exigencia de fotos físicas y copias de cédula. Existe una frustración significativa por la retención física de carnets y "pases" por parte de los dirigentes para impedir que los jugadores cambien de equipo.
*   **Incertidumbre Logística:** Los jugadores dependen de grupos de WhatsApp o páginas de Facebook que a menudo entregan información desactualizada. Esto provoca traslados innecesarios a las canchas ("ir de gana") cuando hay cambios de horario o cancelaciones de última hora que no se notifican a tiempo.
*   **Invisibilidad del Rendimiento y Seguridad:** No existe un registro centralizado y preciso de estadísticas individuales (goles, asistencias, tarjetas), lo que limita la motivación y el reconocimiento del jugador. Además, el manejo de efectivo en las canchas genera una percepción de inseguridad por riesgo de robos.

### 2. El Usuario Objetivo (User Persona)
El usuario identificado es el **Jugador de Fútbol Amateur (Barrial/Parroquial)**, con las siguientes características clave observadas:

*   **Perfil Demográfico y Motivacional:** Hombres de entre 18 y 26 años (según los entrevistados directos) que compiten por una mezcla de socialización y reconocimiento deportivo.
*   **Comportamiento Tecnológico:** Son usuarios pragmáticos; adoptan la tecnología solo si es funcional, liviana y precisa. Desinstalarían de inmediato una app que tenga "pantallas de carga infinitas", ocupe mucho espacio o muestre datos erróneos.
*   **Necesidades Psicológicas:** Buscan autonomía sobre su "pase" e identidad digital para no depender del "visto bueno" del dirigente. Valoran la transparencia y el reconocimiento de su progreso a través de datos.

### 3. La Solución MVP (Minimum Viable Product)
Para resolver los dolores prioritarios mencionados, la primera versión del software debe implementar las siguientes funcionalidades mínimas:

*   **Registro e Identidad Digital Única:** Módulo de auto-registro rápido que permita cargar documentos una sola vez para que sean válidos en múltiples ligas, eliminando el papeleo físico y devolviendo la autonomía del "pase" al jugador.
*   **Centralización Logística con Notificaciones Push:** Panel con horarios, rivales, árbitros asignados y, crucialmente, la **cancha específica** (ej. Cancha 1 o 2). Debe incluir alertas automáticas en tiempo real sobre cambios de última hora.
*   **Perfil Estadístico Individual:** Un apartado personalizado que registre de forma precisa goles, asistencias, tarjetas e historial de equipos para medir el rendimiento y facilitar traspasos.
*   **Módulo de Pagos Seguros:** Integración de pasarelas digitales (ej. Deuna, transferencias) para el pago de inscripciones, vocalías y multas, reduciendo el uso de efectivo en los complejos.
*   **Sistema de Incentivos (Gamificación):** Implementación de un sistema de "tokens" o puntos por **Fair Play** (juego limpio), puntualidad y asistencia, canjeables por beneficios tangibles como descuentos en indumentaria deportiva o implementos.
*   **Feedback Arbitral:** Funcionalidad para calificar el desempeño de los árbitros después de cada encuentro para mejorar la transparencia.# Specification Sheet (spec.md) — SocialSoccer MVP

## Resumen Ejecutivo

Como Tech Lead, presento el siguiente **Resumen Ejecutivo** basado en los hallazgos de las entrevistas de investigación y la definición técnica del proyecto:

### 1. El Problema: Fragmentación, Burocracia e Incertidumbre Logística
La investigación revela que el "dolor" principal de los usuarios es la ineficiencia y falta de confiabilidad de los procesos actuales en el fútbol amateur:

* **Burocracia Manual y Retención de Pases:** El proceso de inscripción exige fotos físicas y papeleo repetitivo. Existe una alta frustración por la retención física de carnets por parte de dirigentes para impedir que los jugadores cambien de equipo.
* **Incertidumbre Logística:** Los jugadores dependen de chats desorganizados en WhatsApp o páginas de Facebook desactualizadas, provocando traslados inútiles a las canchas por cambios de hora o reprogramaciones por clima no notificadas a tiempo.
* **Manejo de Efectivo e Invisibilidad:** El uso de efectivo en las canchas genera inseguridad. Además, la falta de un registro oficial de estadísticas (goles, tarjetas, Fair Play) limita el reconocimiento y la motivación del deportista.

---

### 2. El Usuario Objetivo (User Persona)
El usuario primario es el **Jugador de Fútbol Amateur (Barrial/Parroquial)**:

* **Perfil:** Hombres y mujeres de entre 18 y 35 años que compiten por socialización, salud y reconocimiento deportivo.
* **Comportamiento Tecnológico:** Usuarios pragmáticos. Exigen aplicaciones rápidas, livianas y de uso intuitivo desde sus dispositivos móviles.
* **Necesidad Principal:** Autonomía sobre su historial deportivo, transparencia en cobros/logística y validación de su rendimiento.

---

### 3. Solución MVP y los 4 Pilares Fundamentales
Para resolver estos problemas, el MVP de **SocialSoccer** se estructura en 4 módulos integrados:

1. **DataWallet (Perfil e Identidad Digital Única Interligas):**
   * Carnet digital único con código de verificación / QR.
   * Auto-registro para usar en múltiples ligas sin repetir papeleo.
   * El jugador recupera el control de su "pase" e historial de rendimiento.

2. **Fintech & Ticketing (Gestión Financiera Transparente):**
   * Cobro y pago digital de vocalías, multas e inscripciones (ej. botón Deuna / Tarjeta).
   * Venta y reserva de entradas (tickets digitales) para partidos definitorios o finales de liga.
   * Historial transaccional con badges de estado de pago.

3. **Agencia de AI & Logística Inteligente:**
   * Notificaciones push en tiempo real para cambios de hora, estado de la cancha o afectaciones por clima.
   * Panel de partidos con rival, cancha exacta y árbitro asignado.

4. **Gamificación, Fair Play & Evaluación Arbitral:**
   * Registro individual de estadísticas (goles, asistencias, tarjetas).
   * Sistema de puntuación Fair Play (0-100) y badges/logros desbloqueables.
   * Módulo de calificación por estrellas para evaluar el desempeño arbitral post-partido.

---

### 4. Stack Técnico y Arquitectura
* **Frontend:** Next.js (React) con Tailwind CSS para soporte dual (Modo Oscuro `#0B5FA5` y Modo Claro `#1D3557`).
* **Backend & ORM:** Node.js con Prisma ORM.
* **Base de Datos:** PostgreSQL.
* **Infraestructura Base:** Open SaaS.
* **Prototipado Visual (Google Stitch):** [Google Stitch Prototype](https://stitch.withgoogle.com/projects/11720181075081878902) (5 pantallas con variantes Modo Oscuro #0B5FA5 y Modo Claro #1D3557)