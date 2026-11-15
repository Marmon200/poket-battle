# PokéBattle 2D — Eventi, Battle Pass e correzioni

Base: repository Marmon200/poket-battle, commit 448cfae4850cc21228ecca87c1d20090994f40bb.
Le modifiche sono pronte nel codice; non sono già pubblicate sul sito Cloudflare Pages.

## Installazione e pubblicazione

1. Installare Node 22.13+ (testato con Node 24), poi `npm ci` nella radice.
2. Copiare `wrangler.toml.example` in `wrangler.toml` e inserire l'ID D1 effettivo. Il binding deve chiamarsi **DB**. Non sostituire il database dei giocatori.
3. Installare Wrangler (`npm install --save-dev wrangler`) e accedere al proprio account Cloudflare. Eseguire il backup D1 prima di aggiornare un database esistente.
4. Eseguire `npm run db:migrate -- poket-battle --remote` (oppure il nome reale del database). Lo script controlla prima la colonna `email_verified`: evita l'errore di colonna duplicata negli schemi già aggiornati e aggiorna anche quelli precedenti. Poi applica le migrazioni D1, compresa `0002_live_operations.sql`. Per il database locale omettere `--remote`.
5. Nelle impostazioni di Cloudflare Pages conservare **BREVO_API_KEY**, **AUTH_FROM_EMAIL**, **AUTH_CODE_PEPPER** e aggiungere **ADMIN_EMAILS** con le email degli amministratori, separate da virgole. Sono necessarie email verificate. Nessuna password admin è inclusa nel codice. Impostare la variabile sia nell'ambiente Preview sia in Production, se entrambi devono essere utilizzati.
6. Eseguire `npm test`, `npm run check:assets`, `npm run check:backend`, `npm run build`.
7. Pubblicare dal repository aggiornato con build `npm run build`, cartella output **out**, radice repository corrente. Le **Pages Functions** in `functions/` devono essere pubblicate insieme agli asset; caricare solo `out` come sito statico non pubblica il backend. In alternativa: `npx wrangler pages deploy out --project-name NOME_PROGETTO` dalla radice.
8. Verificare il binding DB e le variabili anche per lo specifico deployment, poi fare una prova reale con due dispositivi. Il vecchio URL di anteprima identifica una vecchia versione: condividere il nuovo URL restituito dal deployment.

## Dove modificare

- Frontend canonico: **PokeBattle_2D_v28/public/game/**.
- Backend canonico: **PokeBattle_2D_v28/lib/**.
- Entrata API Cloudflare: **functions/api/club/[[path]].ts**.
- **public/game/** è generato da `copy-game.mjs` prima della build; non modificarlo come sorgente. Alcune copie nella radice risalgono alle vecchie consegne e non sono caricate dal gioco.
- ZIP: sorgenti completi, asset, lockfile, migrazioni e test; sono esclusi credenziali, database personali, node_modules, cache e output build.

## Correzioni e nuove funzioni

- Riparato il caricamento di `artAsset`, che interrompeva il ciclo di gioco all'avvio. Eliminato un doppio nome globale nelle impostazioni.
- Ripristinati i fogli animazione PMDCollab di nove specie che erano stati sostituiti da PNG statici: Wartortle, Weedle, Vulpix, Wigglytuff, Zubat, Weepinbell, Voltorb, Weezing e Zapdos. Aggiornati metadati e alias Shoot/Charge di Voltorb. Fallback delle immagini del Box e limiti dei frame nel renderer.
- Squadra a lato del Box, ordine 1–6 con frecce e trascinamento; ordine salvato sul server. Le frecce sono utilizzabili anche da mobile.
- Descrizione degli strumenti nel Box; capsule Speed/Difesa/Attacco acquistabili a 100 monete, con addebito e inventario controllati sul server.
- Preferenza Musica persistente, applicata alla musica menu e battaglia. Rimossa la doppia sezione rapida di impostazioni nel profilo.
- Rimosso il pulsante CPU con esperienza. Online mantiene matchmaking e fallback dopo 8 secondi. Gli avversari automatici non vengono presentati come utenti reali: i nomi sono neutrali e l'interfaccia informa del possibile riempimento virtuale.
- Campi online casuali scelti sul server, condivisi dai partecipanti. Le stanze private normali mantengono la scelta del creatore.
- Riepilogo esperienza per ogni Pokémon al termine delle lotte con progressi. Quello che combatte riceve più XP della panchina. Al livello 100 si mostrano 0 XP. Demo e pratica restano senza esperienza.
- Altezza esterna limitata al viewport; scorrono i pannelli contenuto, non l'intera pagina. Box, editor pass e finestre hanno scorrimento interno.

## Console admin

Dopo accesso con email verificata presente in **ADMIN_EMAILS**, compare **🛠️ Admin**. Le API ricontrollano l'autorizzazione a ogni richiesta. Togliere o aggiungere un amministratore richiede la configurazione sul server, non una modifica del profilo.

**Eventi**: titolo, copertina immagine o video breve tramite URL HTTPS diretto (MP4/WebM per video), date/orari, campo, 1–6 avversari con livelli 1–100, Pokémon premio e livello. La copertina deve essere ospitata su un indirizzo accessibile ai giocatori: non è un percorso locale del computer. L'editor mostra l'anteprima prima del salvataggio.

**Battle Pass**: nome stagione, inizio/fine, costo in monete, esattamente 100 livelli. Ogni livello può essere vuoto oppure assegnare monete, oggetti, carte di Pokémon base o un Pokémon con livello. Le forme evolute sono consentite come premio Pokémon; le carte seguono il sistema dei Pokémon base. Il pass non implementa pagamenti reali Stripe.

**Giocatori**: ricerca per nome, email o ID; credito monete da 1 a 100.000 per operazione; ban/revoca ban. Il ban revoca le sessioni e blocca anche nuovo login. Le azioni sono registrate in `club_admin_audit`. I crediti hanno identificativo operazione per impedire doppi accrediti nei retry. Non si può bannare un altro amministratore dalla console.

Le stagioni e gli eventi già iniziati non sono modificabili: impedisce di cambiare retroattivamente premi già riscattati o squadre durante una lotta. Creare una nuova edizione per modificarli.

## Regole eventi e stagioni

- Eventi: quattro alleati con la propria squadra (fino a sei Pokémon ciascuno), un Pokémon attivo per alleato, contro la squadra evento completa. Si possono creare stanze con codice o cercare compagni online. I posti mancanti vengono riempiti dopo 8 secondi, oppure la partita inizia prima se sono già presenti tutti e quattro.
- HP conservati durante i cambi; cambio volontario ogni 20 secondi. KO mostrato prima della sostituzione. Per vincere devono andare KO **tutti** gli avversari. Se un alleato perde l'intera squadra può seguire gli altri; sconfitta quando nessun alleato ha Pokémon rimasti. Limite lotta 15 minuti. Le mosse mantenute sono limitate dal server a 3 secondi.
- I compagni che perdono la connessione sono controllati automaticamente dopo 15 secondi. Le capsule del campo sono disponibili nel motore delle sfide normali; nell'evento cooperativo il relativo pannello è disabilitato.
- Premio Pokémon una volta per evento per account; vittorie evento successive danno le normali 10 monete e XP. Ogni ricompensa battaglia viene registrata una volta, anche se il client ripete la richiesta.
- Decisione di progressione adottata: 100 punti stagione per livello, +50 per vittoria, +25 per sconfitta completata, massimo 100 livelli. Valgono partite online, bot con progressi, Storia ed eventi; non demo/pratica. I punti si accumulano anche prima dello sblocco a pagamento in monete. Le stagioni contemporanee attive avanzano insieme.
- Premi riscattabili solo durante la stagione, con livello raggiunto e pass sbloccato se ha un costo. I livelli vuoti non assegnano nulla. La verifica di date, saldo e duplicati avviene nel backend.
- Date memorizzate in UTC; l'editor usa il fuso locale del browser e mostra date locali ai giocatori.

## Verifica

I test usano SQLite in memoria con tutte le migrazioni, handler API effettivo e DOM simulato per l'intero ordine degli script. Verificano accessi admin, acquisti, mute, editor da 100 livelli, partita cooperativa, fallback 8s, roster completo, XP e ricompense idempotenti. Il controllo asset verifica tutte le 151 specie e 460 fogli con metadati. La build Next e il bundle dell'API sono controllati separatamente.

Sono necessari test finali sul deployment Cloudflare e su telefoni reali per latenza, audio/autoplay, orientamento e layout: i test DOM non sostituiscono queste prove. Nessun account o dato reale è incluso nei test.

Asset animazioni ripristinati dalla repository PMDCollab/SpriteCollab, mantenendo l'attribuzione già presente nel gioco. Non sono stati sostituiti i personaggi con modelli 3D.
