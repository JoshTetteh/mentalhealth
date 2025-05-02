"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, FileText, UserCheck } from "lucide-react"
import { Overview } from "./components/overview"
import { RecentAppointments } from "./components/recent-appointments"

export default function AdminDashboard() {
  return (
    <main className="flex-1 p-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <p className="text-xs text-gray-500">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Active Therapists</CardTitle>
              <UserCheck className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">56</div>
              <p className="text-xs text-gray-500">+3 new this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Appointments Today</CardTitle>
              <Calendar className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-gray-500">8 virtual, 34 in-person</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Surveys</CardTitle>
              <FileText className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">867</div>
              <p className="text-xs text-gray-500">+24% from last month</p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Appointment Overview</CardTitle>
              <CardDescription>Appointment statistics for the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
              <CardDescription>Latest scheduled appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentAppointments />
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Disorders</CardTitle>
              <CardDescription>Most common diagnoses in the past 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Anxiety Disorders</div>
                  </div>
                  <div className="font-medium">32%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: "32%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Depression</div>
                  </div>
                  <div className="font-medium">28%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: "28%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">ADHD</div>
                  </div>
                  <div className="font-medium">15%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: "15%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">PTSD</div>
                  </div>
                  <div className="font-medium">12%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: "12%" }}></div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="font-medium">Bipolar Disorder</div>
                  </div>
                  <div className="font-medium">8%</div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100">
                  <div className="h-2 rounded-full bg-teal-600" style={{ width: "8%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Appointment Types</CardTitle>
              <CardDescription>Distribution of virtual vs in-person appointments</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center p-6">
              <div className="flex flex-col items-center gap-4">
                <div className="flex w-full items-center gap-8">
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-teal-600">
                      <span className="text-xl font-bold">65%</span>
                    </div>
                    <span className="text-sm font-medium">Virtual</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-gray-300">
                      <span className="text-xl font-bold">35%</span>
                    </div>
                    <span className="text-sm font-medium">In-Person</span>
                  </div>
                </div>
                <div className="text-center text-sm text-gray-500">
                  Virtual appointments have increased by 15% compared to the previous quarter
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
