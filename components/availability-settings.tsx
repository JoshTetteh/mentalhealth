"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Sample data
const initialAvailability = {
  monday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
  tuesday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
  wednesday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
  thursday: { enabled: true, slots: [{ start: "09:00", end: "17:00" }] },
  friday: { enabled: true, slots: [{ start: "09:00", end: "15:00" }] },
  saturday: { enabled: false, slots: [{ start: "10:00", end: "14:00" }] },
  sunday: { enabled: false, slots: [{ start: "10:00", end: "14:00" }] },
}

const timeSlots = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
]

export function AvailabilitySettings() {
  const [availability, setAvailability] = useState(initialAvailability)
  const [sessionDuration, setSessionDuration] = useState("50")
  const [breakDuration, setBreakDuration] = useState("10")
  const [autoSchedule, setAutoSchedule] = useState(true)

  const handleDayToggle = (day: string) => {
    setAvailability({
      ...availability,
      [day]: {
        ...availability[day as keyof typeof availability],
        enabled: !availability[day as keyof typeof availability].enabled,
      },
    })
  }

  const handleTimeChange = (day: string, index: number, field: "start" | "end", value: string) => {
    const updatedSlots = [...availability[day as keyof typeof availability].slots]
    updatedSlots[index] = { ...updatedSlots[index], [field]: value }

    setAvailability({
      ...availability,
      [day]: {
        ...availability[day as keyof typeof availability],
        slots: updatedSlots,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Session Settings</h3>
        </div>
        <Separator />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="session-duration">Session Duration</Label>
            <Select value={sessionDuration} onValueChange={setSessionDuration}>
              <SelectTrigger id="session-duration">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="50">50 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
                <SelectItem value="90">90 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="break-duration">Break Between Sessions</Label>
            <Select value={breakDuration} onValueChange={setBreakDuration}>
              <SelectTrigger id="break-duration">
                <SelectValue placeholder="Select break time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5 minutes</SelectItem>
                <SelectItem value="10">10 minutes</SelectItem>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="20">20 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="auto-schedule" checked={autoSchedule} onCheckedChange={setAutoSchedule} />
          <Label htmlFor="auto-schedule">Allow automatic scheduling</Label>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Weekly Availability</h3>
        </div>
        <Separator />

        <div className="space-y-4">
          {Object.entries(availability).map(([day, { enabled, slots }]) => (
            <div key={day} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id={`${day}-enabled`} checked={enabled} onCheckedChange={() => handleDayToggle(day)} />
                <Label htmlFor={`${day}-enabled`} className="font-medium capitalize">
                  {day}
                </Label>
              </div>

              {enabled && (
                <div className="ml-6 space-y-2">
                  {slots.map((slot, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Select
                        value={slot.start}
                        onValueChange={(value) => handleTimeChange(day, index, "start", value)}
                        disabled={!enabled}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="Start time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span>to</span>
                      <Select
                        value={slot.end}
                        onValueChange={(value) => handleTimeChange(day, index, "end", value)}
                        disabled={!enabled}
                      >
                        <SelectTrigger className="w-[120px]">
                          <SelectValue placeholder="End time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button>Save Availability</Button>
      </div>
    </div>
  )
}
