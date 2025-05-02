"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/app/utils/supabase/client"
import type { Session, User, AuthError } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    error: AuthError | null
    data: { user: User | null; session: Session | null }
  }>
  signUp: (
    email: string,
    password: string,
    userData: any,
  ) => Promise<{
    error: AuthError | null
    data: { user: User | null; session: Session | null }
  }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// For development mode when Supabase isn't configured
const DEVELOPMENT_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Initialize Supabase client
  const supabase = createClient()

  // Set up auth state listener
  useEffect(() => {
    const setupAuth = async () => {
      try {
        if (DEVELOPMENT_MODE) {
          console.warn("Running in development mode without Supabase credentials")
          setIsLoading(false)
          return
        }

        // Get initial session
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error.message)
        } else {
          setSession(data.session)
          setUser(data.session?.user ?? null)
        }

        // Set up auth state change listener
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
          setUser(session?.user ?? null)
        })

        return () => {
          subscription.unsubscribe()
        }
      } catch (err) {
        console.error("Auth setup error:", err)
      } finally {
        setIsLoading(false)
      }
    }

    setupAuth()
  }, [supabase.auth])

  // Update the signIn function to better handle errors
  const signIn = async (email: string, password: string) => {
    try {
      // For development mode
      if (DEVELOPMENT_MODE) {
        console.log("Development mode: Simulating successful login")
        const mockUser = {
          id: "dev-user-id",
          email,
          user_metadata: { full_name: "Dev User", user_type: "patient" },
        } as User

        setUser(mockUser)
        return {
          data: { user: mockUser, session: { user: mockUser } as Session },
          error: null,
        }
      }

      // For debugging
      console.log("Attempting sign in with:", { email, password: "***" })

      const result = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      // For debugging
      console.log("Sign in result:", JSON.stringify(result, null, 2))

      return result
    } catch (err) {
      console.error("Sign in error:", err)
      return {
        data: { user: null, session: null },
        error: {
          message: err instanceof Error ? err.message : "Unknown error during sign in",
          status: 500,
        } as AuthError,
      }
    }
  }

  // Update the signUp function to better handle errors
  const signUp = async (email: string, password: string, userData: any) => {
    try {
      // For development mode
      if (DEVELOPMENT_MODE) {
        console.log("Development mode: Simulating successful signup")
        const mockUser = {
          id: "dev-user-id",
          email,
          user_metadata: { ...userData },
        } as User

        return {
          data: { user: mockUser, session: null },
          error: null,
        }
      }

      // For debugging
      console.log("Attempting sign up with:", { email, password: "***", userData })

      // Ensure userData is properly formatted
      const options = {
        data: userData,
        // Add email confirmation if needed
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }

      const result = await supabase.auth.signUp({
        email,
        password,
        options,
      })

      // For debugging
      console.log("Sign up result:", JSON.stringify(result, null, 2))

      return result
    } catch (err) {
      console.error("Sign up error:", err)
      return {
        data: { user: null, session: null },
        error: {
          message: err instanceof Error ? err.message : "Unknown error during sign up",
          status: 500,
        } as AuthError,
      }
    }
  }

  const signOut = async () => {
    try {
      if (DEVELOPMENT_MODE) {
        console.log("Development mode: Simulating sign out")
        setUser(null)
        setSession(null)
        return
      }

      await supabase.auth.signOut()
    } catch (err) {
      console.error("Sign out error:", err)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
