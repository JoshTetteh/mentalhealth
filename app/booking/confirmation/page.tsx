import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Heart } from "lucide-react"

// Add imports for our video meeting components
import { MeetingDetails } from "@/components/video-meeting/meeting-details"
import type { VideoMeetingDetails } from "@/lib/video-conferencing/video-service"

// Add a mock meeting for demonstration
const mockMeeting: VideoMeetingDetails = {
  provider: "zoom",
  meetingId: "123456789",
  password: "123456",
  joinUrl: "https://zoom.us/j/123456789?pwd=123456",
  startUrl: "https://zoom.us/s/123456789?pwd=123456",
  startTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  duration: 60,
}

export default function ConfirmationPage() {
  const appointment = {
    therapist: "Dr. Sarah Johnson",
    date: "April 10, 2025",
    time: "2:00 PM",
    type: "virtual",
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindfulCare</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container max-w-md py-12">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
                <CheckCircle className="h-10 w-10 text-teal-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Appointment Confirmed!</CardTitle>
            <CardDescription>Your appointment has been successfully booked</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Therapist:</span>
                  <span>{appointment.therapist}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Date:</span>
                  <span>{appointment.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Time:</span>
                  <span>{appointment.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Session Type:</span>
                  <span>{appointment.type}</span>
                </div>
              </div>
            </div>
            {appointment.type === "virtual" && (
              <div className="mt-6">
                <MeetingDetails meeting={mockMeeting} />
              </div>
            )}
            <p>
              A confirmation email has been sent to your email address with all the details and instructions for your
              appointment.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">Return to Home</Link>
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  )
}
