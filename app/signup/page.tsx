"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { toast } from "@/hooks/use-toast"

// For development mode when Supabase isn't configured
const DEVELOPMENT_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://your-project.supabase.co"

export default function SignupPage() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState<"patient" | "caregiver">("patient")
  const [isLoading, setIsLoading] = useState(false)

  const { signUp } = useAuth()
  const router = useRouter()

  // Update the handleSubmit function to better handle errors and improve UX
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

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
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      console.log("Starting sign up process...")

      // Prepare user metadata
      const userData = {
        full_name: fullName,
        user_type: userType,
      }

      // Sign up the user
      const { error, data } = await signUp(email, password, userData)

      console.log("Sign up response:", { error, data })

      if (error) {
        console.error("Error during sign up:", error)
        toast({
          title: "Error signing up",
          description: error.message || "An error occurred during sign up",
          variant: "destructive",
        })
        return
      }

      // Development mode - simulate profile creation
      if (DEVELOPMENT_MODE) {
        console.log("Development mode: Simulating profile creation")

        toast({
          title: "Account created",
          description: "Development mode: Account created successfully",
        })

        // Redirect to login page
        router.push("/login")
        return
      }

      // Handle successful sign-up
      if (data.user) {
        console.log("User created successfully:", data.user)

        toast({
          title: "Account created",
          description: "Please check your email to verify your account.",
        })

        // Redirect to login page
        router.push("/login")
      } else {
        console.warn("User created but user object is null")

        toast({
          title: "Account created",
          description:
            "Your account was created, but we couldn't retrieve your user information. Please try logging in.",
        })

        router.push("/login")
      }
    } catch (error) {
      console.error("Unexpected error during sign up:", error)

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
          <form onSubmit={handleSubmit}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
              <CardDescription>Enter your information to create an account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
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
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>I am a:</Label>
                <RadioGroup
                  value={userType}
                  onValueChange={(value: "patient" | "caregiver") => setUserType(value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="patient" id="patient" />
                    <Label htmlFor="patient" className="font-normal">
                      Patient seeking therapy
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="caregiver" id="caregiver" />
                    <Label htmlFor="caregiver" className="font-normal">
                      Caregiver helping someone
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="text-teal-600 hover:underline">
                  Log in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
