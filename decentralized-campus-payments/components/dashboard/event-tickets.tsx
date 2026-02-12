"use client"

import { useState } from "react"
import { Plus, Ticket, Calendar, MapPin, Users, Loader2, CheckCircle2, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Event {
  id: number
  title: string
  date: string
  location: string
  price: number
  totalTickets: number
  soldTickets: number
  organizer: string
  hasTicket: boolean
}

const initialEvents: Event[] = [
  {
    id: 1,
    title: "Campus Hackathon 2026",
    date: "Mar 8, 2026",
    location: "Engineering Hall, Room 201",
    price: 5.0,
    totalTickets: 150,
    soldTickets: 123,
    organizer: "CS Club",
    hasTicket: true,
  },
  {
    id: 2,
    title: "Spring Music Festival",
    date: "Apr 15, 2026",
    location: "Main Quad",
    price: 15.0,
    totalTickets: 500,
    soldTickets: 342,
    organizer: "Student Activities Board",
    hasTicket: false,
  },
  {
    id: 3,
    title: "AI & Blockchain Workshop",
    date: "Feb 28, 2026",
    location: "Library Auditorium",
    price: 0,
    totalTickets: 80,
    soldTickets: 67,
    organizer: "Tech Society",
    hasTicket: false,
  },
  {
    id: 4,
    title: "Charity Basketball Game",
    date: "Mar 22, 2026",
    location: "Campus Gymnasium",
    price: 8.0,
    totalTickets: 300,
    soldTickets: 189,
    organizer: "Athletics Dept",
    hasTicket: true,
  },
]

export function EventTickets() {
  const [events, setEvents] = useState(initialEvents)
  const [showCreate, setShowCreate] = useState(false)
  const [buyingId, setBuyingId] = useState<number | null>(null)
  const [buying, setBuying] = useState(false)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [price, setPrice] = useState("")
  const [totalTickets, setTotalTickets] = useState("")
  const [creating, setCreating] = useState(false)
  const [viewTicketId, setViewTicketId] = useState<number | null>(null)

  function handleBuy(eventId: number) {
    setBuying(true)
    setTimeout(() => {
      setEvents(events.map((e) => (e.id === eventId ? { ...e, hasTicket: true, soldTickets: e.soldTickets + 1 } : e)))
      setBuying(false)
      setBuyingId(null)
    }, 2000)
  }

  function handleCreate() {
    if (!title || !date || !location || !totalTickets) return
    setCreating(true)
    setTimeout(() => {
      const newEvent: Event = {
        id: Date.now(),
        title,
        date,
        location,
        price: Number.parseFloat(price || "0"),
        totalTickets: Number.parseInt(totalTickets),
        soldTickets: 0,
        organizer: "You",
        hasTicket: false,
      }
      setEvents([newEvent, ...events])
      setCreating(false)
      setShowCreate(false)
      setTitle("")
      setDate("")
      setLocation("")
      setPrice("")
      setTotalTickets("")
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Event Tickets</h1>
          <p className="mt-1 text-sm text-muted-foreground">NFT-based tickets for campus events on Algorand</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setShowCreate(!showCreate)}>
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>

      {/* My Tickets */}
      {events.some((e) => e.hasTicket) && (
        <div>
          <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">My Tickets</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {events.filter((e) => e.hasTicket).map((event) => (
              <div key={`my-${event.id}`} className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-5">
                <div className="absolute top-0 right-0 h-20 w-20 translate-x-4 -translate-y-4 rounded-full bg-primary/10" />
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-base font-semibold text-foreground">{event.title}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" /> {event.date}
                      </p>
                      <p className="flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    <Ticket className="h-3 w-3" /> NFT Ticket
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 text-xs bg-transparent"
                    onClick={() => setViewTicketId(viewTicketId === event.id ? null : event.id)}
                  >
                    <QrCode className="h-3 w-3" />
                    {viewTicketId === event.id ? "Hide" : "View"} Pass
                  </Button>
                </div>
                {viewTicketId === event.id && (
                  <div className="mt-4 flex flex-col items-center rounded-xl border border-border bg-card p-4">
                    <div className="mb-2 grid grid-cols-5 gap-1">
                      {Array.from({ length: 25 }).map((_, i) => (
                        <div
                          key={`qr-${event.id}-${i}`}
                          className={`h-3 w-3 rounded-sm ${Math.random() > 0.3 ? "bg-foreground" : "bg-transparent"}`}
                        />
                      ))}
                    </div>
                    <p className="font-mono text-[10px] text-muted-foreground mt-1">ASA #{event.id.toString().slice(-6)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {showCreate && (
        <div className="rounded-2xl border border-primary/20 bg-card p-6 space-y-4">
          <h3 className="font-heading text-lg font-semibold text-foreground">Create Event</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="event-title">Event Name</Label>
              <Input id="event-title" placeholder="Hackathon, Concert..." value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="event-date">Date</Label>
              <Input id="event-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="event-location">Location</Label>
              <Input id="event-location" placeholder="Building, room..." value={location} onChange={(e) => setLocation(e.target.value)} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="event-price">Ticket Price (ALGO, 0 for free)</Label>
              <Input id="event-price" type="number" placeholder="0.00" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="event-tickets">Total Tickets</Label>
            <Input id="event-tickets" type="number" placeholder="100" value={totalTickets} onChange={(e) => setTotalTickets(e.target.value)} className="mt-1.5" />
          </div>
          <div className="flex gap-3">
            <Button className="gap-2" disabled={!title || !date || !location || !totalTickets || creating} onClick={handleCreate}>
              {creating ? <><Loader2 className="h-4 w-4 animate-spin" /> Minting...</> : "Create Event & Mint Tickets"}
            </Button>
            <Button variant="outline" onClick={() => setShowCreate(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Browse Events */}
      <div>
        <h2 className="mb-3 font-heading text-lg font-semibold text-foreground">Browse Events</h2>
        <div className="space-y-4">
          {events.filter((e) => !e.hasTicket).map((event) => (
            <div key={event.id} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <h3 className="font-heading text-base font-semibold text-foreground">{event.title}</h3>
                  <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {event.date}</span>
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {event.soldTickets}/{event.totalTickets} sold</span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">Organized by {event.organizer}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="font-heading text-lg font-bold text-foreground">
                      {event.price === 0 ? "Free" : `${event.price.toFixed(2)} ALGO`}
                    </p>
                    <p className="text-xs text-muted-foreground">{event.totalTickets - event.soldTickets} left</p>
                  </div>
                  {buyingId === event.id ? (
                    <Button size="sm" className="gap-2" disabled={buying} onClick={() => handleBuy(event.id)}>
                      {buying ? <><Loader2 className="h-4 w-4 animate-spin" /> Minting...</> : "Confirm"}
                    </Button>
                  ) : (
                    <Button size="sm" variant="outline" className="gap-2 bg-transparent" onClick={() => setBuyingId(event.id)}>
                      <Ticket className="h-4 w-4" />
                      {event.price === 0 ? "Claim" : "Buy"} Ticket
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
