# RSVP en Neon

Proyecto: `danna-fabian` (`dark-rain-34458457`), rama `production`, base `neondb`.

- La página pública es `/rsvp`; `POST /api/rsvp` guarda las respuestas.
- Configurar `DATABASE_URL` en `.env.local` y en las variables privadas del hosting. No usar `NEXT_PUBLIC_` ni subir credenciales a Git.
- Ejecutar `npm run db:setup` para aplicar `db/schema.sql`. La operación es repetible.
- En producción, añadir `DATABASE_URL` al hosting y desplegar de nuevo.
- Las respuestas se consultan en la tabla `rsvp_responses` desde Neon. No hay un endpoint público para leer datos personales.
- `companions` contiene los nombres; `party_size` incluye a la persona principal (0 si no asiste).
- El identificador de envío evita duplicados al reintentar una misma respuesta. Un envío independiente es un registro nuevo; no reemplaza otras respuestas por correo.
- Pruebas de validación: `node --test tests/rsvp.test.mjs`.
