# Malvinas Argentinas — diseño Figma

## Enlaces

| Recurso | URL |
|--------|-----|
| Archivo (design) | https://www.figma.com/design/hhKwmp5llRxyf8VQ4FYmDy/Malvinas-Argentinas |
| Prototipo (Flow 1, inicio) | https://www.figma.com/proto/hhKwmp5llRxyf8VQ4FYmDy/Malvinas-Argentinas?node-id=1-198 |
| Nodo compartido | `1:2086` (vista general en canvas) |
| File key | `hhKwmp5llRxyf8VQ4FYmDy` |

## Contenido del diseño (app móvil)

App de **Talleres Culturales / Talleres Municipales** para la Municipalidad de Malvinas Argentinas.

### Pantallas identificadas

1. **Login** — “Talleres Culturales”, DNI y contraseña, registro.
2. **Catálogo de talleres** — búsqueda, filtro, temáticas (Música, Tecnología, Artes plásticas).
3. **Detalle de curso** — ej. Guitarra Acústica, requisitos, inscripción.
4. **Inscripción confirmada** — carnet digital con QR.
5. **Mi perfil** — datos, configuración, cerrar sesión.
6. **Editar perfil** — avatar, campos editables.
7. **Mi agenda** — calendario, alertas de asistencia, próximas clases.
8. **Notificaciones** — alertas, cambios de aula, inscripciones.

### Paleta (aprox.)

- Azul institucional (textos, botones primarios): ~`#1D3567` / `#002D72`
- Verde lima (CTA secundario / acentos): ~`#BFFF66` / `#74C044`
- Fondos: blanco y grises claros para inputs y tarjetas

## Carpeta `reference/`

Capturas PNG exportadas desde el prototipo y el canvas de Figma (referencia visual). **No sustituyen** assets vectoriales ni el código generado por Figma MCP.

| Archivo | Descripción |
|---------|-------------|
| `canvas-overview.png` | Vista general de todas las pantallas en el archivo |
| `screen-01-login.png` | Pantalla de ingreso |
| `screen-02-catalogo-talleres.png` | Listado de talleres |
| `screen-03-mi-agenda.png` | Agenda y próximas clases |
| `screen-04-notificaciones.png` | Centro de notificaciones |

## Acceso Figma MCP (pendiente)

La integración de Figma en Cursor está autenticada como **GinkGo Devs** (`ginkgodevs@gmail.com`), plan Pro, asiento Full.

Al intentar leer el archivo aparece: *“You don't have edit access to this file”*. Sin permiso de **edición** en ese archivo, no se pueden descargar assets SVG/PNG ni obtener `get_design_context` para implementación.

### Qué hacer

1. Abrí el archivo en Figma con la cuenta que lo creó.
2. **Share** → invitá a `ginkgodevs@gmail.com` con permiso **Can edit**  
   **o** mové el archivo al team **El equipo de Ginkgo Devs**.
3. Avisame cuando esté listo: vuelvo a ejecutar la exportación completa (assets, tokens y base de código).

Documentación: [Figma MCP — permisos](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)

## Módulo Salud (demo HTML)

Implementado en [demo/](../../demo/) como mock sin backend:

- Tabs **Talleres · Salud · Perfil** en el mockup móvil.
- **Salud:** salitas → profesionales por salita → turnos → confirmación (estado en memoria de sesión).
- **Perfil:** datos, historial clínico, vacunación (modal registrar), reservas de salud.

Datos ficticios en `demo/data/mock.js`.

## Próximo paso sugerido

Con acceso corregido:

- Exportar cada frame a `design/figma/assets/`
- Generar proyecto (React Native / Expo o web según prefieras) alineado al diseño
- Aplicar las modificaciones que necesites sobre esa base
