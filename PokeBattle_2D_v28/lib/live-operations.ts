import {byNum,stadiumTypes} from './rules';
import {validReward,grantReward,addPassXP,xpAwards} from './live-progress';
import {raidRoute} from './raid';
export function isAdmin(u:any,env:any){return !!u?.email_verified&&String(env.ADMIN_EMAILS||'').split(',').map(e=>e.trim().toLowerCase()).filter(Boolean).includes(u.email.toLowerCase())}
export async function activeSeasons(db:any){const rows=await db.prepare("SELECT * FROM club_live_content WHERE kind='pass' AND starts<=? AND ends>?").bind(Date.now(),Date.now()).all();return rows.results.map((r:any)=>({...JSON.parse(r.data),id:r.id,starts:r.starts,ends:r.ends}))}
export async function liveRoute(c:any){
 const {path,body,db,u,env,fail,json,mutate}=c;
 const admin=isAdmin(u,env);
 if(path==='live-access')return json({admin});
 if(path==='live-catalog'){
   const rows=await db.prepare('SELECT * FROM club_live_content WHERE ends>? ORDER BY starts').bind(Date.now()).all();
   return json({events:rows.results.filter((r:any)=>r.kind==='event').map(view),seasons:rows.results.filter((r:any)=>r.kind==='pass').map(view),serverTime:Date.now()});
 }
 if(path==='pass-unlock'||path==='pass-claim'){
   const row=await db.prepare("SELECT * FROM club_live_content WHERE id=? AND kind='pass'").bind(String(body.id||'')).first();
   if(!row||Date.now()<row.starts||Date.now()>=row.ends)fail('Stagione non attiva.');const season=view(row);
   return json(await mutate(db,u.id,(s:any)=>{s.passes=s.passes||{};const p=s.passes[row.id]||{xp:0,unlocked:false,claimed:[]};s.passes[row.id]=p;
     if(path==='pass-unlock'){if(p.unlocked)return {already:true};if(s.coins<season.cost)fail('Monete insufficienti.');s.coins-=season.cost;p.unlocked=true;return {unlocked:true}}
     const level=body.level;if(!Number.isInteger(level)||level<1||level>100||Math.floor(p.xp/100)<level)fail('Livello non ancora raggiunto.');
     if(season.cost>0&&!p.unlocked)fail('Sblocca prima il Battle Pass.');if(p.claimed.includes(level))return {already:true};const reward=season.rewards[level-1];if(!reward)fail('Questo livello non contiene premi.');grantReward(s,reward);p.claimed.push(level);return {reward};
   }));
 }
 if(path.startsWith('event-'))return raidRoute(c,{xpAwards,addPassXP,activeSeasons,grantReward});
 if(!path.startsWith('admin-'))return null;
 if(!admin)fail('Accesso riservato agli amministratori.',403);
 await c.rate(db,'admin:'+u.id,120);
 const audit=async(action:string,target:string,details:any)=>db.prepare('INSERT INTO club_admin_audit(id,actor,action,target,details,created) VALUES(?,?,?,?,?,?)').bind(crypto.randomUUID(),u.id,action,target,JSON.stringify(details),Date.now()).run();
 if(path==='admin-content'){const rows=await db.prepare('SELECT * FROM club_live_content ORDER BY starts DESC').all();return json({content:rows.results.map(view)})}
 if(path==='admin-save'){
   const kind=body.kind;if(!['event','pass'].includes(kind))fail('Tipo di contenuto non valido.');
   const title=String(body.title||'').trim();if(title.length<3||title.length>80)fail('Il titolo deve avere da 3 a 80 caratteri.');
   const starts=Number(body.starts),ends=Number(body.ends);if(!Number.isSafeInteger(starts)||!Number.isSafeInteger(ends)||starts>=ends||ends<Date.now())fail('Intervallo di date non valido.');
   let cover=String(body.cover||''),coverType=body.coverType==='video'?'video':'image';
   if(cover){try{const url=new URL(cover);if(url.protocol!=='https:'||url.username||url.password||cover.length>2000)throw 0}catch{fail('La copertina deve essere un URL HTTPS di immagine o video.')}}
   let data:any={title,cover,coverType};
   if(kind==='event'){
     if(!Array.isArray(body.team)||!body.team.length||body.team.length>6||body.team.some((m:any)=>!byNum(m.num)||!Number.isInteger(m.level)||m.level<1||m.level>100))fail('Scegli da 1 a 6 Pokémon e livelli da 1 a 100.');
     if(!Object.hasOwn(stadiumTypes,body.stadium))fail('Campo non valido.');
     let reward;try{reward=validReward(body.reward)}catch(e:any){fail(e.message)}if(reward?.kind!=='pokemon')fail('Scegli il Pokémon premio e il suo livello.');
     data={...data,team:body.team.map((m:any)=>({num:m.num,level:m.level})),reward,stadium:body.stadium};
   }else{
     if(!Number.isInteger(body.cost)||body.cost<0||body.cost>100000)fail('Costo non valido.');
     if(!Array.isArray(body.rewards)||body.rewards.length!==100)fail('Il Battle Pass deve contenere esattamente 100 livelli.');
     try{data={...data,cost:body.cost,rewards:body.rewards.map(validReward)}}catch(e:any){fail(e.message)}
   }
   let id=body.id||crypto.randomUUID();if(typeof id!=='string'||id.length>80)fail('Identificativo non valido.');
   if(body.id){const old=await db.prepare('SELECT * FROM club_live_content WHERE id=?').bind(id).first();if(!old||old.kind!==kind)fail('Contenuto non trovato.');if(Date.now()>=old.starts)fail('Un contenuto già iniziato non può essere modificato: crea una nuova stagione o un nuovo evento.');}
   await db.prepare('INSERT INTO club_live_content(id,kind,data,starts,ends,updated) VALUES(?,?,?,?,?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data,starts=excluded.starts,ends=excluded.ends,updated=excluded.updated,version=version+1').bind(id,kind,JSON.stringify(data),starts,ends,Date.now()).run();await audit('save-'+kind,id,{title,starts,ends});return json({ok:true,id});
 }
 if(path==='admin-users'){
   const q=String(body.query||'').trim().slice(0,100);if(q.length<2)fail('Inserisci almeno due caratteri.');
   const escaped=q.replace(/[\\%_]/g,'\\$&');
   const rows=await db.prepare("SELECT u.id,u.email,u.state,u.created,b.reason FROM club_users u LEFT JOIN club_bans b ON b.user_id=u.id WHERE u.id=? OR u.email LIKE ? ESCAPE '\\' OR json_extract(u.state,'$.name') LIKE ? ESCAPE '\\' ORDER BY u.created DESC LIMIT 30").bind(q,'%'+escaped+'%','%'+escaped+'%').all();
   return json({users:rows.results.map((r:any)=>({id:r.id,email:r.email,name:JSON.parse(r.state).name,coins:JSON.parse(r.state).coins,created:r.created,banned:!!r.reason,reason:r.reason}))});
 }
 if(path==='admin-coins'){
   if(!Number.isInteger(body.amount)||body.amount<1||body.amount>100000)fail('Inserisci da 1 a 100.000 monete.');
   if(!await db.prepare('SELECT id FROM club_users WHERE id=?').bind(String(body.userId)).first())fail('Allenatore non trovato.');
   // Idempotency survives retries; both the credit and its receipt share one CAS update.
   if(typeof body.operationId!=='string'||!/^[-\w]{16,80}$/.test(body.operationId))fail('Identificativo operazione non valido.');
   const receipt='admin:'+u.id+':'+body.operationId;
   const updated=await mutate(db,body.userId,(s:any)=>{s.adminCredits=s.adminCredits||[];if(s.adminCredits.includes(receipt))return {already:true};s.adminCredits.push(receipt);s.coins+=body.amount;return {credited:body.amount}});
   await audit('coins',body.userId,{amount:body.amount,operationId:body.operationId,already:!!updated.result.already});return json({ok:true,coins:updated.coins});
 }
 if(path==='admin-ban'){
   if(body.userId===u.id)fail('Non puoi bannare il tuo account.');
   const target=await db.prepare('SELECT * FROM club_users WHERE id=?').bind(String(body.userId)).first();if(!target)fail('Allenatore non trovato.');if(isAdmin(target,env))fail('Gestisci gli altri amministratori dalla configurazione del server.');
   if(typeof body.banned!=='boolean')fail('Stato non valido.');const reason=String(body.reason||'Violazione delle regole').trim().slice(0,200)||'Violazione delle regole';
   if(body.banned)await db.batch([db.prepare('INSERT INTO club_bans(user_id,reason,created) VALUES(?,?,?) ON CONFLICT(user_id) DO UPDATE SET reason=excluded.reason,created=excluded.created').bind(target.id,reason,Date.now()),db.prepare('DELETE FROM club_sessions WHERE user_id=?').bind(target.id)]);
   else await db.prepare('DELETE FROM club_bans WHERE user_id=?').bind(target.id).run();await audit(body.banned?'ban':'unban',target.id,{reason});return json({ok:true});
 }
 fail('Operazione admin non disponibile.',404);
}
function view(r:any){return {...JSON.parse(r.data),id:r.id,kind:r.kind,starts:r.starts,ends:r.ends,version:r.version}}
