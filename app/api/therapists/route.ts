import { createClient } from "@/app/utils/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  const url = new URL(request.url)

  // Get query parameters
  const specialization = url.searchParams.get("specialization")
  const sessionType = url.searchParams.get("sessionType")
  const searchTerm = url.searchParams.get("search")

  // Start building the query
  let query = supabase
    .from("therapists")
    .select(`
      *,
      users!inner(id, full_name, email),
      reviews(id, rating)
    `)
    .eq("is_active", true)

  // Apply filters
  if (specialization && specialization !== "all") {
    query = query.contains("specialization", [specialization])
  }

  if (searchTerm) {
    query = query.or(`users.full_name.ilike.%${searchTerm}%,specialization.cs.{${searchTerm}}`)
  }

  // Execute the query
  const { data, error } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Process the data to calculate average ratings
  const therapists = data.map((therapist) => {
    const reviews = therapist.reviews || []
    const totalRatings = reviews.length
    const averageRating =
      totalRatings > 0 ? reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / totalRatings : 0

    return {
      id: therapist.id,
      name: therapist.users.full_name,
      email: therapist.users.email,
      specialization: therapist.specialization,
      bio: therapist.bio,
      education: therapist.education,
      languages: therapist.languages,
      consultationFee: therapist.consultation_fee,
      yearsOfExperience: therapist.years_of_experience,
      rating: Number.parseFloat(averageRating.toFixed(1)),
      reviewCount: totalRatings,
    }
  })

  // Filter by session type if needed (this requires additional query to therapist_availability)
  const filteredTherapists = therapists
  if (sessionType && sessionType !== "all") {
    // This would require additional logic based on your data model
  }

  return NextResponse.json(filteredTherapists)
}
