import FeaturedTopo from "@/components/FeaturedTopo";

export const metadata = {
  title: "Politique de confidentialité · Tourbillon Studios",
  description:
    "Comment Tourbillon Studios collecte, utilise et protège vos données personnelles. Conforme à la nLPD suisse et au RGPD européen.",
  robots: { index: true, follow: true },
};

/** Dernière mise à jour · à ajuster en cas de modification du texte. */
const LAST_UPDATE = "juillet 2026";

interface Section {
  title: string;
  body: (string | { list: string[] })[];
}

const SECTIONS: Section[] = [
  {
    title: "1. Responsable du traitement",
    body: [
      "Le responsable du traitement des données personnelles collectées via ce site est Tourbillon Studios, studio digital établi en Suisse (Genève · Lausanne · Zürich).",
      "Pour toute question relative à la protection de vos données, vous pouvez nous contacter à l'adresse contact@tourbillonstudios.ch.",
    ],
  },
  {
    title: "2. Données que nous collectons",
    body: [
      "Nous collectons uniquement les données que vous nous transmettez volontairement, ainsi que des données techniques strictement nécessaires au fonctionnement du site :",
      {
        list: [
          "Données de contact : nom, adresse email, entreprise et message, lorsque vous remplissez le formulaire de contact ou le questionnaire de projet.",
          "Informations sur votre projet : type de projet, formule envisagée, délai souhaité et précisions que vous choisissez de partager.",
          "Données techniques : adresse IP, type de navigateur, pages consultées, à des fins de sécurité et de mesure d'audience anonymisée.",
        ],
      },
      "Nous ne collectons aucune donnée sensible au sens de la loi et ne procédons à aucun profilage automatisé ayant des effets juridiques à votre égard.",
    ],
  },
  {
    title: "3. Finalités du traitement",
    body: [
      "Vos données sont traitées pour les finalités suivantes :",
      {
        list: [
          "Répondre à vos demandes et établir un devis.",
          "Assurer le suivi de la relation commerciale et contractuelle.",
          "Améliorer notre site et nos services par une analyse d'audience.",
          "Respecter nos obligations légales.",
        ],
      },
    ],
  },
  {
    title: "4. Base légale",
    body: [
      "Le traitement de vos données repose sur votre consentement (formulaire de contact et questionnaire), sur l'exécution de mesures précontractuelles et contractuelles, ainsi que sur notre intérêt légitime à assurer la sécurité et l'amélioration du site.",
      "Ce traitement est effectué conformément à la loi fédérale suisse sur la protection des données (nLPD, en vigueur depuis le 1er septembre 2023) et, le cas échéant, au Règlement général sur la protection des données (RGPD) de l'Union européenne.",
    ],
  },
  {
    title: "5. Destinataires et sous-traitants",
    body: [
      "Vos données peuvent être transmises à des prestataires techniques agissant pour notre compte, dans le strict cadre des finalités décrites ci-dessus :",
      {
        list: [
          "Vercel Inc. · hébergement du site.",
          "Telegram · transmission interne et sécurisée des demandes reçues via le formulaire.",
          "Cal.com · prise de rendez-vous en ligne, le cas échéant.",
        ],
      },
      "Ces prestataires n'utilisent pas vos données à d'autres fins que celles pour lesquelles nous les mandatons. Certains d'entre eux peuvent traiter des données hors de Suisse ou de l'Union européenne ; dans ce cas, nous veillons à ce que des garanties appropriées soient en place.",
    ],
  },
  {
    title: "6. Durée de conservation",
    body: [
      "Nous conservons vos données uniquement le temps nécessaire aux finalités poursuivies : le temps du traitement de votre demande, puis pour la durée de notre relation commerciale, et enfin dans le respect des délais légaux de conservation. Passé ces délais, vos données sont supprimées ou anonymisées.",
    ],
  },
  {
    title: "7. Vos droits",
    body: [
      "Conformément à la législation applicable, vous disposez à tout moment des droits suivants sur vos données personnelles :",
      {
        list: [
          "Droit d'accès et d'information.",
          "Droit de rectification des données inexactes.",
          "Droit à la suppression de vos données.",
          "Droit de vous opposer au traitement ou d'en demander la limitation.",
          "Droit à la portabilité de vos données.",
        ],
      },
      "Pour exercer ces droits, écrivez-nous à contact@tourbillonstudios.ch. Nous répondons dans les meilleurs délais. Vous pouvez également saisir le Préposé fédéral à la protection des données et à la transparence (PFPDT) en Suisse.",
    ],
  },
  {
    title: "8. Cookies et mesure d'audience",
    body: [
      "Le site utilise un nombre minimal de cookies techniques nécessaires à son bon fonctionnement (préférence de thème clair/sombre, langue). Aucune donnée personnelle n'est vendue ni partagée à des fins publicitaires.",
      "Vous pouvez configurer votre navigateur pour refuser les cookies. Cela n'affecte pas les fonctionnalités essentielles du site.",
    ],
  },
  {
    title: "9. Sécurité",
    body: [
      "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou altération : connexion chiffrée (HTTPS), hébergement sécurisé et accès restreint aux données.",
    ],
  },
  {
    title: "10. Modifications",
    body: [
      "Cette politique de confidentialité peut être mise à jour afin de refléter l'évolution de nos pratiques ou de la législation. La date de dernière mise à jour figure en haut de cette page.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative px-6 lg:px-10 pt-32 lg:pt-36 pb-14 border-b border-[var(--stroke)] overflow-hidden">
        <FeaturedTopo opacity={0.18} />
        <div className="relative mx-auto max-w-[900px]">
          <div className="text-eyebrow mb-6">Confidentialité</div>
          <h1 className="text-h1 tracking-tight">
            Politique de <span className="accent-serif">confidentialité</span>.
          </h1>
          <p className="mt-6 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-2xl leading-relaxed">
            La protection de vos données est une priorité. Cette page explique
            comment nous les collectons, les utilisons et les protégeons.
          </p>
          <p className="mt-4 font-mono text-[0.6875rem] uppercase tracking-wider text-[var(--text-faint)]">
            Dernière mise à jour · {LAST_UPDATE}
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <div className="mx-auto max-w-[760px] space-y-12">
          {SECTIONS.map((sec, i) => (
            <div key={i}>
              <h2 className="text-h3 tracking-tight text-[var(--text)] mb-4">
                {sec.title}
              </h2>
              <div className="space-y-4">
                {sec.body.map((block, j) =>
                  typeof block === "string" ? (
                    <p
                      key={j}
                      className="text-[1rem] text-[var(--text-dim)] leading-[1.75]"
                    >
                      {block}
                    </p>
                  ) : (
                    <ul key={j} className="space-y-2.5">
                      {block.list.map((item, k) => (
                        <li
                          key={k}
                          className="flex items-start gap-3 text-[1rem] text-[var(--text-dim)] leading-relaxed"
                        >
                          <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)] shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </div>
            </div>
          ))}

          {/* Contact card */}
          <div className="glass rounded-lg p-8 lg:p-10">
            <h2 className="text-h3 tracking-tight text-[var(--text)] mb-3">
              Une question sur vos données ?
            </h2>
            <p className="text-[0.9375rem] text-[var(--text-dim)] leading-relaxed mb-5">
              Écrivez-nous, nous vous répondons dans les meilleurs délais.
            </p>
            <a
              href="mailto:contact@tourbillonstudios.ch"
              className="inline-flex items-center gap-2 text-[1rem] font-medium text-[var(--accent)] hover:underline"
            >
              contact@tourbillonstudios.ch
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
