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
import { Badge } from "@/components/ui/badge"

// Import the necessary icons
import {
  Activity,
  Brain,
  Building,
  Calendar,
  FileText,
  UserCheck,
  UserPlus,
  MapPin,
  Phone,
  Mail,
  Globe,
} from "lucide-react"

const hospitals = [
  {
    id: "H-1001",
    name: "Central Medical Center",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "(555) 123-4567",
    email: "info@centralmedical.com",
    website: "www.centralmedical.com",
    operatingHours: {
      monday: { open: "08:00", close: "18:00" },
      tuesday: { open: "08:00", close: "18:00" },
      wednesday: { open: "08:00", close: "18:00" },
      thursday: { open: "08:00", close: "18:00" },
      friday: { open: "08:00", close: "18:00" },
      saturday: { open: "09:00", close: "14:00" },
      sunday: { open: null, close: null },
    },
    therapistsCount: 12,
    isActive: true,
  },
  {
    id: "H-1002",
    name: "Westside Clinic",
    address: "456 Oak Ave",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    phone: "(555) 234-5678",
    email: "info@westsideclinic.com",
    website: "www.westsideclinic.com",
    operatingHours: {
      monday: { open: "09:00", close: "17:00" },
      tuesday: { open: "09:00", close: "17:00" },
      wednesday: { open: "09:00", close: "17:00" },
      thursday: { open: "09:00", close: "17:00" },
      friday: { open: "09:00", close: "17:00" },
      saturday: { open: null, close: null },
      sunday: { open: null, close: null },
    },
    therapistsCount: 8,
    isActive: true,
  },
  {
    id: "H-1003",
    name: "Bayside Mental Health Center",
    address: "789 Pine St",
    city: "San Francisco",
    state: "CA",
    zipCode: "94101",
    phone: "(555) 345-6789",
    email: "info@baysidemh.com",
    website: "www.baysidemh.com",
    operatingHours: {
      monday: { open: "08:30", close: "19:00" },
      tuesday: { open: "08:30", close: "19:00" },
      wednesday: { open: "08:30", close: "19:00" },
      thursday: { open: "08:30", close: "19:00" },
      friday: { open: "08:30", close: "17:00" },
      saturday: { open: "10:00", close: "15:00" },
      sunday: { open: null, close: null },
    },
    therapistsCount: 15,
    isActive: true,
  },
  {
    id: "H-1004",
    name: "Eastside Wellness Center",
    address: "101 Maple Dr",
    city: "Boston",
    state: "MA",
    zipCode: "02108",
    phone: "(555) 456-7890",
    email: "info@eastsidewellness.com",
    website: "www.eastsidewellness.com",
    operatingHours: {
      monday: { open: "09:00", close: "18:00" },
      tuesday: { open: "09:00", close: "18:00" },
      wednesday: { open: "09:00", close: "18:00" },
      thursday: { open: "09:00", close: "18:00" },
      friday: { open: "09:00", close: "18:00" },
      saturday: { open: "09:00", close: "13:00" },
      sunday: { open: null, close: null },
    },
    therapistsCount: 10,
    isActive: true,
  },
  {
    id: "H-1005",
    name: "Southside Behavioral Health",
    address: "202 Cedar Ln",
    city: "Miami",
    state: "FL",
    zipCode: "33101",
    phone: "(555) 567-8901",
    email: "info@southsidebh.com",
    website: "www.southsidebh.com",
    operatingHours: {
      monday: { open: "08:00", close: "17:00" },
      tuesday: { open: "08:00", close: "17:00" },
      wednesday: { open: "08:00", close: "17:00" },
      thursday: { open: "08:00", close: "17:00" },
      friday: { open: "08:00", close: "17:00" },
      saturday: { open: null, close: null },
      sunday: { open: null, close: null },
    },
    therapistsCount: 7,
    isActive: false,
  },
]

export default function HospitalsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")

  const filteredHospitals = hospitals.filter((hospital) => {
    // Filter by search term
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && hospital.isActive) ||
      (statusFilter === "inactive" && !hospital.isActive)

    // Filter by state
    const matchesState = stateFilter === "all" || hospital.state === stateFilter

    return matchesSearch && matchesStatus && matchesState
  })

  // Get unique states for filter
  const states = [...new Set(hospitals.map((hospital) => hospital.state))].sort()

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
            <Link href="/admin/appointments" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
            <Link
              href="/admin/hospitals"
              className="flex items-center gap-2 rounded-md bg-teal-50 px-3 py-2 text-teal-600"
            >
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
              <h1 className="text-3xl font-bold">Hospitals & Clinics</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Hospital
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Hospital Management</CardTitle>
                <CardDescription>View and manage all hospitals and clinics in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search hospitals..."
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
                        <Select value={stateFilter} onValueChange={setStateFilter}>
                          <SelectTrigger className="w-[130px]">
                            <Filter className="mr-2 h-4 w-4" />
                            <SelectValue placeholder="State" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All States</SelectItem>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
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
                          <TableHead>Name</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Contact</TableHead>
                          <TableHead>Operating Hours</TableHead>
                          <TableHead>Therapists</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredHospitals.map((hospital) => (
                          <TableRow key={hospital.id}>
                            <TableCell>
                              <div>
                                <div className="font-medium">{hospital.name}</div>
                                <div className="text-sm text-gray-500">{hospital.id}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-gray-500 mt-0.5" />
                                <div>
                                  <div>{hospital.address}</div>
                                  <div>
                                    {hospital.city}, {hospital.state} {hospital.zipCode}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4 text-gray-500" />
                                  <span>{hospital.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4 text-gray-500" />
                                  <span>{hospital.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Globe className="h-4 w-4 text-gray-500" />
                                  <span>{hospital.website}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                {Object.entries(hospital.operatingHours).map(
                                  ([day, hours]) =>
                                    hours.open && (
                                      <div key={day} className="flex justify-between">
                                        <span className="capitalize">{day.slice(0, 3)}</span>
                                        <span>
                                          {hours.open} - {hours.close}
                                        </span>
                                      </div>
                                    ),
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant="outline">{hospital.therapistsCount} therapists</Badge>
                            </TableCell>
                            <TableCell>
                              <div
                                className={`flex items-center gap-2 ${hospital.isActive ? "text-green-600" : "text-red-600"}`}
                              >
                                <div
                                  className={`h-2 w-2 rounded-full ${hospital.isActive ? "bg-green-600" : "bg-red-600"}`}
                                ></div>
                                {hospital.isActive ? "Active" : "Inactive"}
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
                                  <DropdownMenuItem>Edit Hospital</DropdownMenuItem>
                                  <DropdownMenuItem>Manage Therapists</DropdownMenuItem>
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
