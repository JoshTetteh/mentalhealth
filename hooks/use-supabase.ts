"use client"

import { createClientClient } from "@/app/utils/supabase/client"
import { useState } from "react"

export function useSupabase() {
  const [client] = useState(() => createClientClient())

  return client
}
