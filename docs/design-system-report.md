# DRESSED — Teknisk rapport om global CSS og designsystem

**Projekt:** DRESSED – Digital Wardrobe  
**Område:** Frontendarkitektur og global styling  
**Teknologier:** Next.js, React, TypeScript, Tailwind CSS og CSS  
**Status:** Grundlæggende designsystem under opbygning

---

# 1. Formålet med det globale CSS-system

I DRESSED har vi valgt at opbygge designet omkring et centralt globalt CSS-system frem for at style hver enkelt side og komponent individuelt.

Formålet er at skabe en ensartet visuel identitet, hvor farver, typografi, afstande, former, skygger, knapper, kort og andre gentagne elementer følger de samme designregler.

Når et projekt vokser, kan det hurtigt blive svært at vedligeholde, hvis hver side har sine egne farvekoder, størrelser og CSS-regler. Det kan føre til uensartede komponenter, gentagelser og unødvendigt kompliceret kode.

Ved at samle designreglerne centralt får vi:

- Et ensartet visuelt udtryk på tværs af hele platformen.
- Mulighed for at ændre designet ét sted.
- Genanvendelige CSS-klasser og komponenter.
- Mindre gentagelse i React-komponenterne.
- Bedre vedligeholdelse og mulighed for at udvide projektet.
- Et fælles fundament for både desktop, tablet og mobil.

Det globale CSS-system fungerer derfor som DRESSEDs visuelle fundament.

Det er vigtigt at forstå, at systemet ikke kun handler om farver og udseende. Det er også en måde at strukturere frontendkoden på, så projektet bliver lettere at udvikle og vedligeholde.

# 2. Projektets CSS-struktur

Vi har valgt at opdele styling i flere CSS-filer, hvor hver fil har sit eget ansvarsområde.

Den nuværende struktur er:

```text
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
│
├── styles/
│   ├── components.css
│   ├── typography.css
│   ├── design-tokens.css
│   └── utilities.css
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
└── features/
    ├── authentication/
    ├── wardrobe/
    ├── outfits/
    ├── personal-model/
    ├── payments/
    └── admin/
```

Nogle af CSS-filerne er allerede oprettet og taget i brug, mens andre er planlagte dele af den videre opbygning.

## 2.1 globals.css – hovedindgangen til styling

`src/app/globals.css` er projektets primære globale stylesheet.

Det er den fil, som Next.js indlæser fra `layout.tsx`, og som derfor bliver tilgængelig på tværs af appens sider.

Filen indeholder blandt andet:

- Import af Tailwind CSS.
- Import af de øvrige globale stylesheets.
- Grundlæggende CSS-reset.
- Globale regler for HTML-elementer og body.
- Globale designvariabler.
- Responsiv grundstruktur.
- Tilgængelighedsregler.

Vi bruger `globals.css` som samlingspunkt, så vi ikke behøver importere de samme globale stylesheets i hver enkelt side eller komponent.

Det betyder, at en global ændring kan påvirke hele applikationen.

## 2.2 design-tokens.css – centrale designværdier

Denne fil er planlagt til at indeholde DRESSEDs design tokens.

Design tokens er navngivne værdier, der repræsenterer designbeslutninger.

Eksempelvis:

```css
:root {
  --color-pink: #f77eae;
  --color-pink-strong: #ed4f8e;
  --color-cream: #fffaf5;

  --radius-large: 22px;

  --shadow-soft: 0 4px 18px rgba(70, 35, 50, 0.08);
}
```

I stedet for at skrive farvekoder og størrelser direkte i alle komponenter kan vi referere til variablerne:

```css
background: var(--color-pink);
border-radius: var(--radius-large);
box-shadow: var(--shadow-soft);
```

Fordelen er, at vi kun behøver ændre selve variablen, hvis vi eksempelvis vil justere DRESSEDs primære pink farve.

Alle elementer, der bruger variablen, vil automatisk følge ændringen.

Det er en vigtig del af et vedligeholdelsesvenligt designsystem.

**Bemærkning:** I den nuværende opbygning ligger design tokens foreløbig i `globals.css`. Hvis vi senere flytter dem til `design-tokens.css`, skal vi fjerne de oprindelige definitioner fra `globals.css`, så vi ikke får dobbelt definition af de samme variabler.

## 2.3 components.css – fælles komponentdesign

`components.css` indeholder globale CSS-klasser til gentagne UI-elementer.

Det kan eksempelvis være:

- Knapper.
- Kort.
- Inputfelter.
- Formularfelter.
- Badges.
- Labels.
- Links.

Eksempel på en global knap:

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  padding: 0.75rem 1.4rem;
  border-radius: var(--radius-pill);
  font-weight: 600;
}
```

Vi kan derefter lave forskellige knapvarianter:

```css
.btn-primary {
  background: var(--color-pink-strong);
  color: white;
}

.btn-secondary {
  background: var(--color-pink-soft);
  color: var(--color-text);
}

.btn-outline {
  background: transparent;
  border: 1px solid var(--color-border);
}
```

Det betyder, at alle primære knapper kan få samme udseende, uden at vi skal gentage den samme CSS-kode.

Hvis vi senere ændrer knappernes højde, afrunding eller hover-effekt, kan vi gøre det centralt.

Det er især nyttigt i DRESSED, fordi platformen kommer til at indeholde mange forskellige funktioner og skærmbilleder.

## 2.4 typography.css – typografisk system

`typography.css` indeholder de fælles regler for tekst og overskrifter.

Vi har valgt tre skrifttyper, der tilsammen understøtter DRESSEDs visuelle identitet:

**Playfair Display**

Bruges primært til overskrifter. Skrifttypen giver et mere fashion-orienteret, feminint og editorial udtryk.

**DM Sans**

Bruges til almindelig tekst, knapper, navigation, formularer og andre UI-elementer.

Den er letlæselig og fungerer godt på både store og små skærme.

**DM Mono**

Bruges til små labels, kategorier, tekniske oplysninger og retro-inspirerede detaljer.

Den bidrager til DRESSEDs Clueless-/Y2K-inspirerede computerunivers.

Vi har oprettet fælles typografiske klasser:

```css
.heading-display
.heading-xl
.heading-lg
.heading-md
.heading-sm

.text-lead
.text-body
.text-small
.text-caption

.text-eyebrow
.text-mono
```

I stedet for at definere font, størrelse, vægt og linjeafstand individuelt i hver komponent kan vi anvende disse klasser.

Eksempel:

```tsx
<h1 className="heading-display">
  Your closet. Your rules.
</h1>

<p className="text-lead">
  Your own little fashion universe.
</p>

<span className="text-eyebrow">
  Your digital wardrobe
</span>
```

Det giver et tydeligt typografisk hierarki på tværs af platformen.

## 2.5 utilities.css – generelle hjælpeklasser

`utilities.css` er planlagt til at indeholde mindre CSS-klasser, der hjælper med layout og placering.

Det kan eksempelvis være:

- Flexbox-layouts.
- Grid-layouts.
- Centrering.
- Afstande.
- Skjulte elementer.
- Responsive visningsregler.
- Generelle layoutbegrænsninger.

Disse klasser skal gøre det lettere at opbygge sider uden at gentage de samme layoutregler.

Vi skal dog undgå at oprette hjælpeklasser, der allerede findes i Tailwind CSS. Vi bruger Tailwind, hvor det giver mening, og vores egne klasser til DRESSED-specifikke designregler.

# 3. CSS-variabler og design tokens

En central del af systemet er brugen af CSS custom properties, også kaldet CSS-variabler.

Variablerne er defineret i `:root`.

`:root` refererer til dokumentets øverste HTML-element og gør variablerne tilgængelige globalt.

Eksempel:

```css
:root {
  --color-pink-light: #fff0f6;
  --color-pink-soft: #ffd7e7;
  --color-pink-medium: #ffb5d2;
  --color-pink: #f77eae;
  --color-pink-strong: #ed4f8e;
  --color-pink-dark: #d93676;
}
```

Vi kan derefter bruge variablerne i andre CSS-filer:

```css
.btn-primary {
  background: var(--color-pink-strong);
}
```

Her betyder `var(--color-pink-strong)`, at browseren skal hente værdien fra den globale CSS-variabel.

Fordelen er, at vi ikke behøver huske eller gentage farvekoden `#ed4f8e`.

Vi har også oprettet semantiske variabler:

```css
--background: var(--color-cream);
--foreground: var(--color-text);
```

Disse beskriver ikke en bestemt farvenuance, men farvens funktion.

Det gør det lettere senere at ændre den overordnede baggrund eller tekstfarve uden at ændre alle komponenter.

# 4. Tailwind CSS og vores eget CSS-system

DRESSED bruger Tailwind CSS, men vi har valgt ikke at lade Tailwind stå alene for hele designet.

Tailwind er et utility-first CSS-framework.

Det betyder, at styling ofte skrives direkte i komponenternes `className`.

Eksempel:

```tsx
<div className="flex items-center gap-4 rounded-xl p-6">
  Content
</div>
```

Her betyder:

- `flex`: elementet bruger Flexbox.
- `items-center`: indholdet centreres lodret.
- `gap-4`: der oprettes afstand mellem elementerne.
- `rounded-xl`: elementet får afrundede hjørner.
- `p-6`: elementet får indvendig afstand.

Tailwind er effektivt til hurtige layoutbeslutninger.

Vores eget globale CSS-system bruges derimod til at definere DRESSEDs genkendelige designsprog.

Eksempelvis skal alle primære knapper bruge den samme pink farve, afrunding og hover-effekt.

Vi kan derfor kombinere systemerne:

```tsx
<button className="btn btn-primary">
  Create your closet
</button>
```

Her håndterer vores globale CSS knapdesignet, mens Tailwind fortsat kan bruges til øvrige layoutbehov.

Vi skal være opmærksomme på ikke at lade globale CSS-klasser og Tailwind utility-klasser modarbejde hinanden på det samme element.

# 5. layout.tsx – indlæsning af skrifttyper og globale styles

`src/app/layout.tsx` er Next.js' root layout.

Det fungerer som den overordnede ramme for hele applikationen.

Alle sider i App Router-systemet bliver vist inden for dette layout, medmindre vi senere opretter særskilte layouts til bestemte route groups.

I filen har vi:

```tsx
import "./globals.css";
```

Denne import sørger for, at de globale styles bliver indlæst.

Vi indlæser også skrifttyperne med `next/font/google`:

```tsx
import {
  Playfair_Display,
  DM_Sans,
  DM_Mono,
} from "next/font/google";
```

Derefter definerer vi dem med CSS-variabler:

```tsx
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});
```

Det gør skrifttypen tilgængelig gennem variablen `--font-playfair`.

Det samme gør vi med DM Sans og DM Mono.

Variablerne bliver tilføjet på HTML-elementet:

```tsx
<html
  lang="da"
  className={`${playfair.variable} ${dmSans.variable} ${dmMono.variable}`}
>
```

Nu kan vores globale CSS bruge skrifttyperne:

```css
--font-heading: var(--font-playfair);
--font-body: var(--font-dm-sans);
--font-label: var(--font-dm-mono);
```

Det er forbindelsen mellem Next.js' fontindlæsning og vores globale typografisystem.

`display: "swap"` betyder, at browseren kan vise en fallback-skrifttype, mens den valgte skrifttype indlæses.

# 6. Responsive design

DRESSED skal fungere på både desktop, tablet og mobil.

Derfor har vi etableret en responsiv grundstruktur i `globals.css`.

Vi bruger media queries:

```css
@media (max-width: 768px) {
  .page-container {
    width: min(100% - 28px, var(--content-max-width));
  }
}
```

En media query gør det muligt at anvende bestemte CSS-regler, når skærmens bredde opfylder en bestemt betingelse.

Eksempelvis:

- Desktop får mere plads omkring indholdet.
- Tablet får mindre afstande.
- Mobil får endnu smallere sideafstande.

Vi bruger også `clamp()` til fleksible skriftstørrelser.

Eksempel:

```css
.heading-display {
  font-size: clamp(3rem, 7vw, 6rem);
}
```

`clamp()` tager tre værdier:

1. Minimumsstørrelse.
2. Fleksibel størrelse.
3. Maksimumsstørrelse.

Det betyder, at overskriften tilpasser sig skærmens bredde, men aldrig bliver mindre eller større end de angivne grænser.

Responsivitet skal ikke kun handle om at gøre elementerne mindre. Navigation, garderobe, filtre, kort og formularer skal også have en gennemtænkt mobilstruktur.

# 7. Genanvendelige React-komponenter

Det globale CSS-system arbejder sammen med vores React-komponenter.

Vi har allerede oprettet følgende UI-komponenter:

```text
src/components/ui/
├── Button.tsx
├── Input.tsx
├── Card.tsx
└── Badge.tsx
```

Disse komponenter fungerer som genanvendelige byggesten.

Eksempelvis skal `Button.tsx` kunne bruges på tværs af:

- Login.
- Signup.
- Garderoben.
- Outfit-editoren.
- Profilen.
- Admin-dashboardet.

Vi skal derfor undgå at lave en helt ny knapkomponent til hver funktion.

I stedet bruger vi én fælles komponent med forskellige varianter.

Det er vigtigt at skelne mellem to ting:

**Global CSS** bestemmer det fælles visuelle design.

**React-komponenten** bestemmer struktur, funktionalitet, props og event handlers.

Det giver en tydelig opdeling mellem præsentation og funktionalitet.

# 8. Sammenhængen mellem CSS og DRESSEDs feature-arkitektur

DRESSED er opdelt i forskellige funktionelle områder:

```text
features/
├── authentication/
├── wardrobe/
├── outfits/
├── personal-model/
├── payments/
└── admin/
```

Hver feature skal have sine egne komponenter, hooks, stores og typer.

Det globale designsystem skal dog være fælles for alle features.

Eksempelvis skal en knap i garderoben og en knap i admin-dashboardet følge samme grundlæggende design.

Der kan stadig være særlige feature-specifikke designs.

En garderobekomponent kan eksempelvis have særlige kategorikort, mens admin-dashboardet kan have tabeller og statusvisninger.

Disse specialiserede elementer skal placeres tæt på den feature, de tilhører, mens generelle elementer bliver i `components/ui`.

På den måde undgår vi, at det globale CSS-system bliver fyldt med regler, som kun bruges ét bestemt sted.

# 9. Hvordan vi arbejder videre med systemet

Når vi udvikler nye sider og funktioner, skal vi følge nogle faste principper:

1. Først undersøger vi, om der allerede findes en global klasse eller komponent, der kan bruges.
2. Hvis elementet er generelt og genanvendeligt, placeres det i `components/ui`.
3. Hvis elementet kun hører til én feature, placeres det i den pågældende feature.
4. Hvis et design går igen på tværs af platformen, bør det overvejes som en global CSS-klasse eller design token.
5. Vi undgår at gentage farvekoder, skygger og afstande direkte i komponenterne.
6. Vi tester ændringer på både desktop og mobil.
7. Vi ændrer ikke globale styles uden at overveje, hvilke andre komponenter ændringen påvirker.

Et vigtigt princip er, at vi ikke skal flytte al CSS ind i globale filer.

Global CSS skal indeholde fælles regler, mens specialiserede komponenter stadig kan have deres egen CSS, når det giver mening.

# 10. Nuværende status

Følgende dele er etableret:

| Fil | Funktion | Status |
|---|---|---|
| `app/globals.css` | Globalt CSS-fundament og design tokens | Oprettet |
| `app/layout.tsx` | Root layout og fontindlæsning | Oprettet |
| `styles/components.css` | Globale komponentklasser | Oprettet |
| `styles/typography.css` | Typografisk system | Oprettet |
| `styles/design-tokens.css` | Separat fil til design tokens | Planlagt |
| `styles/utilities.css` | Globale hjælpeklasser | Planlagt |

De eksisterende UI-komponenter er oprettet, men bruger stadig deres oprindelige Tailwind-klasser. De skal senere tilpasses det globale komponentdesign.

# 11. Vigtige tekniske opmærksomhedspunkter

**Import-rækkefølge**

Vi bruger Tailwind og egne CSS-filer sammen. Importerne skal være organiseret, så styles ikke utilsigtet overskriver hinanden.

**Dobbelt styling**

Hvis en komponent både bruger globale klasser og Tailwind-klasser til samme egenskab, skal vi kontrollere, hvilken regel der vinder.

**Globale ændringer**

En ændring i `globals.css` kan påvirke alle sider. Derfor skal globale ændringer testes grundigt.

**Fontindlæsning**

Hvis en skrifttypevariabel ændres i `layout.tsx`, skal den tilsvarende reference også ændres i CSS.

**Responsivitet**

Vi skal løbende teste på forskellige skærmstørrelser og ikke vente til hele platformen er færdig.

---

# 12. Konklusion

Vi har valgt at bygge DRESSED med et centralt globalt CSS-system, fordi platformen skal kunne vokse uden at miste sin visuelle sammenhæng.

Designsystemet gør det muligt at arbejde struktureret med både det visuelle udtryk og den tekniske opbygning.

`globals.css` fungerer som indgangspunktet, design tokens definerer de centrale værdier, `components.css` samler fælles komponentdesign, og `typography.css` styrer det typografiske hierarki.

`layout.tsx` forbinder det hele med Next.js og indlæser de skrifttyper, som designet bygger på.

Resultatet skal være et fleksibelt, genanvendeligt og responsivt designsystem, som kan understøtte alle DRESSEDs funktioner – fra den offentlige forside til den personlige garderobe, outfit-editoren og admin-dashboardet.

**Det overordnede mål er, at DRESSED skal føles som ét samlet produkt, ikke som en samling af forskellige sider, der tilfældigvis tilhører samme hjemmeside.**