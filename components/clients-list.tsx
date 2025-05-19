import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

// Sample data
const clients = [
  {
    id: 1,
    name: "Emma Thompson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "ET",
    lastSession: "May 15, 2023",
    nextSession: "May 22, 2023",
    status: "Active",
    sessions: 12,
  },
  {
    id: 2,
    name: "Michael Chen",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "MC",
    lastSession: "May 10, 2023",
    nextSession: "May 17, 2023",
    status: "Active",
    sessions: 8,
  },
  {
    id: 3,
    name: "Olivia Martinez",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "OM",
    lastSession: "May 12, 2023",
    nextSession: "May 19, 2023",
    status: "Active",
    sessions: 5,
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "JW",
    lastSession: "May 8, 2023",
    nextSession: "May 22, 2023",
    status: "Active",
    sessions: 15,
  },
  {
    id: 5,
    name: "Sophia Lee",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "SL",
    lastSession: "May 5, 2023",
    nextSession: "May 19, 2023",
    status: "Active",
    sessions: 7,
  },
  {
    id: 6,
    name: "Noah Garcia",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "NG",
    lastSession: "April 30, 2023",
    nextSession: "May 21, 2023",
    status: "On Hold",
    sessions: 3,
  },
  {
    id: 7,
    name: "Ava Johnson",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "AJ",
    lastSession: "May 2, 2023",
    nextSession: "May 23, 2023",
    status: "Active",
    sessions: 10,
  },
  {
    id: 8,
    name: "Ethan Brown",
    avatar: "/placeholder.svg?height=32&width=32",
    initials: "EB",
    lastSession: "May 7, 2023",
    nextSession: "May 21, 2023",
    status: "New",
    sessions: 1,
  },
]

type ClientsListProps = {
  limit?: number
}

export function ClientsList({ limit }: ClientsListProps) {
  const displayClients = limit ? clients.slice(0, limit) : clients

  return (
    <div className="space-y-4">
      {displayClients.map((client) => (
        <div key={client.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={client.avatar || "/placeholder.svg"} alt={client.name} />
              <AvatarFallback>{client.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{client.name}</div>
              <div className="text-sm text-muted-foreground">
                Next: {client.nextSession} • {client.sessions} sessions
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={client.status === "Active" ? "default" : client.status === "New" ? "outline" : "secondary"}>
              {client.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Profile</DropdownMenuItem>
                <DropdownMenuItem>Schedule Session</DropdownMenuItem>
                <DropdownMenuItem>View Notes</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Send Message</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
