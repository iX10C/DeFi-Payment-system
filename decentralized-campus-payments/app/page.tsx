"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { UseCasesSection } from "@/components/use-cases-section"
import { Footer } from "@/components/footer"
import { Dashboard } from "@/components/dashboard/dashboard"

export default function Page() {
  const [showDashboard, setShowDashboard] = useState(false)

  if (showDashboard) {
    return <Dashboard onBack={() => setShowDashboard(false)} />
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onLaunchApp={() => setShowDashboard(true)} />
      <main>
        <HeroSection onLaunchApp={() => setShowDashboard(true)} />
        <FeaturesSection />
        <HowItWorksSection />
        <UseCasesSection />
      </main>
      <Footer />
    </div>
  )
}
