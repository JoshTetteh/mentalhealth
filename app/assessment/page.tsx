"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, Heart } from "lucide-react"

const questions = [
  {
    id: 1,
    question: "Over the past 2 weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 2,
    question: "Over the past 2 weeks, how often have you had little interest or pleasure in doing things?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 3,
    question: "Over the past 2 weeks, how often have you had trouble falling or staying asleep, or sleeping too much?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 4,
    question: "Over the past 2 weeks, how often have you felt tired or had little energy?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 5,
    question: "Over the past 2 weeks, how often have you had poor appetite or overeating?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 6,
    question:
      "Over the past 2 weeks, how often have you felt bad about yourself — or that you are a failure or have let yourself or your family down?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 7,
    question:
      "Over the past 2 weeks, how often have you had trouble concentrating on things, such as reading the newspaper or watching television?",
    options: [
      { value: "0", label: "Not at all" },
      { value: "1", label: "Several days" },
      { value: "2", label: "More than half the days" },
      { value: "3", label: "Nearly every day" },
    ],
  },
  {
    id: 8,
    question: "Is there anything specific you'd like to discuss with a therapist?",
    textArea: true,
  },
  {
    id: 9,
    question: "Do you prefer in-person or virtual therapy sessions?",
    options: [
      { value: "in-person", label: "In-person sessions" },
      { value: "virtual", label: "Virtual sessions" },
      { value: "no-preference", label: "No preference" },
    ],
  },
  {
    id: 10,
    question: "Have you been to therapy before?",
    options: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
]

export default function AssessmentPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [completed, setCompleted] = useState(false)

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setCompleted(true)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleAnswerChange = (value: string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value,
    })
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindfulCare</span>
          </Link>
        </div>
      </header>
      <main className="flex-1 container max-w-3xl py-12">
        {!completed ? (
          <Card>
            <CardHeader>
              <CardTitle>Mental Health Assessment</CardTitle>
              <CardDescription>
                This assessment will help us understand your needs and match you with the right therapist.
              </CardDescription>
              <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <div className="text-lg">{questions[currentQuestion].question}</div>
              {questions[currentQuestion].textArea ? (
                <Textarea
                  placeholder="Type your answer here..."
                  value={answers[questions[currentQuestion].id] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  className="min-h-[150px]"
                />
              ) : (
                <RadioGroup
                  value={answers[questions[currentQuestion].id] || ""}
                  onValueChange={handleAnswerChange}
                  className="space-y-3"
                >
                  {questions[currentQuestion].options?.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label htmlFor={option.value} className="flex-1 cursor-pointer font-normal">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNext} disabled={!answers[questions[currentQuestion].id]}>
                {currentQuestion === questions.length - 1 ? "Complete" : "Next"}
                {currentQuestion !== questions.length - 1 && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Assessment Complete</CardTitle>
              <CardDescription>
                Thank you for completing the assessment. Based on your responses, we can now help you find the right
                therapist.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Your responses indicate that you may benefit from speaking with a therapist who specializes in:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Depression and mood disorders</li>
                <li>Anxiety management</li>
                <li>Sleep issues</li>
              </ul>
              <p>
                We recommend booking an appointment with a therapist to discuss your concerns and develop a personalized
                treatment plan.
              </p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/assessment">Retake Assessment</Link>
              </Button>
              <Button asChild>
                <Link href="/therapists">Find Therapists</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}
