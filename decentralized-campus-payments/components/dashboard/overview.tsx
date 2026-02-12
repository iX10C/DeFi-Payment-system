"use client"

import { ArrowUpRight, ArrowDownLeft, TrendingUp, Clock, Copy, Check } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const recentTransactions = [
  { id: 1, type: "sent", label: "Coffee for Study Group", to: "Sarah M.", amount: 3.5, time: "2 min ago", txId: "QX7F...K9P2" },
  { id: 2, type: "received", label: "Dinner Split Refund", from: "Mike R.", amount: 15.0, time: "1 hr ago", txId: "M3KL...V8N1" },
  { id: 3, type: "sent", label: "Hackathon Ticket", to: "TechClub", amount: 10.0, time: "3 hrs ago", txId: "P9R2...W4X8" },
  { id: 4, type: "received", label: "Fundraiser Donation", from: "Alex K.", amount: 25.0, time: "5 hrs ago", txId: "J6T1...B3Y5" },
  { id: 5, type: "sent", label: "Textbook Share", to: "Chris L.", amount: 8.0, time: "1 day ago", txId: "N2F7...D9H4" },
]

const DEMO_WALLET = "ALGO7X...9K2P"

export function Overview({ onNavigate }: { onNavigate: (tab: string) => void }) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Welcome back, Janhavi</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your campus financial hub on Algorand</p>
      </div>

      {/* Wallet Card */}
      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Total Balance</p>
            <p className="font-heading text-4xl font-bold text-foreground">1,247.50</p>
            <p className="text-sm text-primary font-medium">ALGO</p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">{DEMO_WALLET}</span>
            <button type="button" onClick={handleCopy} className="ml-1 text-muted-foreground hover:text-foreground" aria-label="Copy wallet address">
              {copied ? <Check className="h-3.5 w-3.5 text-primary" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button size="sm" className="gap-2" onClick={() => onNavigate("send")}>
            <ArrowUpRight className="h-4 w-4" />
            Send
          </Button>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => onNavigate("split")}>
            <ArrowDownLeft className="h-4 w-4" />
            Split
          </Button>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => onNavigate("save")}>
            <TrendingUp className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Sent This Month", value: "142.50 ALGO", change: "+12%", icon: ArrowUpRight },
          { label: "Received This Month", value: "285.00 ALGO", change: "+24%", icon: ArrowDownLeft },
          { label: "Active Splits", value: "3", change: "2 pending", icon: Clock },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{stat.label}</p>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <p className="mt-2 font-heading text-2xl font-bold text-foreground">{stat.value}</p>
            <p className="mt-1 text-xs text-primary">{stat.change}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-heading text-lg font-semibold text-foreground">Recent Transactions</h2>
          <span className="text-xs text-muted-foreground">Last 7 days</span>
        </div>
        <div className="divide-y divide-border">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full ${tx.type === "received" ? "bg-primary/10" : "bg-secondary"}`}>
                  {tx.type === "received" ? (
                    <ArrowDownLeft className="h-4 w-4 text-primary" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {tx.type === "sent" ? `To: ${tx.to}` : `From: ${tx.from}`} &middot; {tx.txId}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-semibold ${tx.type === "received" ? "text-primary" : "text-foreground"}`}>
                  {tx.type === "received" ? "+" : "-"}{tx.amount.toFixed(2)} ALGO
                </p>
                <p className="text-xs text-muted-foreground">{tx.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
