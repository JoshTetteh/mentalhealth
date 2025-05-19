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
import { MoreHorizontal, Video, Phone } from "lucide-react"

// Sample data
const appointments = [
  {
    id: 1,
    client: {
      name: "Emma Thompson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "ET",
    },
    date: "Today",
    time: "10:00 AM",
    duration: "50 min",
    type: "Video",
    status: "upcoming",
  },
  {
    id: 2,
    client: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "MC",
    },
    date: "Today",
    time: "2:30 PM",
    duration: "50 min",
    type: "In Person",
    status: "upcoming",
  },
  {
    id: 3,
    client: {
      name: "Olivia Martinez",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "OM",
    },
    date: "Tomorrow",
    time: "11:15 AM",
    duration: "50 min",
    type: "Phone",
    status: "upcoming",
  },
  {
    id: 4,
    client: {
      name: "James Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "JW",
    },
    date: "Tomorrow",
    time: "3:00 PM",
    duration: "50 min",
    type: "Video",
    status: "upcoming",
  },
  {
    id: 5,
    client: {
      name: "Sophia Lee",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "SL",
    },
    date: "May 20, 2023",
    time: "9:30 AM",
    duration: "50 min",
    type: "In Person",
    status: "upcoming",
  },
  {
    id: 6,
    client: {
      name: "Noah Garcia",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "NG",
    },
    date: "May 20, 2023",
    time: "1:45 PM",
    duration: "50 min",
    type: "Video",
    status: "upcoming",
  },
  {
    id: 7,
    client: {
      name: "Ava Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "AJ",
    },
    date: "May 21, 2023",
    time: "10:00 AM",
    duration: "50 min",
    type: "Phone",
    status: "upcoming",
  },
  {
    id: 8,
    client: {
      name: "Ethan Brown",
      avatar: "/placeholder.svg?height=32&width=32",
      initials: "EB",
    },
    date: "May 21, 2023",
    time: "4:15 PM",
    duration: "50 min",
    type: "Video",
    status: "upcoming",
  },
]

type AppointmentListProps = {
  limit?: number
}

export function AppointmentList({ limit }: AppointmentListProps) {
  const displayAppointments = limit ? appointments.slice(0, limit) : appointments

  return (
    <div className="space-y-4">
      {displayAppointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between rounded-lg border p-3">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src={appointment.client.avatar || "/placeholder.svg"} alt={appointment.client.name} />
              <AvatarFallback>{appointment.client.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{appointment.client.name}</div>
              <div className="text-sm text-muted-foreground">
                {appointment.date} • {appointment.time} • {appointment.duration}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={
                appointment.type === "Video" ? "default" : appointment.type === "Phone" ? "outline" : "secondary"
              }
            >
              {appointment.type === "Video" && <Video className="mr-1 h-3 w-3" />}
              {appointment.type === "Phone" && <Phone className="mr-1 h-3 w-3" />}
              {appointment.type}
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
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                <DropdownMenuItem>Cancel Appointment</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Client Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  )
}
