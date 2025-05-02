"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Search, Plus, Filter, Download, MoreHorizontal, Users } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

// Import the necessary icons
import { Activity, Brain, Building, Calendar, FileText, UserCheck, UserPlus } from "lucide-react"

const caregivers = [
  {
    id: "C-1001",
    name: "Lisa Johnson",
    email: "lisa.johnson@example.com",
    phone: "(555) 123-4567",
    relationshipToPatient: "Parent",
    patients: [
      { id: "P-1003", name: "Robert Johnson" },
      { id: "P-1008", name: "Emily Johnson" },
    ],
    createdAt: "2023-01-15",
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "C-1002",
    name: "Michael Wilson",
    email: "michael.wilson@example.com",
    phone: "(555) 234-5678",
    relationshipToPatient: "Spouse",
    patients: [{ id: "P-1002", name: "Emma Wilson" }],
    createdAt: "2023-02-03",
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "C-1003",
    name: "Sarah Garcia",
    email: "sarah.garcia@example.com",
    phone: "(555) 345-6789",
    relationshipToPatient: "Adult Child",
    patients: [{ id: "P-1005", name: "Michael Brown" }],
    createdAt: "2023-02-17",
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "C-1004",
    name: "David Martinez",
    email: "david.martinez@example.com",
    phone: "(555) 456-7890",
    relationshipToPatient: "Sibling",
    patients: [{ id: "P-1007", name: "William Martinez" }],
    createdAt: "2023-03-05",
    isActive: true,
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "C-1005",
    name: "Jennifer Anderson",
    email: "jennifer.anderson@example.com",
    phone: "(555) 567-8901",
    relationshipToPatient: "Parent",
    patients: [{ id: "P-1008", name: "Ava Anderson" }],
    createdAt: "2023-03-22",
    isActive: false,
    image: "/placeholder.svg?height=40&width=40",
  },
]

export default function CaregiversPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [relationshipFilter, setRelationshipFilter] = useState("all")

  const filteredCaregivers = caregivers.filter((caregiver) => {
    // Filter by search term
    const matchesSearch =
      caregiver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caregiver.patients.some((patient) => patient.name.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && caregiver.isActive) ||
      (statusFilter === "inactive" && !caregiver.isActive)

    // Filter by relationship
    const matchesRelationship =
      relationshipFilter === "all" || caregiver.relationshipToPatient.toLowerCase() === relationshipFilter.toLowerCase()

    return matchesSearch && matchesStatus && matchesRelationship
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
            <Link
              href="/admin/caregivers"
              className="flex items-center gap-2 rounded-md bg-teal-50 px-3 py-2 text-teal-600"
            >
              <UserPlus className="h-5 w-5" />
              <span>Caregivers</span>
            </Link>
            <Link href="/admin/therapists" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
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
              <h1 className="text-3xl font-bold">Caregivers</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Caregiver
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Caregiver Management</CardTitle>
                <CardDescription>View and manage all caregivers in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search caregivers..."
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
                        <Select value={relationshipFilter} onValueChange={setRelationshipFilter}>
                          <SelectTrigger className="w-[180px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="Relationship" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Relationships</SelectItem>
                            <SelectItem value="parent">Parent</SelectItem>
                            <SelectItem value="spouse">Spouse</SelectItem>
                            <SelectItem value="adult child">Adult Child</SelectItem>
                            <SelectItem value="sibling">Sibling</SelectItem>
                            <SelectItem value="friend">Friend</SelectItem>
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
                          <TableHead>Caregiver</TableHead>
                          <TableHead>Relationship</TableHead>
                          <TableHead>Patients</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCaregivers.map((caregiver) => (
                          <TableRow key={caregiver.id}>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <Avatar>
                                  <AvatarImage src={caregiver.image} alt={caregiver.name} />
                                  <AvatarFallback>
                                    {caregiver.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium">{caregiver.name}</div>
                                  <div className="text-sm text-gray-500">{caregiver.id}</div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{caregiver.relationshipToPatient}</TableCell>
                            <TableCell>
                              <div className="flex flex-col gap-1">
                                {caregiver.patients.map((patient) => (
                                  <Badge key={patient.id} variant="outline" className="w-fit">
                                    {patient.name}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span className="text-sm">{caregiver.email}</span>
                                <span className="text-sm text-gray-500">{caregiver.phone}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div
                                className={`flex items-center gap-2 ${caregiver.isActive ? "text-green-600" : "text-red-600"}`}
                              >
                                <div
                                  className={`h-2 w-2 rounded-full ${caregiver.isActive ? "bg-green-600" : "bg-red-600"}`}
                                ></div>
                                {caregiver.isActive ? "Active" : "Inactive"}
                              </div>
                            </TableCell>
                            <TableCell>{new Date(caregiver.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Caregiver</DropdownMenuItem>
                                  <DropdownMenuItem>Manage Patients</DropdownMenuItem>
                                  <DropdownMenuItem>View Appointments</DropdownMenuItem>
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
