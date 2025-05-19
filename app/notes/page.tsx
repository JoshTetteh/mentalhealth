"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format } from "date-fns"
import { CalendarIcon, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/hooks/use-toast"

const formSchema = z.object({
  clientName: z.string().min(2, { message: "Client name is required" }),
  sessionDate: z.date({ required_error: "Session date is required" }),
  sessionDuration: z.string().min(1, { message: "Session duration is required" }),
  sessionType: z.string().min(1, { message: "Session type is required" }),
  moodRating: z.number().min(1).max(10),
  topicsDiscussed: z.string().min(5, { message: "Please provide topics discussed" }),
  interventions: z.string().min(5, { message: "Please provide interventions used" }),
  progressNotes: z.string().min(5, { message: "Progress notes are required" }),
  actionItems: z.string(),
  followUpPlans: z.string(),
  confidentialNotes: z.string(),
  riskAssessment: z.boolean().default(false),
  medicationDiscussed: z.boolean().default(false),
  clientDistressed: z.boolean().default(false),
})

export default function SessionNotesPage() {
  const [isSaving, setIsSaving] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      sessionDuration: "50",
      sessionType: "",
      moodRating: 5,
      topicsDiscussed: "",
      interventions: "",
      progressNotes: "",
      actionItems: "",
      followUpPlans: "",
      confidentialNotes: "",
      riskAssessment: false,
      medicationDiscussed: false,
      clientDistressed: false,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSaving(false)
      toast({
        title: "Session notes saved",
        description: "Session notes have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-10">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="bg-slate-50 dark:bg-slate-800">
          <CardTitle className="text-2xl">Session Notes</CardTitle>
          <CardDescription>Document your therapy session details and observations</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter client name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sessionDate"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Session Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={`w-full pl-3 text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="sessionDuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Duration (minutes)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="50">50 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                          <SelectItem value="90">90 minutes</SelectItem>
                          <SelectItem value="120">120 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sessionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Session Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select session type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="individual">Individual Therapy</SelectItem>
                          <SelectItem value="couples">Couples Therapy</SelectItem>
                          <SelectItem value="family">Family Therapy</SelectItem>
                          <SelectItem value="group">Group Therapy</SelectItem>
                          <SelectItem value="assessment">Assessment</SelectItem>
                          <SelectItem value="crisis">Crisis Intervention</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="moodRating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Client Mood Rating (1-10)</FormLabel>
                    <FormControl>
                      <div className="space-y-2">
                        <Slider
                          min={1}
                          max={10}
                          step={1}
                          defaultValue={[field.value]}
                          onValueChange={(vals) => field.onChange(vals[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>1 - Severely Distressed</span>
                          <span>5 - Neutral</span>
                          <span>10 - Excellent</span>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription>Rate the client's overall mood during this session</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <div className="font-medium">Session Flags</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="riskAssessment"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Risk Assessment</FormLabel>
                          <FormDescription>Risk assessment was conducted</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="medicationDiscussed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Medication</FormLabel>
                          <FormDescription>Medication was discussed</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="clientDistressed"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Client Distressed</FormLabel>
                          <FormDescription>Client showed significant distress</FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormField
                control={form.control}
                name="topicsDiscussed"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topics Discussed</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Summarize the main topics discussed during the session"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="interventions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interventions & Techniques Used</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe therapeutic interventions and techniques used"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="progressNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Progress Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Document client's progress, insights, and observations"
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="actionItems"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Action Items / Homework</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="List any homework or tasks assigned to the client"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="followUpPlans"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Follow-up Plans</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Document plans for future sessions or referrals"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confidentialNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confidential Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Private notes not shared with client"
                        className="min-h-[80px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      These notes are for therapist use only and will be marked as confidential
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="bg-slate-50 dark:bg-slate-800 flex justify-between">
              <Button variant="outline" type="button">
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Save className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Session Notes
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
