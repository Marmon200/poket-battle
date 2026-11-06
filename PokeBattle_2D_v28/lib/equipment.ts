import equipment from './equipment.json';
export const EQUIPMENT=equipment as any[];
export function heldInfo(m){let i=EQUIPMENT.find(i=>i.name===m.heldItem&&i.category==='held');return i&&(!i.only||i.only.includes(m.num))?i:null}
export function heldStats(m,values,canEvolve=false){let i=heldInfo(m);if(!i)return [...values];let v=[...values];for(let [k,n] of [['attack',1],['defense',2],['spAttack',3],['spDefense',4],['speed',5]])v[n]=Math.floor(v[n]*(i[k]||1));if(i.eviolite&&canEvolve){v[2]=Math.floor(v[2]*1.5);v[4]=Math.floor(v[4]*1.5)}return v}
export function heldDamage(m,move){let i=heldInfo(m);return i?(i.damage||1)*(i.typeBoost===move.t?i.factor:1):1}
export function heldAfterHit(attacker,target,actual,t){let i=heldInfo(attacker);if(i?.drain)attacker.hp=Math.min(attacker.max,attacker.hp+Math.floor(actual*i.drain));if(i?.recoil&&actual>0&&t-(attacker.lastRecoil??-9)>=1){attacker.lastRecoil=t;attacker.hp=Math.max(1,attacker.hp-Math.max(1,Math.floor(attacker.max*i.recoil)))}}
export function heldSurvive(m,damage){if(heldInfo(m)?.sash&&!m.sashUsed&&m.hp===m.max&&damage>=m.hp){m.sashUsed=true;return Math.max(0,m.hp-1)}return damage}
export function heldTick(st,dt){for(let side of [0,1]){let m=st.teams[side]?.[st.active[side]];if(!m||m.hp<=0)continue;let i=heldInfo(m);if(i?.regen){m.regenClock=(m.regenClock||0)+dt;if(m.regenClock>=5){m.regenClock-=5;m.hp=Math.min(m.max,m.hp+Math.max(1,Math.floor(m.max*i.regen)))}}}}
