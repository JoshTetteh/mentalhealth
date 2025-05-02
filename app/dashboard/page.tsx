"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Heart, MessageSquare, User, Video } from "lucide-react"

const appointments = [
  {
    id: 1,
    therapist: "Dr. Sarah Johnson",
    date: "April 10, 2025",
    time: "2:00 PM",
    type: "Virtual",
    status: "upcoming",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 2,
    therapist: "Dr. Michael Chen",
    date: "April 17, 2025",
    time: "3:30 PM",
    type: "Virtual",
    status: "upcoming",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: 3,
    therapist: "Dr. Sarah Johnson",
    date: "March 27, 2025",
    time: "2:00 PM",
    type: "In-Person",
    status: "completed",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const filteredAppointments = appointments.filter((appointment) => appointment.status === activeTab)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindfulCare</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/therapists" className="text-sm font-medium hover:underline">
              Find Therapists
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:underline">
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-gray-500 mb-4">john.doe@example.com</p>
                  <div className="w-full space-y-2">
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard">
                        <Calendar className="mr-2 h-4 w-4" />
                        Appointments
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard/progress">
                        <Chart className="mr-2 h-4 w-4" />
                        Progress
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard/messages">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Messages
                      </Link>
                    </Button>
                    <Button variant="outline" className="w-full justify-start" asChild>
                      <Link href="/dashboard/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Settings
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>
            <Card>
              <CardHeader>
                <CardTitle>My Appointments</CardTitle>
                <CardDescription>Manage your upcoming and past therapy sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
                  <TabsList className="mb-4">
                    <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                    <TabsTrigger value="completed">Past</TabsTrigger>
                  </TabsList>
                  <TabsContent value="upcoming" className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <Card key={appointment.id}>
                          <div className="flex flex-col sm:flex-row p-4">
                            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                              <Avatar>
                                <AvatarImage src={appointment.image} alt={appointment.therapist} />
                                <AvatarFallback>
                                  {appointment.therapist
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{appointment.therapist}</h3>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  {appointment.date}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {appointment.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:ml-auto gap-2">
                              <Badge variant="outline" className="flex items-center">
                                {appointment.type === "Virtual" ? (
                                  <Video className="mr-1 h-4 w-4" />
                                ) : (
                                  <MapPin className="mr-1 h-4 w-4" />
                                )}
                                {appointment.type}
                              </Badge>
                              <div className="flex gap-2">
                                {appointment.type === "Virtual" && <Button size="sm">Join Session</Button>}
                                <Button size="sm" variant="outline">
                                  Reschedule
                                </Button>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No upcoming appointments</p>
                        <Button className="mt-4" asChild>
                          <Link href="/therapists">Book an Appointment</Link>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="completed" className="space-y-4">
                    {filteredAppointments.length > 0 ? (
                      filteredAppointments.map((appointment) => (
                        <Card key={appointment.id}>
                          <div className="flex flex-col sm:flex-row p-4">
                            <div className="flex items-center gap-4 mb-4 sm:mb-0">
                              <Avatar>
                                <AvatarImage src={appointment.image} alt={appointment.therapist} />
                                <AvatarFallback>
                                  {appointment.therapist
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="font-medium">{appointment.therapist}</h3>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Calendar className="mr-1 h-4 w-4" />
                                  {appointment.date}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="mr-1 h-4 w-4" />
                                  {appointment.time}
                                </div>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:ml-auto gap-2">
                              <Badge variant="outline" className="flex items-center">
                                {appointment.type === "Virtual" ? (
                                  <Video className="mr-1 h-4 w-4" />
                                ) : (
                                  <MapPin className="mr-1 h-4 w-4" />
                                )}
                                {appointment.type}
                              </Badge>
                              <Button size="sm" variant="outline">
                                Leave Review
                              </Button>
                            </div>
                          </div>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No past appointments</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <Link href="/therapists">Book New Appointment</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

// Missing components for the dashboard
function Chart(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 3v18h18" />
      <path d="M18 17V9" />
      <path d="M13 17V5" />
      <path d="M8 17v-3" />
    </svg>
  )
}

function Settings(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

function MapPin(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}
