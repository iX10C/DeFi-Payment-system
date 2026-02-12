"use client"

import {
  LayoutDashboard,
  Send,
  Users,
  PiggyBank,
  Heart,
  Ticket,
  Wallet,
  ArrowLeft,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "send", label: "Send & Receive", icon: Send },
  { id: "split", label: "Split Expenses", icon: Users },
  { id: "save", label: "Savings Goals", icon: PiggyBank },
  { id: "fundraise", label: "Fundraise", icon: Heart },
  { id: "events", label: "Event Tickets", icon: Ticket },
]

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onBack: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

export function DashboardSidebar({ activeTab, onTabChange, onBack, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden" onClick={onCloseMobile} />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-sidebar-border px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <Wallet className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <span className="font-heading text-lg font-bold">CampusPay</span>
          </div>
          <button type="button" className="lg:hidden" onClick={onCloseMobile} aria-label="Close sidebar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    onTabChange(item.id)
                    onCloseMobile()
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? "bg-sidebar-accent text-sidebar-primary"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-sidebar-border p-4 space-y-3">
          <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sidebar-primary text-sm font-bold text-sidebar-primary-foreground">
              JN
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-sidebar-foreground">Janhavi Nalse</p>
              <p className="truncate text-xs text-sidebar-foreground/50">ALGO7X...9K2P</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-2 text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </div>
      </aside>
    </>
  )
}
