import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Link2, BarChart3, Zap, Shield, Copy, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURES = [
  {
    icon: Link2,
    title: "Shorten Any URL",
    description:
      "Paste a long, unwieldy link and get a clean, shareable short URL in seconds.",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description:
      "Copy your shortened link to the clipboard instantly — no fuss, no friction.",
  },
  {
    icon: BarChart3,
    title: "Click Analytics",
    description:
      "Track how many times each link has been clicked and monitor engagement over time.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects happen in milliseconds so your visitors never notice the extra hop.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description:
      "All links are stored securely and served with high availability around the clock.",
  },
  {
    icon: Globe,
    title: "Works Everywhere",
    description:
      "Share shortened links on social media, email, SMS, or anywhere else with confidence.",
  },
];

export default function HomePage() {
  return (
    <main className="flex flex-col items-center">
      {/* Hero */}
      <section className="flex w-full flex-col items-center gap-6 px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
          <Zap className="h-3.5 w-3.5 text-primary" />
          Fast, free link shortening
        </div>
        <h1 className="max-w-2xl text-5xl font-bold tracking-tight text-foreground">
          Short links, big impact
        </h1>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
          Turn long, cluttered URLs into clean, memorable links. Track clicks,
          manage all your links in one place, and share with confidence.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <SignUpButton mode="modal">
            <Button size="lg">Get started — it&apos;s free</Button>
          </SignUpButton>
        </div>
      </section>

      {/* Features grid */}
      <section className="w-full max-w-5xl px-6 pb-24">
        <h2 className="mb-12 text-center text-3xl font-semibold tracking-tight text-foreground">
          Everything you need
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className={cn(
                "flex flex-col gap-3 rounded-xl border border-border bg-card p-6",
                "transition-colors hover:bg-muted/50",
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">{title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA banner */}
      <section className="w-full border-t border-border bg-muted/40 px-6 py-20">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">
            Ready to get started?
          </h2>
          <p className="text-muted-foreground">
            Create a free account and start shortening links in under a minute.
          </p>
          <SignUpButton mode="modal">
            <Button size="lg">Create your free account</Button>
          </SignUpButton>
        </div>
      </section>
    </main>
  );
}
