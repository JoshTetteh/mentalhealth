import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Calendar, CheckCircle, Award, Shield, Lightbulb, ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindfulCare</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link href="/about" className="text-sm font-medium text-teal-600">
              About
            </Link>
            <Link href="/therapists" className="text-sm font-medium hover:underline">
              Find Therapists
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:underline">
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log in</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Our Mission: Mental Health Support for Everyone
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At MindfulCare, we're dedicated to making mental health care accessible, affordable, and stigma-free.
                  We believe everyone deserves quality mental health support when they need it most.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="/placeholder.svg?height=400&width=500"
                  alt="MindfulCare team"
                  className="rounded-lg object-cover"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Story</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The journey to creating MindfulCare began with a simple observation: too many people struggle to
                  access mental health care.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8 space-y-8">
              <p className="text-gray-700">
                MindfulCare was founded in 2023 by a team of mental health professionals, technologists, and individuals
                with lived experience of mental health challenges. We recognized that despite growing awareness of
                mental health issues, many barriers still prevent people from getting the help they need.
              </p>
              <p className="text-gray-700">
                Our founders experienced firsthand the challenges of finding the right therapist, navigating insurance,
                and coordinating care for loved ones. They envisioned a platform that would simplify this process and
                make mental health care more accessible to everyone.
              </p>
              <p className="text-gray-700">
                Today, MindfulCare connects thousands of individuals with licensed therapists for both virtual and
                in-person sessions. Our comprehensive assessment tools help match patients with the right care
                providers, while our caregiver support features ensure that those helping loved ones have the resources
                they need.
              </p>
              <p className="text-gray-700">
                We're committed to breaking down barriers to mental health care and creating a world where everyone can
                access the support they need to thrive.
              </p>
            </div>
          </div>
        </section>

        {/* Our Values Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Values</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  The principles that guide everything we do at MindfulCare.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Heart className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Compassion</h3>
                <CardContent className="p-0">
                  <p className="text-gray-500">
                    We approach every interaction with empathy and understanding, recognizing that each person's mental
                    health journey is unique.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Trust</h3>
                <CardContent className="p-0">
                  <p className="text-gray-500">
                    We maintain the highest standards of privacy, security, and ethical practice to ensure our users
                    feel safe and protected.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <CardContent className="p-0">
                  <p className="text-gray-500">
                    We're committed to providing the highest quality care through rigorous vetting of therapists and
                    continuous improvement of our platform.
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Lightbulb className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <CardContent className="p-0">
                  <p className="text-gray-500">
                    We continuously explore new ways to leverage technology to make mental health care more accessible,
                    effective, and personalized.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How MindfulCare Works</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to connect with the right mental health professional.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">1. Complete Assessment</h3>
                <p className="text-gray-500">
                  Take our comprehensive mental health assessment to help identify your needs and match you with the
                  right therapist.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Users className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">2. Find Your Therapist</h3>
                <p className="text-gray-500">
                  Browse therapists based on your assessment results, specialties, availability, and session type
                  preferences.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">3. Book Appointments</h3>
                <p className="text-gray-500">
                  Schedule virtual or in-person sessions at times that work for you. Caregivers can also book on behalf
                  of patients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Team</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Meet the dedicated professionals behind MindfulCare.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Dr. Emily Chen"
                  className="rounded-full object-cover mb-4"
                  width={150}
                  height={150}
                />
                <h3 className="text-xl font-bold">Dr. Emily Chen</h3>
                <p className="text-teal-600 mb-2">Co-Founder & Chief Medical Officer</p>
                <p className="text-gray-500">
                  Board-certified psychiatrist with 15+ years of experience in mental health care. Passionate about
                  making quality care accessible to all.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Michael Johnson"
                  className="rounded-full object-cover mb-4"
                  width={150}
                  height={150}
                />
                <h3 className="text-xl font-bold">Michael Johnson</h3>
                <p className="text-teal-600 mb-2">Co-Founder & CEO</p>
                <p className="text-gray-500">
                  Former tech executive who experienced firsthand the challenges of finding mental health support for a
                  family member. Committed to transforming access to care.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <img
                  src="/placeholder.svg?height=150&width=150"
                  alt="Dr. Sarah Osei"
                  className="rounded-full object-cover mb-4"
                  width={150}
                  height={150}
                />
                <h3 className="text-xl font-bold">Dr. Sarah Osei</h3>
                <p className="text-teal-600 mb-2">Clinical Director</p>
                <p className="text-gray-500">
                  Clinical psychologist specializing in evidence-based therapies. Leads our therapist vetting process
                  and clinical quality initiatives.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-8">
              <Button variant="outline">
                Meet the Full Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Our Impact</h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Making a difference in mental health care access and outcomes.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">10,000+</div>
                <p className="text-gray-700">Patients connected with therapists</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">500+</div>
                <p className="text-gray-700">Licensed therapists on our platform</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl font-bold text-teal-600 mb-2">92%</div>
                <p className="text-gray-700">Patient satisfaction rate</p>
              </div>
            </div>
            <div className="mt-12 bg-teal-50 rounded-lg p-8">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="md:w-1/2">
                  <h3 className="text-2xl font-bold mb-4">Community Initiatives</h3>
                  <p className="text-gray-700 mb-4">
                    Beyond our platform, we're committed to advancing mental health awareness and access in underserved
                    communities.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                      <span>Free mental health workshops in schools and community centers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                      <span>Scholarship program providing free therapy to those in need</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-teal-600 mt-0.5" />
                      <span>Partnerships with local organizations to expand mental health resources</span>
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/2">
                  <img
                    src="/placeholder.svg?height=300&width=400"
                    alt="Community workshop"
                    className="rounded-lg object-cover"
                    width={400}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-teal-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Start Your Mental Health Journey?
                </h2>
                <p className="max-w-[900px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Take the first step toward better mental health today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="w-full min-[400px]:w-auto bg-white text-teal-600 hover:bg-gray-100">
                    Create an Account
                  </Button>
                </Link>
                <Link href="/assessment">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full min-[400px]:w-auto border-white text-white hover:bg-teal-700"
                  >
                    Take Assessment
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:gap-8">
          <div className="flex flex-col gap-2 md:gap-4 md:flex-1">
            <div className="flex items-center gap-2">
              <Heart className="h-6 w-6 text-teal-600" />
              <span className="text-xl font-bold">MindfulCare</span>
            </div>
            <p className="text-sm text-gray-500">Connecting you with mental health support when you need it most.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:flex-1">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Platform</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/about" className="text-gray-500 hover:underline">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/therapists" className="text-gray-500 hover:underline">
                    Find Therapists
                  </Link>
                </li>
                <li>
                  <Link href="/assessment" className="text-gray-500 hover:underline">
                    Assessment
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/resources" className="text-gray-500 hover:underline">
                    Mental Health Resources
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="text-gray-500 hover:underline">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-500 hover:underline">
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/privacy" className="text-gray-500 hover:underline">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-500 hover:underline">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-500 hover:underline">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-xs text-gray-500">© 2025 MindfulCare. All rights reserved.</p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-900">
                <span className="sr-only">Facebook</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
