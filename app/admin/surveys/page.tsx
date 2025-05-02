"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Heart, Search, Plus, Filter, Download, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Import the necessary icons
import { Activity, Brain, Building, Calendar, FileText, UserCheck, UserPlus, Users } from "lucide-react"

const surveys = [
  {
    id: "S-1001",
    title: "Depression Assessment (PHQ-9)",
    description: "Patient Health Questionnaire for screening and measuring depression severity",
    questions: 9,
    completions: 487,
    createdAt: "2023-01-10",
    isActive: true,
  },
  {
    id: "S-1002",
    title: "Anxiety Assessment (GAD-7)",
    description: "Generalized Anxiety Disorder scale for screening and severity measurement",
    questions: 7,
    completions: 412,
    createdAt: "2023-01-10",
    isActive: true,
  },
  {
    id: "S-1003",
    title: "PTSD Checklist (PCL-5)",
    description: "Assessment for symptoms of PTSD based on DSM-5 criteria",
    questions: 20,
    completions: 156,
    createdAt: "2023-02-15",
    isActive: true,
  },
  {
    id: "S-1004",
    title: "Mood Disorder Questionnaire (MDQ)",
    description: "Screening instrument for bipolar spectrum disorders",
    questions: 15,
    completions: 203,
    createdAt: "2023-03-05",
    isActive: true,
  },
  {
    id: "S-1005",
    title: "Adult ADHD Self-Report Scale (ASRS)",
    description: "Screening for attention deficit hyperactivity disorder in adults",
    questions: 18,
    completions: 178,
    createdAt: "2023-04-12",
    isActive: true,
  },
  {
    id: "S-1006",
    title: "Eating Attitudes Test (EAT-26)",
    description: "Screening for eating disorders and disordered eating behaviors",
    questions: 26,
    completions: 92,
    createdAt: "2023-05-20",
    isActive: false,
  },
]

export default function SurveysPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredSurveys = surveys.filter((survey) => {
    // Filter by search term
    const matchesSearch =
      survey.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      survey.id.toLowerCase().includes(searchTerm.toLowerCase())

    // Filter by status
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && survey.isActive) ||
      (statusFilter === "inactive" && !survey.isActive)

    return matchesSearch && matchesStatus
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
            <Link href="/admin/disorders" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Brain className="h-5 w-5" />
              <span>Disorders</span>
            </Link>
            <Link
              href="/admin/surveys"
              className="flex items-center gap-2 rounded-md bg-teal-50 px-3 py-2 text-teal-600"
            >
              <FileText className="h-5 w-5" />
              <span>Surveys</span>
            </Link>
          </div>
        </aside>
        <main className="flex-1 p-6">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Surveys</h1>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Survey
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Survey Management</CardTitle>
                <CardDescription>View and manage all diagnostic surveys in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        placeholder="Search surveys..."
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
                          <TableHead>Title</TableHead>
                          <TableHead>Questions</TableHead>
                          <TableHead>Completions</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredSurveys.map((survey) => (
                          <TableRow key={survey.id}>
                            <TableCell className="font-medium">{survey.id}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{survey.title}</div>
                                <div className="text-sm text-gray-500">{survey.description}</div>
                              </div>
                            </TableCell>
                            <TableCell>{survey.questions}</TableCell>
                            <TableCell>{survey.completions}</TableCell>
                            <TableCell>{new Date(survey.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <Badge variant={survey.isActive ? "default" : "secondary"}>
                                {survey.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>View Survey</DropdownMenuItem>
                                  <DropdownMenuItem>Edit Survey</DropdownMenuItem>
                                  <DropdownMenuItem>View Responses</DropdownMenuItem>
                                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                  {survey.isActive ? (
                                    <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                                  ) : (
                                    <DropdownMenuItem className="text-green-600">Activate</DropdownMenuItem>
                                  )}
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
