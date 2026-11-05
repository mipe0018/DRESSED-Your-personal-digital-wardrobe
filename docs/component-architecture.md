# Component Architecture – DRESSED

## Formål med komponentbaseret udvikling

DRESSED er udviklet med en komponentbaseret struktur i React og Next.js. Formålet er at skabe en genanvendelig og vedligeholdelsesvenlig kodebase, hvor de visuelle elementer bygges som selvstændige komponenter frem for at blive gentaget på tværs af projektets sider.

Ved at samle fælles funktionalitet og styling i komponenter bliver det lettere at foretage ændringer, sikre et ensartet design og videreudvikle projektet.

## Genbrugelige UI-komponenter

Projektet anvender et fælles komponentbibliotek, hvor de grundlæggende UI-elementer er samlet i `src/components/ui/`.

De centrale komponenter omfatter:

- **Button:** En genanvendelig knap med fire varianter: `primary`, `secondary`, `outline` og `ghost`. Komponenten understøtter også fuld bredde via `fullWidth` og kan modtage almindelige HTML-button-properties.
- **Input:** Et genanvendeligt inputfelt med mulighed for label, fejlbesked og visuel markering af ugyldige værdier.
- **Card:** Bruges til at samle og præsentere indhold i ensartede visuelle flader.
- **Badge:** Bruges til mindre statusmarkeringer, kategorier og labels.

Komponenterne er opbygget med genanvendelige props, så deres udseende og funktion kan tilpasses efter behov uden at skulle oprette nye komponenter til hver enkelt situation.

## Styling og designkonsistens

Komponenterne benytter Tailwind CSS sammen med projektets egne design tokens. Design tokens definerer blandt andet farver og typografi, så det visuelle udtryk kan styres centralt.

Der anvendes desuden `clsx` til betinget sammensætning af CSS-klasser. Det gør det muligt at ændre komponenternes styling ud fra props, eksempelvis knapvariant eller fejltilstand.

Denne tilgang bidrager til et ensartet visuelt udtryk på tværs af DRESSED.

## Komponenternes placering

Projektets komponenter organiseres efter deres funktion:

- `src/components/ui/` indeholder generelle og genanvendelige UI-komponenter.
- `src/components/layout/` indeholder komponenter, der bruges til sidernes overordnede struktur og navigation.
- `src/app/` indeholder projektets sider og routes.

Denne opdeling gør det lettere at finde, genbruge og vedligeholde komponenterne.

## Fordele ved tilgangen

Den komponentbaserede struktur giver flere fordele:

1. **Genanvendelighed:** Samme komponent kan bruges flere steder i projektet.
2. **Konsistens:** Knapper, inputfelter og andre UI-elementer får samme grundlæggende udseende.
3. **Vedligeholdelse:** En ændring i en fælles komponent kan slå igennem alle steder, hvor den anvendes.
4. **Skalerbarhed:** Nye funktioner og sider kan bygges med udgangspunkt i eksisterende komponenter.
5. **Læsbarhed:** En tydelig opdeling gør koden lettere at forstå og videreudvikle.

## Konklusion

Den komponentbaserede arkitektur er en central del af DRESSEDs tekniske fundament. Ved at adskille genanvendelige UI-elementer fra sidernes indhold skabes en fleksibel struktur, som understøtter både den nuværende udvikling og fremtidige funktioner såsom garderobevisning, outfitplanlægning og brugerprofiler.