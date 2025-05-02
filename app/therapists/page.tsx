"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Heart, MapPin, Search, Star, Video } from "lucide-react"

const therapists = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    title: "Licensed Clinical Psychologist",
    specialties: ["Anxiety", "Depression", "Trauma"],
    rating: 4.9,
    reviews: 124,
    location: "Accra, 37 Military Hospital",
    virtual: true,
    inPerson: true,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Tomorrow",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    title: "Licensed Marriage & Family Therapist",
    specialties: ["Relationships", "Couples Therapy", "Family Conflict"],
    rating: 4.8,
    reviews: 98,
    location: "San Francisco, CA",
    virtual: true,
    inPerson: false,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Thursday",
  },
  {
    id: 3,
    name: "Dr. Amara Patel",
    title: "Clinical Social Worker",
    specialties: ["Depression", "Grief", "Life Transitions"],
    rating: 4.7,
    reviews: 87,
    location: "Chicago, IL",
    virtual: true,
    inPerson: true,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Today",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    title: "Licensed Mental Health Counselor",
    specialties: ["Anxiety", "Stress", "Work-Life Balance"],
    rating: 4.6,
    reviews: 76,
    location: "Boston, MA",
    virtual: true,
    inPerson: true,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Friday",
  },
  {
    id: 5,
    name: "Marian Okyne",
    title: "Psychiatric Nurse Practitioner",
    specialties: ["Medication Management", "Bipolar Disorder", "ADHD"],
    rating: 4.9,
    reviews: 112,
    location: "Korle-Bu, Korle-Bu Teaching Hospital",
    virtual: true,
    inPerson: false,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Wednesday",
  },
  {
    id: 6,
    name: "Dr. David Asamoah",
    title: "Licensed Psychologist",
    specialties: ["Trauma", "PTSD", "Anxiety"],
    rating: 4.8,
    reviews: 91,
    location: "Ankaful, WA",
    virtual: true,
    inPerson: true,
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Monday",
  },
]

export default function TherapistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sessionType, setSessionType] = useState("all")
  const [specialty, setSpecialty] = useState("all")

  const filteredTherapists = therapists.filter((therapist) => {
    // Filter by search term
    const matchesSearch =
      therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      therapist.specialties.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase()))

    // Filter by session type
    const matchesSessionType =
      sessionType === "all" ||
      (sessionType === "virtual" && therapist.virtual) ||
      (sessionType === "in-person" && therapist.inPerson)

    // Filter by specialty
    const matchesSpecialty =
      specialty === "all" || therapist.specialties.some((s) => s.toLowerCase() === specialty.toLowerCase())

    return matchesSearch && matchesSessionType && matchesSpecialty
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindfulCare</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/assessment" className="text-sm font-medium hover:underline">
              Assessment
            </Link>
            <Link href="/therapists" className="text-sm font-medium hover:underline">
              Find Therapists
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle>Filter Therapists</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="search">Search</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="search"
                      placeholder="Search by name, specialty..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="session-type">Session Type</Label>
                  <Select value={sessionType} onValueChange={setSessionType}>
                    <SelectTrigger id="session-type">
                      <SelectValue placeholder="Select session type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Session Types</SelectItem>
                      <SelectItem value="virtual">Virtual Only</SelectItem>
                      <SelectItem value="in-person">In-Person Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specialty">Specialty</Label>
                  <Select value={specialty} onValueChange={setSpecialty}>
                    <SelectTrigger id="specialty">
                      <SelectValue placeholder="Select specialty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="anxiety">Anxiety</SelectItem>
                      <SelectItem value="depression">Depression</SelectItem>
                      <SelectItem value="trauma">Trauma</SelectItem>
                      <SelectItem value="relationships">Relationships</SelectItem>
                      <SelectItem value="grief">Grief</SelectItem>
                      <SelectItem value="stress">Stress</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Availability</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="today" />
                      <Label htmlFor="today" className="font-normal">
                        Available Today
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="this-week" />
                      <Label htmlFor="this-week" className="font-normal">
                        Available This Week
                      </Label>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Insurance</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="blue-cross" />
                      <Label htmlFor="blue-cross" className="font-normal">
                        Blue Cross Blue Shield
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="aetna" />
                      <Label htmlFor="aetna" className="font-normal">
                        Aetna
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="cigna" />
                      <Label htmlFor="cigna" className="font-normal">
                        Cigna
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="united" />
                      <Label htmlFor="united" className="font-normal">
                        UnitedHealthcare
                      </Label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">Find Your Therapist</h1>
            <p className="text-gray-500 mb-6">
              Browse our network of licensed therapists to find the right match for your needs.
            </p>
            <div className="space-y-6">
              {filteredTherapists.length > 0 ? (
                filteredTherapists.map((therapist) => (
                  <Card key={therapist.id} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-6 flex flex-col md:flex-row gap-4 flex-1">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={therapist.image} alt={therapist.name} />
                          <AvatarFallback>
                            {therapist.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-2 flex-1">
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                            <div>
                              <h2 className="text-xl font-bold">{therapist.name}</h2>
                              <p className="text-gray-500">{therapist.title}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{therapist.rating}</span>
                              <span className="text-gray-500">({therapist.reviews} reviews)</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {therapist.specialties.map((specialty) => (
                              <Badge key={specialty} variant="outline">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {therapist.location}
                            </div>
                            <div className="flex items-center gap-2">
                              {therapist.virtual && (
                                <div className="flex items-center gap-1">
                                  <Video className="h-4 w-4" />
                                  Virtual
                                </div>
                              )}
                              {therapist.inPerson && (
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  In-person
                                </div>
                              )}
                            </div>
                          </div>
                          <p className="text-sm font-medium text-teal-600">{therapist.availability}</p>
                        </div>
                      </div>
                      <div className="p-6 bg-gray-50 flex flex-col justify-center items-center gap-2 md:w-48">
                        <Button asChild className="w-full">
                          <Link href={`/booking/${therapist.id}`}>Book Now</Link>
                        </Button>
                        <Button variant="outline" asChild className="w-full">
                          <Link href={`/therapists/${therapist.id}`}>View Profile</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-lg font-medium">No therapists found matching your criteria.</p>
                  <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
