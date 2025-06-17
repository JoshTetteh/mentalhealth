"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Video } from "lucide-react"

export default function VideoRoomPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Your Video Session</CardTitle>
          <CardDescription>
            Prepare for your session. When you're ready, click the button below to join the video call.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <Video className="h-16 w-16 text-primary" />
          </div>
          <p className="text-lg font-medium text-foreground">Click to join the meeting:</p>
          <Button asChild size="lg" className="w-full">
            <a
              href="https://triple-t-consult.whereby.com/test5e5e4679-2234-4766-8a36-5889b257e4a1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Join Video Call
            </a>
          </Button>
          <p className="text-sm text-muted-foreground">
            Please ensure your microphone and camera are enabled in your browser settings.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}