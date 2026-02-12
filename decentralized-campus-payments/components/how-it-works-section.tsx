"use client"

import { Wallet, ArrowRightLeft, Lock, CheckCircle2 } from "lucide-react"

const steps = [
  {
    step: "01",
    icon: Wallet,
    title: "Connect Your Wallet",
    description: "Link your Algorand wallet (Pera, Defly, or any WalletConnect-compatible wallet) to CampusPay in one tap.",
  },
  {
    step: "02",
    icon: ArrowRightLeft,
    title: "Choose an Action",
    description: "Send funds, create a split, start a savings goal, launch a fundraiser, or mint an event ticket.",
  },
  {
    step: "03",
    icon: Lock,
    title: "Smart Contract Executes",
    description: "Your action is processed by an Algorand smart contract. Transparent logic, no middlemen, near-zero fees.",
  },
  {
    step: "04",
    icon: CheckCircle2,
    title: "Confirmed On-Chain",
    description: "Within seconds, your transaction is confirmed and permanently recorded on the Algorand blockchain.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">How It Works</p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
            From wallet to done in seconds
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            No complex DeFi protocols. Just simple, intuitive actions powered by Algorand smart contracts.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {index < steps.length - 1 && (
                <div className="absolute top-12 left-[calc(50%+2rem)] hidden h-px w-[calc(100%-4rem)] bg-border lg:block" />
              )}
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>
                <span className="mb-2 inline-block text-xs font-bold uppercase tracking-widest text-primary">
                  Step {step.step}
                </span>
                <h3 className="mb-2 font-heading text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
