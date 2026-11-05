# DRESSED
## Teknisk statusrapport, databaseanalyse og kompatibilitetsplan

**Projekt:** DRESSED – Your Personal Digital Wardrobe  
**Teknologi:** Next.js, React, Supabase, PostgreSQL og OpenAI  
**Formål:** At sikre, at den nye DRESSED-applikation fungerer sammen med den oprindelige DRESSED-database, samtidig med at projektet får en sikker, udvidelig arkitektur med Owner-, admin- og brugerrettigheder.

---

# 1. Formålet med den tekniske gennemgang

DRESSED er under genopbygning i en ny Next.js-arkitektur.

Det er vigtigt, at den nye løsning ikke blot bliver en visuel kopi af den gamle applikation. Den skal videreføre de funktioner og den datamodel, der allerede er udviklet, samtidig med at den nye kodebase bliver mere struktureret og lettere at vedligeholde.

Den eksisterende Supabase-database indeholder allerede en række funktioner til:

- Brugerprofiler og brugeradskillelse.
- Personlige AI-modeller.
- Garderobeprodukter.
- AI-genererede tøjressourcer.
- AI-forbrugsgrænser.
- Gemte outfits.
- Placering og skalering af tøj på modellen.
- Private billeder og Storage.
- Sikker afslutning af AI-genereringer.

Den nye Next.js-app skal forbindes til disse eksisterende funktioner frem for at opbygge parallelle systemer.

**Det overordnede mål er én sammenhængende DRESSED-platform, hvor databasen, AI-funktionerne og brugergrænsefladen arbejder med de samme data og regler.**

# 2. Den nye teknologiske arkitektur

Den nye applikation anvender følgende teknologier:

| Teknologi | Funktion |
|---|---|
| Next.js 16 | Applikation og routing |
| React 19 | Brugergrænseflade |
| Tailwind CSS 4 | Styling |
| Supabase | Database, autentificering og Storage |
| PostgreSQL | Databaselogik og funktioner |
| OpenAI API | AI-generering og billedbehandling |
| Zustand | Klientbaseret state management |
| @supabase/ssr | Supabase-sessioner på server og klient |

De centrale routes i den nye applikation er:

- `/wardrobe`
- `/style-studio`
- `/outfits`
- `/profile`

Den nye applikation har allerede separate Supabase-klienter til browser, server og administrative serverhandlinger.

Det er en fornuftig opdeling, fordi almindelige brugerhandlinger og privilegerede serverhandlinger ikke skal have samme adgangsniveau.

## Supabase-forbindelser

Projektet anvender følgende miljøvariabler:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

Service role og OpenAI-nøglen må aldrig være tilgængelige i browseren eller indgå i klientbundter.

Den administrative Supabase-klient bør desuden beskyttes med `server-only`, så den ikke ved en fejl importeres i klientkomponenter.

# 3. Den oprindelige DRESSED-database

Den oprindelige database er grundlaget for den nye løsning.

Det er vigtigt at bevare de eksisterende relationer og funktioner, fordi de er udviklet til at understøtte den samlede garderobe- og AI-funktionalitet.

De vigtigste områder er:

## 3.1 Brugerprofiler

Tabellen `profiles` indeholder blandt andet:

- `user_id`
- `username`
- `full_name`
- `avatar_url`
- `source_photo_path`
- `model_photo_path`
- `model_generation_status`
- `gender`
- `created_at`
- `updated_at`

Profilen er knyttet til den autentificerede Supabase-bruger.

Den nye app skal hente og opdatere profilen med den aktuelle brugers identitet. Der må ikke oprettes en separat profilstruktur i Next.js, som konkurrerer med Supabase-tabellen.

## 3.2 Personlige AI-modeller

Den oprindelige database indeholder `dressed_characters`.

Modellen skal forbindes med den enkelte bruger og understøtte en primær karakter.

Den eksisterende struktur indeholder også en geometry contract-version, som blandt andet anvendes ved gemning af outfits.

Den nye app skal derfor benytte den eksisterende karakterstruktur og ikke oprette en separat AI-modeltabel uden en konkret migrationsplan.

## 3.3 Garderobeprodukter

Den centrale garderobetabel er:

`public.wardrobe_items`

Den oprindelige kategoriopdeling omfatter følgende 22 værdier:

- tops
- shirts
- sweaters
- jackets
- dresses
- skirts
- pants
- shorts
- socks
- shoes
- bags
- jewelry
- necklaces
- earrings
- bracelets
- watches
- glasses
- sunglasses
- hats
- hair-accessories
- accessories
- other

Disse værdier skal bevares som en del af den eksisterende databasekontrakt.

Det betyder ikke, at brugergrænsefladen kun må have 22 kategorier. Den nye DRESSED-app kan godt have et mere detaljeret system med hovedkategorier og underkategorier.

Det kræver blot en tydelig mapping mellem brugergrænsefladens kategorier og databasens tilladte værdier.

Eksempel:

| Ny brugergrænseflade | Databasekategori |
|---|---|
| Tops | tops |
| Shirts | shirts |
| Sweaters | sweaters |
| Jackets | jackets |
| Dresses | dresses |
| Skirts | skirts |
| Pants | pants |
| Shorts | shorts |
| Socks | socks |
| Shoes | shoes |
| Bags | bags |
| Jewelry | jewelry |
| Hair accessories | hair-accessories |
| Other accessories | accessories |

Den endelige mapping skal kontrolleres mod den aktuelle kategoristruktur i Next.js-projektet.

**Vigtigt:** Vi må ikke ændre databaseværdierne til nye visningsnavne eller danske kategorinavne. Visningsnavne og databaseværdier skal holdes adskilt.

## 3.4 AI-genererede garderoberessourcer

Den oprindelige database indeholder:

`wardrobe_item_ai_assets`

Denne struktur forbinder garderobeprodukter med AI-genererede ressourcer og den relevante modeltype.

Den oprindelige løsning arbejder med base types som `woman` og `man` samt en generation version.

Den nye app skal bevare denne sammenhæng, så Style Studio ikke forsøger at bruge en AI-ressource, der er genereret til en anden modeltype eller generation.

## 3.5 Gemte outfits

Den oprindelige database indeholder:

`saved_dressed_outfits`

Outfits er knyttet til brugerens karakter og garderobeprodukter.

Den eksisterende funktion `save_dressed_outfit` validerer blandt andet:

- At brugeren er autentificeret.
- At outfitnavnet er gyldigt.
- At der vælges mellem ét og fem forskellige produkter.
- At produkterne tilhører den aktuelle bruger.
- At produkterne har kompatible AI-ressourcer.
- At den primære karakter opfylder den nødvendige geometry contract.

Den nye `/outfits`-side skal anvende denne eksisterende struktur og ikke gemme outfits udelukkende i lokal browser-state.

# 4. Style Studio og placeringssystemet

Style Studio er en central funktion i DRESSED.

Den skal give brugeren mulighed for at placere garderobeprodukter på sin personlige AI-model.

Den oprindelige database understøtter dette gennem kolonnen:

`wardrobe_items.placement`

Placeringen gemmes som JSON.

Den oprindelige struktur understøtter:

- `anchor`
- `x`
- `y`
- `scale`
- `scaleX`
- `scaleY`

De tilladte ankerpunkter omfatter:

- head
- face
- ears
- neck
- shoulders
- torso
- waist
- hips
- left-hand
- right-hand
- knees
- ankles
- feet
- full-body
- dress

Skaleringen er begrænset til værdier mellem 0.4 og 2.

`scaleX` og `scaleY` skal optræde sammen, når der anvendes fri skalering.

Den nye Style Studio skal derfor:

1. Hente brugerens garderobeprodukter fra Supabase.
2. Hente den tilhørende AI-ressource.
3. Hente placeringen fra `placement`.
4. Vise produktet på den korrekte model.
5. Gemme ændringerne i Supabase.
6. Kunne hente placeringen igen, når brugeren åbner Style Studio.

Placeringerne skal ikke kun gemmes i Zustand eller localStorage. Klient-state må bruges til midlertidig redigering, men Supabase skal være den vedvarende datakilde.

# 5. AI-systemet og forbrugsgrænser

Den oprindelige database indeholder et AI-kvotesystem med:

- `ai_generation_limits`
- `ai_generation_usage`

De normale gratisgrænser er fastlagt således:

| AI-funktion | Gratis grænse |
|---|---:|
| Personlig AI-model | 1 |
| Tøjgenerering | 3 |
| Try-on | 1 |

Systemet registrerer forbrug og håndterer reservationer, så flere samtidige genereringer ikke uhensigtsmæssigt bruger den samme kvote.

Der findes også funktioner til at afslutte genereringer sikkert fra serveren.

Den nye app skal benytte de eksisterende funktioner til reservation og afslutning frem for at implementere et separat kvotesystem i React.

## Fejlede genereringer

Når en AI-generering fejler, skal den reserverede brug kunne krediteres tilbage.

Det er vigtigt, at serveren afslutter den samme reservation, som blev oprettet ved starten.

Den nye app skal derfor sende de korrekte reservationsoplysninger videre til serverens afslutningsfunktion.

## AI-nøgler og serveradgang

OpenAI API-kald skal udføres fra serveren.

En bruger må aldrig kunne sende en vilkårlig AI-kvote, brugeridentitet eller Owner-status fra browseren og få serveren til at acceptere den uden kontrol.

# 6. Owner-, admin- og brugerrettigheder

DRESSED skal have en tydelig rollemodel.

Det er ikke tilstrækkeligt blot at skjule administrative knapper i brugergrænsefladen. Alle administrative handlinger skal også kontrolleres på serveren.

## 6.1 Owner

Owner er den øverste rolle i DRESSED.

Owner skal kunne:

- Administrere DRESSED-platformen.
- Administrere adminroller.
- Administrere AI-kvoter og særlige undtagelser.
- Se relevante AI-forbrugsdata og omkostninger.
- Administrere systemets indstillinger.
- Aktivere og deaktivere administrative adgange.
- Administrere økonomiske og kommercielle funktioner, når disse implementeres.

Owner skal have den særlige AI-kvoteundtagelse, som allerede er implementeret i den oprindelige AI-kvotemigration.

Owner-forbrug skal stadig registreres, selvom kvotegrænsen ikke begrænser Owner.

## 6.2 Admin

Admin skal have adgang til de administrative funktioner, som Owner har tildelt.

Admin skal som udgangspunkt følge almindelige AI-kvoter.

Owner skal senere kunne tildele særlige kvoter til bestemte admins uden at give dem automatisk ubegrænset adgang.

Admin må ikke selv kunne:

- Tildele sig Owner-rettigheder.
- Give sig selv højere AI-kvoter.
- Ændre privilegerede roller.
- Tilgå service role-nøglen.
- Omgå brugeradskillelsen.

## 6.3 Almindelige brugere

Almindelige brugere skal:

- Kunne tilgå deres egen garderobe.
- Kunne tilgå deres egen profil og AI-model.
- Kunne administrere egne outfits.
- Kunne bruge AI inden for deres kvoter.
- Kunne tilgå egne private billeder.

De må ikke kunne tilgå andre brugeres private data.

## 6.4 Den nuværende status for rollemodellen

Den oprindelige migration til AI-kvotesystemet indeholder en Owner-undtagelse via Supabase Auth `app_metadata.is_owner`.

Det er ikke det samme som et komplet rollebaseret adminsysten.

Der mangler derfor en separat, sikker rollemodel til:

- Owner.
- Admin.
- Almindelig bruger.
- Eventuelle fremtidige adminrettigheder.
- Individuelle kvoter.
- Audit-log over administrative handlinger.

Disse funktioner skal planlægges særskilt.

Vi må ikke give admins Owner-undtagelsen automatisk.

# 7. Supabase Storage og sikkerhed

DRESSED anvender private Storage-buckets:

- `model-images`
- `profile-images`

Den oprindelige sikkerhedsmigration indfører brugeradskillelse gennem RLS-politikker.

Brugeren skal kun kunne tilgå filer i sin egen brugerfolder.

Eksempel på ønsket mappestruktur:

`model-images/{user_id}/...`

`profile-images/{user_id}/...`

Den nye app skal følge denne struktur, når billeder uploades og hentes.

Private billeder skal ikke gøres offentligt tilgængelige alene for at gøre visningen lettere.

Brug i stedet de korrekte Supabase-sessioner og signed URLs, hvor det er relevant.

Den eksisterende migration har også en særlig undtagelse for en systempolitik til DRESSED's baseformbilleder. Den skal kontrolleres, før Storage-politikker ændres yderligere.

# 8. Migrationer – gennemført status

Følgende almindelige migrationsfiler fra den oprindelige DRESSED-løsning er blevet behandlet i den aktuelle Supabase-gennemgang.

Brugeren har bekræftet succes efter udførelse af de enkelte SQL-forespørgsler.

| Migration | Funktion | Status |
|---|---|---|
| 202610040001 | DRESSED AI Wardrobe | Bekræftet gennemført |
| 202610040002 | Character Bound Clothing Assets | Bekræftet gennemført |
| 202610040005 | Clothing Previews and Asset Versions | Bekræftet gennemført |
| 202610040008 | Clothing AI Generation Commit | Bekræftet gennemført |
| 202610040010 | Base-Type Clothing Assets | Bekræftet gennemført |
| 202610040011 | Secure Clothing Generation Finalization | Bekræftet gennemført |
| 202610040012 | Normalized Character Geometry and Saved Outfits | Tidligere bekræftet gennemført |
| 202610040013 | Add Socks Category | Bekræftet gennemført |
| 202610040014 | Fix Save DRESSED Outfit Ambiguity | Bekræftet gennemført |
| 202610040015 | AI Quota Limits and Owner Exemption | Bekræftet gennemført |
| 202610040016 | Background AI Generation Finalization | Bekræftet gennemført |
| 202610050002 | Wardrobe Items Placement | Bekræftet gennemført |
| 202610050003 | Fix Wardrobe Items Placement Check | Bekræftet gennemført |
| 202610060001 | Finish AI Generation Server Return Contract | Bekræftet gennemført |
| 202610060002 | Placement Free Scale | Bekræftet gennemført |
| 202610070001 | Account Security and User Isolation | Bekræftet gennemført |

Derudover findes den særlige testmigration:

`202610050001_clothing_quota_override_test_user.sql`

Den er ikke en almindelig produktionsmigration og skal ikke køres ukritisk.

**Vigtigt:** Status betyder, at brugeren har bekræftet, at Supabase accepterede SQL-forespørgslerne. Det er ikke det samme som en fuld databaseaudit. Vi mangler stadig at kontrollere den faktiske struktur og funktionalitet i Supabase efter migrationerne.

# 9. Vigtige kompatibilitetsområder

Der er flere områder, der skal kontrolleres, før den nye app kan betragtes som fuldt integreret.

## 9.1 Kategorier

Den nye brugergrænseflade kan have flere kategorier og underkategorier end den oprindelige database.

Der skal implementeres en central mapping, så alle produkter gemmes med en gyldig databasekategori.

## 9.2 AI-ressourcer

Den nye app skal bruge de eksisterende AI-asset-relationer.

Det skal kontrolleres, at upload og AI-generering opretter de nødvendige records og ikke kun gemmer billedfiler.

## 9.3 Personlig AI-model

Det skal kontrolleres, at upload af brugerens referencefoto, generering af AI-modellen og lagring af resultatet opdaterer de korrekte profiler og karakterrecords.

Der skal også være en tydelig status for:

- not_started
- pending
- processing
- completed
- failed

## 9.4 Style Studio

Placering, skalering og lagrækkefølge skal kunne gemmes og genindlæses.

Det skal kontrolleres, at den nye kode anvender de samme feltnavne og tilladte ankerpunkter som databasen.

## 9.5 Gemte outfits

Det skal kontrolleres, at den nye `/outfits`-side bruger den eksisterende gemmefunktion og kan hente, redigere og slette gemte outfits på en måde, der passer til den oprindelige datamodel.

## 9.6 Brugeradskillelse

Alle forespørgsler skal baseres på den autentificerede bruger.

Det gælder også billeder, outfits, AI-genereringer og administrative funktioner.

## 9.7 Tom garderobe for nye brugere

Nye brugere skal starte med en tom garderobe.

Der må ikke indsættes demo-produkter i databasen, og brugerens første garderobe skal kun indeholde produkter, som brugeren selv tilføjer eller får oprettet gennem den godkendte AI-proces.

# 10. Anbefalet fremtidig databasearkitektur

Vi bør ikke oprette nye tabeller, blot fordi den nye app har fået nye routes.

Først skal vi undersøge, om den eksisterende database allerede understøtter den ønskede funktion.

Hvis en funktion mangler, skal der oprettes en ny migration, som udvider den eksisterende struktur uden at ødelægge gamle data.

Følgende områder kan kræve yderligere databaseudvikling:

| Område | Mulig udvikling |
|---|---|
| Adminsystem | Sikker rolle- og rettighedsstyring |
| Individuelle AI-kvoter | Owner-styrede kvoteoverrides |
| Audit-log | Registrering af administrative handlinger |
| AI-økonomi | Registrering af reelle AI-omkostninger |
| Betaling | Betalings- og kreditstyring, når forretningsmodellen er fastlagt |
| Admin-dashboard | Datagrundlag til systemoverblik |

Disse er planlagte udviklingsområder – ikke allerede gennemførte funktioner.

# 11. Anbefalet implementeringsrækkefølge

Vi skal arbejde i en fast rækkefølge, så nye funktioner ikke bygges oven på en forkert datamodel.

## Trin 1 – Kildekodeaudit

Gennemgå den nye Next.js-app.

Kontrollér:

- Supabase-klienterne.
- Routes og komponenter.
- API-routes og serverfunktioner.
- Garderobens kategorier.
- AI-funktionerne.
- Style Studio.
- Outfits.
- Profilen.

## Trin 2 – Databaseaudit

Kontrollér den faktiske Supabase-struktur.

Sammenhold:

- Tabeller.
- Kolonner.
- Constraints.
- Funktioner.
- RLS-politikker.
- Storage-politikker.
- Indeks og relationer.

## Trin 3 – Kompatibilitetsmapping

Fastlæg den endelige mapping mellem:

- Nye garderobekategorier.
- Gamle databasekategorier.
- AI-ressourcer.
- Karaktertyper.
- Placement-kontrakten.
- Outfits.

## Trin 4 – Sikker rollemodel

Implementér Owner-, admin- og brugerrettigheder separat.

Kontrollér alle administrative handlinger på serveren.

## Trin 5 – Funktionstest

Test hele brugerrejsen:

1. Opret en ny bruger.
2. Log ind.
3. Opret en profil.
4. Upload et referencefoto.
5. Generér en personlig AI-model.
6. Upload et stykke tøj.
7. Godkend AI-resultatet.
8. Gem produktet i garderoben.
9. Åbn Style Studio.
10. Placér og skalér tøjet.
11. Gem et outfit.
12. Åbn outfittet igen.
13. Test brugeradskillelse.
14. Test AI-kvoter.
15. Test Owner- og adminrettigheder.

## Trin 6 – Produktionssikkerhed

Kontrollér:

- At service role kun bruges på serveren.
- At OpenAI-nøglen ikke eksponeres.
- At private Storage-buckets forbliver private.
- At RLS beskytter alle brugerdata.
- At administrative handlinger bliver logget.
- At fejlede AI-genereringer håndteres korrekt.

# 12. Hvad der endnu ikke er verificeret

Følgende punkter må ikke betragtes som færdige, før den nye Next.js-kildekode og den faktiske Supabase-database er gennemgået:

- Om alle nye sider bruger de eksisterende Supabase-tabeller korrekt.
- Om garderobens nye kategorier er mappet korrekt.
- Om AI-generering opretter alle nødvendige databaseposter.
- Om AI-model og tøjressourcer er forbundet korrekt.
- Om Style Studio gemmer og genindlæser placeringer korrekt.
- Om outfits kan gemmes og hentes gennem den eksisterende databasefunktion.
- Om alle brugerforespørgsler er begrænset til den aktuelle bruger.
- Om Owner-undtagelsen virker korrekt i den nye serverarkitektur.
- Om adminrollen er implementeret sikkert.
- Om der findes dublerede eller overflødige tabeller og funktioner.
- Om Storage-politikkerne passer til den nye uploadkode.

Disse punkter skal undersøges, før der oprettes flere SQL-migrationer.

# 13. Konklusion

DRESSED har allerede en omfattende databasebase med funktioner til garderobe, AI-modeller, AI-genererede tøjbilleder, outfits, placering og brugeradskillelse.

Den nye Next.js-applikation skal derfor bygges som en videreudvikling af den eksisterende løsning – ikke som et helt nyt system med parallelle tabeller og funktioner.

De almindelige migrationer er blevet behandlet og bekræftet af brugeren i Supabase.

Det næste vigtige arbejde er ikke flere tilfældige SQL-ændringer, men en systematisk kompatibilitetsgennemgang af den nye applikation.

**Den vigtigste beslutning er at bevare én fælles datamodel og ét samlet sikkerhedssystem.**

Det sikrer, at DRESSED kan udvikles videre uden at miste funktionalitet, eksisterende data eller kontrol over AI-forbrug og brugerrettigheder.

---

**Dokumentstatus:** Teknisk status og plan for videre gennemgang.  
**Database-migrationer:** Brugerbekræftet gennemført.  
**Ny Next.js-kildekode:** Afventer fuld filgennemgang.  
**Supabase-struktur efter migrationer:** Afventer direkte kontrol.  
**Adminsystem:** Rollemodel og særrettigheder skal færdigdesignes og implementeres separat.