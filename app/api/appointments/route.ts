import { createServerClient } from "@/app/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = createServerClient()
  const url = new URL(request.url)

  // Get query parameters
  const userId = url.searchParams.get("userId")
  const userType = url.searchParams.get("userType")
  const status = url.searchParams.get("status")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // Start building the query
  let query = supabase.from("appointments").select(`
      *,
      patients:patient_id(id, users(full_name)),
      therapists:therapist_id(id, users(full_name)),
      hospitals:hospital_id(id, name)
    `)

  // Apply filters based on user type
  if (userType === "patient") {
    query = query.eq("patient_id", userId)
  } else if (userType === "therapist") {
    query = query.eq("therapist_id", userId)
  } else if (userType === "caregiver") {
    // Get patients associated with this caregiver
    const { data: caregiverPatients } = await supabase
      .from("caregiver_patients")
      .select("patient_id")
      .eq("caregiver_id", userId)

    if (caregiverPatients && caregiverPatients.length > 0) {
      const patientIds = caregiverPatients.map((cp) => cp.patient_id)
      query = query.in("patient_id", patientIds)
    } else {
      // No patients associated with this caregiver
      return NextResponse.json([])
    }
  }

  // Filter by status if provided
  if (status && status !== "all") {
    query = query.eq("status", status)
  }

  // Order by date and time
  query = query.order("date", { ascending: true }).order("start_time", { ascending: true })

  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Format the data
  const appointments = data.map((appointment) => ({
    id: appointment.id,
    patientId: appointment.patient_id,
    patientName: appointment.patients?.users?.full_name,
    therapistId: appointment.therapist_id,
    therapistName: appointment.therapists?.users?.full_name,
    date: appointment.date,
    startTime: appointment.start_time,
    endTime: appointment.end_time,
    type: appointment.type,
    status: appointment.status,
    hospitalId: appointment.hospital_id,
    hospitalName: appointment.hospitals?.name,
    bookedById: appointment.booked_by_id,
    bookedByType: appointment.booked_by_type,
    notes: appointment.notes,
    createdAt: appointment.created_at,
  }))

  return NextResponse.json(appointments)
}

// Update the POST function to handle video meeting creation
export async function POST(request: Request) {
  const supabase = createServerClient()
  const body = await request.json()

  const {
    patientId,
    therapistId,
    date,
    startTime,
    endTime,
    type,
    hospitalId,
    bookedById,
    bookedByType,
    notes,
    videoProvider,
  } = body

  // Validate required fields
  if (!patientId || !therapistId || !date || !startTime || !endTime || !type || !bookedById || !bookedByType) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  // Check if the time slot is available
  const { data: existingAppointments, error: checkError } = await supabase
    .from("appointments")
    .select("*")
    .eq("therapist_id", therapistId)
    .eq("date", date)
    .or(`start_time.lte.${endTime},end_time.gte.${startTime}`)
    .eq("status", "scheduled")

  if (checkError) {
    return NextResponse.json({ error: checkError.message }, { status: 500 })
  }

  if (existingAppointments && existingAppointments.length > 0) {
    return NextResponse.json({ error: "This time slot is already booked" }, { status: 409 })
  }

  // Create the appointment
  const { data, error } = await supabase
    .from("appointments")
    .insert({
      patient_id: patientId,
      therapist_id: therapistId,
      date,
      start_time: startTime,
      end_time: endTime,
      type,
      status: "scheduled",
      hospital_id: hospitalId || null,
      booked_by_id: bookedById,
      booked_by_type: bookedByType,
      notes: notes || null,
    })
    .select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // If this is a virtual appointment and a video provider is specified, create a meeting
  if (type === "virtual" && videoProvider) {
    try {
      // Calculate the start time in ISO format
      const startDateTime = new Date(`${date}T${startTime}`)
      const durationMinutes = (new Date(`${date}T${endTime}`).getTime() - startDateTime.getTime()) / 60000

      // Create the meeting
      const response = await fetch(`${request.url.split("/appointments")[0]}/meetings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appointmentId: data[0].id,
          provider: videoProvider,
          startTime: startDateTime.toISOString(),
          duration: durationMinutes,
          title: `Therapy Session with Patient ${patientId}`,
        }),
      })

      if (!response.ok) {
        console.error("Error creating video meeting:", await response.text())
      }
    } catch (meetingError) {
      console.error("Error creating video meeting:", meetingError)
      // We don't want to fail the appointment creation if the meeting creation fails
      // Just log the error and continue
    }
  }

  return NextResponse.json(data[0])
}
