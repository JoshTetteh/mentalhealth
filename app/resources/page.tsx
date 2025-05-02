import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Search,
  BookOpen,
  FileText,
  Video,
  Headphones,
  Phone,
  Download,
  ExternalLink,
  ArrowRight,
  Brain,
  Sparkles,
  Clock,
  Users,
} from "lucide-react"

export default function ResourcesPage() {
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
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link href="/therapists" className="text-sm font-medium hover:underline">
              Find Therapists
            </Link>
            <Link href="/resources" className="text-sm font-medium text-teal-600">
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
        <section className="w-full py-12 md:py-16 lg:py-20 bg-teal-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Mental Health Resources</h1>
              <p className="text-gray-500 md:text-xl/relaxed max-w-[700px]">
                Explore our collection of articles, guides, and tools to support your mental health journey.
              </p>
              <div className="w-full max-w-md relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input placeholder="Search resources..." className="pl-10 py-6 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Resources */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-bold mb-8">Featured Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Understanding Anxiety"
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>Understanding Anxiety</CardTitle>
                  <CardDescription>
                    Learn about the different types of anxiety disorders and effective coping strategies.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/resources/anxiety">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Depression: Signs and Support"
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>Depression: Signs and Support</CardTitle>
                  <CardDescription>
                    Recognize the symptoms of depression and discover ways to find support.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/resources/depression">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="overflow-hidden">
                <img
                  src="/placeholder.svg?height=200&width=400"
                  alt="Mindfulness Techniques"
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>Mindfulness Techniques</CardTitle>
                  <CardDescription>
                    Simple mindfulness practices you can incorporate into your daily routine.
                  </CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/resources/mindfulness">
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Resource Categories */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <Tabs defaultValue="articles" className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger value="articles" className="flex flex-col items-center gap-2 py-3">
                    <BookOpen className="h-5 w-5" />
                    <span>Articles</span>
                  </TabsTrigger>
                  <TabsTrigger value="guides" className="flex flex-col items-center gap-2 py-3">
                    <FileText className="h-5 w-5" />
                    <span>Guides</span>
                  </TabsTrigger>
                  <TabsTrigger value="videos" className="flex flex-col items-center gap-2 py-3">
                    <Video className="h-5 w-5" />
                    <span>Videos</span>
                  </TabsTrigger>
                  <TabsTrigger value="podcasts" className="flex flex-col items-center gap-2 py-3">
                    <Headphones className="h-5 w-5" />
                    <span>Podcasts</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="articles">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {articles.map((article, index) => (
                    <Card key={index} className="flex flex-col h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="mb-2">
                            {article.category}
                          </Badge>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{article.readTime} min read</span>
                          </div>
                        </div>
                        <CardTitle>{article.title}</CardTitle>
                        <CardDescription>{article.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-gray-500 text-sm">{article.excerpt}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="ghost" className="w-full" asChild>
                          <Link href={article.link}>
                            Read Full Article
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    View All Articles
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="guides">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {guides.map((guide, index) => (
                    <Card key={index} className="flex flex-col md:flex-row overflow-hidden">
                      <div className="md:w-1/3">
                        <img
                          src={guide.image || "/placeholder.svg"}
                          alt={guide.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 flex flex-col">
                        <CardHeader>
                          <Badge variant="outline" className="w-fit mb-2">
                            {guide.category}
                          </Badge>
                          <CardTitle>{guide.title}</CardTitle>
                          <CardDescription>{guide.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="mt-auto">
                          <Button className="w-full" asChild>
                            <Link href={guide.link}>
                              <Download className="mr-2 h-4 w-4" />
                              Download Guide
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    View All Guides
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="videos">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videos.map((video, index) => (
                    <Card key={index} className="overflow-hidden flex flex-col">
                      <div className="relative">
                        <img
                          src={video.thumbnail || "/placeholder.svg"}
                          alt={video.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-black bg-opacity-50 rounded-full p-3">
                            <Video className="h-8 w-8 text-white" />
                          </div>
                        </div>
                      </div>
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <Badge variant="outline" className="mb-2">
                            {video.category}
                          </Badge>
                          <div className="flex items-center text-gray-400 text-sm">
                            <Clock className="h-4 w-4 mr-1" />
                            <span>{video.duration}</span>
                          </div>
                        </div>
                        <CardTitle>{video.title}</CardTitle>
                        <CardDescription>{video.description}</CardDescription>
                      </CardHeader>
                      <CardFooter className="mt-auto">
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={video.link}>
                            Watch Video
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    View All Videos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="podcasts">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {podcasts.map((podcast, index) => (
                    <Card key={index} className="flex flex-col">
                      <CardHeader>
                        <div className="flex items-center gap-4">
                          <div className="bg-teal-100 rounded-lg p-3">
                            <Headphones className="h-6 w-6 text-teal-600" />
                          </div>
                          <div>
                            <CardTitle>{podcast.title}</CardTitle>
                            <CardDescription>
                              Episode {podcast.episode}: {podcast.episodeTitle}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-500">{podcast.description}</p>
                        <div className="flex items-center text-gray-400 text-sm mt-4">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{podcast.duration}</span>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" asChild>
                          <Link href={podcast.link}>
                            Listen Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    View All Podcasts
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Self-Help Tools */}
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold">Self-Help Tools</h2>
              <p className="text-gray-500 max-w-[700px]">
                Practical tools and exercises to support your mental wellbeing between therapy sessions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Brain className="h-6 w-6" />
                </div>
                <CardTitle className="mb-2">Mood Tracker</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-500 mb-4">
                    Track your daily mood patterns to identify triggers and monitor progress.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/tools/mood-tracker">Try It</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <CardTitle className="mb-2">Guided Meditation</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-500 mb-4">
                    Audio-guided meditations for stress reduction and mindfulness practice.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/tools/meditation">Try It</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <FileText className="h-6 w-6" />
                </div>
                <CardTitle className="mb-2">Thought Journal</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-500 mb-4">
                    Record and challenge negative thought patterns with CBT techniques.
                  </p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/tools/thought-journal">Try It</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="flex flex-col items-center text-center p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-teal-100 text-teal-600 mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <CardTitle className="mb-2">Sleep Diary</CardTitle>
                <CardContent className="p-0">
                  <p className="text-gray-500 mb-4">Monitor your sleep patterns and develop healthier sleep habits.</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/tools/sleep-diary">Try It</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Support Resources */}
        <section className="w-full py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-10">
              <h2 className="text-3xl font-bold">Crisis Support</h2>
              <p className="text-gray-500 max-w-[700px]">
                If you're experiencing a mental health crisis, please reach out to these resources for immediate
                support.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-teal-600" />
                    National Suicide Prevention Lifeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">24/7, free and confidential support for people in distress.</p>
                  <p className="text-xl font-bold text-teal-600">1-800-273-8255</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="https://suicidepreventionlifeline.org/" target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-teal-600" />
                    Crisis Text Line
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">Text-based crisis intervention service available 24/7.</p>
                  <p className="text-xl font-bold text-teal-600">Text HOME to 741741</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link href="https://www.crisistextline.org/" target="_blank" rel="noopener noreferrer">
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-teal-50 border-teal-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-teal-600" />
                    SAMHSA's National Helpline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-2">
                    Treatment referral and information service for individuals facing mental health or substance use
                    disorders.
                  </p>
                  <p className="text-xl font-bold text-teal-600">1-800-662-4357</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" asChild>
                    <Link
                      href="https://www.samhsa.gov/find-help/national-helpline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="bg-white border rounded-lg p-6 mt-8">
              <p className="text-center text-gray-500">
                <strong>Note:</strong> If you or someone you know is in immediate danger, please call emergency services
                (911 in the US) or go to your nearest emergency room.
              </p>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="w-full py-12 md:py-16 bg-teal-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="md:w-1/2">
                <h2 className="text-2xl font-bold mb-2">Stay Updated</h2>
                <p className="mb-4">
                  Subscribe to our newsletter to receive the latest mental health resources, articles, and tips directly
                  to your inbox.
                </p>
              </div>
              <div className="md:w-1/2 w-full">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input placeholder="Enter your email" className="bg-white text-gray-900" />
                  <Button className="bg-white text-teal-600 hover:bg-gray-100">Subscribe</Button>
                </div>
                <p className="text-sm mt-2">We respect your privacy. Unsubscribe at any time.</p>
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
            <p className="text-xs text-gray-500">© 2023 MindfulCare. All rights reserved.</p>
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

// Sample data for the resources
const articles = [
  {
    title: "Understanding the Link Between Sleep and Mental Health",
    description: "How sleep affects your mental wellbeing",
    excerpt:
      "Sleep and mental health are closely connected. Poor sleep can contribute to the development of mental health issues, while mental health conditions can make it harder to sleep well...",
    category: "Sleep",
    readTime: 5,
    link: "/resources/articles/sleep-mental-health",
  },
  {
    title: "Recognizing Signs of Burnout",
    description: "How to identify and address burnout before it becomes severe",
    excerpt:
      "Burnout is a state of chronic stress that leads to physical and emotional exhaustion, cynicism, detachment, and feelings of ineffectiveness. Learn to recognize the early warning signs...",
    category: "Stress Management",
    readTime: 7,
    link: "/resources/articles/burnout-signs",
  },
  {
    title: "Supporting a Loved One with Depression",
    description: "Practical ways to help someone experiencing depression",
    excerpt:
      "When someone you care about is depressed, it can be difficult to know how to help. This guide provides practical strategies for offering support while taking care of your own wellbeing...",
    category: "Depression",
    readTime: 8,
    link: "/resources/articles/supporting-depression",
  },
  {
    title: "The Benefits of Cognitive Behavioral Therapy",
    description: "How CBT works and what to expect",
    excerpt:
      "Cognitive Behavioral Therapy (CBT) is one of the most effective forms of psychotherapy. It focuses on identifying negative thought patterns and developing healthier alternatives...",
    category: "Therapy",
    readTime: 6,
    link: "/resources/articles/cbt-benefits",
  },
  {
    title: "Managing Social Anxiety in the Workplace",
    description: "Strategies for navigating work situations with social anxiety",
    excerpt:
      "Social anxiety can make workplace interactions challenging. This article offers practical techniques for managing anxiety during meetings, presentations, and everyday office interactions...",
    category: "Anxiety",
    readTime: 9,
    link: "/resources/articles/workplace-social-anxiety",
  },
  {
    title: "The Role of Exercise in Mental Health",
    description: "How physical activity impacts your mood and mental wellbeing",
    excerpt:
      "Regular exercise has been shown to reduce symptoms of depression and anxiety, improve sleep, and boost overall mood. Learn about the science behind exercise's mental health benefits...",
    category: "Wellness",
    readTime: 4,
    link: "/resources/articles/exercise-mental-health",
  },
]

const guides = [
  {
    title: "Complete Guide to Anxiety Management",
    description: "A comprehensive resource for understanding and managing anxiety disorders",
    category: "Anxiety",
    image: "/placeholder.svg?height=200&width=200",
    link: "/resources/guides/anxiety-management",
  },
  {
    title: "Mindfulness for Beginners",
    description: "Simple techniques to incorporate mindfulness into your daily routine",
    category: "Mindfulness",
    image: "/placeholder.svg?height=200&width=200",
    link: "/resources/guides/mindfulness-beginners",
  },
  {
    title: "Navigating Grief and Loss",
    description: "Understanding the grief process and healthy coping strategies",
    category: "Grief",
    image: "/placeholder.svg?height=200&width=200",
    link: "/resources/guides/grief-loss",
  },
  {
    title: "Building Healthy Relationships",
    description: "Tools for improving communication and establishing boundaries",
    category: "Relationships",
    image: "/placeholder.svg?height=200&width=200",
    link: "/resources/guides/healthy-relationships",
  },
]

const videos = [
  {
    title: "5-Minute Anxiety Relief Exercise",
    description: "A quick breathing technique to calm anxiety in the moment",
    category: "Anxiety",
    duration: "5:23",
    thumbnail: "/placeholder.svg?height=200&width=350",
    link: "/resources/videos/anxiety-relief",
  },
  {
    title: "Understanding Trauma Responses",
    description: "How trauma affects the brain and body",
    category: "Trauma",
    duration: "12:47",
    thumbnail: "/placeholder.svg?height=200&width=350",
    link: "/resources/videos/trauma-responses",
  },
  {
    title: "Guided Meditation for Sleep",
    description: "A calming meditation to help you fall asleep",
    category: "Sleep",
    duration: "18:05",
    thumbnail: "/placeholder.svg?height=200&width=350",
    link: "/resources/videos/sleep-meditation",
  },
]

const podcasts = [
  {
    title: "Mental Health Matters",
    episode: "42",
    episodeTitle: "Breaking the Stigma Around Therapy",
    description: "A discussion about why seeking therapy is a sign of strength, not weakness",
    duration: "38 min",
    link: "/resources/podcasts/mental-health-matters-42",
  },
  {
    title: "The Mindful Minute",
    episode: "15",
    episodeTitle: "Practicing Self-Compassion",
    description: "Learn how to be kinder to yourself during difficult times",
    duration: "22 min",
    link: "/resources/podcasts/mindful-minute-15",
  },
  {
    title: "Psychology Today",
    episode: "87",
    episodeTitle: "The Science of Happiness",
    description: "Research-backed strategies for increasing happiness and life satisfaction",
    duration: "45 min",
    link: "/resources/podcasts/psychology-today-87",
  },
  {
    title: "Therapy Thoughts",
    episode: "29",
    episodeTitle: "Managing Pandemic Anxiety",
    description: "Coping strategies for the unique mental health challenges of the pandemic era",
    duration: "32 min",
    link: "/resources/podcasts/therapy-thoughts-29",
  },
]
