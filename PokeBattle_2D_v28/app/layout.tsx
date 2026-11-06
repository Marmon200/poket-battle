import type { Metadata } from 'next';
export const metadata:Metadata={title:'PokéBattle 2D — Allenatori di Kanto',description:'Colleziona, allena e sfida: 151 Pokémon in un mondo tutto tuo.'};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="it"><body style={{margin:0}}>{children}</body></html>}
