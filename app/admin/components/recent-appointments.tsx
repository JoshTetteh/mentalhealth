import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const appointments = [
  {
    id: "APP-1234",
    patient: {
      name: "John Doe",
      image: "/placeholder.svg?height=32&width=32",
    },
    therapist: {
      name: "Dr. Sarah Johnson",
      image: "/placeholder.svg?height=32&width=32",
    },
    date: "Today",
    time: "2:00 PM",
    type: "virtual",
    status: "scheduled",
  },
  {
    id: "APP-1235",
    patient: {
      name: "Emma Wilson",
      image: "/placeholder.svg?height=32&width=32",
    },
    therapist: {
      name: "Dr. Michael Chen",
      image: "/placeholder.svg?height=32&width=32",
    },
    date: "Today",
    time: "3:30 PM",
    type: "in-person",
    status: "scheduled",
  },
  {
    id: "APP-1236",
    patient: {
      name: "Robert Johnson",
      image: "/placeholder.svg?height=32&width=32",
    },
    therapist: {
      name: "Dr. Amara Patel",
      image: "/placeholder.svg?height=32&width=32",
    },
    date: "Today",
    time: "4:15 PM",
    type: "virtual",
    status: "scheduled",
  },
  {
    id: "APP-1237",
    patient: {
      name: "Sophia Garcia",
      image: "/placeholder.svg?height=32&width=32",
    },
    therapist: {
      name: "Dr. James Wilson",
      image: "/placeholder.svg?height=32&width=32",
    },
    date: "Tomorrow",
    time: "10:00 AM",
    type: "in-person",
    status: "scheduled",
  },
  {
    id: "APP-1238",
    patient: {
      name: "Michael Brown",
      image: "/placeholder.svg?height=32&width=32",
    },
    therapist: {
      name: "Dr. Maria Rodriguez",
      image: "/placeholder.svg?height=32&width=32",
    },
    date: "Tomorrow",
    time: "11:30 AM",
    type: "virtual",
    status: "scheduled",
  },
]

export function RecentAppointments() {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center justify-between border-b pb-4">
          <div className="flex items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage src={appointment.patient.image} alt={appointment.patient.name} />
              <AvatarFallback>{appointment.patient.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{appointment.patient.name}</div>
              <div className="text-sm text-gray-500">with {appointment.therapist.name}</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="text-right text-sm">
              <div>{appointment.date}</div>
              <div className="text-gray-500">{appointment.time}</div>
            </div>
            <Badge variant={appointment.type === "virtual" ? "outline" : "secondary"}>
              {appointment.type === "virtual" ? "Virtual" : "In-Person"}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
