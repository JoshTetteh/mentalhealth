import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Heart } from "lucide-react"

// Define the Whereby meeting type
// Modify your confirmation page so that it matches the Whereby api not hardcoded values
interface WherebyMeetingDetails {
  provider: "whereby"
  roomName: string
  roomUrl: string
  startTime: string
  duration: number
}

// Add a mock meeting for demonstration - Whereby integration
const realMeeting: WherebyMeetingDetails = {
  provider: "whereby",
  roomName: "consultation-room-123",
  roomUrl: "https://triple-t-consult.whereby.com/test5e5e4679-2234-4766-8a36-5889b257e4a1",
  startTime: new Date(Date.now() + 24 * 30 * 60 * 1000).toISOString(), // Tomorrow
  duration: 30, // in minutes
};

// Simple meeting details component
const MeetingDetails = ({ meeting }: { meeting: WherebyMeetingDetails }) => (
  <Card className="w-full max-w-md">
    <CardHeader>
      <CardTitle>Video Meeting Details</CardTitle>
      <CardDescription>Your Whereby consultation</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <p><strong>Room:</strong> {meeting.roomName}</p>
        <p><strong>Start Time:</strong> {new Date(meeting.startTime).toLocaleString()}</p>
        <p><strong>Duration:</strong> {meeting.duration} minutes</p>
      </div>
    </CardContent>
    <CardFooter>
      <Button asChild className="w-full">
        <Link href={meeting.roomUrl} target="_blank" rel="noopener noreferrer">
          Join Whereby Meeting
        </Link>
      </Button>
    </CardFooter>
  </Card>
)

// Main page component
export default function BookingConfirmationPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
          <h1 className="text-3xl font-bold">Booking Confirmed!</h1>
          <p className="text-muted-foreground mt-2">
            Thank you for your booking. Your consultation details are below.
          </p>
        </div>
        
        <MeetingDetails meeting={realMeeting} />
        
        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-4">
            You'll receive an email confirmation shortly.
          </p>
          <Button asChild variant="outline">
            <Link href="/">
              <Heart className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}