import machines from './machines.json';
import {byNum,levelUp,xpNeeded,mon,basePool,items} from './rules';
import {heldInfo,EQUIPMENT} from './equipment';
export function xpAwards(s:any,team:any[],duration:number){
  return team.map(sm=>{const m=s.monsters.find((m:any)=>m.uid===sm.uid),beforeLevel=m?.level||sm.level;
    const xp=m&&m.level<100?Math.round(Math.min(120,35+duration*.3)*(sm.used?1:.25)*(heldInfo(sm)?.xp||1)):0;
    if(m){m.xp+=xp;while(m.level<100&&m.xp>=xpNeeded(m.level)){m.xp-=xpNeeded(m.level);levelUp(m)}}
    return {uid:sm.uid,num:sm.num,name:byNum(sm.num).name,xp,beforeLevel,level:m?.level||beforeLevel};
  });
}
export function addPassXP(s:any,seasons:any[],won:boolean,now=Date.now()){
  s.passes=s.passes||{};
  for(const season of seasons){if(now<season.starts||now>=season.ends)continue;
    const p=s.passes[season.id]||{xp:0,unlocked:false,claimed:[]};
    p.xp=Math.min(10000,p.xp+(won?50:25));s.passes[season.id]=p;
  }
}
export function validReward(r:any){
  if(r===null)return null;
  const integer=(v:any,min:number,max:number)=>Number.isInteger(v)&&v>=min&&v<=max;
  if(!r||typeof r!=='object')throw new Error('Ricompensa non valida.');
  if(r.kind==='coins'&&integer(r.amount,1,100000))return {kind:r.kind,amount:r.amount};
  if(r.kind==='cards'&&basePool.includes(r.num)&&integer(r.amount,1,100))return {kind:r.kind,num:r.num,amount:r.amount};
  if(r.kind==='pokemon'&&byNum(r.num)&&integer(r.level,1,100))return {kind:r.kind,num:r.num,level:r.level};
  const names=[...items,...EQUIPMENT.map(i=>i.name),'Speed','Difesa','Attacco',...machines.filter(m=>m.available).map(m=>'MT '+m.id)];
  if(r.kind==='item'&&names.includes(r.item)&&integer(r.amount,1,100))return {kind:r.kind,item:r.item,amount:r.amount};
  throw new Error('Scegli una ricompensa valida e una quantità o livello consentiti.');
}
export function grantReward(s:any,r:any){
  if(!r)return;
  if(r.kind==='coins')s.coins+=r.amount;
  if(r.kind==='cards')s.cards[r.num]=(s.cards[r.num]||0)+r.amount;
  if(r.kind==='item')s.items[r.item]=(s.items[r.item]||0)+r.amount;
  if(r.kind==='pokemon'){const m=mon(r.num);m.level=r.level;m.xp=0;s.monsters.push(m)}
}
