"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import { createClient } from "@/app/utils/supabase/client"
import { toast } from "@/hooks/use-toast"

// For development mode when Supabase isn't configured
const DEVELOPMENT_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Development mode handling
      if (DEVELOPMENT_MODE) {
        console.log("Development mode: Simulating password reset for", email)

        // Simulate a successful password reset request
        setTimeout(() => {
          setIsSubmitted(true)
          toast({
            title: "Development Mode",
            description: "Password reset email would be sent in production.",
          })
        }, 1000)

        return
      }

      // Production mode with Supabase
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) {
        console.error("Error requesting password reset:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to send reset email. Please try again.",
          variant: "destructive",
        })
        return
      }

      // Success
      setIsSubmitted(true)
      toast({
        title: "Email sent",
        description: "Check your inbox for the password reset link.",
      })
    } catch (error) {
      console.error("Unexpected error during password reset request:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Heart className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold">MindfulCare</span>
        </Link>
        <Card className="w-full max-w-md">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password.
                </CardDescription>
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
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send reset link"}
                </Button>
                <div className="text-center text-sm">
                  <Link href="/login" className="text-teal-600 hover:underline">
                    Back to login
                  </Link>
                </div>
                {DEVELOPMENT_MODE && (
                  <div className="text-center text-xs text-gray-500 mt-4 p-2 bg-gray-100 rounded-md">
                    <p>Development Mode Active</p>
                    <p>Password reset simulation only</p>
                  </div>
                )}
              </CardFooter>
            </form>
          ) : (
            <>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Check your email</CardTitle>
                <CardDescription>
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">
                  Click the link in the email to reset your password. If you don't see the email, check your spam
                  folder.
                </p>
                <p className="text-sm text-gray-600">
                  The link will expire in 24 hours. If you need a new link, you can request another one.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => {
                    setIsSubmitted(false)
                    setEmail("")
                  }}
                >
                  Request another link
                </Button>
                <div className="text-center text-sm">
                  <Link href="/login" className="text-teal-600 hover:underline">
                    Back to login
                  </Link>
                </div>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
