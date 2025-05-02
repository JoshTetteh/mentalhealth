import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, MapPin, Star, Video, Calendar, ThumbsUp, MessageSquare } from "lucide-react"

// This would normally come from a database
const therapist = {
  id: 1,
  name: "Dr. Sarah Johnson",
  title: "Licensed Clinical Psychologist",
  specialties: ["Anxiety", "Depression", "Trauma", "Stress Management", "Cognitive Behavioral Therapy"],
  rating: 4.9,
  reviews: 124,
  location: "Accra, 37 Military Hospital",
  virtual: true,
  inPerson: true,
  image: "/placeholder.svg?height=200&width=200",
  bio: "Dr. Sarah Johnson is a licensed clinical psychologist with over 10 years of experience helping individuals overcome anxiety, depression, and trauma. She uses evidence-based approaches including Cognitive Behavioral Therapy (CBT) and mindfulness techniques to help clients develop coping skills and achieve their goals.",
  education: [
    "Ph.D. in Clinical Psychology, Columbia University",
    "M.A. in Psychology, New York University",
    "B.A. in Psychology, University of Michigan",
  ],
  certifications: [
    "Licensed Clinical Psychologist",
    "Certified in Cognitive Behavioral Therapy",
    "Trauma-Focused CBT Certification",
  ],
  languages: ["English", "Spanish"],
  approach:
    "I believe in a collaborative, client-centered approach to therapy. I work with clients to identify their goals and develop personalized treatment plans that address their unique needs. I integrate evidence-based techniques from cognitive-behavioral therapy, mindfulness, and other approaches to help clients develop skills for managing difficult emotions, changing unhelpful thought patterns, and improving relationships.",
  price: "$150 per session",
  insuranceAccepted: ["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealthcare"],
  availability: {
    monday: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    tuesday: ["10:00 AM", "1:00 PM", "3:00 PM"],
    wednesday: ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    thursday: ["10:00 AM", "1:00 PM", "3:00 PM"],
    friday: ["9:00 AM", "11:00 AM", "2:00 PM"],
  },
  reviews: [
    {
      id: 1,
      author: "Jane D.",
      rating: 5,
      date: "March 15, 2025",
      content:
        "Dr. Johnson has been incredibly helpful in my journey with anxiety. She's compassionate, insightful, and provides practical tools that I use daily. I've seen significant improvement since starting therapy with her.",
    },
    {
      id: 2,
      author: "Michael T.",
      rating: 5,
      date: "February 28, 2025",
      content:
        "I was hesitant to try therapy, but Dr. Johnson made me feel comfortable from the first session. She's a great listener and offers valuable perspectives that have helped me work through some difficult issues.",
    },
    {
      id: 3,
      author: "Sarah K.",
      rating: 4,
      date: "February 10, 2025",
      content:
        "Dr. Johnson is professional and knowledgeable. The CBT techniques she's taught me have been very effective for managing my depression. I appreciate her structured approach to therapy.",
    },
  ],
}

export default function TherapistProfilePage({ params }: { params: { id: string } }) {
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
        <Link href="/therapists" className="text-teal-600 hover:underline mb-4 inline-block">
          ← Back to therapists
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4">
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
                  <p className="font-medium mb-4">{therapist.price}</p>
                  <div className="w-full space-y-2">
                    <Button className="w-full" asChild>
                      <Link href={`/booking/${therapist.id}`}>Book Appointment</Link>
                    </Button>
                    <Button variant="outline" className="w-full">
                      Message
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {therapist.languages.map((language) => (
                    <Badge key={language} variant="outline">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Insurance Accepted</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {therapist.insuranceAccepted.map((insurance) => (
                    <li key={insurance} className="flex items-center gap-2">
                      <ThumbsUp className="h-4 w-4 text-teal-600" />
                      {insurance}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience & Education</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="availability">Availability</TabsTrigger>
              </TabsList>

              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {therapist.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Biography</h3>
                      <p>{therapist.bio}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Therapeutic Approach</h3>
                      <p>{therapist.approach}</p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {therapist.specialties.map((specialty) => (
                          <Badge key={specialty} variant="outline">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="experience">
                <Card>
                  <CardHeader>
                    <CardTitle>Experience & Education</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Education</h3>
                      <ul className="space-y-1">
                        {therapist.education.map((edu, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center mt-0.5">
                              <span className="text-xs text-teal-600">{index + 1}</span>
                            </div>
                            {edu}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-medium">Certifications & Licenses</h3>
                      <ul className="space-y-1">
                        {therapist.certifications.map((cert, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-teal-100 flex items-center justify-center mt-0.5">
                              <span className="text-xs text-teal-600">✓</span>
                            </div>
                            {cert}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Patient Reviews</CardTitle>
                    <CardDescription>
                      {therapist.rating} out of 5 stars (
                      {typeof therapist.reviews === "number" ? therapist.reviews : therapist.reviews.length} reviews)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {Array.isArray(therapist.reviews) ? (
                      therapist.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-4 last:border-0 last:pb-0">
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <div className="font-medium">{review.author}</div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <div className="text-sm text-gray-500">{review.date}</div>
                          </div>
                          <p className="text-gray-700">{review.content}</p>
                        </div>
                      ))
                    ) : (
                      <p>No reviews available</p>
                    )}

                    <Button variant="outline" className="w-full">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Write a Review
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="availability">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability</CardTitle>
                    <CardDescription>Select a date and time to book your appointment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Weekly Schedule</h3>
                        <div className="space-y-4">
                          {Object.entries(therapist.availability).map(([day, slots]) => (
                            <div key={day} className="flex flex-col">
                              <h4 className="font-medium capitalize mb-2">{day}</h4>
                              <div className="flex flex-wrap gap-2">
                                {slots.map((slot) => (
                                  <Badge key={slot} variant="outline" className="bg-gray-50">
                                    {slot}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-medium mb-4">Book an Appointment</h3>
                        <div className="flex flex-col items-center">
                          <Calendar className="mb-4" />
                          <Button className="w-full" asChild>
                            <Link href={`/booking/${therapist.id}`}>
                              <Calendar className="mr-2 h-4 w-4" />
                              Continue to Booking
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
