"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { DashboardSidebar } from "./sidebar"
import { Overview } from "./overview"
import { SendReceive } from "./send-receive"
import { SplitExpenses } from "./split-expenses"
import { SavingsGoals } from "./savings-goals"
import { Fundraise } from "./fundraise"
import { EventTickets } from "./event-tickets"

export function Dashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  function renderContent() {
    switch (activeTab) {
      case "overview":
        return <Overview onNavigate={setActiveTab} />
      case "send":
        return <SendReceive />
      case "split":
        return <SplitExpenses />
      case "save":
        return <SavingsGoals />
      case "fundraise":
        return <Fundraise />
      case "events":
        return <EventTickets />
      default:
        return <Overview onNavigate={setActiveTab} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onBack={onBack}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="lg:pl-64">
        {/* Mobile header */}
        <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-background/80 backdrop-blur-sm px-6 py-4 lg:hidden">
          <button type="button" onClick={() => setMobileSidebarOpen(true)} aria-label="Open sidebar">
            <Menu className="h-5 w-5 text-foreground" />
          </button>
          <span className="font-heading text-sm font-semibold text-foreground">CampusPay</span>
        </div>

        <main className="mx-auto max-w-4xl px-6 py-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
