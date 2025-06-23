import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export default async function PrivatePage() {
  // First check Clerk authentication
  const { userId } = await auth()
  if (!userId) {
    redirect('/sign-in')
  }

  // Then check Supabase authorization
  const supabase = await createClient()
  
  // You'll need to sync the Clerk user ID with Supabase
  // This could be in a users table or similar
  const { data: userProfile, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('clerk_user_id', userId)
    .single()

  if (error || !userProfile) {
    // User exists in Clerk but not authorized in Supabase
    redirect('/unauthorized')
  }

  // Additional authorization checks
  if (!userProfile.has_access_to_feature) {
    redirect('/upgrade-required')
  }

  return (
    <div>
      <p>Hello authorized user!</p>
      <p>Your role: {userProfile.role}</p>
    </div>
  )
}