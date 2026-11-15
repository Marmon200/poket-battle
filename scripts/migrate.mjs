// Run by the developer with their Cloudflare credentials, never by a public client.
import {spawnSync} from 'node:child_process';
const args=process.argv.slice(2),remote=args.includes('--remote'),name=args.find(a=>!a.startsWith('--'))||'poket-battle';
if(!/^[A-Za-z0-9_-]+$/.test(name))throw new Error('Invalid D1 database name.');
function wrangler(args){const r=spawnSync(process.platform==='win32'?'npx.cmd':'npx',['--no-install','wrangler',...args],{encoding:'utf8'});if(r.status!==0)throw new Error(r.stderr||r.stdout||'Install wrangler and authenticate first.');return r.stdout}
const target=remote?'--remote':'--local';
const info=JSON.parse(wrangler(['d1','execute',name,target,'--command','PRAGMA table_info(club_users)','--json']));
const columns=info.flatMap(r=>r.results||[]);
if(columns.length&&!columns.some(c=>c.name==='email_verified')){wrangler(['d1','execute',name,target,'--command','ALTER TABLE club_users ADD COLUMN email_verified INTEGER NOT NULL DEFAULT 1']);console.log('Legacy email verification column added.');}
console.log(wrangler(['d1','migrations','apply',name,target]));
