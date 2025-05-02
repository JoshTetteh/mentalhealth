"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Search, Plus, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Import the necessary icons
import { Activity, Brain, Building, Calendar, FileText, UserCheck, UserPlus, Users } from "lucide-react"

const disorders = [
  {
    id: "D-1001",
    name: "Major Depressive Disorder",
    description: "A mood disorder characterized by persistent feelings of sadness and loss of interest",
    symptoms: ["Persistent sadness", "Loss of interest", "Sleep disturbances", "Fatigue", "Feelings of worthlessness"],
    severityScale: { min: 1, max: 10, levels: { "1": "Mild", "5": "Moderate", "8": "Severe" } },
    diagnosedPatients: 342,
  },
  {
    id: "D-1002",
    name: "Generalized Anxiety Disorder",
    description: "Characterized by persistent and excessive worry about various things",
    symptoms: ["Excessive worry", "Restlessness", "Fatigue", "Difficulty concentrating", "Irritability"],
    severityScale: { min: 1, max: 10, levels: { "1": "Mild", "5": "Moderate", "8": "Severe" } },
    diagnosedPatients: 287,
  },
  {
    id: "D-1003",
    name: "Post-Traumatic Stress Disorder",
    description: "A condition triggered by experiencing or witnessing a terrifying event",
    symptoms: ["Flashbacks", "Nightmares", "Severe anxiety", "Uncontrollable thoughts", "Avoidance"],
    severityScale: { min: 1, max: 10, levels: { "1": "Mild", "5": "Moderate", "8": "Severe" } },
    diagnosedPatients: 156,
  },
  {
    id: "D-1004",
    name: "Bipolar Disorder",
    description: "A mental health condition that causes extreme mood swings",
    symptoms: [
      "Manic episodes",
      "Depressive episodes",
      "Increased energy",
      "Decreased need for sleep",
      "Poor decision-making",
    ],
    severityScale: { min: 1, max: 10, levels: { "1": "Mild", "5": "Moderate", "8": "Severe" } },
    diagnosedPatients: 98,
  },
  {
    id: "D-1005",
    name: "Attention-Deficit/Hyperactivity Disorder",
    description: "A chronic condition including attention difficulty, hyperactivity, and impulsiveness",
    symptoms: ["Inattention", "Hyperactivity", "Impulsivity", "Disorganization", "Poor time management"],
    severityScale: { min: 1, max: 10, levels: { "1": "Mild", "5": "Moderate", "8": "Severe" } },
    diagnosedPatients: 178,
  },
  {
    id: "D-1006",
    name: "Obsessive-Compulsive Disorder",
    description: "Characterized by unreasonable thoughts and fears that lead to repetitive behaviors",
    symptoms: [
      "Intrusive thoughts",
      "Compulsive behaviors",
      "Excessive cleaning",
      "Ordering and arranging",
      "Checking",
    ],
    severityScale: { min: 1, max: 10, levels: { "1": "Mild", "5": "Moderate", "8": "Severe" } },
    diagnosedPatients: 76,
  },
]

export default function DisordersPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDisorders = disorders.filter((disorder) => {
    // Filter by search term
    const matchesSearch =
      disorder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disorder.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disorder.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      disorder.symptoms.some((symptom) => symptom.toLowerCase().includes(searchTerm.toLowerCase()))

    return matchesSearch
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
            <Link href="/admin/appointments" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
            <Link href="/admin/hospitals" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Building className="h-5 w-5" />
              <span>Hospitals</span>
            </Link>
            <Link
              href="/admin/disorders"
              className="flex items-center gap-2 rounded-md bg-teal-50 px-3 py-2 text-teal-600"
            >
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
              <h1 className="text-3xl font-bold">Disorders</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Disorder
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Disorder Management</CardTitle>
                <CardDescription>View and manage all mental health disorders in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search disorders..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Symptoms</TableHead>
                          <TableHead>Severity Scale</TableHead>
                          <TableHead>Diagnosed Patients</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredDisorders.map((disorder) => (
                          <TableRow key={disorder.id}>
                            <TableCell className="font-medium">{disorder.id}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{disorder.name}</div>
                                <div className="text-sm text-gray-500">{disorder.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex flex-wrap gap-1">
                                {disorder.symptoms.slice(0, 3).map((symptom, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {symptom}
                                  </Badge>
                                ))}
                                {disorder.symptoms.length > 3 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{disorder.symptoms.length - 3} more
                                  </Badge>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <div className="h-2 w-24 rounded-full bg-gray-100">
                                  <div className="h-2 rounded-full bg-teal-600" style={{ width: "60%" }}></div>
                                </div>
                                <span className="text-xs">1-10</span>
                              </div>
                            </TableCell>
                            <TableCell>{disorder.diagnosedPatients}</TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Details</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Disorder</DropdownMenuItem>
                                  <DropdownMenuItem>View Related Symptoms</DropdownMenuItem>
                                  <DropdownMenuItem>View Diagnosed Patients</DropdownMenuItem>
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
