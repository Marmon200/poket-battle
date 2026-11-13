// Power defines the visual footprint. Evolution adds size without changing damage.
function visualMove(move,p){if(move.v)return move;let stage=0,species=KANTO.pokemon[(p.num||1)-1];while(species?.pre&&stage<2){stage++;species=KANTO.pokemon[species.pre-1]}let power=move.power||40,v=Math.max(.55,Math.min(1.95,.42+power/100))*(1+stage*.13),mode=move.mode;if(!move.contact&&power<=50&&['flame','wave','bolt','beam'].includes(mode))mode='pellet';if(move.key===126)mode='fireburst';return {...move,v,mode,r:Math.round((move.mode==='zone'?move.r:12)*v)}}

const STADIUM_TYPES={classic:[],meadow:['Normale','Coleottero'],forest:['Erba'],coast:['Acqua'],volcano:['Fuoco'],ice:['Ghiaccio'],ruins:['Roccia','Terra'],powerplant:['Elettro']};
function terrainBonus(type,id=window.activeStadium||'classic'){return (STADIUM_TYPES[id]||[]).includes(type)?1.1:1}
