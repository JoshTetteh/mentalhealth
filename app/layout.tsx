import type React from "react"
import type { Metadata } from "next"
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { sign } from "crypto"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MindfulCare - Mental Health Support",
  description: "Book appointments with therapists and get the support you need",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
        <html lang="en">
           <head>
          {/* ✅ Zoom Web SDK CSS */}
          <link
            rel="stylesheet"
            href="https://source.zoom.us/2.19.0/css/bootstrap.css"
          />
          <link
            rel="stylesheet"
            href="https://source.zoom.us/2.19.0/css/react-select.css"
          />
        </head>
          <body className={`min-h-screen bg-background font-sans antialiased ${inter.className}`}>
          <header className="flex justify-end items-center p-4 gap-4 h-16">
            <SignedOut>
              <SignInButton />
              <SignUpButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </header>
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}