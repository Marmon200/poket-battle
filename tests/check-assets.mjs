import {readFileSync,existsSync} from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const root=path.resolve('PokeBattle_2D_v28/public/game');const context=vm.createContext({});vm.runInContext(readFileSync(path.join(root,'data.js'),'utf8'),context);const {pokemon,animations}=vm.runInContext('({pokemon:KANTO.pokemon,animations:ANIMATION_DATA})',context);assert.equal(pokemon.length,151);
let sheets=0;for(const p of pokemon){const icon=path.join(root,'assets',p.id+'.png');assert.ok(existsSync(icon),p.id+' missing icon');for(const [mode,a] of Object.entries(animations[p.id]||{})){const file=path.join(root,'assets',p.id+'-'+mode+'.png');assert.ok(existsSync(file),file+' missing');const b=readFileSync(file);assert.equal(b.toString('hex',0,4),'89504e47',file+' must be PNG');assert.ok(b.readUInt32BE(16)>=a.w*a.dur.length,file+' has fewer frames than metadata');assert.ok(b.readUInt32BE(20)>=a.h*8,file+' has fewer directions than metadata');sheets++}}
const html=readFileSync(path.join(root,'index.html'),'utf8');for(const match of html.matchAll(/(?:src|href)="([^"?#]+)"/g)){if(/^(?:https?:|data:|\/|#)/.test(match[1]))continue;assert.ok(existsSync(path.join(root,match[1])),match[1]+' missing')}
console.log(`Verified 151 Pokémon, ${sheets} animation sheets and all HTML script/style references.`);
