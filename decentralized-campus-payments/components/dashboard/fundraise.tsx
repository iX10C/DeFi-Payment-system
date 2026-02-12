"use client"

import { useState } from "react"
import { Plus, Heart, Users, Loader2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface Campaign {
  id: number
  title: string
  description: string
  organizer: string
  goalAmount: number
  raisedAmount: number
  donorCount: number
  daysLeft: number
  category: string
}

const initialCampaigns: Campaign[] = [
  {
    id: 1,
    title: "Robotics Club Competition Fund",
    description: "Help our team travel to the National Robotics Championship. Every donation goes directly to travel and registration fees.",
    organizer: "Robotics Club",
    goalAmount: 2500,
    raisedAmount: 1875,
    donorCount: 47,
    daysLeft: 12,
    category: "Academic",
  },
  {
    id: 2,
    title: "Campus Food Pantry Expansion",
    description: "Expanding our food pantry to serve more students in need. Funds will purchase shelving, refrigeration, and initial food stock.",
    organizer: "Student Government",
    goalAmount: 5000,
    raisedAmount: 3200,
    donorCount: 128,
    daysLeft: 21,
    category: "Community",
  },
  {
    id: 3,
    title: "Emergency Medical Aid - Alex",
    description: "Supporting our classmate Alex with unexpected medical expenses. All donations are transparent and on-chain.",
    organizer: "Class of 2027",
    goalAmount: 1000,
    raisedAmount: 950,
    donorCount: 83,
    daysLeft: 5,
    category: "Emergency",
  },
]

export function Fundraise() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [goal, setGoal] = useState("")
  const [creating, setCreating] = useState(false)
  const [donatingId, setDonatingId] = useState<number | null>(null)
  const [donateAmount, setDonateAmount] = useState("")
  const [donating, setDonating] = useState(false)

  function handleCreate() {
    if (!title || !description || !goal) return
    setCreating(true)
    setTimeout(() => {
      const newCampaign: Campaign = {
        id: Date.now(),
        title,
        description,
        organizer: "You",
        goalAmount: Number.parseFloat(goal),
        raisedAmount: 0,
        donorCount: 0,
        daysLeft: 30,
        category: "Other",
      }
      setCampaigns([newCampaign, ...campaigns])
      setCreating(false)
      setShowCreate(false)
      setTitle("")
      setDescription("")
      setGoal("")
    }, 2000)
  }

  function handleDonate(campaignId: number) {
    if (!donateAmount) return
    setDonating(true)
    setTimeout(() => {
      setCampaigns(
        campaigns.map((c) =>
          c.id === campaignId
            ? {
                ...c,
                raisedAmount: Math.min(c.raisedAmount + Number.parseFloat(donateAmount), c.goalAmount),
                donorCount: c.donorCount + 1,
              }
            : c
        )
      )
      setDonating(false)
      setDonatingId(null)
      setDonateAmount("")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Fundraising</h1>
          <p className="mt-1 text-sm text-muted-foreground">Transparent, on-chain fundraising for campus causes</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="h-4 w-4" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Heart className="h-4 w-4" />
            Total Raised
          </div>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {campaigns.reduce((sum, c) => sum + c.raisedAmount, 0).toFixed(0)} ALGO
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Users className="h-4 w-4" />
            Total Donors
          </div>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {campaigns.reduce((sum, c) => sum + c.donorCount, 0)}
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <ExternalLink className="h-4 w-4" />
            Active Campaigns
          </div>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {campaigns.filter((c) => c.raisedAmount < c.goalAmount).length}
          </p>
        </div>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-primary/20 bg-card p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Launch a Campaign</h3>
          <div>
            <Label htmlFor="camp-title">Campaign Title</Label>
            <Input id="camp-title" placeholder="What are you raising funds for?" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="camp-desc">Description</Label>
            <textarea
              id="camp-desc"
              placeholder="Explain your cause, how funds will be used..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1.5 flex min-h-[100px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
          <div>
            <Label htmlFor="camp-goal">Goal Amount (ALGO)</Label>
            <Input id="camp-goal" type="number" placeholder="0.00" value={goal} onChange={(e) => setGoal(e.target.value)} className="mt-1.5" />
          </div>
          <div className="flex gap-3">
            <Button className="gap-2" disabled={!title || !description || !goal || creating} onClick={handleCreate}>
              {creating ? <><Loader2 className="h-4 w-4 animate-spin" /> Deploying...</> : "Launch Campaign"}
            </Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Campaigns */}
      <div className="space-y-4">
        {campaigns.map((campaign) => {
          const progress = (campaign.raisedAmount / campaign.goalAmount) * 100
          const isComplete = campaign.raisedAmount >= campaign.goalAmount
          return (
            <div key={campaign.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                      campaign.category === "Emergency" ? "bg-destructive/10 text-destructive"
                        : campaign.category === "Community" ? "bg-primary/10 text-primary"
                        : "bg-accent/10 text-accent"
                    }`}>
                      {campaign.category}
                    </span>
                    {isComplete && (
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        Funded
                      </span>
                    )}
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground">{campaign.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{campaign.description}</p>
                  <p className="mt-2 text-xs text-muted-foreground">by {campaign.organizer} &middot; {campaign.daysLeft} days left</p>
                </div>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="font-semibold text-foreground">{campaign.raisedAmount.toFixed(0)} ALGO</span>
                  <span className="text-muted-foreground">of {campaign.goalAmount.toFixed(0)} ALGO</span>
                </div>
                <Progress value={progress} className="h-2" />
                <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{campaign.donorCount} donors</span>
                  <span>{progress.toFixed(0)}% funded</span>
                </div>
              </div>

              {!isComplete && (
                <div className="mt-4">
                  {donatingId === campaign.id ? (
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Donation amount"
                        value={donateAmount}
                        onChange={(e) => setDonateAmount(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button size="sm" className="gap-2" disabled={!donateAmount || donating} onClick={() => handleDonate(campaign.id)}>
                        {donating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Heart className="h-4 w-4" />}
                        Donate
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDonatingId(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => setDonatingId(campaign.id)}>
                      <Heart className="h-4 w-4" />
                      Donate Now
                    </Button>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
