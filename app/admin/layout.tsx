import type React from "react"
import Link from "next/link"
import { Heart, Users, Activity, Brain, Building, Calendar, FileText, UserCheck, UserPlus } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindMatters Admin</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-sm font-medium hover:underline md:hidden">
              Dashboard
            </Link>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-gray-50 hidden md:block">
          <div className="flex flex-col gap-2 p-4">
            <Link href="/admin" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Activity className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Users className="h-5 w-5" />
              <span>Patients</span>
            </Link>
            <Link href="/admin/caregivers" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <UserPlus className="h-5 w-5" />
              <span>Caregivers</span>
            </Link>
            <Link href="/admin/therapists" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <UserCheck className="h-5 w-5" />
              <span>Therapists</span>
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
            <Link href="/admin/hospitals" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Building className="h-5 w-5" />
              <span>Hospitals</span>
            </Link>
            <Link href="/admin/disorders" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <Brain className="h-5 w-5" />
              <span>Disorders</span>
            </Link>
            <Link href="/admin/surveys" className="flex items-center gap-2 rounded-md px-3 py-2 hover:bg-gray-100">
              <FileText className="h-5 w-5" />
              <span>Surveys</span>
            </Link>
          </div>
        </aside>
        {children}
      </div>
    </div>
  )
}
