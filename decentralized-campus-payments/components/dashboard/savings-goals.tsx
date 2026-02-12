"use client"

import { useState } from "react"
import { Plus, PiggyBank, Lock, Unlock, Loader2, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface SavingsGoal {
  id: number
  title: string
  targetAmount: number
  currentAmount: number
  deadline: string
  locked: boolean
}

const initialGoals: SavingsGoal[] = [
  {
    id: 1,
    title: "Spring Break Trip",
    targetAmount: 500,
    currentAmount: 325,
    deadline: "Mar 15, 2026",
    locked: true,
  },
  {
    id: 2,
    title: "New Laptop Fund",
    targetAmount: 1200,
    currentAmount: 840,
    deadline: "Jun 01, 2026",
    locked: true,
  },
  {
    id: 3,
    title: "Emergency Fund",
    targetAmount: 200,
    currentAmount: 200,
    deadline: "Completed",
    locked: false,
  },
]

export function SavingsGoals() {
  const [goals, setGoals] = useState(initialGoals)
  const [showCreate, setShowCreate] = useState(false)
  const [title, setTitle] = useState("")
  const [target, setTarget] = useState("")
  const [deadline, setDeadline] = useState("")
  const [depositGoalId, setDepositGoalId] = useState<number | null>(null)
  const [depositAmount, setDepositAmount] = useState("")
  const [depositing, setDepositing] = useState(false)
  const [creating, setCreating] = useState(false)

  function handleCreate() {
    if (!title || !target || !deadline) return
    setCreating(true)
    setTimeout(() => {
      const newGoal: SavingsGoal = {
        id: Date.now(),
        title,
        targetAmount: Number.parseFloat(target),
        currentAmount: 0,
        deadline,
        locked: true,
      }
      setGoals([newGoal, ...goals])
      setCreating(false)
      setShowCreate(false)
      setTitle("")
      setTarget("")
      setDeadline("")
    }, 2000)
  }

  function handleDeposit(goalId: number) {
    if (!depositAmount) return
    setDepositing(true)
    setTimeout(() => {
      setGoals(
        goals.map((g) =>
          g.id === goalId
            ? { ...g, currentAmount: Math.min(g.currentAmount + Number.parseFloat(depositAmount), g.targetAmount) }
            : g
        )
      )
      setDepositing(false)
      setDepositGoalId(null)
      setDepositAmount("")
    }, 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Savings Goals</h1>
          <p className="mt-1 text-sm text-muted-foreground">Lock funds into smart contracts and track your progress</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="h-4 w-4" />
          New Goal
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <PiggyBank className="h-4 w-4" />
            Total Saved
          </div>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {goals.reduce((sum, g) => sum + g.currentAmount, 0).toFixed(2)} ALGO
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Target className="h-4 w-4" />
            Total Target
          </div>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {goals.reduce((sum, g) => sum + g.targetAmount, 0).toFixed(2)} ALGO
          </p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <Lock className="h-4 w-4" />
            Active Goals
          </div>
          <p className="mt-2 font-heading text-2xl font-bold text-foreground">
            {goals.filter((g) => g.locked).length}
          </p>
        </div>
      </div>

      {showCreate && (
        <div className="rounded-2xl border border-primary/20 bg-card p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Create Savings Goal</h3>
          <div>
            <Label htmlFor="goal-title">Goal Name</Label>
            <Input id="goal-title" placeholder="Spring Break, New Laptop..." value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="goal-target">Target Amount (ALGO)</Label>
            <Input id="goal-target" type="number" placeholder="0.00" value={target} onChange={(e) => setTarget(e.target.value)} className="mt-1.5" />
          </div>
          <div>
            <Label htmlFor="goal-deadline">Deadline</Label>
            <Input id="goal-deadline" type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="mt-1.5" />
          </div>
          <div className="flex gap-3">
            <Button className="gap-2" disabled={!title || !target || !deadline || creating} onClick={handleCreate}>
              {creating ? <><Loader2 className="h-4 w-4 animate-spin" /> Deploying...</> : "Create Savings Contract"}
            </Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => {
          const progress = (goal.currentAmount / goal.targetAmount) * 100
          const isComplete = goal.currentAmount >= goal.targetAmount
          return (
            <div key={goal.id} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${isComplete ? "bg-primary/10" : "bg-accent/10"}`}>
                    {goal.locked ? <Lock className={`h-5 w-5 ${isComplete ? "text-primary" : "text-accent"}`} /> : <Unlock className="h-5 w-5 text-primary" />}
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{goal.title}</h3>
                    <p className="text-xs text-muted-foreground">{isComplete ? "Goal reached!" : `Deadline: ${goal.deadline}`}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-heading text-lg font-bold text-foreground">{goal.currentAmount.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">of {goal.targetAmount.toFixed(2)} ALGO</p>
                </div>
              </div>

              <div className="mt-4">
                <Progress value={progress} className="h-2" />
                <p className="mt-1 text-right text-xs text-muted-foreground">{progress.toFixed(0)}%</p>
              </div>

              {!isComplete && (
                <div className="mt-4">
                  {depositGoalId === goal.id ? (
                    <div className="flex gap-2">
                      <Input
                        type="number"
                        placeholder="Amount to deposit"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="max-w-xs"
                      />
                      <Button size="sm" disabled={!depositAmount || depositing} onClick={() => handleDeposit(goal.id)}>
                        {depositing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Deposit"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setDepositGoalId(null)}>Cancel</Button>
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => setDepositGoalId(goal.id)}>
                      Add Funds
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
