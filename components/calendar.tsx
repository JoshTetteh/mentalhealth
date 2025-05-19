"use client"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { addDays, format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CalendarComponent() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal sm:w-[240px]",
                !date && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
        <Select>
          <SelectTrigger className="w-full sm:w-[240px]">
            <SelectValue placeholder="Select time slot" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="9:00">9:00 AM</SelectItem>
            <SelectItem value="10:00">10:00 AM</SelectItem>
            <SelectItem value="11:00">11:00 AM</SelectItem>
            <SelectItem value="13:00">1:00 PM</SelectItem>
            <SelectItem value="14:00">2:00 PM</SelectItem>
            <SelectItem value="15:00">3:00 PM</SelectItem>
            <SelectItem value="16:00">4:00 PM</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-7 gap-px bg-muted text-center text-xs font-medium">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="bg-background p-2.5">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-px bg-muted">
          {Array.from({ length: 35 }).map((_, i) => {
            const currentDate = addDays(new Date(2023, 4, 1), i - 1)
            const isToday = format(new Date(), "d") === format(currentDate, "d")
            const isSelected = date && format(date, "d") === format(currentDate, "d")
            const hasAppointment = [2, 5, 10, 15, 22, 25].includes(i)

            return (
              <div
                key={i}
                className={cn(
                  "h-14 bg-background p-2 text-sm",
                  isToday && "bg-muted/50",
                  isSelected && "bg-primary/10",
                )}
              >
                <div className="flex h-full flex-col justify-between">
                  <div className="text-right">{format(currentDate, "d")}</div>
                  {hasAppointment && (
                    <div className="mt-auto">
                      <div className="h-1.5 w-full rounded-full bg-primary/50" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
