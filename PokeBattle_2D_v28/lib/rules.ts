import {EQUIPMENT,heldStats} from './equipment';
import data from './kanto.json';
export const catalog:any=data;export const species:any[]=catalog.pokemon;export const moves:any=catalog.moves;
export const byNum=(n:number)=>species.find(p=>p.num===n);
export const basePool=species.filter(p=>p.basic).map(p=>p.num);
export const items=[...EQUIPMENT.filter(i=>i.category==='evolution'&&i.futureEvolution).map(i=>i.name),...EQUIPMENT.filter(i=>i.category==='held').flatMap(i=>Array(i.rarity==='Comune'?4:i.rarity==='Non comune'?3:i.rarity==='Raro'?2:1).fill(i.name)),'Pietrafocaia','Pietraidrica','Pietratuono','Pietrafoglia','Pietralunare','Biglietto scambio','Speed','Difesa','Attacco','Uovo Pokémon'];
export function mon(num:number){return {uid:crypto.randomUUID(),num,level:6,xp:0,tms:[]}}
export function newState(name:string,starter:number){return {name,coins:500,monsters:[mon(starter)],party:[],cards:{},items:{},preferences:{language:'it',musicVolume:.12,soundEffects:true,vibration:true,reducedMotion:false},story:{cleared:0},pokedex:{seen:[starter],owned:[starter]},training:[],incubator:null,lastHatch:null,lastPack:0,lastBag:0,lastEggPurchase:0,wins:0,battles:0,avatar:{photo:null}}}
export function stats(n:number,l:number){let b=byNum(n).stats;return b.map((v:number,i:number)=>i===0?Math.floor((2*v+15)*l/100)+l+10:Math.floor((2*v+15)*l/100)+5)}
export function availableMoveIds(num:number,l:number,tms:number[]=[]){let chain:any[]=[],p=byNum(num);while(p){chain.unshift(p);p=p.pre?byNum(p.pre):null}let set:number[]=[];for(let s of chain)for(let [lv,id] of s.learn)if(lv<=l&&!set.includes(id))set.push(id);for(let id of tms)if(!set.includes(id)&&byNum(num).tm.includes(id))set.push(id);if(!set.length)set=[33];return set}
export function learned(num:number,l:number,tms:number[]=[],loadout:any[]=[]){let ids=availableMoveIds(num,l,tms),chosen=loadout.length===4?loadout.map(id=>ids.includes(id)?id:null):ids.slice(-4);return chosen.map(id=>id?moves[id]:{n:'Non appresa',t:'Normale',c:1,power:0,d:0,locked:true}).filter(Boolean)}
export function xpNeeded(l:number){return 30+l*18}
export function evolveAuto(m:any){let p=byNum(m.num),e=p.evolutions.find((e:any)=>e.trigger==='level'&&m.level>=e.level);if(e){m.num=e.id;return true}return false}
export function levelUp(m:any){if(m.level>=100)return;m.level++;evolveAuto(m)}
export function trainingList(s:any){if(!Array.isArray(s.training))s.training=s.training?[s.training]:[];return s.training}
export function recordEvolution(s:any,uid:string,from:number,to:number){if(from===to)return;s.evolutionEvents=[...(s.evolutionEvents||[]),{id:crypto.randomUUID(),uid,from,to,at:Date.now()}].slice(-30)}
export function settle(s:any,now=Date.now()){let changed=!Array.isArray(s.training),pending=[];for(let t of trainingList(s)){if(t.ends<=now){let m=s.monsters.find((m:any)=>m.uid===t.uid);if(m){let from=m.num;levelUp(m);recordEvolution(s,m.uid,from,m.num)}changed=true}else pending.push(t)}s.training=pending;if(s.incubator&&s.incubator.ends<=now){let random=new Uint32Array(1);crypto.getRandomValues(random);let m=mon(basePool[random[0]%basePool.length]);s.monsters.push(m);s.lastHatch={uid:m.uid,num:m.num,at:now};s.incubator=null;changed=true}return syncPokedex(s)||changed}

export function trainTime(l:number){return Math.round((5+Math.pow((l-6)/94,1.65)*475)*60000)}
export function snapshot(m:any){let p=byNum(m.num),v=heldStats(m,stats(m.num,m.level),p.evolutions.length>0);return {...p,uid:m.uid,heldItem:m.heldItem||null,level:m.level,max:v[0]*3,hp:v[0]*3,stat:v,moves:learned(m.num,m.level,m.tms,m.loadout),cd:[0,0,0,0],damageDealt:0,x:300,y:600}}

export const stadiumTypes:any={classic:[],meadow:['Normale','Coleottero'],forest:['Erba'],coast:['Acqua'],volcano:['Fuoco'],ice:['Ghiaccio'],ruins:['Roccia','Terra'],powerplant:['Elettro']};
export function terrainBonus(type:string,id='classic'){return (stadiumTypes[id]||[]).includes(type)?1.1:1}

export function demoLoadout(p,ids,table){let ranked=ids.filter(id=>table[id]?.power>0).sort((a,b)=>{let score=id=>table[id].power+(p.types.includes(table[id].t)?18:0)+(['flame','beam','wave','bolt'].includes(table[id].mode)?12:0);return score(b)-score(a)}),out=[],types=new Set();let stab=ranked.find(id=>p.types.includes(table[id].t));if(stab){out.push(stab);types.add(table[stab].t)}for(let id of ranked)if(!types.has(table[id].t)&&out.length<4){out.push(id);types.add(table[id].t)}for(let id of ranked)if(out.length<4&&!out.includes(id))out.push(id);let signature=[7,8,9].includes(p.num)?[229,145].filter(id=>ids.includes(id)):ids.includes(61)?[61]:ids.includes(95)?[95]:[];if(signature.length)out=[...out.filter(id=>id&&!signature.includes(id)).slice(0,4-signature.length),...signature];while(out.length<4)out.push(null);return out}

export function syncPokedex(s:any){let old=JSON.stringify(s.pokedex||null),valid=n=>Number.isInteger(n)&&n>=1&&n<=151;let owned=new Set((s.pokedex?.owned||[]).filter(valid)),seen=new Set((s.pokedex?.seen||[]).filter(valid));for(let m of s.monsters||[])if(valid(m.num))owned.add(m.num);for(let e of s.evolutionEvents||[])for(let n of [e.from,e.to])if(valid(n))owned.add(n);for(let n of owned)seen.add(n);s.pokedex={seen:[...seen].sort((a:any,b:any)=>a-b),owned:[...owned].sort((a:any,b:any)=>a-b)};return old!==JSON.stringify(s.pokedex)}
export function markPokedexSeen(s:any,nums:any[]){syncPokedex(s);let old=s.pokedex.seen.length;s.pokedex.seen=[...new Set([...s.pokedex.seen,...nums.filter(n=>Number.isInteger(n)&&n>=1&&n<=151)])].sort((a:any,b:any)=>a-b);return old!==s.pokedex.seen.length}
