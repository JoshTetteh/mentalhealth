"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Search, Plus, Filter, Download, MoreHorizontal, Star } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Import the necessary icons
import { Activity, Brain, Building, Calendar, FileText, UserCheck, UserPlus, Users } from "lucide-react"

const therapists = [
  {
    id: "T-1001",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 123-4567",
    specialization: "Anxiety, Depression, Trauma",
    licenseNumber: "PSY12345",
    yearsOfExperience: 10,
    consultationFee: 150.0,
    rating: 4.9,
    reviews: 124,
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "T-1002",
    name: "Dr. Michael Chen",
    email: "michael.chen@example.com",
    phone: "(555) 234-5678",
    specialization: "Relationships, Couples Therapy, Family Conflict",
    licenseNumber: "PSY23456",
    yearsOfExperience: 8,
    consultationFee: 140.0,
    rating: 4.8,
    reviews: 98,
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "T-1003",
    name: "Dr. Amara Patel",
    email: "amara.patel@example.com",
    phone: "(555) 345-6789",
    specialization: "Depression, Grief, Life Transitions",
    licenseNumber: "PSY34567",
    yearsOfExperience: 7,
    consultationFee: 130.0,
    rating: 4.7,
    reviews: 87,
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "T-1004",
    name: "Dr. James Wilson",
    email: "james.wilson@example.com",
    phone: "(555) 456-7890",
    specialization: "Anxiety, Stress, Work-Life Balance",
    licenseNumber: "PSY45678",
    yearsOfExperience: 6,
    consultationFee: 125.0,
    rating: 4.6,
    reviews: 76,
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "T-1005",
    name: "Dr. Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "(555) 567-8901",
    specialization: "Medication Management, Bipolar Disorder, ADHD",
    licenseNumber: "PSY56789",
    yearsOfExperience: 12,
    consultationFee: 160.0,
    rating: 4.9,
    reviews: 112,
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "T-1006",
    name: "Dr. David Kim",
    email: "david.kim@example.com",
    phone: "(555) 678-9012",
    specialization: "Trauma, PTSD, Anxiety",
    licenseNumber: "PSY67890",
    yearsOfExperience: 9,
    consultationFee: 145.0,
    rating: 4.8,
    reviews: 91,
    isActive: false,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function TherapistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [specializationFilter, setSpecializationFilter] = useState("all")

  const filteredTherapists = therapists.filter((therapist) => {
    // Filter by search term
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && therapist.isActive) ||
      (statusFilter === "inactive" && !therapist.isActive)

    // Filter by specialization
    const matchesSpecialization =
      specializationFilter === "all" ||
      therapist.specialization.toLowerCase().includes(specializationFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesSpecialization
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
            <Link
              href="/admin/therapists"
              className="flex items-center gap-2 rounded-md bg-teal-50 px-3 py-2 text-teal-600"
            >
              <UserCheck className="h-5 w-5" />
              <span>Therapists</span>
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Calendar className="h-5 w-5" />
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
              <h1 className="text-3xl font-bold">Therapists</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Therapist
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Therapist Management</CardTitle>
                <CardDescription>View and manage all therapists in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search therapists..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-2">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-[130px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center gap-2">
                        <Select value={specializationFilter} onValueChange={setSpecializationFilter}>
                          <SelectTrigger className="w-[180px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Specialization" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Specializations</SelectItem>
                            <SelectItem value="anxiety">Anxiety</SelectItem>
                            <SelectItem value="depression">Depression</SelectItem>
                            <SelectItem value="trauma">Trauma</SelectItem>
                            <SelectItem value="relationships">Relationships</SelectItem>
                            <SelectItem value="adhd">ADHD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Therapist</TableHead>
                          <TableHead>Specialization</TableHead>
                          <TableHead>Experience</TableHead>
                          <TableHead>Fee</TableHead>
                          <TableHead>Rating</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredTherapists.map((therapist) => (
                          <TableRow key={therapist.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={therapist.image} alt={therapist.name} />
                                  <AvatarFallback>
                                    {therapist.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{therapist.name}</div>
                                  <div className="text-sm text-gray-500">{therapist.email}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {therapist.specialization.split(", ").map((spec, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {spec}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>{therapist.yearsOfExperience} years</TableCell>
                            <TableCell>${therapist.consultationFee.toFixed(2)}</TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                                <span>{therapist.rating}</span>
                                <span className="text-gray-500 text-xs ml-1">({therapist.reviews})</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div
                                className={`flex items-center gap-2 ${therapist.isActive ? "text-green-600" : "text-red-600"}`}
                              >
                                <div
                                  className={`h-2 w-2 rounded-full ${therapist.isActive ? "bg-green-600" : "bg-red-600"}`}
                                ></div>
                                {therapist.isActive ? "Active" : "Inactive"}
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
                                  <DropdownMenuItem>View Profile</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Therapist</DropdownMenuItem>
                                  <DropdownMenuItem>View Schedule</DropdownMenuItem>
                                  <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
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
