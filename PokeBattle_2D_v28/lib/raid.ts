import {basePool,byNum,settle,snapshot,terrainBonus,markPokedexSeen} from './rules';
import {typeEffectiveness} from './arena';
import {heldDamage,heldSurvive} from './equipment';
const clamp=(n:number,a:number,b:number)=>Math.max(a,Math.min(b,n));
const point=(i:number)=>({x:180+(i%2)*130,y:190+Math.floor(i/2)*190,dir:6,moving:false,cast:0});
const living=(seat:any)=>seat.team[seat.active]?.hp>0;
const active=(seat:any)=>seat.team[seat.active];
function botTeam(source:any[],seed:number){return source.map((m:any,i:number)=>snapshot({uid:'event-companion-'+seed+'-'+i,num:basePool[(seed*17+i*11)%basePool.length],level:m.level,tms:[]}))}
function seat(u:any,s:any,now:number){return {id:u.id,name:s.name,avatar:s.avatar,team:s.party.map((id:string)=>s.monsters.find((m:any)=>m.uid===id)).filter(Boolean).map(snapshot),active:0,pos:point(0),input:{x:0,y:0},seen:now,nextAttack:0,swapAt:0,charge:false,energy:0}}
function start(st:any,now:number){if(st.seats.length===4||now-st.queuedAt>=8000){while(st.seats.length<4){const i=st.seats.length;st.seats.push({id:'CPU-'+i,bot:true,name:['Luca','Maya','Alex','Sofia'][i],avatar:{photo:null},team:botTeam(st.seats[0].team,i+1),active:0,pos:point(i),input:{x:0,y:0},seen:now,nextAttack:0,swapAt:0,energy:0})}st.seats.forEach((s:any,i:number)=>s.pos=point(i));st.phase='active';st.startsAt=now+3200;st.last=now}}
function hit(st:any,from:any,to:any,m:any,scale=1){
 const a=active(from),b=active(to);if(!a||!b||a.hp<=0||b.hp<=0)return;
 const mult=typeEffectiveness(m.t,b.types);if(mult===0)return;
 if(m.status){b.status={kind:m.status,until:st.time+3};return}
 const ratio=m.category===2?a.stat[1]/b.stat[2]:a.stat[3]/b.stat[4];
 const damage=Math.max(1,Math.round((a.level*.35+8+(m.power||30)*.18)*Math.sqrt(ratio)*mult*terrainBonus(m.t,st.stadium)*heldDamage(a,m)*scale));
 const d=Math.min(b.hp,heldSurvive(b,damage));b.hp-=d;a.damageDealt+=d;
 st.effects.push({id:++st.seq,kind:'hit',x:to.pos.x,y:to.pos.y,d,t:m.t,at:st.time});
 if(b.hp<=0){to.koAt=st.time+1;to.pos.cast=0;st.effects.push({id:++st.seq,kind:'ko',x:to.pos.x,y:to.pos.y,at:st.time});}
}
function cast(st:any,from:any,to:any,index:number,channel=false){
 const m=active(from)?.moves[index];if(!living(from)||!living(to)||!m||m.locked||!channel&&active(from).cd[index]>0||active(from).status?.kind==='sleep'&&active(from).status.until>st.time)return;
 if(!channel)active(from).cd[index]=Math.max(.6,m.c||3);active(from).used=true;from.pos.cast=.55;from.pos.castMove=m;
 const scale=from.energy>=2?1.5:1;from.energy=0;
 st.effects.push({id:++st.seq,kind:'cast',x:from.pos.x,y:from.pos.y,tx:to.pos.x,ty:to.pos.y,t:m.t,mode:m.mode,name:m.n,m,at:st.time});
 if(m.mode==='heal'&&m.category===1){const a=active(from);a.hp=Math.min(a.max,a.hp+a.max*.2);return}
 if(m.contact){from.pos.x=clamp(to.pos.x-45,65,895);from.pos.y=clamp(to.pos.y+20,90,530);hit(st,from,to,m,scale);return}
 const dx=to.pos.x-from.pos.x,dy=to.pos.y-from.pos.y,a=Math.atan2(dy,dx),speed=m.s||350;
 st.shots.push({ox:from.pos.x,oy:from.pos.y,x:from.pos.x,y:from.pos.y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,from:from.id,to:to.id,m,life:3,scale});
}
export function advanceRaid(st:any,elapsed:number){
 if(st.phase!=='active')return;
 const actors=[...st.seats,st.boss];
 for(let remaining=clamp(elapsed,0,.6);remaining>.00001;){const dt=Math.min(.04,remaining);remaining-=dt;st.time+=dt;
   for(const a of actors){const m=active(a);if(!m)continue;
     if(m.hp<=0){if(a.koAt&&st.time>=a.koAt){const next=a.team.findIndex((p:any)=>p.hp>0);if(next>=0){a.active=next;a.koAt=null;active(a).used=true;st.effects.push({id:++st.seq,kind:'send',name:active(a).name,x:a.pos.x,y:a.pos.y,at:st.time})}}continue}
     m.cd=m.cd.map((n:number)=>Math.max(0,n-dt));a.pos.cast=Math.max(0,a.pos.cast-dt);
     if(m.status?.until<=st.time)m.status=null;
     if(['burn','poison'].includes(m.status?.kind)){m.dot=(m.dot||0)+dt;if(m.dot>=1){m.dot-=1;m.hp=Math.max(0,m.hp-Math.max(1,Math.floor(m.max*.025)));if(!m.hp)a.koAt=st.time+1}}
     if(m.status?.kind==='sleep'){a.pos.moving=false;continue}
     a.energy=a.charge?Math.min(2,(a.energy||0)+dt):a.energy>=2?2:0;m.charged=a.energy>=2;
     if(a.hold){if(st.time>=a.hold.until||!living(st.boss))a.hold=null;else if(st.time>=a.hold.next){cast(st,a,st.boss,a.hold.i,true);a.hold.next=st.time+.5}}
     let input=a.input;
     if(a.bot){const target=a===st.boss?st.seats.find(living):st.boss;
       if(target){const dx=target.pos.x-a.pos.x,dy=target.pos.y-a.pos.y,l=Math.hypot(dx,dy);input=l>260?{x:dx/l,y:dy/l}:{x:0,y:0};if(st.time>=a.nextAttack){const slots=m.moves.map((v:any,i:number)=>({v,i})).filter(({v,i}:any)=>!v.locked&&m.cd[i]<=0);if(slots.length)cast(st,a,target,slots[Math.floor(st.time*7)%slots.length].i);a.nextAttack=st.time+(a===st.boss?1.5:2.2)}}}
     const len=Math.max(1,Math.hypot(input.x,input.y)),speed=(90+Math.min(70,m.stat[5]*.35))*(m.status?.kind==='paralysis'?.5:1);
     a.pos.x=clamp(a.pos.x+input.x/len*speed*dt,65,895);a.pos.y=clamp(a.pos.y+input.y/len*speed*dt,90,530);a.pos.moving=!!(input.x||input.y);
     if(a.pos.moving)a.pos.dir=(Math.round(Math.atan2(input.y,input.x)/(Math.PI/4))+2+8)%8;
   }
   for(const sh of st.shots){const from=actors.find(a=>a.id===sh.from),to=actors.find(a=>a.id===sh.to);const ox=sh.x,oy=sh.y;sh.x+=sh.vx*dt;sh.y+=sh.vy*dt;sh.life-=dt;
     // Swept collision avoids tunnelling on fast beams or a slow network frame.
     if(to&&living(to)){const dx=sh.x-ox,dy=sh.y-oy,t=clamp(((to.pos.x-ox)*dx+(to.pos.y-oy)*dy)/(dx*dx+dy*dy||1),0,1);if(Math.hypot(ox+t*dx-to.pos.x,oy+t*dy-to.pos.y)<32+(sh.m.r||10)){hit(st,from,to,sh.m,sh.scale);sh.life=0}}
   }
   st.shots=st.shots.filter((s:any)=>s.life>0&&s.x>0&&s.x<960&&s.y>0&&s.y<600);
   if(st.boss.team.every((m:any)=>m.hp<=0)&&(!st.boss.koAt||st.time>=st.boss.koAt)){st.phase='finished';st.won=true;break}
   if(st.seats.every((a:any)=>a.team.every((m:any)=>m.hp<=0))||st.time>900){st.phase='finished';st.won=false;break}
 }
 st.effects=st.effects.filter((e:any)=>st.time-e.at<1.5).slice(-60);
}
export async function raidRoute(c:any,h:any){
 const {path,body,db,u,fail,json,mutate}=c,now=Date.now();
 const respond=(r:any,st:any)=>{const side=st.seats.findIndex((s:any)=>s.id===u.id);if(side<0)fail('Non fai parte di questa stanza.',403);return json({id:r.id,side,state:st,serverTime:now})};
 if(['event-create','event-match','event-join'].includes(path)){
   const state=JSON.parse(u.state);settle(state);if(!state.party.length)fail('Metti almeno un Pokémon in squadra.');
   let r:any;
   if(path==='event-join'){r=await db.prepare('SELECT * FROM club_event_rooms WHERE id=?').bind(String(body.code||'').trim().toUpperCase()).first();if(!r)fail('Stanza non trovata.');}
   else {
     const event=await db.prepare("SELECT * FROM club_live_content WHERE id=? AND kind='event' AND starts<=? AND ends>?").bind(String(body.eventId||''),now,now).first();if(!event)fail('Evento non attivo.');
     const rows=await db.prepare('SELECT * FROM club_event_rooms WHERE event_id=? AND updated>? ORDER BY updated').bind(event.id,now-45000).all();
     // Resume own live room, including private rooms, before matchmaking.
     r=rows.results.find((r:any)=>{const st=JSON.parse(r.state);return ['waiting','active'].includes(st.phase)&&st.seats.some((s:any)=>s.id===u.id)});
     if(!r&&path==='event-match')r=rows.results.find((r:any)=>{const st=JSON.parse(r.state);return !st.private&&st.phase==='waiting'&&st.seats.length<4&&now-st.queuedAt<8000});
     if(!r){const config=JSON.parse(event.data),first=seat(u,state,now);const st:any={mode:'event',phase:'waiting',title:config.title,eventId:event.id,eventEnds:event.ends,reward:config.reward,stadium:config.stadium,private:path==='event-create',queuedAt:now,last:now,time:0,seq:0,seats:[first],boss:{id:'event-boss',name:config.title,bot:true,team:config.team.map((m:any,i:number)=>snapshot({...m,uid:'boss-'+i,tms:[]})),active:0,pos:{x:760,y:300,dir:2,cast:0},input:{x:0,y:0},nextAttack:1,energy:0},shots:[],effects:[]};first.team[0].used=true;const id=crypto.randomUUID().replaceAll('-','').slice(0,8).toUpperCase();if(path==='event-match'){const inserted=await db.prepare("INSERT INTO club_event_rooms(id,event_id,state,updated) SELECT ?,?,?,? WHERE NOT EXISTS(SELECT 1 FROM club_event_rooms WHERE event_id=? AND updated>? AND json_extract(state,'$.private')=0 AND json_extract(state,'$.phase')='waiting' AND json_array_length(state,'$.seats')<4 AND json_extract(state,'$.queuedAt')>?)").bind(id,event.id,JSON.stringify(st),now,event.id,now-45000,now-8000).run();if(!inserted.meta.changes)return raidRoute(c,h)}else await db.prepare('INSERT INTO club_event_rooms(id,event_id,state,updated) VALUES(?,?,?,?)').bind(id,event.id,JSON.stringify(st),now).run();return respond({id},st)}
   }
   for(let retry=0;retry<5;retry++){
     const st=JSON.parse(r.state);if(st.seats.some((s:any)=>s.id===u.id))return respond(r,st);
     if(st.phase!=='waiting'||st.seats.length>=4||now-st.queuedAt>=8000||now>=st.eventEnds)fail('La stanza è già iniziata o l’evento è terminato.');
     const next=seat(u,state,now);next.pos=point(st.seats.length);next.team[0].used=true;st.seats.push(next);start(st,now);
     const result=await db.prepare('UPDATE club_event_rooms SET state=?,updated=?,version=version+1 WHERE id=? AND version=?').bind(JSON.stringify(st),now,r.id,r.version).run();if(result.meta.changes)return respond(r,st);r=await db.prepare('SELECT * FROM club_event_rooms WHERE id=?').bind(r.id).first();
   }fail('La stanza è cambiata. Riprova.',409);
 }
 if(path==='event-tick'){
   for(let retry=0;retry<5;retry++){
     const r=await db.prepare('SELECT * FROM club_event_rooms WHERE id=?').bind(String(body.code||'').toUpperCase()).first();if(!r)fail('Stanza non trovata.');const st=JSON.parse(r.state),side=st.seats.findIndex((s:any)=>s.id===u.id);if(side<0)fail('Non fai parte della stanza.',403);
     const own=st.seats[side];own.seen=now;own.bot=false;
     if(st.phase==='waiting'){if(now>=st.eventEnds){st.phase='cancelled'}else start(st,now)}
     if(st.phase==='active'&&now>=st.startsAt){
       advanceRaid(st,Math.max(0,(now-Math.max(st.last,st.startsAt))/1000));st.last=now;
       for(const s of st.seats)if(now-s.seen>15000)s.bot=true;
       if(living(own)){
         if(body.x!==undefined||body.y!==undefined){if(!Number.isFinite(body.x)||!Number.isFinite(body.y))fail('Movimento non valido.');own.input={x:clamp(body.x,-1,1),y:clamp(body.y,-1,1)}}
         if(typeof body.charge==='boolean')own.charge=body.charge;
         const slot=Number.isInteger(body.move)?body.move:body.holdStart?.i??body.holdStart;
         if(Number.isInteger(slot)&&slot>=0&&slot<4){const m=active(own).moves[slot],ready=m&&!m.locked&&active(own).cd[slot]<=0;cast(st,own,st.boss,slot);if(ready&&body.holdStart&&['flame','beam','wave','bolt'].includes(m.mode))own.hold={i:slot,token:String(body.holdStart.token||'').slice(0,80),until:st.time+3,next:st.time+.5}}
         if(own.hold&&[body.holdEnd,body.holdCancel].includes(own.hold.token))own.hold=null;
         if(Number.isInteger(body.swap)&&body.swap!==own.active&&body.swap>=0&&own.team[body.swap]?.hp>0&&st.time>=own.swapAt){own.active=body.swap;own.team[body.swap].used=true;own.swapAt=st.time+20;own.energy=0;own.hold=null;own.pos.cast=0}
       }
     }
     const result=await db.prepare('UPDATE club_event_rooms SET state=?,updated=?,version=version+1 WHERE id=? AND version=?').bind(JSON.stringify(st),now,r.id,r.version).run();if(result.meta.changes)return respond(r,st);
   }fail('Aggiornamento in corso.',409);
 }
 if(path==='event-reward'){
   const r=await db.prepare('SELECT * FROM club_event_rooms WHERE id=?').bind(String(body.code||'').toUpperCase()).first();if(!r)fail('Stanza non trovata.');const st=JSON.parse(r.state),own=st.seats.find((s:any)=>s.id===u.id);if(!own)fail('Non fai parte della stanza.',403);if(st.phase!=='finished')fail('Sconfiggi prima tutta la squadra avversaria.');const seasons=await h.activeSeasons(db);
   return json(await mutate(db,u.id,(s:any)=>{s.rewards=s.rewards||[];const key='event:'+r.id;if(s.rewards.includes(key))return {already:true};s.rewards.push(key);const awards=h.xpAwards(s,own.team,st.time);markPokedexSeen(s,st.boss.team.filter((m:any)=>m.used||m.hp<m.max).map((m:any)=>m.num));s.battles++;let reward=null;if(st.won){s.wins++;s.coins+=10;s.eventWins=s.eventWins||[];if(!s.eventWins.includes(st.eventId)){h.grantReward(s,st.reward);s.eventWins.push(st.eventId);reward=st.reward}}h.addPassXP(s,seasons,st.won);return {coins:st.won?10:0,xpAwards:awards,reward,won:st.won}}));
 }
 fail('Operazione evento non disponibile.',404);
}
