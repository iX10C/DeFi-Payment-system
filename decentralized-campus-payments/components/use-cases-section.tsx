"use client"

const useCases = [
  {
    title: "Student Organizations",
    description: "Clubs can manage dues, event budgets, and member payments with full transparency. Every transaction is auditable.",
    stats: "50+ clubs onboarded",
  },
  {
    title: "Roommate Expenses",
    description: "Split rent, groceries, and utilities automatically. Smart contracts calculate shares and notify members when payments are due.",
    stats: "10,000+ splits created",
  },
  {
    title: "Campus Events",
    description: "From hackathons to concerts, issue verifiable NFT tickets. Prevent scalping and enable secure peer-to-peer transfers.",
    stats: "200+ events hosted",
  },
  {
    title: "Emergency Fundraising",
    description: "When a classmate or community needs help, launch a transparent fundraiser. Donors see exactly where funds go.",
    stats: "$50K+ raised",
  },
]

export function UseCasesSection() {
  return (
    <section id="use-cases" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">Use Cases</p>
          <h2 className="font-heading text-3xl font-bold text-foreground sm:text-4xl text-balance">
            Real solutions for real campus life
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            CampusPay is designed for the everyday financial interactions that happen across university communities.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-8 transition-all hover:border-primary/30"
            >
              <div className="absolute top-0 right-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-primary/5" />
              <h3 className="mb-3 font-heading text-xl font-semibold text-foreground">{useCase.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{useCase.description}</p>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/5 px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                <span className="text-xs font-semibold text-primary">{useCase.stats}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
