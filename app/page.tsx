import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, PieChart, ShieldCheck, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import LandingNav from "@/components/LandingNav";

const features = [
  {
    title: "Budgets intelligents",
    description: "Ordonnez vos dépenses par catégories, couleurs et limites personnalisées.",
    icon: PieChart,
  },
  {
    title: "Vision temps réel",
    description: "Analysez instantanément vos flux financiers avec des filtres flexibles.",
    icon: CalendarCheck,
  },
  {
    title: "Conseils IA",
    description: "Recevez une synthèse claire et actionnable propulsée par Google Gemini.",
    icon: Sparkles,
  },
  {
    title: "Sécurité maîtrisée",
    description: "Authentification Better Auth, SSO Google et gouvernance des accès robuste.",
    icon: ShieldCheck,
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-background/90">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_45%)]" />
      <LandingNav />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-4 pb-20 pt-24 sm:px-6 lg:px-8">
        <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
              <span className="size-2 rounded-full bg-primary" />
              Klarna, votre copilote financier
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Pilotez vos dépenses avec clarté, sérénité et intelligence.
            </h1>
            <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
              Klarna centralise vos budgets personnels, automatise le suivi des dépenses et
              vous offre une analyse stratégique assistée par IA. Visualisez vos flux,
              identifiez les leviers d&apos;économies et gardez toujours une longueur d&apos;avance.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" asChild>
                <Link href="/sign-up">Créer un compte</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/sign-in">Se connecter</Link>
              </Button>
            </div>
          </div>

          <div className="relative isolate grid place-items-center">
            <div className="absolute inset-8 -z-10 rounded-[32px] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent blur-3xl" />
            <div className="w-full max-w-md overflow-hidden rounded-[28px] border border-border/60 bg-card/80 shadow-2xl backdrop-blur">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                  <Image
                    src="/logo2.svg"
                    width={32}
                    height={32}
                    className="dark:hidden"
                    alt="Klarna"
                  />
                  <Image
                    src="/logo-dark.svg"
                    width={32}
                    height={32}
                    className="hidden dark:block"
                    alt="Klarna"
                  />
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  Aperçu
                </span>
              </div>
              <Image
                src="/clientmanager.jpg"
                alt="Aperçu interface Klarna"
                width={640}
                height={480}
                className="h-64 w-full object-cover"
                priority
              />
              <div className="space-y-4 px-6 py-6 text-sm">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span>Total du mois</span>
                  <span className="text-lg font-semibold text-foreground">324 500 FCFA</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                  <div className="h-full w-5/6 rounded-full bg-gradient-to-r from-primary via-primary to-primary/70" />
                </div>
                <p className="text-muted-foreground">
                  12 dépenses enregistrées cette semaine. L&apos;IA recommande de revoir les
                  frais liés aux abonnements digitaux (+18 %).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-3xl border border-border/60 bg-card/70 p-10 shadow-xl backdrop-blur">
          <div className="mb-8 max-w-3xl">
            <h2 className="text-3xl font-semibold text-foreground">Pourquoi choisir Klarna&nbsp;?</h2>
            <p className="mt-3 text-base text-muted-foreground">
              Une plateforme complète pour comprendre, maitriser et optimiser vos finances
              personnelles sans tableur compliqué ni perte de temps.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="group relative flex flex-col gap-3 overflow-hidden rounded-2xl border border-border/40 bg-background/60 p-6 transition hover:-translate-y-1 hover:border-primary/40"
                >
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition group-hover:opacity-100">
                    <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-primary/20 bg-primary/10 px-8 py-10 text-center shadow-lg backdrop-blur">
          <h2 className="text-3xl font-semibold text-foreground">
            Prêt à aligner vos finances avec vos objectifs ?
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            Créez votre compte en quelques secondes et laissez Klarna transformer vos données en
            décisions concrètes. Votre avenir financier démarre aujourd&apos;hui.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button size="lg" asChild>
              <Link href="/sign-up">Je commence gratuitement</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <Link href="/sign-in">J&apos;ai déjà un compte</Link>
            </Button>
          </div>
        </section>
      </div>
    </main>
  );
}
