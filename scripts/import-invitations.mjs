import { readFile, writeFile, mkdir, chmod } from 'node:fs/promises';
import { randomBytes, randomUUID, createHash } from 'node:crypto';
import { dirname } from 'node:path';
import { neon } from '@neondatabase/serverless';
const [sourcePath, manifestPath, outputPath] = process.argv.slice(2);
if (!sourcePath || !manifestPath || !outputPath || !process.env.DATABASE_URL) throw new Error('Required: source.json manifest.json output.html and DATABASE_URL');
const input=JSON.parse(await readFile(sourcePath,'utf8'));
if(new Set(input.map(x=>x.sourceKey)).size!==input.length || input.some(x=>!x.name || !Number.isInteger(x.seats) || x.seats<1 || x.seats>20)) throw new Error('Invalid input');
let manifest=[];
try { manifest=JSON.parse(await readFile(manifestPath,'utf8')); } catch(e) { if(e.code!=='ENOENT') throw e; }
const sql=neon(process.env.DATABASE_URL);
const schema=await readFile(new URL('../db/invitations.sql',import.meta.url),'utf8');
await sql.transaction(schema.split(';').map(s=>s.trim()).filter(Boolean).map(s=>sql.query(s)));
const existing=await sql`SELECT source_key,token_hash FROM invitations`;
const rows=input.map(x=>{
 const saved=manifest.find(m=>m.sourceKey===x.sourceKey);
 const db=existing.find(d=>d.source_key===x.sourceKey);
 if(db && (!saved || createHash('sha256').update(saved.token).digest('hex')!==db.token_hash)) throw new Error('Missing matching local token; refusing to rotate an existing invitation');
 return {...x,id:saved?.id||randomUUID(),token:saved?.token||randomBytes(32).toString('hex')};
});
await mkdir(dirname(manifestPath),{recursive:true});
await writeFile(manifestPath,JSON.stringify(rows,null,2),{mode:0o600}); await chmod(manifestPath,0o600);
await sql.transaction(rows.map(x=>sql`INSERT INTO invitations(id,source_key,display_name,seats,token_hash)
 VALUES(${x.id},${x.sourceKey},${x.name},${x.seats},${createHash('sha256').update(x.token).digest('hex')})
 ON CONFLICT(source_key) DO UPDATE SET display_name=EXCLUDED.display_name,seats=EXCLUDED.seats`));
const keys=rows.map(x=>x.sourceKey);
const counts=await sql`SELECT count(*)::int AS invitations,sum(seats)::int AS seats FROM invitations WHERE source_key=ANY(${keys}::text[])`;
if(counts[0].invitations!==rows.length || counts[0].seats!==rows.reduce((a,x)=>a+x.seats,0)) throw new Error('Import mismatch');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const html=`<!doctype html><html lang="es"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="referrer" content="no-referrer"><title>Invitaciones · Fabián y Danna </title><style>body{font:15px system-ui;background:#f5f2ea;color:#293c35;max-width:1100px;margin:40px auto;padding:20px}h1{font:42px Georgia}table{border-collapse:collapse;width:100%;background:white}td,th{padding:15px;text-align:left;border-bottom:1px solid #ddd}a{color:#293c35}input{padding:14px;width:90%;margin:20px 0}small{line-height:1.8}code{overflow-wrap:anywhere;font-size:11px}button{padding:8px;margin:4px;cursor:pointer}</style><h1>Danna &amp; Fabián</h1><p>${rows.length} invitaciones · ${counts[0].seats} cupos</p><small>Comparte cada enlace únicamente con la persona o familia correspondiente. El enlace permite ver y modificar su confirmación. Esta lista es privada.</small><input id="search" placeholder="Buscar persona o familia" aria-label="Buscar invitación"><table><thead><tr><th>Invitación</th><th>Cupos</th><th>Enlace personal</th></tr></thead><tbody>${rows.map(x=>{const shortToken=createHash("sha256").update(x.token).digest().subarray(0,12).toString("base64url");const url=`https://danna-fabian.vercel.app/?token=${shortToken}`;return `<tr><td>${esc(x.name)}</td><td>${x.seats}</td><td><a href="${url}" target="_blank" rel="noreferrer">Abrir invitación</a><br><code>${url}</code></td></tr>`}).join('')}</tbody></table><script>document.querySelector('#search').addEventListener('input',e=>{for(const r of document.querySelectorAll('tbody tr'))r.hidden=!r.cells[0].textContent.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())})</script></html>`;
await mkdir(dirname(outputPath),{recursive:true});await writeFile(outputPath,html,{mode:0o600});
console.log('Importación verificada:',counts[0]);
