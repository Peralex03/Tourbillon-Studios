# Tourbillon Studios · Contexte projet

Studio digital suisse · sites web professionnels livrés en 48 h, en abonnement mensuel.
Cible : PME suisses (10-100 employés), Genève · Lausanne · Zürich.

---

## Stack

- **Framework** : Next.js 16 (App Router, Turbopack)
- **Style** : Tailwind v4 (avec `@theme inline` dans `globals.css`)
- **Fonts** : Inter (body) + Geist Mono (labels) + Instrument Serif (accents italiques uniquement)
- **i18n** : next-intl, locales `fr/de/it/en`, default `fr`
- **Theme** : next-themes, default `system` (auto dark/light)
- **Smooth scroll** : Lenis (`components/SmoothScroll.tsx`)
- **Animations** : Framer Motion
- **Deploy** : Vercel (auto sur push `main`)
- **Repo** : github.com/Peralex03/Tourbillon-Studios

## Architecture pages

```
/                          Home · quiz embarqué directement sous nav + métriques + trust badges + 3 témoignages + CTA finale
/about                     Manifeste · valeurs · équipe · "Derrière le code" (placeholders SVG) · villes
/process                   ProcessTimeline (sticky scroll + 4 mockups SVG) · garantie · FAQ accordion · CTA
/pricing                   Hero · 3 plans glass · ownership · PlanRecommender (mini-quiz 2 questions) · table comparative · ROI · FAQ · CTA
/work                      Hidden (noindex, pas dans nav) · grille bento de cas
/work/[slug]               Case study individuel (cover via inline CSS gradient, pas Tailwind dynamic)
/blog                      Liste articles
/blog/[slug]               Article + RelatedArticlesSection en bas
/contact                   Hero · formulaire glass · sidebar coords
/start                     Quiz fullscreen (mode="fullscreen"), `QuizClient` est aussi embarqué sur home en mode="embed"
/not-found                 404 custom · FeaturedTopo · double CTA
```

## Design system

### Palette (warm neutrals · brown/beige + terracotta)

| Token | Dark | Light |
|---|---|---|
| `--bg` | `#2B201A` | `#EFE4D0` |
| `--surface-1` | `#3A2D24` | `#FFFFFF` |
| `--surface-2` | `#463629` | `#E5D7BD` |
| `--stroke` | `#5A4435` | `#C9B89C` |
| `--text` | `#F5EAD8` | `#2B201A` |
| `--text-dim` | `#B8A892` | `#6B5743` |
| `--accent` | `#E07856` | `#B85138` |
| `--accent-ink` | `#FFFFFF` | `#FFFFFF` |

### Typographie

- Titres : Inter sans-serif (`text-h1/h2/h3/h4` defined dans globals.css)
- Cap maximum : `text-h1 = clamp(1.75rem, 3.5vw, 2.25rem)` (max 36px)
- **Serif italic uniquement sur 1-2 mots-clés par titre** via `.accent-serif` (Instrument Serif italique terracotta)
- Pattern : `Discutons de votre <span className="accent-serif">projet</span>.`

### Glass utilities

- `.glass` · `.glass-strong` · `.glass-subtle` (cards, surfaces)
- `.header-glass-top` · `.header-glass-scrolled` (headers, dérivées de `--surface-1/2`)
- Mobile : blur valeurs réduites via `@media (max-width: 767px)` dans globals.css
- **Sites avec mix-blend-mode interdits** : un fixed full-viewport avec mix-blend-mode casse silencieusement tous les `backdrop-filter` du document sur desktop Chromium. C'est pourquoi `.noise-overlay` a été supprimé.
- **Header : pattern CSS minimal uniquement** (`background` + `backdrop-filter`, comme `.glass`). NE PAS rajouter `transform: translateZ(0)`, `will-change: backdrop-filter`, ni `isolation: isolate` : ces propriétés forcent le header sur sa propre compositing layer et tuent le blur sur desktop Chromium (le filtre s'exécute sur du vide). Valeurs unifiées desktop/mobile : `blur(10px)` au top, `blur(14px)` scrolled.

### Lignes topographiques (`FeaturedTopo.tsx`)

- Marching squares sur champ de bruit multi-harmoniques (pixel-space avec `wavelength = 280px`)
- 7 niveaux d'iso-lignes, multi-foyer comme vraies cartes topo
- Réactif souris (bump gaussien local)
- Auto-disabled sur mobile et `prefers-reduced-motion`
- **Scope** : Hero quiz home, hero pages (About/Pricing/Process/Contact/Blog), CTAs finales, 404. **PAS** dans footer.

## Composants clés

| Composant | Rôle |
|---|---|
| `SiteHeader.tsx` | Nav fixée, theme toggle, locale switcher, bouton téléphone (Cal.com), CTA quiz |
| `SiteFooter.tsx` | Logo, links, `StudioStatus` live (heures Europe/Zurich) |
| `QuizClient.tsx` | Quiz multi-étapes, mode `embed` ou `fullscreen`, transitions blur, progress bar en bas |
| `FeaturedTopo.tsx` | Topographie iso-lines section-scoped |
| `Accordion.tsx` | FAQ avec animation height + blur + opacity |
| `Button.tsx` | Bouton uniformisé (variants/sizes/icons) |
| `ProcessTimeline.tsx` | Sticky scroll + cross-fade 4 mockups SVG |
| `PlanRecommender.tsx` | Mini-quiz Pricing 2 questions → recommandation |
| `ScrollProgress.tsx` | Ligne 2px terracotta en haut viewport, fill au scroll |
| `StudioStatus.tsx` | Indicateur live ouvert/fermé (Mon-Fri 09-18 Europe/Zurich) |
| `ThemeProvider.tsx` | next-themes wrapper, default `system` |
| `SmoothScroll.tsx` | Lenis (désactivé si prefers-reduced-motion) |

## Automation blog

Le blog est **100% automatisé**. Ne pas casser :

- `lib/blog.ts` : contient les articles (auto-appended par l'agent) + interfaces `BlogPost`, `BlogSection` + helpers `getAllPosts`, `getPostBySlug`, `getRelatedPosts`, `formatDate`
- `scripts/blog-agent.ts` : agent Anthropic SDK (claude-opus-4-7, adaptive thinking, streaming) qui génère 1 article/jour, l'append dans `lib/blog.ts`, commit, push
- `scripts/topics.json` : queue de sujets (`pending` → `done` quand traité)
- `scripts/generate-article.ts` : version manuelle one-shot
- `.github/workflows/blog-daily.yml` : cron 08h UTC + workflow_dispatch
- `.github/workflows/blog-preview.yml` : cron lundi 07h UTC, envoie preview Telegram

**Secrets GitHub requis** : `ANTHROPIC_API_KEY`, `TELEGRAM_BOT_TOKEN` (`8624243633:AAHGmJ7cpVrBIsYpNEzMdoXRWh_5YQBR_Pg`), `TELEGRAM_CHAT_ID` (`1020063443`)

**Bot Telegram** : `@TourbillonStudiosBot` (notifications quotidiennes + récap hebdomadaire + leads du quiz)

## API routes

- `app/api/lead/route.ts` : reçoit les soumissions du quiz, formatte et envoie au bot Telegram. Validation email + nom. Utilise `TELEGRAM_BOT_TOKEN` / `TELEGRAM_CHAT_ID` (à configurer aussi côté Vercel env vars).

## Data files

- `lib/pricing.ts` : 3 plans (Starter 290 CHF, Pro 590 CHF, Custom 1490 CHF/mois), FAQ, `PRICING_COMPARISON` (table cross features)
- `lib/projects.ts` : 3 case studies (covers = CSS gradient strings inline, pas Tailwind dynamic classes — important pour build)
- `lib/team.ts` : `TEAM`, `VALUES`, `CITIES`
- `lib/testimonials.ts` : 3 témoignages pour la home
- `lib/quiz.ts` : arbre de questions du quiz principal

## Apprentissages importants (à ne pas réintroduire)

1. **`mix-blend-mode` sur un fixed full-viewport casse backdrop-filter** sur desktop Chrome. `.noise-overlay` retiré pour cette raison.
2. **`bg-gradient-to-br ${variable}` avec Tailwind v4** ne marche pas si la valeur est dynamique → utiliser `style={{ background: gradientString }}` inline.
3. **Framer Motion `filter: blur()` sur un parent** crée un stacking context qui bloque `backdrop-filter` des `.glass` enfants → toujours ajouter `transitionEnd: { filter: "none" }` pour libérer.
4. **Em-dashes (—) retirés** partout (sauf dans le contenu auto-généré de `lib/blog.ts`). Remplacés par `·` (middot).
5. **`generateStaticParams` avec lib/blog.ts** : le fichier doit être valide TypeScript (virgules entre articles). L'agent gère mais surveiller si édition manuelle.
6. **`npm ci` casse en CI** (sync package-lock.json strict). Le workflow utilise `npm install` à la place.
7. **"Fixes GPU" sur le header (`transform: translateZ(0)` + `will-change: backdrop-filter` + `isolation: isolate`) cassent le blur sur desktop Chromium.** Ils forcent l'élément sur sa propre compositing layer, et le shader `backdrop-filter` ne voit alors plus les couches derrière → blur invisible. Sur mobile (Chrome Android / Safari iOS) le compositing est différent, donc l'asymétrie est trompeuse. Le pattern minimaliste de `.glass` (juste `background` + `backdrop-filter` + prefixe `-webkit-`) suffit et fonctionne partout.

## Vercel · variables d'environnement

À configurer dans Vercel → Settings → Environment Variables :
- `ANTHROPIC_API_KEY`
- `TELEGRAM_BOT_TOKEN` = `8624243633:AAHGmJ7cpVrBIsYpNEzMdoXRWh_5YQBR_Pg`
- `TELEGRAM_CHAT_ID` = `1020063443`

## Cal.com placeholder

Lien de booking actuel : `https://cal.com/tourbillon-studios/15min` (placeholder, à remplacer quand le compte sera créé).

## État au moment de la compression du contexte

**Dernier commit** : `e90b980` — fix GPU compositing layer sur header glass pour desktop backdrop-filter.

**En attente de vérification utilisateur** :
- Le blur du header sur desktop fonctionne-t-il enfin après le fix `translateZ(0) + isolation + will-change` ?
- Les traductions DE/IT/EN sont-elles satisfaisantes ?
- Les autres composants récents (ProcessTimeline, PlanRecommender, related articles, 404, ScrollProgress, StudioStatus) sont-ils OK visuellement ?

**Pas encore implémenté** :
- Vraies photos atelier pour About "Derrière le code" (actuellement placeholders SVG)
- Real screenshots case studies (actuellement gradients CSS)
- Page Work est accessible par URL directe mais cachée de la nav (à activer quand contenu prêt)

## Comment reprendre

1. `cd /Users/alexperez/Documents/tourbillon-studios`
2. `git pull origin main` pour récupérer les commits du bot blog
3. Vérifier Vercel deployment status sur le dashboard
4. Si bug : checker `.github/workflows/` pour status auto-deploy
5. Si test local : `npm run dev` (port 3000 ou auto)

## Conventions

- Vouvoiement professionnel direct, jamais de tutoiement, jamais "on" décontracté → "nous"
- Pas d'em-dash → middot `·` ou point/virgule
- Titres sans-serif courts, serif italique sur 1-2 mots-clés uniquement
- Boutons via `<Button>` component pour uniformité
- Sections avec topo : `relative overflow-hidden` + `<FeaturedTopo opacity={0.18} />` + content wrapper `relative`
- Glass cards : `glass rounded-lg p-X` (X selon densité visuelle souhaitée)
