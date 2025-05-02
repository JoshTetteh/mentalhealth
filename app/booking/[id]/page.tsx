"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Heart, MapPin, Star, Video } from "lucide-react"
import { VideoProviderSelector } from "@/components/video-meeting/video-provider-selector"
import type { VideoProvider } from "@/lib/video-conferencing/video-service"

const therapists = {
  1: {
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
    bio: "Dr. Sarah Johnson is a licensed clinical psychologist with over 10 years of experience helping individuals overcome anxiety, depression, and trauma. She uses evidence-based approaches including Cognitive Behavioral Therapy (CBT) and mindfulness techniques to help clients develop coping skills and achieve their goals.",
    education: "Ph.D. in Clinical Psychology, Columbia University",
    price: "$150 per session",
  },
}

export default function BookingPage({ params }: { params: { id: string } }) {
  const therapist = therapists[params.id as keyof typeof therapists]
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [sessionType, setSessionType] = useState("virtual")
  const [videoProvider, setVideoProvider] = useState<VideoProvider | null>(null)
  const [bookingFor, setBookingFor] = useState("self")
  const [timeSlot, setTimeSlot] = useState("")
  const [step, setStep] = useState(1)

  const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

  const handleContinue = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  if (!therapist) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center">
        <p>Therapist not found</p>
        <Link href="/therapists">
          <Button className="mt-4">Back to Therapists</Button>
        </Link>
      </div>
    )
  }

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
        </div>
      </header>
      <main className="flex-1 container py-8">
        <Link href="/therapists" className="text-teal-600 hover:underline mb-4 inline-block">
          ← Back to therapists
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={therapist.image || "/placeholder.svg"} alt={therapist.name} />
                    <AvatarFallback>
                      {therapist.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">{therapist.name}</h2>
                  <p className="text-gray-500 mb-2">{therapist.title}</p>
                  <div className="flex items-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{therapist.rating}</span>
                    <span className="text-gray-500">({therapist.reviews} reviews)</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {therapist.specialties.map((specialty) => (
                      <Badge key={specialty} variant="outline">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center justify-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {therapist.location}
                    </div>
                    <div className="flex items-center justify-center gap-2">
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
                  <p className="font-medium">{therapist.price}</p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Book an Appointment</CardTitle>
                <CardDescription>Schedule a session with {therapist.name}</CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>Who is this appointment for?</Label>
                      <RadioGroup value={bookingFor} onValueChange={setBookingFor} className="flex flex-col space-y-1">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="self" id="self" />
                          <Label htmlFor="self" className="font-normal">
                            Myself
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="someone-else" id="someone-else" />
                          <Label htmlFor="someone-else" className="font-normal">
                            Someone else (I'm a caregiver)
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {bookingFor === "someone-else" && (
                      <div className="space-y-4 border rounded-md p-4">
                        <div className="space-y-2">
                          <Label htmlFor="patient-name">Patient's Full Name</Label>
                          <Input id="patient-name" placeholder="Enter patient's name" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="relationship">Your Relationship to Patient</Label>
                          <Select>
                            <SelectTrigger id="relationship">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="parent">Parent</SelectItem>
                              <SelectItem value="spouse">Spouse/Partner</SelectItem>
                              <SelectItem value="child">Adult Child</SelectItem>
                              <SelectItem value="sibling">Sibling</SelectItem>
                              <SelectItem value="friend">Friend</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Session Type</Label>
                      <RadioGroup
                        value={sessionType}
                        onValueChange={setSessionType}
                        className="flex flex-col space-y-1"
                      >
                        {therapist.virtual && (
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="virtual" id="virtual" />
                            <Label htmlFor="virtual" className="font-normal">
                              Virtual Session
                            </Label>
                          </div>
                        )}
                        {therapist.inPerson && (
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in-person" id="in-person" />
                            <Label htmlFor="in-person" className="font-normal">
                              In-Person Session
                            </Label>
                          </div>
                        )}
                      </RadioGroup>
                    </div>

                    {sessionType === "virtual" && (
                      <div className="space-y-2 mt-4">
                        <VideoProviderSelector selectedProvider={videoProvider} onSelect={setVideoProvider} />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label>Select Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="border rounded-md p-4"
                        disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Available Time Slots</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot) => (
                          <Button
                            key={slot}
                            variant={timeSlot === slot ? "default" : "outline"}
                            className="justify-center"
                            onClick={() => setTimeSlot(slot)}
                          >
                            {slot}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="reason">Reason for Visit</Label>
                      <Select>
                        <SelectTrigger id="reason">
                          <SelectValue placeholder="Select reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="anxiety">Anxiety</SelectItem>
                          <SelectItem value="depression">Depression</SelectItem>
                          <SelectItem value="stress">Stress</SelectItem>
                          <SelectItem value="relationships">Relationship Issues</SelectItem>
                          <SelectItem value="trauma">Trauma</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insurance">Insurance Information</Label>
                      <Select>
                        <SelectTrigger id="insurance">
                          <SelectValue placeholder="Select insurance provider" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="blue-cross">Blue Cross Blue Shield</SelectItem>
                          <SelectItem value="aetna">Aetna</SelectItem>
                          <SelectItem value="cigna">Cigna</SelectItem>
                          <SelectItem value="united">UnitedHealthcare</SelectItem>
                          <SelectItem value="medicare">Medicare</SelectItem>
                          <SelectItem value="self-pay">Self Pay</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="insurance-id">Insurance ID (if applicable)</Label>
                      <Input id="insurance-id" placeholder="Enter insurance ID" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes (optional)</Label>
                      <Input id="notes" placeholder="Any specific concerns or questions?" />
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-md">
                      <h3 className="font-medium mb-4">Appointment Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Therapist:</span>
                          <span>{therapist.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Date:</span>
                          <span>{date?.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Time:</span>
                          <span>{timeSlot}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Session Type:</span>
                          <span>{sessionType === "virtual" ? "Virtual" : "In-Person"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Fee:</span>
                          <span>{therapist.price}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="payment">Payment Method</Label>
                      <Select>
                        <SelectTrigger id="payment">
                          <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="credit-card">Credit Card</SelectItem>
                          <SelectItem value="paypal">PayPal</SelectItem>
                          <SelectItem value="insurance">Insurance</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
                        <Label htmlFor="terms" className="text-sm font-normal">
                          I agree to the{" "}
                          <Link href="/terms" className="text-teal-600 hover:underline">
                            terms and conditions
                          </Link>{" "}
                          and{" "}
                          <Link href="/privacy" className="text-teal-600 hover:underline">
                            privacy policy
                          </Link>
                        </Label>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {step > 1 ? (
                  <Button variant="outline" onClick={handleBack}>
                    Back
                  </Button>
                ) : (
                  <Link href="/therapists">
                    <Button variant="outline">Cancel</Button>
                  </Link>
                )}

                {step < 3 ? (
                  <Button
                    onClick={handleContinue}
                    disabled={(step === 1 && !timeSlot) || (step === 1 && sessionType === "virtual" && !videoProvider)}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button asChild>
                    <Link href="/booking/confirmation">Confirm Booking</Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
