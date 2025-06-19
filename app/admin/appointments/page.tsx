"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Search, Plus, Filter, Download, MoreHorizontal, CalendarIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Import the necessary icons
import {
  Activity,
  Brain,
  Building,
  CalendarIcon as CalendarMenu,
  FileText,
  UserCheck,
  UserPlus,
  Users,
  Video,
  MapPin,
} from "lucide-react"

const appointments = [
  {
    id: "APP-1001",
    patient: {
      id: "P-1001",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
    },
    therapist: {
      id: "T-1001",
      name: "Dr. Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "2025-04-10",
    startTime: "14:00",
    endTime: "15:00",
    type: "virtual",
    status: "scheduled",
    hospital: null,
    bookedBy: {
      id: "P-1001",
      type: "patient",
      name: "John Doe",
    },
  },
  {
    id: "APP-1002",
    patient: {
      id: "P-1002",
      name: "Emma Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    therapist: {
      id: "T-1002",
      name: "Dr. Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "2025-04-10",
    startTime: "15:30",
    endTime: "16:30",
    type: "in-person",
    status: "scheduled",
    hospital: {
      id: "H-1001",
      name: "Central Medical Center",
    },
    bookedBy: {
      id: "P-1002",
      type: "patient",
      name: "Emma Wilson",
    },
  },
  {
    id: "APP-1003",
    patient: {
      id: "P-1003",
      name: "Robert Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    therapist: {
      id: "T-1003",
      name: "Dr. Amara Patel",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "2025-04-10",
    startTime: "16:15",
    endTime: "17:15",
    type: "virtual",
    status: "scheduled",
    hospital: null,
    bookedBy: {
      id: "C-1001",
      type: "caregiver",
      name: "Lisa Johnson",
    },
  },
  {
    id: "APP-1004",
    patient: {
      id: "P-1004",
      name: "Sophia Garcia",
      image: "/placeholder.svg?height=40&width=40",
    },
    therapist: {
      id: "T-1004",
      name: "Dr. James Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "2025-04-11",
    startTime: "10:00",
    endTime: "11:00",
    type: "in-person",
    status: "scheduled",
    hospital: {
      id: "H-1002",
      name: "Westside Clinic",
    },
    bookedBy: {
      id: "P-1004",
      type: "patient",
      name: "Sophia Garcia",
    },
  },
  {
    id: "APP-1005",
    patient: {
      id: "P-1005",
      name: "Michael Brown",
      image: "/placeholder.svg?height=40&width=40",
    },
    therapist: {
      id: "T-1005",
      name: "Dr. Maria Rodriguez",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "2025-04-11",
    startTime: "11:30",
    endTime: "12:30",
    type: "virtual",
    status: "scheduled",
    hospital: null,
    bookedBy: {
      id: "P-1005",
      type: "patient",
      name: "Michael Brown",
    },
  },
  {
    id: "APP-1006",
    patient: {
      id: "P-1001",
      name: "John Doe",
      image: "/placeholder.svg?height=40&width=40",
    },
    therapist: {
      id: "T-1001",
      name: "Dr. Sarah Johnson",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "2025-04-03",
    startTime: "14:00",
    endTime: "15:00",
    type: "virtual",
    status: "completed",
    hospital: null,
    bookedBy: {
      id: "P-1001",
      type: "patient",
      name: "John Doe",
    },
  },
  {
    id: "APP-1007",
    patient: {
      id: "P-1002",
      name: "Emma Wilson",
      image: "/placeholder.svg?height=40&width=40",
    },
    therapist: {
      id: "T-1002",
      name: "Dr. Michael Chen",
      image: "/placeholder.svg?height=40&width=40",
    },
    date: "2025-04-05",
    startTime: "15:30",
    endTime: "16:30",
    type: "in-person",
    status: "cancelled",
    hospital: {
      id: "H-1001",
      name: "Central Medical Center",
    },
    bookedBy: {
      id: "P-1002",
      type: "patient",
      name: "Emma Wilson",
    },
  },
]

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [typeFilter, setTypeFilter] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)

  const filteredAppointments = appointments.filter((appointment) => {
    // Filter by search term
    const matchesSearch =
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    // Filter by type
    const matchesType = typeFilter === "all" || appointment.type === typeFilter

    // Filter by date
    const matchesDate = !date || appointment.date === format(date, "yyyy-MM-dd")

    return matchesSearch && matchesStatus && matchesType && matchesDate
  

    return matchesSearch && matchesStatus && matchesType && matchesDate
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindfulCare Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Users className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-gray-50 hidden md:block">
          <div className="flex flex-col gap-2 p-4">
            <Link href="/admin" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Activity className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Users className="h-5 w-5" />
              <span>Patients</span>
            </Link>
            <Link href="/admin/caregivers" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <UserPlus className="h-5 w-5" />
              <span>Caregivers</span>
            </Link>
            <Link href="/admin/therapists" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <UserCheck className="h-5 w-5" />
              <span>Therapists</span>
            </Link>
            <Link
              href="/admin/appointments"
              className="flex items-center gap-2 rounded-md bg-teal-50 px-3 py-2 text-teal-600"
            >
              <CalendarMenu className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
            <Link href="/admin/hospitals" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Building className="h-5 w-5" />
              <span>Hospitals</span>
            </Link>
            <Link href="/admin/disorders" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Brain className="h-5 w-5" />
              <span>Disorders</span>
            </Link>
            <Link href="/admin/surveys" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <FileText className="h-5 w-5" />
              <span>Surveys</span>
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Appointments</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Appointment
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>View and manage all appointments in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search appointments..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[150px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="scheduled">Scheduled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="no-show">No Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger className="w-[150px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="virtual">Virtual</SelectItem>
                            <SelectItem value="in-person">In-Person</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-[150px] justify-start">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <Button variant="outline" size="icon" onClick={() => setDate(undefined)}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Patient</TableHead>
                          <TableHead>Therapist</TableHead>
                          <TableHead>Date & Time</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Booked By</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredAppointments.map((appointment) => (
                          <TableRow key={appointment.id}>
                            <TableCell className="font-medium">{appointment.id}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={appointment.patient.image} alt={appointment.patient.name} />
                                  <AvatarFallback>
                                    {appointment.patient.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{appointment.patient.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={appointment.therapist.image} alt={appointment.therapist.name} />
                                  <AvatarFallback>
                                    {appointment.therapist.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{appointment.therapist.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{new Date(appointment.date).toLocaleDateString()}</span>
                                <span className="text-sm text-gray-500">
                                  {appointment.startTime} - {appointment.endTime}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={appointment.type === "virtual" ? "outline" : "secondary"}
                                className="flex items-center gap-1 w-fit"
                              >
                                {appointment.type === "virtual" ? (
                                  <Video className="h-3 w-3" />
                                ) : (
                                  <MapPin className="h-3 w-3" />
                                )}
                                {appointment.type === "virtual" ? "Virtual" : "In-Person"}
                              </Badge>
                              {appointment.hospital && (
                                <span className="text-xs text-gray-500 mt-1 block">{appointment.hospital.name}</span>
                              )}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  appointment.status === "scheduled"
                                    ? "default"
                                    : appointment.status === "completed"
                                      ? "success"
                                      : "destructive"
                                }
                                className="capitalize"
                              >
                                {appointment.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{appointment.bookedBy.name}</span>
                                <span className="text-xs text-gray-500 capitalize">{appointment.bookedBy.type}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                                  <DropdownMenuItem>Add Session Notes</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Cancel Appointment</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
