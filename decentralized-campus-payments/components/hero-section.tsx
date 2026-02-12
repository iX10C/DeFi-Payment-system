"use client"

import { ArrowRight, Shield, Zap, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection({ onLaunchApp }: { onLaunchApp: () => void }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(168_80%_36%/0.08),transparent_60%)]" />
      <div className="absolute top-1/4 right-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-xs font-medium text-primary">Built on Algorand</span>
            </div>

            <h1 className="font-heading text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              <span className="text-balance">Campus finance without the middleman.</span>
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Send payments, split expenses, save together, fundraise for causes, and manage event tickets
              &mdash; all on-chain, all transparent, all yours.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button size="lg" className="gap-2" onClick={onLaunchApp}>
                Launch App
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#how-it-works">See How It Works</a>
              </Button>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{"< 4s"}</p>
                  <p className="text-xs text-muted-foreground">Settlement</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">$0.001</p>
                  <p className="text-xs text-muted-foreground">Avg. Fee</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Transparent</p>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative">
              <div className="rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-primary/5">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Your Balance</p>
                    <p className="font-heading text-3xl font-bold text-foreground">1,247.50 ALGO</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <span className="font-heading text-lg font-bold text-primary">A</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Coffee with Sarah", amount: "-2.50", time: "2 min ago", type: "sent" },
                    { label: "Group Dinner Split", amount: "+12.30", time: "1 hr ago", type: "received" },
                    { label: "Tech Talk Ticket", amount: "-5.00", time: "3 hrs ago", type: "sent" },
                  ].map((tx) => (
                    <div key={tx.label} className="flex items-center justify-between rounded-xl bg-secondary p-3">
                      <div className="flex items-center gap-3">
                        <div className={`flex h-8 w-8 items-center justify-center rounded-full ${tx.type === "received" ? "bg-primary/10" : "bg-accent/10"}`}>
                          <span className={`text-xs font-bold ${tx.type === "received" ? "text-primary" : "text-accent"}`}>
                            {tx.type === "received" ? "+" : "-"}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{tx.label}</p>
                          <p className="text-xs text-muted-foreground">{tx.time}</p>
                        </div>
                      </div>
                      <span className={`text-sm font-semibold ${tx.type === "received" ? "text-primary" : "text-foreground"}`}>
                        {tx.amount} ALGO
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 rounded-xl border border-border bg-card p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-medium text-muted-foreground">Algorand Testnet</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
