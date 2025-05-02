"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type { VideoMeetingDetails } from "@/lib/video-conferencing/video-service"
import { Calendar, Clock, ExternalLink, Copy, Video } from "lucide-react"
import { useState } from "react"

interface MeetingDetailsProps {
  meeting: VideoMeetingDetails
  isHost?: boolean
}

export function MeetingDetails({ meeting, isHost = false }: MeetingDetailsProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Video Meeting Details</h3>
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Video className="h-4 w-4" />
            <span>
              {meeting.provider === "zoom" ? "Zoom" : meeting.provider === "teams" ? "Microsoft Teams" : "Google Meet"}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span>{formatDate(meeting.startTime)}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-500" />
            <span>
              {formatTime(meeting.startTime)} ({meeting.duration} minutes)
            </span>
          </div>

          <div className="pt-2">
            <Button
              className="w-full"
              onClick={() => window.open(isHost && meeting.startUrl ? meeting.startUrl : meeting.joinUrl, "_blank")}
            >
              {isHost ? "Start Meeting" : "Join Meeting"} <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="pt-2">
            <Button variant="outline" className="w-full" onClick={() => copyToClipboard(meeting.joinUrl)}>
              {copied ? "Copied!" : "Copy Meeting Link"} <Copy className="ml-2 h-4 w-4" />
            </Button>
          </div>

          {meeting.password && (
            <div className="pt-2">
              <div className="flex items-center justify-between border rounded p-3">
                <div>
                  <p className="text-sm text-gray-500">Meeting Password</p>
                  <p className="font-medium">{meeting.password}</p>
                </div>
                <Button variant="ghost" size="sm" onClick={() => copyToClipboard(meeting.password!)}>
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
