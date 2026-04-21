export interface BlogSection {
  type: "h2" | "h3" | "p" | "ul" | "blockquote";
  text?: string;
  items?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: number;
  locale: string;
  content: BlogSection[];
}

const posts: BlogPost[] = [
  {
    slug: "site-web-48h-tourbillon-studios-avantage",
    title: "Site web livré en 48h : pourquoi Tourbillon Studios change les règles du jeu",
    excerpt: "Délai de 48h, aperçu en direct, retouche gratuite sous 7 jours : découvrez pourquoi ce modèle n'est pas juste plus rapide — il convertit davantage, et les chiffres le prouvent.",
    category: "À propos",
    date: "2025-04-10",
    readTime: 7,
    locale: "fr",
    content: [
      {
        type: "p",
        text: "La grande majorité des agences web annoncent des délais de 4 à 12 semaines. Entre les réunions de cadrage, les allers-retours de validation et les files d'attente internes, votre projet peut rester en standby pendant des mois. Chez Tourbillon Studios, nous avons choisi une approche radicalement différente : un site professionnel livré en 48 heures, avec un système d'aperçu en direct et une garantie de retouche de 7 jours."
      },
      {
        type: "h2",
        text: "Pourquoi 48h ? La réponse est dans les données"
      },
      {
        type: "p",
        text: "Chaque jour sans site web, c'est du chiffre d'affaires laissé sur la table. Une étude de Google a établi que 53 % des visiteurs mobiles abandonnent un site qui met plus de 3 secondes à charger. Mais avant même la performance, il y a l'existence : une entreprise sans présence en ligne perd en moyenne 30 % de crédibilité aux yeux de nouveaux prospects."
      },
      {
        type: "blockquote",
        text: "Selon HubSpot, 75 % des consommateurs jugent la crédibilité d'une entreprise à partir de son site web. Chaque semaine sans site est une semaine où vos concurrents captent vos clients."
      },
      {
        type: "p",
        text: "Notre modèle 48h n'est pas né d'une contrainte — il est né d'une conviction : un site fonctionnel et soigné livré rapidement vaut infiniment plus qu'un chef-d'œuvre livré en 3 mois. Le marché digital n'attend pas."
      },
      {
        type: "h2",
        text: "Le système d'aperçu en direct : vous validez avant de payer"
      },
      {
        type: "p",
        text: "La peur principale des entrepreneurs qui commandent un site web, c'est de recevoir quelque chose qui ne correspond pas à leur vision. Notre réponse : vous voyez le site en construction en temps réel, sur une URL privée, avant même la livraison finale."
      },
      {
        type: "ul",
        items: [
          "Accès à une URL de prévisualisation dès le lancement du projet",
          "Suivi en direct des modifications au fur et à mesure de leur développement",
          "Aucune surprise à la livraison : vous voyez exactement ce que vous recevez",
          "Retours en cours de route possibles pour affiner en amont"
        ]
      },
      {
        type: "p",
        text: "Ce système élimine le risque le plus fréquent dans la relation client-agence : le décalage entre ce qui est imaginé et ce qui est livré. En voyant le site se construire sous vos yeux, vous gardez le contrôle total du résultat."
      },
      {
        type: "h2",
        text: "La garantie 7 jours : une retouche, sans discussion"
      },
      {
        type: "p",
        text: "Après la livraison, vous avez 7 jours pour demander des ajustements. Textes, couleurs, structure, formulations — tout ce qui ne vous convient pas parfaitement est retouché sans supplément. Nous ne nous cachons pas derrière des conditions générales complexes : notre engagement est clair, simple, et tenu."
      },
      {
        type: "p",
        text: "Pourquoi ce délai de 7 jours ? Parce que c'est le temps nécessaire pour utiliser le site dans des conditions réelles : le montrer à vos associés, recevoir des premiers retours de clients, tester tous les appareils. Une semaine d'usage réel révèle plus qu'une heure de validation à chaud."
      },
      {
        type: "h2",
        text: "Vitesse de livraison et taux de conversion : le lien prouvé"
      },
      {
        type: "p",
        text: "La rapidité de livraison n'est pas seulement un avantage opérationnel — elle a un impact direct sur la performance commerciale du site lui-même. Des recherches de Portent ont montré qu'un site qui charge en 1 seconde convertit 3 fois mieux qu'un site qui charge en 5 secondes. Notre stack technique (Next.js, Tailwind CSS, Vercel) est optimisée pour des scores Lighthouse proches de 100."
      },
      {
        type: "ul",
        items: [
          "Sites développés avec Next.js : rendu hybride SSG/SSR pour des performances maximales",
          "Score Lighthouse moyen de nos livrables : 95+ en performance",
          "Temps de chargement moyen : < 1,5 secondes sur connexion standard",
          "Compatible mobile-first : > 60 % du trafic web provient du mobile en Suisse"
        ]
      },
      {
        type: "blockquote",
        text: "Selon Deloitte, améliorer la vitesse d'un site mobile de 0,1 seconde augmente les conversions de 8 % dans le retail et de 10 % dans le voyage. La performance n'est pas technique — elle est commerciale."
      },
      {
        type: "h2",
        text: "Ce que les agences classiques ne vous disent pas"
      },
      {
        type: "p",
        text: "Un projet à 8 semaines implique souvent des semaines creuses : attente d'un chef de projet disponible, réunions qui ne font pas avancer le code, sous-traitance à un prestataire offshore dont vous ignorez l'existence. Le délai affiché cache rarement un temps de travail équivalent."
      },
      {
        type: "p",
        text: "Notre modèle est différent parce que notre structure est différente : une équipe resserrée, des processus optimisés, aucune bureaucratie intermédiaire. Vous parlez directement aux développeurs qui font votre site. C'est pour cela que 48h n'est pas une promesse marketing — c'est notre standard opérationnel."
      },
      {
        type: "h2",
        text: "Pour qui est fait ce modèle ?"
      },
      {
        type: "ul",
        items: [
          "Entrepreneurs qui lancent une activité et ont besoin d'une présence en ligne immédiate",
          "PME qui refont leur site et ne peuvent pas se permettre des mois d'indisponibilité digitale",
          "Indépendants qui perdent des contrats faute d'un site professionnel",
          "Startups qui ont besoin d'une landing page avant une levée de fonds ou un lancement produit",
          "Entreprises suisses qui veulent un site plurilingue (FR/DE/IT/EN) sans délai"
        ]
      },
      {
        type: "h2",
        text: "Conclusion : le temps, c'est du chiffre d'affaires"
      },
      {
        type: "p",
        text: "Dans un marché où chaque journée sans site web représente des opportunités manquées, la rapidité est un avantage concurrentiel direct. Tourbillon Studios a construit son modèle autour de cette réalité : vous méritez un site professionnel, beau et performant — et vous le méritez maintenant, pas dans 3 mois."
      },
      {
        type: "p",
        text: "48h de délai. Aperçu en direct. 7 jours de retouche garantis. C'est notre promesse, et c'est notre quotidien."
      }
    ]
  },
  {
    slug: "agence-web-geneve-comment-choisir",
    title: "Agence web à Genève : comment choisir le bon partenaire digital en 2025",
    excerpt: "Face à la prolifération d'agences digitales, comment identifier celle qui correspond vraiment à votre projet ? Critères concrets, questions à poser et erreurs à éviter.",
    category: "Stratégie digitale",
    date: "2025-03-15",
    readTime: 7,
    locale: "fr",
    content: [
      {
        type: "p",
        text: "Genève concentre une densité remarquable d'entreprises digitales — startups, PME établies, multinationales — qui ont toutes besoin d'une présence en ligne irréprochable. Résultat : le marché des agences web est saturé d'offres, et distinguer la bonne du lot demande méthode."
      },
      {
        type: "h2",
        text: "1. Définir votre besoin avant de contacter une agence"
      },
      {
        type: "p",
        text: "La première erreur est de contacter des agences sans avoir clarifié ce que vous voulez. Site vitrine, e-commerce, application web, refonte ou nouveau projet de zéro : chaque cas appelle des compétences différentes. Une agence spécialisée en Shopify n'est pas nécessairement la bonne pour une web app sur mesure avec authentification et tableau de bord."
      },
      {
        type: "ul",
        items: [
          "Quel est l'objectif principal du site ? (visibilité, ventes, prises de RDV...)",
          "Qui est votre audience cible ? (locale, internationale, BtoB, BtoC)",
          "Avez-vous besoin d'un backoffice pour gérer le contenu vous-même ?",
          "Quel est votre budget réaliste — y compris la maintenance annuelle ?"
        ]
      },
      {
        type: "h2",
        text: "2. Les critères techniques à vérifier"
      },
      {
        type: "p",
        text: "Au-delà du porfolio, examinez la stack technique. En 2025, un bon prestataire web à Genève doit maîtriser des technologies modernes : Next.js ou Nuxt pour le rendu hybride, Tailwind CSS pour l'interface, Supabase ou une base SQL pour les données, et des pratiques DevOps (CI/CD, déploiement Vercel/AWS)."
      },
      {
        type: "blockquote",
        text: "Un site lent perd 53 % de ses visiteurs mobiles avant même de s'afficher. La performance technique n'est pas un luxe — c'est un prérequis commercial."
      },
      {
        type: "p",
        text: "Demandez systématiquement un score Lighthouse sur un projet livré récemment. Un bon site doit viser 90+ en performance, 100 en accessibilité et 100 en SEO. Ces chiffres sont publics et vérifiables en 30 secondes."
      },
      {
        type: "h2",
        text: "3. Évaluer la qualité du processus, pas seulement du résultat"
      },
      {
        type: "p",
        text: "Un beau portfolio ne dit rien sur la communication, les délais ou la gestion des imprévus. Posez des questions précises sur le processus : comment se déroule le brief ? Combien de révisions sont incluses ? Qui est votre interlocuteur principal ? Comment les retards sont-ils gérés ?"
      },
      {
        type: "ul",
        items: [
          "Demandez des références clients vérifiables — pas juste des logos",
          "Vérifiez si l'agence sous-traite tout ou maintient des compétences en interne",
          "Assurez-vous que le contrat précise la propriété du code livré",
          "Clarifiez les conditions de maintenance post-lancement"
        ]
      },
      {
        type: "h2",
        text: "4. Agence locale vs. agence internationale"
      },
      {
        type: "p",
        text: "Travailler avec une agence basée en Suisse présente des avantages concrets : même fuseau horaire, compréhension du marché local, réactivité, et souvent une culture de la précision et du respect des engagements propre à l'écosystème suisse. Le surcoût apparent est souvent compensé par moins de frictions et une qualité de livrable supérieure."
      },
      {
        type: "p",
        text: "Les entreprises genevoises ont des exigences particulières : souvent plurilingues (FR/DE/IT/EN), soumises à des réglementations suisses spécifiques (RGPD + loi nLPD), et opérant dans un marché où la réputation se construit sur la confiance. Une agence qui ne comprend pas ces nuances peut vous coûter cher."
      },
      {
        type: "h2",
        text: "5. Les signaux d'alarme à connaître"
      },
      {
        type: "ul",
        items: [
          "Prix anormalement bas (< 500 CHF pour un site professionnel) — synonyme de templates génériques",
          "Contrat de propriété ambigu sur le code ou les contenus",
          "Aucune référence vérifiable ni étude de cas détaillée",
          "Promesses de positionnement SEO « garanties » en quelques semaines",
          "Absence de devis détaillé avec périmètre précis"
        ]
      },
      {
        type: "h2",
        text: "Conclusion"
      },
      {
        type: "p",
        text: "Choisir une agence web à Genève, c'est avant tout choisir un partenaire de confiance pour un actif stratégique de votre entreprise. Prenez le temps de comparer sur des critères objectifs — technique, processus, transparence — plutôt que sur l'esthétique seule du portfolio. Un bon devis commence toujours par de bonnes questions."
      }
    ]
  },
  {
    slug: "site-vitrine-ecommerce-webapp-lequel-choisir",
    title: "Site vitrine, e-commerce ou web app : quel type de site pour votre projet ?",
    excerpt: "Site vitrine, boutique en ligne ou application web : les différences sont fondamentales et le mauvais choix peut coûter cher. Guide décisionnel complet pour les entreprises suisses.",
    category: "Conseil",
    date: "2025-02-28",
    readTime: 6,
    locale: "fr",
    content: [
      {
        type: "p",
        text: "Quand une entreprise décide de (re)faire son site internet, la première question devrait être : de quel type de site ai-je réellement besoin ? La réponse conditionne le budget, la technologie, le délai de livraison et la stratégie à long terme."
      },
      {
        type: "h2",
        text: "Le site vitrine : votre carte de visite digitale"
      },
      {
        type: "p",
        text: "Un site vitrine est un site informatif qui présente votre entreprise, vos services et vos coordonnées. Il ne permet pas de transactions en ligne. C'est l'outil idéal pour les professions libérales, les cabinets, les studios créatifs et toutes les activités où la vente se fait par contact direct."
      },
      {
        type: "ul",
        items: [
          "Budget typique : 2 000 – 8 000 CHF selon la complexité",
          "Délai : 3 à 6 semaines",
          "Maintenance : faible, principalement mise à jour de contenu",
          "Objectif principal : générer des prises de contact qualifiées"
        ]
      },
      {
        type: "p",
        text: "En Suisse, un site vitrine bien conçu et optimisé pour le SEO local peut générer suffisamment de prospects pour justifier largement l'investissement. La clé : des pages de service précises, un appel à l'action clair, et une vitesse de chargement irréprochable."
      },
      {
        type: "h2",
        text: "L'e-commerce : vendre 24h/24 sans intermédiaire"
      },
      {
        type: "p",
        text: "Une boutique en ligne ajoute une couche transactionnelle — paiement, gestion de stock, commandes, livraisons. C'est l'outil adapté si vous vendez des produits physiques ou numériques, que ce soit en BtoC ou BtoB."
      },
      {
        type: "blockquote",
        text: "En Suisse, le e-commerce a progressé de 23 % entre 2022 et 2024. Les consommateurs suisses achètent en ligne, mais ils sont exigeants sur la sécurité des paiements et la qualité de l'expérience."
      },
      {
        type: "ul",
        items: [
          "Budget typique : 5 000 – 20 000 CHF (hors catalogue produit)",
          "Délai : 6 à 12 semaines",
          "Maintenance : régulière (sécurité, paiements, stock)",
          "Technologies courantes : Shopify, WooCommerce, Next.js + Stripe"
        ]
      },
      {
        type: "h2",
        text: "La web app : quand la logique métier prime"
      },
      {
        type: "p",
        text: "Une web application est un site qui fait « quelque chose » pour l'utilisateur : réserver, gérer, calculer, collaborer. Elle implique une authentification, une base de données dynamique, et souvent un backoffice d'administration. C'est l'outil des plateformes SaaS, des outils de gestion, des portails clients et des systèmes de réservation."
      },
      {
        type: "ul",
        items: [
          "Budget typique : 15 000 – 80 000 CHF selon la complexité",
          "Délai : 8 à 24 semaines",
          "Maintenance : continue (infrastructure, sécurité, évolutions)",
          "Technologies courantes : Next.js, React, Node.js, Supabase, PostgreSQL"
        ]
      },
      {
        type: "h2",
        text: "Comment choisir ?"
      },
      {
        type: "p",
        text: "Posez-vous trois questions clés : (1) Mon site doit-il traiter des transactions ? Si oui, e-commerce ou web app. (2) Mon site doit-il mémoriser des données propres à chaque utilisateur ? Si oui, web app. (3) Mon objectif est-il uniquement de présenter et de générer des contacts ? Si oui, site vitrine."
      },
      {
        type: "p",
        text: "Une erreur fréquente est de commanditer une web app complexe alors qu'un site vitrine soigné avec un bon formulaire de contact aurait suffi — et économisé 30 000 CHF. L'inverse est tout aussi coûteux : sous-investir dans une plateforme qui devra être refaite un an plus tard."
      },
      {
        type: "h2",
        text: "L'approche évolutive"
      },
      {
        type: "p",
        text: "La bonne nouvelle : ces types de sites ne s'excluent pas. Chez Tourbillon Studios, nous privilégions souvent une architecture évolutive — commencer par un site vitrine ou e-commerce lean, puis ajouter des fonctionnalités de web app au fur et à mesure que le besoin est validé. Cela réduit le risque et optimise l'investissement."
      }
    ]
  },
  {
    slug: "seo-local-suisse-guide-complet",
    title: "SEO en Suisse : guide complet pour dominer les résultats de recherche locaux",
    excerpt: "Le marché suisse a ses spécificités SEO : plurilinguisme, concurrence modérée sur certaines niches, et comportement de recherche distinct. Voici comment en tirer parti.",
    category: "SEO & Visibilité",
    date: "2025-01-20",
    readTime: 9,
    locale: "fr",
    content: [
      {
        type: "p",
        text: "La Suisse est un marché SEO atypique. Avec quatre langues nationales, une densité d'entreprises très élevée, et des consommateurs parmi les plus connectés d'Europe, les règles du référencement naturel y ont leurs propres nuances. Ce guide s'adresse aux entreprises romandes qui veulent capter davantage de trafic qualifié depuis Google."
      },
      {
        type: "h2",
        text: "Pourquoi le SEO suisse est différent"
      },
      {
        type: "p",
        text: "Contrairement à la France ou à l'Allemagne, le marché suisse est fragmenté en régions linguistiques. Cela signifie que vos concurrents ciblent parfois des audiences différentes — et que des mots-clés très compétitifs en France peuvent être quasi vierges côté romand. C'est une opportunité réelle pour des entreprises qui investissent tôt."
      },
      {
        type: "blockquote",
        text: "Un mot-clé comme « agence web Genève » reçoit environ 300 à 500 recherches mensuelles. C'est peu comparé à Paris, mais les leads générés sont ultra-qualifiés et locaux."
      },
      {
        type: "h2",
        text: "Les fondamentaux du SEO on-page"
      },
      {
        type: "p",
        text: "Avant toute stratégie de contenu ou de backlinks, assurez-vous que votre site respecte les bases techniques. Google évalue en priorité la vitesse de chargement (Core Web Vitals), la compatibilité mobile, la structure des URL et la clarté de l'architecture."
      },
      {
        type: "ul",
        items: [
          "Vitesse : visez un LCP (Largest Contentful Paint) < 2,5 secondes",
          "Mobile-first : plus de 60 % des recherches locales viennent du mobile",
          "HTTPS obligatoire — un site non sécurisé est pénalisé et décourage les visiteurs",
          "URL lisibles : /services/creation-site-internet-geneve plutôt que /page?id=42",
          "Balises title et meta description uniques pour chaque page"
        ]
      },
      {
        type: "h2",
        text: "Le SEO local : Google Business Profile et citations"
      },
      {
        type: "p",
        text: "Pour une entreprise basée à Genève, Lausanne ou Zürich, le référencement local passe obligatoirement par Google Business Profile (anciennement Google My Business). Bien configuré, il permet d'apparaître dans le « pack local » — les trois résultats affichés sur la carte Google."
      },
      {
        type: "ul",
        items: [
          "Créez et vérifiez votre fiche Google Business Profile",
          "Remplissez tous les champs : horaires, services, description, photos",
          "Récoltez régulièrement des avis clients authentiques",
          "Citez votre adresse exacte de manière cohérente sur tous les annuaires (NAP : Name, Address, Phone)",
          "Inscrivez-vous sur search.ch, local.ch, Yelp CH et les annuaires sectoriels"
        ]
      },
      {
        type: "h2",
        text: "La stratégie de contenu : pourquoi le blog est essentiel"
      },
      {
        type: "p",
        text: "Le contenu est le carburant du SEO. Les pages statiques (accueil, services, contact) ne suffisent pas à capturer la longue traîne — ces requêtes de recherche précises que tapent vos futurs clients. Un blog bien structuré vous permet de répondre aux questions que se pose votre audience avant d'acheter."
      },
      {
        type: "p",
        text: "Exemples de requêtes à longue traîne pour une agence web à Genève : « combien coûte un site vitrine en Suisse », « différence site vitrine web app », « comment améliorer le SEO de mon site », « agence web spécialisée immobilier Genève ». Chacune de ces requêtes peut faire l'objet d'un article de 600 à 1 200 mots qui attire du trafic qualifié pendant des années."
      },
      {
        type: "h2",
        text: "GEO : optimiser pour les moteurs d'IA (ChatGPT, Perplexity, Gemini)"
      },
      {
        type: "p",
        text: "En 2025, une nouvelle dimension s'ajoute au SEO classique : la GEO, ou Generative Engine Optimization. Les moteurs de recherche basés sur l'IA (ChatGPT, Perplexity, Google AI Overviews) citent de plus en plus des sources spécifiques pour répondre aux questions des utilisateurs. Pour être cité, votre contenu doit être factuel, structuré, et répondre précisément à des questions."
      },
      {
        type: "ul",
        items: [
          "Répondez directement aux questions dans vos titres (format \"Comment...?\", \"Pourquoi...?\", \"Quel est...?\")",
          "Utilisez des données chiffrées et des sources vérifiables",
          "Structurez vos articles avec des H2 et H3 clairs",
          "Ajoutez des FAQ en bas d'article pour les requêtes vocales et IA",
          "Visez 700 à 1 500 mots par article — suffisamment complet pour être cité"
        ]
      },
      {
        type: "h2",
        text: "Les backlinks : qualité avant quantité"
      },
      {
        type: "p",
        text: "Les backlinks — liens entrants depuis d'autres sites — restent un signal fort pour Google. En Suisse, la stratégie doit viser des liens depuis des sites locaux pertinents : la CCIG (Chambre de commerce genevoise), des médias locaux comme Tribune de Genève ou Bilan, des associations professionnelles, des partenaires commerciaux."
      },
      {
        type: "p",
        text: "Un seul lien depuis un site d'autorité suisse vaut davantage que cent liens depuis des annuaires génériques de bas niveau. Investissez dans des relations, du contenu partageable et des partenariats — c'est la seule stratégie de backlinks qui fonctionne sur le long terme."
      },
      {
        type: "h2",
        text: "Mesurer et itérer"
      },
      {
        type: "p",
        text: "Le SEO n'est pas une action ponctuelle mais un processus continu. Configurez Google Search Console (gratuit) et Google Analytics pour suivre vos positions, vos clics et vos conversions. Révisez votre stratégie chaque trimestre et ajustez en fonction des données. Les résultats sérieux commencent généralement à apparaître entre 3 et 6 mois d'effort constant."
      }
    ]
  }
];

export function getAllPosts(): BlogPost[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  const localeMap: Record<string, string> = {
    fr: "fr-CH",
    de: "de-CH",
    it: "it-CH",
    en: "en-GB",
  };
  return date.toLocaleDateString(localeMap[locale] ?? "fr-CH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
