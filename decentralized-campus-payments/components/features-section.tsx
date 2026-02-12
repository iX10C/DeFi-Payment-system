"use client"

import { Send, Users, PiggyBank, Heart, Ticket, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: Send,
    title: "Instant Payments",
    description: "Send ALGO or campus tokens to any wallet in under 4 seconds with near-zero fees. No banks, no delays.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Users,
    title: "Split Expenses",
    description: "Create a group, add members, and split any expense evenly or custom. Smart contracts handle the math.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: PiggyBank,
    title: "Savings Goals",
    description: "Lock funds into a smart contract with a target and deadline. Track progress and withdraw when you hit your goal.",
    color: "bg-chart-3/10 text-chart-3",
  },
  {
    icon: Heart,
    title: "Fundraising",
    description: "Launch transparent fundraising campaigns for clubs, charities, or causes. Every donation is recorded on-chain.",
    color: "bg-chart-4/10 text-chart-4",
  },
  {
    icon: Ticket,
    title: "Event Tickets",
    description: "Mint NFT-based tickets for campus events. Verify attendance, prevent counterfeits, and enable transferability.",
    color: "bg-chart-5/10 text-chart-5",
  },
  {
    icon: ShieldCheck,
    title: "Full Transparency",
    description: "Every transaction is verifiable on the Algorand blockchain. No hidden fees, no opaque intermediaries.",
    color: "bg-primary/10 text-primary",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Features</p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Everything your campus needs, on-chain
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            From daily payments to event management, CampusPay replaces centralized tools with transparent, low-cost blockchain solutions.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${feature.color}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
