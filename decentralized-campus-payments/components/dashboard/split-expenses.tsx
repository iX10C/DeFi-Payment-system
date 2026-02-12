"use client"

import { useState } from "react"
import { Plus, Users, CheckCircle2, Clock, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface Split {
  id: number
  title: string
  totalAmount: number
  members: { name: string; paid: boolean; share: number }[]
  createdAt: string
}

const existingSplits: Split[] = [
  {
    id: 1,
    title: "Friday Dinner at Thai Palace",
    totalAmount: 86.50,
    members: [
      { name: "You", paid: true, share: 21.63 },
      { name: "Sarah M.", paid: true, share: 21.63 },
      { name: "Mike R.", paid: false, share: 21.63 },
      { name: "Alex K.", paid: false, share: 21.63 },
    ],
    createdAt: "2 hrs ago",
  },
  {
    id: 2,
    title: "Monthly Netflix Subscription",
    totalAmount: 15.99,
    members: [
      { name: "You", paid: true, share: 5.33 },
      { name: "Chris L.", paid: true, share: 5.33 },
      { name: "Jordan P.", paid: true, share: 5.33 },
    ],
    createdAt: "3 days ago",
  },
  {
    id: 3,
    title: "Uber to Campus Event",
    totalAmount: 24.00,
    members: [
      { name: "You", paid: true, share: 8.00 },
      { name: "Sarah M.", paid: true, share: 8.00 },
      { name: "Mike R.", paid: false, share: 8.00 },
    ],
    createdAt: "1 week ago",
  },
]

export function SplitExpenses() {
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState("")
  const [totalAmount, setTotalAmount] = useState("")
  const [memberInput, setMemberInput] = useState("")
  const [members, setMembers] = useState<string[]>([])
  const [creating, setCreating] = useState(false)
  const [splits, setSplits] = useState(existingSplits)

  function addMember() {
    if (memberInput.trim() && !members.includes(memberInput.trim())) {
      setMembers([...members, memberInput.trim()])
      setMemberInput("")
    }
  }

  function removeMember(name: string) {
    setMembers(members.filter((m) => m !== name))
  }

  function handleCreate() {
    if (!title || !totalAmount || members.length === 0) return
    setCreating(true)
    setTimeout(() => {
      const share = Number.parseFloat(totalAmount) / (members.length + 1)
      const newSplit: Split = {
        id: Date.now(),
        title,
        totalAmount: Number.parseFloat(totalAmount),
        members: [
          { name: "You", paid: true, share },
          ...members.map((m) => ({ name: m, paid: false, share })),
        ],
        createdAt: "Just now",
      }
      setSplits([newSplit, ...splits])
      setCreating(false)
      setShowCreate(false)
      setTitle("")
      setTotalAmount("")
      setMembers([])
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Split Expenses</h1>
          <p className="mt-1 text-sm text-muted-foreground">Create and manage group expense splits via smart contracts</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="h-4 w-4" />
          New Split
        </Button>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-primary/20 bg-card p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Create New Split</h3>

          <div>
            <Label htmlFor="split-title">What is this for?</Label>
            <Input
              id="split-title"
              placeholder="Dinner, groceries, ride share..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="split-amount">Total Amount (ALGO)</Label>
            <Input
              id="split-amount"
              type="number"
              placeholder="0.00"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label>Members</Label>
            <div className="mt-1.5 flex gap-2">
              <Input
                placeholder="Name or wallet address"
                value={memberInput}
                onChange={(e) => setMemberInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addMember()}
              />
              <Button variant="outline" size="sm" onClick={addMember}>
                Add
              </Button>
            </div>
            {members.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  You (creator)
                </span>
                {members.map((m) => (
                  <span key={m} className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-medium text-foreground">
                    {m}
                    <button type="button" onClick={() => removeMember(m)} className="ml-1 text-muted-foreground hover:text-foreground" aria-label={`Remove ${m}`}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {totalAmount && members.length > 0 && (
            <div className="rounded-lg bg-secondary p-3">
              <p className="text-sm text-muted-foreground">
                Each person pays:{" "}
                <span className="font-semibold text-foreground">
                  {(Number.parseFloat(totalAmount) / (members.length + 1)).toFixed(2)} ALGO
                </span>
              </p>
            </div>
          )}

          <div className="flex gap-3">
            <Button className="gap-2" disabled={!title || !totalAmount || members.length === 0 || creating} onClick={handleCreate}>
              {creating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Deploying Contract...
                </>
              ) : (
                "Create Split Contract"
              )}
            </Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Existing Splits */}
      <div className="space-y-4">
        {splits.map((split) => {
          const paidCount = split.members.filter((m) => m.paid).length
          const progress = (paidCount / split.members.length) * 100
          return (
            <div key={split.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-heading text-base font-semibold text-foreground">{split.title}</h3>
                  <p className="text-xs text-muted-foreground">{split.createdAt}</p>
                </div>
                <span className="font-heading text-lg font-bold text-foreground">{split.totalAmount.toFixed(2)} ALGO</span>
              </div>

              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                  <span>{paidCount} of {split.members.length} paid</span>
                  <span>{progress.toFixed(0)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {split.members.map((member) => (
                  <div
                    key={member.name}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
                      member.paid ? "bg-primary/10 text-primary" : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {member.paid ? <CheckCircle2 className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
                    {member.name} &middot; {member.share.toFixed(2)}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
