"use client"

import { useState } from "react"
import { Send, ArrowDownLeft, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const contacts = [
  { name: "Sarah M.", address: "ALGO3X...7K1P", avatar: "SM" },
  { name: "Mike R.", address: "ALGO9Y...2N5Q", avatar: "MR" },
  { name: "Alex K.", address: "ALGO1Z...8M3R", avatar: "AK" },
  { name: "Chris L.", address: "ALGO5W...4J6T", avatar: "CL" },
]

export function SendReceive() {
  const [tab, setTab] = useState<"send" | "receive">("send")
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")
  const [note, setNote] = useState("")
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  function handleSend() {
    if (!recipient || !amount) return
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSent(true)
      setTimeout(() => {
        setSent(false)
        setRecipient("")
        setAmount("")
        setNote("")
      }, 3000)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Send & Receive</h1>
        <p className="mt-1 text-sm text-muted-foreground">Transfer ALGO instantly to any wallet address</p>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-1 rounded-xl bg-secondary p-1">
        <button
          type="button"
          onClick={() => setTab("send")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
            tab === "send" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <Send className="h-4 w-4" />
          Send
        </button>
        <button
          type="button"
          onClick={() => setTab("receive")}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-colors ${
            tab === "receive" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
          }`}
        >
          <ArrowDownLeft className="h-4 w-4" />
          Receive
        </button>
      </div>

      {tab === "send" ? (
        <div className="space-y-6">
          {sent ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-primary/20 bg-primary/5 py-16">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">Transaction Confirmed</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {amount} ALGO sent successfully
              </p>
              <p className="mt-1 text-xs text-muted-foreground">TxID: QX7F...K9P2</p>
            </div>
          ) : (
            <>
              {/* Quick Contacts */}
              <div>
                <Label className="text-xs uppercase tracking-wider text-muted-foreground">Quick Send</Label>
                <div className="mt-2 flex gap-3 overflow-x-auto pb-2">
                  {contacts.map((contact) => (
                    <button
                      key={contact.name}
                      type="button"
                      onClick={() => setRecipient(contact.address)}
                      className={`flex flex-shrink-0 flex-col items-center gap-2 rounded-xl border p-3 transition-colors ${
                        recipient === contact.address
                          ? "border-primary bg-primary/5"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <span className="text-xs font-bold text-primary">{contact.avatar}</span>
                      </div>
                      <span className="text-xs font-medium text-foreground">{contact.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form */}
              <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
                <div>
                  <Label htmlFor="recipient">Recipient Address</Label>
                  <Input
                    id="recipient"
                    placeholder="ALGO..."
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount (ALGO)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label htmlFor="note">Note (optional)</Label>
                  <Input
                    id="note"
                    placeholder="Coffee money, rent, etc."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="mt-1.5"
                  />
                </div>

                {amount && (
                  <div className="rounded-lg bg-secondary p-3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Amount</span>
                      <span className="text-foreground">{amount} ALGO</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Network Fee</span>
                      <span className="text-foreground">0.001 ALGO</span>
                    </div>
                    <div className="border-t border-border pt-1 flex justify-between text-sm font-semibold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground">{(Number.parseFloat(amount || "0") + 0.001).toFixed(3)} ALGO</span>
                    </div>
                  </div>
                )}

                <Button
                  className="w-full gap-2"
                  disabled={!recipient || !amount || sending}
                  onClick={handleSend}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Confirming on Algorand...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Payment
                    </>
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-32 w-32 items-center justify-center rounded-2xl border-2 border-dashed border-primary/30 bg-primary/5">
              <div className="text-center">
                <div className="mb-1 grid grid-cols-3 gap-1 mx-auto w-fit">
                  {Array.from({ length: 9 }).map((_, i) => (
                    <div key={`qr-${i}`} className="h-2.5 w-2.5 rounded-sm bg-foreground/80" />
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">QR Code</p>
              </div>
            </div>
            <h3 className="font-heading text-lg font-semibold text-foreground">Your Wallet Address</h3>
            <p className="mt-2 rounded-lg bg-secondary px-4 py-2 font-mono text-sm text-foreground">
              ALGO7X9K2P...M3NF8Q
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Share this address or QR code to receive ALGO from anyone on the Algorand network.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
