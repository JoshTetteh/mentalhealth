import { createClient } from "@/app/utils/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const supabase = await createClient()
  const body = await request.json()

  const { appointmentId, provider, startTime, duration, title } = body

  if (!appointmentId || !provider || !startTime) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  try {
    // Create the meeting using the provider's API
    const meetingDetails = await createMeeting(
      provider as VideoProvider,
      startTime,
      duration || 60,
      title || "Therapy Session",
    )

    // Store the meeting details in the database
    const { data, error } = await supabase
      .from("video_meetings")
      .insert({
        appointment_id: appointmentId,
        provider: provider,
        meeting_id: meetingDetails.meetingId,
        password: meetingDetails.password,
        join_url: meetingDetails.joinUrl,
        start_url: meetingDetails.startUrl,
        start_time: meetingDetails.startTime,
        duration: meetingDetails.duration,
      })
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Update the appointment with the meeting ID
    const { error: updateError } = await supabase
      .from("appointments")
      .update({ video_meeting_id: data[0].id })
      .eq("id", appointmentId)

    if (updateError) {
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    return NextResponse.json(meetingDetails)
  } catch (error) {
    console.error("Error creating meeting:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error creating meeting" },
      { status: 500 },
    )
  }
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const url = new URL(request.url)

  const appointmentId = url.searchParams.get("appointmentId")

  if (!appointmentId) {
    return NextResponse.json({ error: "Appointment ID is required" }, { status: 400 })
  }

  try {
    // Get the meeting details from the database
    const { data, error } = await supabase
      .from("video_meetings")
      .select("*")
      .eq("appointment_id", appointmentId)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Meeting not found" }, { status: 404 })
    }

    // Format the response
    const meetingDetails = {
      provider: data.provider,
      meetingId: data.meeting_id,
      password: data.password,
      joinUrl: data.join_url,
      startUrl: data.start_url,
      startTime: data.start_time,
      duration: data.duration,
    }

    return NextResponse.json(meetingDetails)
  } catch (error) {
    console.error("Error fetching meeting:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error fetching meeting" },
      { status: 500 },
    )
  }
}
