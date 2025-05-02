"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { toast } from "@/hooks/use-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [shouldRedirect, setShouldRedirect] = useState(false)
  
  const { signIn } = useAuth()
  const router = useRouter()
  
  // Handle redirect after successful login
  useEffect(() => {
    if (!shouldRedirect) return
    
    const redirectTimeout = setTimeout(() => {
      // Get redirect URL from query params if available
      const redirectTo = typeof window !== 'undefined' 
        ? new URLSearchParams(window.location.search).get('redirectTo') || '/dashboard'
        : '/dashboard'
        
      console.log(`Redirecting to: ${redirectTo}`)
      
      try {
        // Try using the Next.js router first
        router.push(redirectTo)
        
        // Fallback to direct navigation after a delay
        const fallbackTimeout = setTimeout(() => {
          if (typeof window !== 'undefined' && window.location.pathname.includes('login')) {
            console.log("Using fallback navigation")
            window.location.href = redirectTo
          }
        }, 1000)
        
        return () => clearTimeout(fallbackTimeout)
      } catch (err) {
        console.error("Navigation error:", err)
        
        // Direct navigation as last resort
        if (typeof window !== 'undefined') {
          window.location.href = redirectTo
        }
      }
    }, 500) // Small delay to ensure toast is shown
    
    return () => clearTimeout(redirectTimeout)
  }, [shouldRedirect, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      console.log("Starting sign in process...")

      const { error, data } = await signIn(email, password)

      console.log("Sign in response:", { error, data })

      if (error) {
        console.error("Error during sign in:", error)
        toast({
          title: "Error signing in",
          description: error.message || "Invalid email or password",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Handle successful login
      if (data?.user) {
        console.log("User logged in successfully:", data.user)

        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        })

        // Set redirect flag instead of directly navigating
        setShouldRedirect(true)
      } else {
        console.warn("Login successful but user object is null")

        toast({
          title: "Error",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
        })
        setIsLoading(false)
      }
    } catch (error) {
      console.error("Unexpected error during sign in:", error)

      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Check if we're in development mode - client-side only
  const isDevelopmentMode = typeof window !== 'undefined' && (
    !process.env.NEXT_PUBLIC_SUPABASE_URL || 
    process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co"
  )

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Heart className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold">MindfulCare</span>
        </Link>
        <Card className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Log in</CardTitle>
              <CardDescription>Enter your email and password to access your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="text-right text-sm">
                  <Link href="/forgot-password" className="text-teal-600 hover:underline">
                    Forgot password?
                  </Link>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading || shouldRedirect}>
                {isLoading ? "Logging in..." : shouldRedirect ? "Redirecting..." : "Log in"}
              </Button>
              <div className="text-center text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-teal-600 hover:underline">
                  Sign up
                </Link>
              </div>
              {/* Client-side render this conditional content */}
              {isDevelopmentMode && (
                <div className="text-center text-xs text-gray-500 mt-4 p-2 bg-gray-100 rounded-md">
                  <p>Development Mode Active</p>
                  <p>Any email/password combination will work</p>
                </div>
              )}
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}