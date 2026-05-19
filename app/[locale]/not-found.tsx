import FeaturedTopo from "@/components/FeaturedTopo";
import Button from "@/components/Button";

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex items-center px-6 lg:px-10 py-20 overflow-hidden">
      <FeaturedTopo opacity={0.2} fade />
      <div className="relative mx-auto max-w-[800px] text-center">
        <div className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-[var(--accent)] mb-6">
          Erreur 404
        </div>
        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-medium leading-[1.05] tracking-tight">
          Cette page n'existe <span className="accent-serif">plus</span>.
        </h1>
        <p className="mt-7 text-[1rem] lg:text-[1.0625rem] text-[var(--text-dim)] max-w-xl mx-auto leading-relaxed">
          Le lien que vous avez suivi est obsolète ou la page a été déplacée. Vous pouvez retourner à l'accueil ou démarrer directement un projet.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <Button href="/">Retour à l'accueil</Button>
          <Button href="/start" variant="secondary" icon="none">
            Démarrer un projet
          </Button>
        </div>
      </div>
    </section>
  );
}
