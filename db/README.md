# Invitaciones y RSVP en Neon

Proyecto `danna-fabian` (`dark-rain-34458457`), rama `production`, base `neondb`.

## Configuración

`DATABASE_URL` se configura como secreto del servidor, en `.env.local` y en Vercel Production. Nunca usar `NEXT_PUBLIC_`. `npm run db:setup` aplica los esquemas de forma repetible.

## Invitaciones

- `invitations` guarda nombre, cupos, clave de origen y SHA-256 del token. Cada enlace `/invitacion/<token>` usa 32 bytes aleatorios. Los tokens originales solo están en el archivo privado de enlaces y el manifiesto local, fuera del repositorio.
- `invitation_responses` tiene una única respuesta por invitación. Reenviar actualiza la misma fila; nombre y cupos se consultan en el servidor. No se acepta identidad ni cupos aportados por el navegador.
- `rsvp_responses` conserva las respuestas del formulario anterior. No se asignan a familias por similitud de nombres.
- `/rsvp` sin enlace personal muestra instrucciones; el endpoint requiere un token válido y activo.
- Las páginas personales son dinámicas, no indexables y no envían el token en el referrer. No hay un listado público de invitados.
- Quien tenga el enlace puede ver y modificar esa invitación. Compartir únicamente con su destinatario. Para revocar un enlace, poner `active=false` en Neon.

## Importación

`node --env-file=.env.local scripts/import-invitations.mjs fuente.json manifiesto-privado.json enlaces.html`

Fuente JSON: lista de `{sourceKey, name, seats, sourceRow}`. No guardar datos de invitados ni tokens en Git. La clave `sourceKey` debe permanecer estable en reimportaciones. Conservar el manifiesto privado: el importador reutiliza sus tokens y se detiene si faltan, para no invalidar enlaces existentes. No borra invitaciones ni respuestas de forma automática.

La importación inicial usa la lista del 28/09/2026: 69 invitaciones, 131 cupos. Por indicación de la organizadora se excluyó la fila 29, conservando la fila 54 (2 cupos).

## Consultar confirmaciones

```sql
SELECT i.display_name, i.seats AS cupos, r.attending, r.party_size AS confirmados,
       r.dietary_requirements, r.message, r.updated_at
FROM invitations i LEFT JOIN invitation_responses r ON r.invitation_id=i.id
ORDER BY i.display_name;
```

Pruebas: `node --test tests/rsvp.test.mjs`.
