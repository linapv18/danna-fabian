import { readFile } from 'node:fs/promises';
import { neon } from '@neondatabase/serverless';
if (!process.env.DATABASE_URL) throw new Error('Falta DATABASE_URL');
const sql = neon(process.env.DATABASE_URL);
const schema = (await Promise.all(['schema.sql', 'invitations.sql'].map(file => readFile(new URL('../db/' + file, import.meta.url), 'utf8')))).join('\n');
await sql.transaction(schema.split(';').map(s => s.trim()).filter(Boolean).map(s => sql.query(s)));
console.log('Esquema RSVP listo.');
