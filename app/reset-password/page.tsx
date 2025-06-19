"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResetComplete, setIsResetComplete] = useState(false)
  const [hasResetCode, setHasResetCode] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  // Check if we have a reset token in the URL
  useEffect(() => {
    const checkResetToken = async () => {
      // In development mode, always assume we have a reset code
      if (DEVELOPMENT_MODE) {
        setHasResetCode(true)
        return
      }

      // In production, check for the actual hash parameter
      const hash = window.location.hash
      if (hash && hash.includes("type=recovery")) {
        setHasResetCode(true)

        // Handle the password recovery
        const { error } = await supabase.auth.refreshSession()
        if (error) {
          console.error("Error refreshing session:", error)
          toast({
            title: "Invalid or expired link",
            description: "Please request a new password reset link.",
            variant: "destructive",
          })
          router.push("/forgot-password")
        }
      } else {
        // No reset code found
        toast({
          title: "Invalid reset link",
          description: "Please request a new password reset link.",
          variant: "destructive",
        })
        router.push("/forgot-password")
      }
    }

    checkResetToken()
  }, [router, supabase.auth])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate passwords
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 6) {
      toast({
        title: "Password too short",
        description: "Your password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Development mode handling
      if (DEVELOPMENT_MODE) {
        console.log("Development mode: Simulating password reset")

        // Simulate a successful password reset
        setTimeout(() => {
          setIsResetComplete(true)
          toast({
            title: "Development Mode",
            description: "Password would be reset in production.",
          })
        }, 1000)

        return
      }

      // Production mode with Supabase
      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        console.error("Error resetting password:", error)
        toast({
          title: "Error",
          description: error.message || "Failed to reset password. Please try again.",
          variant: "destructive",
        })
        return
      }

      // Success
      setIsResetComplete(true)
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now log in with your new password.",
      })
    } catch (error) {
      console.error("Unexpected error during password reset:", error)
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!hasResetCode && !DEVELOPMENT_MODE) {
    return null // Don't render anything while checking the reset code
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <Link href="/" className="flex items-center gap-2 mb-8">
          <Heart className="h-6 w-6 text-teal-600" />
          <span className="text-xl font-bold">MindfulCare</span>
        </Link>
        <Card className="w-full max-w-md">
          {!isResetComplete ? (
            <form onSubmit={handleSubmit}>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
                <CardDescription>Enter your new password below.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset password"}
                </Button>
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
                <CardTitle className="text-2xl font-bold">Password reset successful</CardTitle>
                <CardDescription>Your password has been reset successfully.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-gray-600">You can now log in with your new password.</p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button className="w-full" onClick={() => router.push("/login")}>
                  Go to login
                </Button>
              </CardFooter>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
