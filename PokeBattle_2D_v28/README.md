# PokéBattle 2D

151 Pokémon di Kanto, demo CPU, allenamento offline senza ricompense, Box, squadra da sei, profilo personalizzabile e negozio con sole monete virtuali.

Gli account email/password usano PBKDF2 SHA-256 (100.000 iterazioni), sessioni HttpOnly e controlli server per gli aggiornamenti. Verifica email e recupero password non sono inclusi in questa prima versione.

## Struttura

- `public/game/`: interfaccia mobile, motore arcade, asset e musica.
- `lib/rules.ts` e `lib/kanto.json`: catalogo, statistiche, livelli ed evoluzioni.
- `lib/server.ts`: account, inventario, timer, ricompense, stanze online e scambi.
- `db/schema.ts`, `drizzle/`: struttura D1 e migrazioni.
- `app/api/club/[...path]/route.ts`: API server.
- `tests/backend.mjs`: prove di autenticazione, economia, timer, stanze e scambi atomici su SQLite locale in memoria.

## Comandi

`npm run dev`: sviluppo. `npm run build`: compilazione. `node tests/backend.mjs`: verifiche server.
Il binding `DB` è dichiarato in `.openai/hosting.json`. Applicare le migrazioni D1 prima di usare una nuova installazione locale. Vedere le istruzioni del runtime Sites per la configurazione e la pubblicazione.

## Regole

- Starter: Bulbasaur, Charmander o Squirtle al livello 6.
- Un solo Pokémon in allenamento per account. Ogni allenamento assegna un livello, massimo 100. Timer verificati dal server.
- Un pacchetto da cinque carte e una borsa con un solo oggetto, ciascuno ogni 12 ore.
- Quattro carte di uno stesso Pokémon base, vengono consumate per ottenere un esemplare al livello 6.
- Stanze online con codice: movimento, cooldown, danni e risultato verificati dal server. Polling con concorrenza ottimistica; prima versione da bilanciare per latenza e carico. Non è incluso il matchmaking automatico.
- Esperienza soltanto online. Ogni Pokémon entrato in campo ottiene più esperienza di quelli rimasti in panchina. Ricompense idempotenti per stanza.
- Scambi con proposta e conferma, consumo di un biglietto per ciascuna parte, aggiornamento atomico degli inventari. Evoluzioni da scambio e pietre supportate.
- La demo permette tutti i 151 Pokémon al livello 38. Non altera progressi, inventario o monete.
- Offline disponibile dopo la preparazione della cache sul dispositivo; nessuna esperienza o premio offline.

## Dati e risorse

Lista Kanto di riferimento: https://pokemondb.net/pokedex/game/firered-leafgreen
Dati strutturati PokeAPI, livelli di apprendimento FireRed/LeafGreen. Tipi e mosse sono adattati alla terza generazione; tempi ed effetti sono interpretazioni arcade. Le statistiche base non costituiscono una simulazione certificata di ogni revisione storica dei giochi.
Sprite animati: PMDCollab/SpriteCollab. Illustrazioni: Pokémon Database. Audio fornito dall'utente. Pokémon appartiene ai rispettivi titolari.

Non inserire chiavi segrete nel codice del browser. Non contiene un sistema di pagamenti reali.

## Aggiornamento battaglie e profilo

- Mosse fisiche con scatto del corpo e danno al contatto; mosse potenti con carica.
- Dimensioni degli effetti legate a potenza e stadio evolutivo, senza aumentare artificialmente il danno. Braciere usa proiettili compatti, Lanciafiamme un getto continuo, Fuocobomba una massa esplosiva.
- Presentazione degli allenatori e conto alla rovescia; il server impedisce movimento e attacchi prima della scadenza condivisa.
- Podio del vincitore con il Pokémon della sua squadra che ha inflitto più danni effettivi (overkill escluso). I contatori si azzerano per ogni battaglia.
- Accessori illustrati nel file `public/game/assets/trainer-gear-v7.png`, generati con imagegen integrato: cappellino rosso/avorio, cappellino giallo/nero al contrario, cappello con fiocco rosa, visiera rossa con occhiali appoggiati. Atlas trasparente 2×2, stile anime con ombre a campiture.
- Verifica: `node tests/battle.mjs`, `node tests/presentation.mjs`, `node tests/backend.mjs`.

## Profilo e stadi (versione 8)

La personalizzazione del personaggio è sostituita da una foto. Il browser accetta JPG/PNG/WebP fino a 5 MB, ritaglia al centro e riduce a JPEG 256×256. Il server verifica formato, dimensioni e limite di peso; la foto è salvata nello stato dell’account e mostrata nella presentazione e nel podio. Nessun servizio di immagini esterno.

Sette stadi: classico neutrale; prateria (Normale/Coleottero), foresta (Erba), costa (Acqua), vulcano (Fuoco), ghiaccio (Ghiaccio), rovine (Roccia/Terra). I tipi indicati danno +10% alle mosse di entrambi i giocatori. Il creatore della stanza sceglie lo stadio online; il server conserva e applica questa scelta. Nessuna modifica a velocità o precisione.

Test aggiuntivo: `node tests/profile.mjs`.

## Versione 9: matchmaking e arena orizzontale

- Campo 960×600 e interfaccia smartphone in orizzontale, avviso di rotazione e pulsante schermo intero (il blocco orientamento dipende dal browser).
- Ricerca casuale `match-find`: abbinamento mediante assegnazione atomica del secondo giocatore; dopo 8 secondi senza un avversario passa a una vera simulazione CPU sul server. La CPU è indicata nel nome. Nessuna migrazione D1 necessaria. Le stanze della versione precedente vanno ricreate.
- Vittorie nelle sfide online/private e CPU con progressi: 10 monete, sconfitte 0. XP ai Pokémon entrati in campo e 25% alla panchina, anche nel fallback CPU. Demo e pratica offline continuano a non assegnare premi o esperienza.
- Tre lanci per parte: Speed (×1.65 per 6s), Attacco (×2 per 8s), Difesa (danni subiti dimezzati per 8s). Gli oggetti sono condivisi sul campo e raccoglibili dall’avversario; ne compaiono altri periodicamente. Si azzerano a ogni battaglia e non consumano l’inventario persistente.
- Piscina: piattaforme trasportano i Pokémon, blocchi di ghiaccio subiscono danni e si rompono, solo tipi Acqua attraversano l’acqua. Il recupero alla superficie sicura più vicina evita blocchi dopo la rottura del ghiaccio o un cambio Pokémon.
- Mosse Psico con potenza: carica, presa entro 480px, sollevamento e lancio con danno all’atterraggio. Muoversi durante la carica può evitare la presa.
- `lib/arena.ts` e la sua copia browser `public/game/arena-world.js` condividono nuoto, piattaforme, oggetti e prese psichiche. Dopo modifiche al file server, rigenerare la copia rimuovendo solo `export `.
- Sfondo vulcanico pixel art generato con imagegen integrato, asset `public/game/assets/volcano-ground-v9.png`: basalto scuro dall’alto con crepe di lava ai bordi, nessun personaggio o interfaccia. Gli altri terreni usano varianti cromatiche e componenti disegnati in canvas.
- Verifiche: `node tests/backend.mjs`, `node tests/world.mjs`, `node tests/battle.mjs`, `node tests/stadiums.mjs`, `node tests/profile.mjs`, `node tests/presentation.mjs`.

## Versione 10: controlli, mosse e borsa

- Battaglia a tutto viewport con camera che segue il Pokémon senza deformare gli sprite. Joystick a sinistra, mosse a destra (□ sinistra/W, △ alto/A, ○ destra/S, × basso/D), Speed/Difesa/Attacco al centro (G/H/J). Rimosso il Pikachu decorativo dalla home.
- Le mosse possono essere scelte tra quelle apprese e le MT possedute, con quattro posizioni salvate per Pokémon. La selezione duplicata nell’editor scambia i due slot. Il server valida le mosse e trasferisce gli slot invariati alla squadra di battaglia.
- Borse: 2 o 3 oggetti ogni 12 ore, con potenziamenti e uova nel pool insieme a pietre/MT/biglietti. Nessuna dotazione gratuita di potenziamenti nelle arene e nessuna comparsa automatica.
- Un lancio nelle sfide online/CPU con progressi consuma un oggetto persistente. Profilo e stanza sono aggiornati in una transazione, con versioni controllate e ID richiesta per evitare doppio consumo. In demo/pratica offline gli oggetti persistenti restano disattivati.
- Una singola incubatrice indipendente dall’allenamento. L’avvio consuma un uovo; dopo 12 ore di tempo server lo stato aggiunge un Pokémon base al livello 6, una sola volta, anche dopo una disconnessione. La pagina Uova e incubatrice è nel Box.
- Test: `node tests/backend.mjs`, `node tests/loadout.mjs`, più gli altri test esistenti. Nessuna migrazione D1; i vecchi stati account sono compatibili. Le stanze della versione precedente vanno ricreate.

## Versione 11 — PokéBattle 2D
- Comandi touch su pointerdown, joystick con puntatore indipendente, pulsanti mosse stabili durante gli aggiornamenti dei PS. Pulsanti 68px e joystick 122px sul layout orizzontale compatto.
- Layout bilanciati, navigazione a cinque colonne, titoli centrati, schede con allineamenti uniformi.
- Catalogo delle 50 MT FRLG: acquisto esatto a 80 monete delle 31 mosse offensive supportate; 19 mosse di stato in arrivo non acquistabili. Nessuna MT casuale nello shop. Le MT casuali nelle borse restano disponibili.
- Cinque pietre evolutive illustrate, capsule Speed/Difesa/Attacco anche negli oggetti lanciati.
- Riferimenti: https://www.pokemonmillennium.net/videogiochi/pokemon-rosso-fuoco-e-verde-foglia/lista-mt-mn/ e https://bulbapedia.bulbagarden.net/wiki/Evolution_stone . Sprite pietre da Bulbapedia/Archives (Bag_*_Stone_SV_Sprite).
- Capsule create con imagegen, asset public/game/assets/capsules-v11.png. Prompt: tre capsule cartoon su sfondo trasparente, verde con fulmine, blu con scudo, arancione con esplosione, atlas orizzontale a tre celle uguali.
- Verifiche: tests/touch.mjs, backend, battle, world, loadout, stadiums, profile, presentation; anteprima browser a 844×390 e ricerca MT.

## Versione 12 — Giocabilità mobile
- Movimento online previsto localmente a ogni frame con riconciliazione morbida del server, invio immediato di pressione/rilascio joystick e attacchi. Danni e premi restano verificati dal server.
- Joystick centrato correttamente; ridotto carico del canvas sui display ad alta densità e aggiornamenti DOM limitati ai valori cambiati. Movimento lento consentito durante la carica delle mosse a distanza.
- CPU: tre secondi iniziali senza attacchi, intervallo 2,5 s, proiettili più lenti, danni al 60%, carica più leggibile; niente leggendari e solo basi sotto il livello 32. Il danno PvP resta invariato.
- Introduzione mobile con ritratti quadrati in due colonne identiche, logo intero e countdown leggibile.
- Uovo nello shop: 500 monete, uno ogni 72 ore dall’acquisto, vincolo persistente verificato dal server anche per acquisti simultanei. Schiusa tramite incubatrice invariata a 12 ore.
- Verifiche: suite movimento/puntatori e backend con test acquisto uovo concorrente, limite 72 ore, monete, grazia CPU e danni PvP; anteprima 844×390 con logo di prova e joystick premuto.

## Versione 13 — Tocchi, allineamenti e fasce carte
- Header mobile a righe esplicite centrate: marchio, stato account e aiuto. Nessuna terza colonna implicita.
- Riquadro vincitore con canvas quadrato centrato tra nome e fascia; verifica su anteprima 844×390 e intestazione 412×740.
- Input mosse con feedback immediato, breve buffer vicino alla fine ricarica e durante azioni; coda autorevole server legata al Pokémon attivo, esecuzione una volta sola, scadenza. I comandi rimangono presenti fino alla risposta riuscita. Ricarica visibile aggiornata a ogni frame.
- Fasce carte personalizzate del gioco: comuni 2, intermedi 3, rari 4; base-only come prima, stessi requisiti nel server, Box e apertura bustina. Le carte possedute non vengono modificate. Esempi: Rattata 2, Vulpix 3, Eevee 4.
- Verifiche: backend (coda server, scadenza, costi 2/3/4 e consumo), combat-input, touch, movimento, battle, presentation, loadout.

## Versione 14 — Storia, formati e amicizie
- Formati 1vs1, 3vs3, 6vs6 per CPU con progressi, pratica, demo, stanze private e ricerca casuale. Selezione esplicita dei Pokémon dalla squadra; il server verifica formato, proprietà, ordine e numero. Gli abbinamenti casuali cercano solo lo stesso formato.
- Modalità Storia con le 13 squadre e i livelli forniti dall’utente: Brock, Misty, Lt. Surge, Erika, Koga, Sabrina, Blaine, Giovanni, Lorelei, Bruno, Agatha, Lance, Red (HGSS). Si scelgono 1, 3 o 6 Pokémon propri; ogni avversario usa la sua squadra originale completa, anche se il numero è diverso. Le squadre ripetute contengono istanze indipendenti.
- Sblocco obbligatorio in sequenza, otto medaglie visibili nel profilo e nei profili allenatore. Progressi salvati nel JSON account; il server avanza solo dopo una vittoria verificata e non assegna di nuovo medaglie nelle rivincite. Vittorie: 10 monete ed esperienza come le altre sfide con progressi.
- Nuove sezioni Storia e Amici. Ricerca per nome o codice UUID, invio richieste, accettazione/rifiuto solo del destinatario, elenchi amici/richieste e profilo pubblico con medaglie. Email, password e inventario non sono esposti dalle API social. Relazioni simmetriche senza duplicati su tabella club_friends, migrazione Drizzle 0001.
- Medaglie: atlas PNG fornito dall’utente. Le schede dei capipalestra usano il Pokémon simbolo della squadra; nessun ritratto umano inventato.
- Verifica: backend con tutte le 13 squadre, blocchi, premi idempotenti, matchmaking, amicizie e privacy; simulazione completa Brock; UI mobile a 412×740 per Storia, selezione, profilo e richieste; test adventure, touch e movimento.

## Versione 15 — Squadra Storia, oggetti e account
- La Storia usa sempre tutta la squadra salvata, da 1 a 6 Pokémon, inclusi 2/4/5. Nessun selettore del formato nella Storia; il server ignora formato e formazione inviati e usa la squadra del profilo. Gli altri tipi di lotta mantengono 1/3/6.
- Uovo: immagine originale fornita dall’utente, assets/egg-pokemon.jpg, usata in shop, inventario, apertura borsa e incubatrice.
- Cinque pietre Kanto in HD, assets/stones-hd-v15.png: atlas imagegen trasparente 2172×724, riferimento copertina-pietre-evolutive.jpg. Prompt: ridisegnare Fuoco, Acqua, Tuono, Foglia, Luna in cinque celle orizzontali, stile cartoon nitido del riferimento, senza scritte e sfondo.
- Profilo → Impostazioni account: italiano, inglese, spagnolo, francese, tedesco, portoghese brasiliano; lingua persistente nel profilo e scelta locale per ospiti. Dizionario UI, pattern dinamici e nomi di Pokémon/mosse/abilità; il traduttore DOM conserva testi originali e identità dei controlli. Osservazione limitata ai sottoalberi modificati per non ritradurre ogni frame di battaglia. Ricerca demo/Box/MT supporta anche nomi visualizzati; i filtri mantengono valori canonici.
- Audio musica/effetti e riduzione animazioni; nome/foto nel profilo esistente; cambio password con password attuale, PBKDF2 con nuovo salt e rotazione atomica delle sessioni; cambio email con controllo password e unicità; disconnessione altri dispositivi; esportazione JSON dati; eliminazione con password e conferma DELETE. Recupero password via email e verifica email non disponibili.
- Verifica backend: tutte le lingue e preferenze, 2vs4 storia, vecchie sessioni invalidate, nuova password/email funzionanti, duplicati email respinti, eliminazione confermata. Browser: impostazioni 412×740 in EN/FR/ES/DE/PT-BR, Storia con 2 Pokémon, immagine uovo e pietre. Suite gameplay invariata superata.


## Versione 16

Stadi pixel art con spalti, superfici differenziate, piscina con zattere circolari e collisioni ellittiche condivise tra server e client. Nuovi fasci di acqua, fuoco, elettricità, ghiaccio, erba e psico; silhouette bianche ai colpi e scie fisiche. Sequenza finale interrompibile di 3,1 secondi con MVP e coriandoli, esclusa con movimento ridotto. Scenari memorizzati in canvas e particelle limitate. Uovo scontornato trasparente derivato dal riferimento fornito.


## Versione 17

Acqua con increspature e spruzzi, mai crateri; niente bruciature sulla superficie. Volanti e specie levitanti attraversano la piscina. Zattere circolari con bordo rosso/bianco e disegno Poké Ball: tre punti resistenza, solo mosse da almeno 70 di potenza le danneggiano. Alla rottura un Pokémon terrestre viene riportato sulla superficie valida più vicina. Rocce, tronchi, basalto, cristalli e colonne bloccano i Pokémon terrestri, si danneggiano e si distruggono. Le mosse psichiche prendono prima un ostacolo vicino: sollevamento, lancio verso la posizione avversaria e impatto schivabile; senza oggetti disponibili rimane la presa del Pokémon. Regole condivise tra demo e server. Icone pietre centrate senza separatori dell’atlante; emoji colorate nelle sette categorie.


## Versione 18

Codice allenatore sempre leggibile, con recupero dell’ID dalla risposta Amici e copia del valore mostrato. La vittoria Storia richiede tutti gli avversari della squadra canonica esausti: validazione anche sulla ricompensa e pausa protetta di 1,2 s tra entrate, con cancellazione dei vecchi proiettili. Centrale elettrica con bonus Elettro e bobine distruttibili; Lt. Surge la usa nella Storia. Piscina senza ghiaccio, zattere che oscillano, animazione di volo usando i fotogrammi delle ali degli sprite, nuoto con scie e immersioni visive automatiche durante il movimento (nessuna invulnerabilità aggiunta). I getti di potenza almeno 60 in modalità flame/beam/wave/bolt possono essere caricati tenendo premuto: rilascio o limite automatico a 1,7 s di carica, durata del getto da 0,7 a 2,4 s. Funziona con tocco e WASD, cancellazione del tocco/blur e misura della carica sul server per l’online.


## Versione 19

Catalogo condiviso `equipment.json`: 31 strumenti tenuti e 5 pietre evolutive compatibili con Kanto, prezzi 180–720 monete, rarità e probabilità relative nella borsa. Equipaggiamento riservato dall’inventario, restituito alla rimozione, unicità per tipo di strumento nella squadra controllata su equipaggiamento, formazione squadra e ingresso battaglia. Bonus statistiche, mosse per tipo, rigenerazione, drenaggio, contraccolpo, Focalnastro una volta per battaglia e Fortunuovo applicati dal server; strumenti Scelta bloccano la prima mossa fino al cambio. Effetti dichiarati sono adattamenti per combattimento in tempo reale. Il catalogo di riferimento include oggetti per Pokémon oltre i 151, esclusi dagli acquisti finché non esistono evoluzioni compatibili.

Nuoto con corpo immerso e piccolo salto automatico di uscita, attacchi a curve morbide con fuoco a più colori, getti azzurri lucidi e foglie delineate. Arena e Pokémon conservano gli sprite. Corrette varianti evolutive non-Kanto di Sandshrew, Slowpoke e Voltorb e rimosse diramazioni duplicate dal catalogo originale. Riferimento: https://pwtng.altervista.org/elenco-di-tutti-gli-strumenti/


## Versione 20

Immagini reali dei 57 strumenti del catalogo da PokeAPI/sprites; 27 oggetti evolutivi della lista PWTNG, inclusa Metalcoperta in entrambe le categorie. Gli oggetti per evoluzioni non presenti sono acquistabili e trovabili nella borsa, ma riportano chiaramente che devono essere conservati per quelle evoluzioni future.

Renderer dei 151 Pokémon basato sulle altezze PokeAPI (scala compressa 30–111 pixel per leggibilità mobile), con contorni visibili dello sprite normalizzati anziché celle tutte alla stessa scala. 21 fogli di animazione aerea PMDCollab, posa sopra l’ombra e ali di Charizard articolate separando il disegno esistente, senza ali decorative aggiunte. Nuoto con anello di schiuma, bollicine e scia. Lanciafiamme è un unico getto continuo con strati di colore e bordo animato. Le regole di collisione e i danni restano condivisi con il server.

Fonti asset: https://github.com/PokeAPI/sprites/tree/master/sprites/items ; https://github.com/PokeAPI/pokeapi/blob/master/data/v2/csv/pokemon.csv ; https://github.com/PMDCollab/SpriteCollab .

## Versione 21

Battito di Charizard più ampio, con ali articolate sullo sprite. Demo con tutti i 151 Pokémon al livello 100 e quattro slot di mosse compatibili, privilegiando potenza e varietà. Stanze demo anonime con codice per 1vs1, 3vs3 e 6vs6: livelli e mosse convalidati sul server, cookie separato, nessun premio o consumo di inventario. Avversari virtuali nel matchmaking con nomi allenatore, stesso numero di Pokémon e livelli della squadra del giocatore, esattamente una famiglia starter casuale. La pagina descrive la presenza di avversari virtuali.

## Versione 22

Nuove sequenze complete di volo per Charizard, Zubat, Articuno, Zapdos, Dragonite, Scyther e Farfetch’d da Smogon/sprites (`src/models`), decodificate in atlanti PNG a durata originale. Le ali restano parte del corpo, senza sovrapposizioni di pezzi deformati. Fonte: https://github.com/smogon/sprites .

Prima vittoria nella storia: 500 monete per ciascuna palestra, 1.000 per Superquattro, 1.500 per Red; rivincite 10, premio idempotente e convalidato sul server. Bolla/Bollaraggio con bolle animate; Surf, Bora, Petalodanza e Terremoto ad area circolare. Rapigiro dura 2,1 s, raggio 140: Squirtle, Wartortle e Blastoise ruotano nel guscio con getti a 360°. Sono adattamenti per la battaglia in tempo reale.

Ipnosi/Sonnifero: 3 s senza movimento o mosse; paralisi: 6 s al 55% di velocità; veleno e scottatura: 8 s, danni 1,2% PS massimi ogni secondo, scottatura riduce fisici del 25%. Immunità per tipo, un solo stato alla volta, scadenze riferite all’orologio della battaglia. Le mosse di stato aggiunte sono apprendibili da specie compatibili; gli attacchi di Fuoco/Elettro/Veleno hanno una probabilità del 18% di applicare lo stato corrispondente. Un cambio volontario ogni 20 s, con rifiuto server delle richieste anticipate; i cambi per KO restano automatici.

La demo conserva mosse potenti e aggiunge mosse distintive compatibili per provarle subito: Rapigiro/Bolla agli Squirtle, Bollaraggio a Tentacool/Tentacruel/Staryu e Ipnosi alle specie che la apprendono.

## Versione 23

Ripristinati tutti gli sprite direzionali PMD 2D, incluso Charizard; rimosse le sequenze Smogon dall’app. Il terreno `coast` ora è Spiaggia asciutta, senza piscina, zattere, ghiaccio, nuoto o vincoli d’acqua. Il bonus è +10% ai danni dei Pokémon Acqua (non si somma a un secondo bonus delle mosse Acqua). Etichette e presentazione allineate.

Rapigiro usa quattro scie d’acqua curve a spirale che ruotano attorno al guscio, senza raggi dritti o cerchio tratteggiato. Iper Raggio ha un raggio giallo con nucleo chiaro anche nei proiettili online.

Impatto forte: cratere persistente e frammenti fisici nuovi, massimo 26 ostacoli vivi; ritardo di 2 s per nuove escavazioni nello stesso punto, distanza minima da Pokémon e altri ostacoli. I frammenti restano distruttibili, bloccano i colpi e sono utilizzabili da Psichico. Le mosse psichiche forti strappano nuovi massi dal campo e ne sollevano/lanciano fino a tre con tempi sfalsati. Gli atterraggi producono altri frammenti riutilizzabili. Le regole sono condivise tra server e offline.

## Versione 24

Charizard usa camminata/idle sul terreno in pixel art. Guscio di Rapigiro e scie ruotano entrambi a 5 rad/s. Layout e editor mosse: triangolo W sopra, quadrato A a sinistra, croce S sotto, cerchio D a destra. Borsa acquistabile a 100 monete: stesso pool da 2–3 oggetti, cooldown gratuito invariato.

Terreno persistente con zone di dimensioni crescenti al crescere dei danni: lava nel vulcano, sabbia bagnata sulla spiaggia (velocità 65%), cavi nella centrale (paralisi al contatto), crepe e vapore sul ghiaccio (80%), terra distrutta in foresta/prateria, incendi da Fuoco e fango da Acqua (55%). Zone massime 28; i Pokémon aerei evitano gli effetti di contatto, Charizard cammina sul terreno. Ustioni e veleno durano 3 secondi con tre danni periodici; sostare in una zona pericolosa può applicare nuovamente lo stato.

Carica tenendo premuto SPAZIO o il pulsante sopra le mosse: 1,8 secondi del tempo di simulazione, contorno arancione lampeggiante al completamento, prossimo attacco offensivo potenziato e visivamente ingrandito. Tempo e consumo convalidati dal server, anche nelle stanze demo. Gamepad API con controller a mappatura standard: stick sinistro/croce direzionale movimento, pulsanti frontali coerenti con la disposizione PlayStation, R2 carica, L1/R1 cambio. Rilascio, disconnessione e perdita del focus ripuliscono l’input. Controller verificato con input simulati, senza dispositivo fisico collegato.

## Versione 25

Schermata iniziale a tutto schermo con paesaggio forestale pixel art e Pokémon PMD che percorrono il sentiero nei due sensi, con specie, tempi e velocità casuali. GIOCA apre email/password in modalità accesso; le sessioni già valide continuano alla home. Demo raggiungibile anche dall’inizio. Animazione sospesa quando si entra nel gioco.

Il terreno registra i colpi per zona: occorrono 3 mosse forti (potenza almeno 100) o 4 mosse medie per aprire un cratere. Una singola mossa, anche continua o a più proiettili, conta una volta nella stessa zona. Crepe leggere anticipano il cedimento. Anche gli ostacoli ricevono un solo danno per mossa. La centrale disegna le bobine solo sugli ostacoli `coil`, mai sui massi nuovi; detriti psichici riutilizzabili in pietra. Gli schizzi di lava si alzano con traiettorie animate sopra le fenditure.

Pressione continua: la mossa parte alla pressione, si interrompe al rilascio e comunque dopo 3 secondi dall’avvio, sia client sia server. Nessun riavvio automatico finché il tasto non viene rilasciato e premuto nuovamente. I tocchi rapidi mantengono un attacco breve; i colpi non continui non si ripetono indefinitamente tenendo premuto.


## Versione 26
- Squadra avversaria visibile sul campo; Pokémon sconfitti in grigio e indicazione KO prima del cambio.
- Pausa KO autorevole di 1 secondo anche online; vittoria dopo l’ultimo avversario esausto.
- L2 apre la selezione, stick/direzioni scelgono e X conferma; cerchio chiude. Pulsante touch e Q/Invio disponibili. Restano il limite di 20 secondi e i PS già persi.
- Musica fornita nei menu; la traccia delle battaglie rimane separata. Il browser avvia l’audio dopo il primo gesto.


## Versione 27 — tipi, evoluzioni e allenamento
- Tabella completa dei 17 tipi di Rosso Fuoco/Verde Foglia, condivisa dal server e dal browser: ×0, ×¼, ×½, ×1, ×2, ×4. Il tipo della mossa viene combinato con entrambi i tipi del difensore. Danni da bruciatura/veleno restano separati.
- Schede Pokémon: debolezze, resistenze, immunità e bersagli superefficaci per i tipi propri e delle mosse selezionate.
- Tre allenamenti contemporanei, timer indipendenti; migrazione automatica del vecchio allenamento singolo, senza perdita del termine. Un quarto allenamento e i duplicati vengono respinti dal server.
- Evoluzioni registrate per livello, esperienza, pietre e scambi. Schermata luminosa con due sagome nere alternate a velocità crescente; rivelazione a colori e conferma finale. Riduzione movimento rispettata.
- Difficoltà Facile/Medio/Difficile per CPU, pratica e demo; cambia danno, movimento e frequenza delle azioni. Difficile sceglie anche le mosse in base all'efficacia. La Storia forza Difficile sul server.
- Ritratti degli otto capipalestra nella Storia e nei duelli VS.

Fonti: tabella `gTypeEffectiveness` di pret/pokefirered (`src/battle_main.c`), corrispondente alla generazione III; ritratti dalla pagina capipalestra di Pokémon Millennium fornita dall’utente. I diritti delle illustrazioni restano dei rispettivi titolari.
https://github.com/pret/pokefirered/blob/master/src/battle_main.c
https://www.pokemonmillennium.net/videogiochi/pokemon-rosso-fuoco-e-verde-foglia/capipalestra/

Verifiche v27: `node tests/backend.mjs`, `node tests/type-matchups.mjs`, `node tests/evolution-scene.mjs`, `node tests/battle.mjs`, `node tests/world.mjs`, `node tests/details.mjs`.


## Versione 28 — Pokédex, Missioni e animazioni descritte
- Pokédex Kanto completo di 151 voci, con filtri, conteggi e tre stati: sconosciuto, incontrato, ottenuto. Le specie ottenute restano registrate dopo evoluzione o scambio. Migrazione della collezione attuale e delle evoluzioni registrate.
- Gli incontri vengono salvati dal server per i Pokémon avversari realmente entrati in campo nelle sfide con account. Nessuna cattura fittizia e nessuna registrazione automatica della panchina. La demo mantiene la regola senza progressi.
- Sezione Missioni predisposta senza missioni o ricompense; annuncio Johto / seconda generazione in arrivo.
- Catalogo allegato dall’utente importato come riferimento compatto (`move-reference.js`: 614 proposte). Tutte le 192 mosse attualmente apprendibili nel gioco ricevono descrizione e famiglia animata; la compatibilità non viene estesa alle generazioni successive.
- Coreografie complete per Fossa, Sub, Volo, Aeroattacco, Rimbalzo, Rotolamento e Ruotafuoco: movimento reale del corpo, fasi, impatto singolo, copertura temporanea e punto d’arrivo schivabile. Regole condivise server/browser.
- Gesti di pugni, calci, morsi, fruste, code, artigli; proiettili di semi, aghi, ossa, monete, rocce e ghiaccio; scene di assorbimento, cure, ipnosi, polveri, tuono e scosse. Fiamme continue, bolle, Iper Raggio e Rapigiro conservano gli effetti specifici già presenti. Le descrizioni sono adattamenti visivi, non un’implementazione di ogni regola ufficiale descritta nel catalogo (turni, KO autoindotto, probabilità ecc.).

Verifiche: `node tests/backend.mjs`, `node tests/choreography.mjs`, `node tests/choreography-renderer.mjs`, `node tests/battle.mjs`, `node tests/world.mjs`, `node tests/type-matchups.mjs`, `node tests/hold.mjs`, `node tests/movement.mjs`.
