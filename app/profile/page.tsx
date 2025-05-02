"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Heart, User, Bell, Shield, CreditCard, Calendar, FileText } from "lucide-react"

export default function ProfilePage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: true,
    sms: true,
    appointments: true,
    reminders: true,
    updates: false,
  })

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-teal-600" />
            <span className="text-xl font-bold">MindfulCare</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:underline">
              Dashboard
            </Link>
            <Link href="/therapists" className="text-sm font-medium hover:underline">
              Find Therapists
            </Link>
            <Link href="/resources" className="text-sm font-medium hover:underline">
              Resources
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src="/placeholder.svg?height=100&width=100" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold">John Doe</h2>
                  <p className="text-gray-500 mb-4">john.doe@example.com</p>
                  <div className="w-full space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Personal Information
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy & Security
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="mr-2 h-4 w-4" />
                      Billing & Payments
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Calendar className="mr-2 h-4 w-4" />
                      Appointments
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <FileText className="mr-2 h-4 w-4" />
                      Medical Records
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-3/4">
            <h1 className="text-3xl font-bold mb-6">My Profile</h1>
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="security">Privacy & Security</TabsTrigger>
                <TabsTrigger value="billing">Billing</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and preferences</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue="john.doe@example.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" defaultValue="1985-06-15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select id="gender" className="w-full rounded-md border border-input bg-background px-3 py-2">
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="non-binary">Non-binary</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" defaultValue="123 Main St" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" defaultValue="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" defaultValue="NY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" defaultValue="10001" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="emergency-contact">Emergency Contact</Label>
                      <Input id="emergency-contact" defaultValue="Jane Doe (Wife) - (555) 987-6543" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">About Me (Optional)</Label>
                      <Textarea
                        id="bio"
                        placeholder="Share any information that might help your therapist understand you better"
                        className="min-h-[100px]"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Changes</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications">
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Manage how you receive notifications and reminders</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Channels</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via email</p>
                        </div>
                        <Switch
                          checked={notificationsEnabled.email}
                          onCheckedChange={(checked) =>
                            setNotificationsEnabled({ ...notificationsEnabled, email: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-gray-500">Receive notifications via text message</p>
                        </div>
                        <Switch
                          checked={notificationsEnabled.sms}
                          onCheckedChange={(checked) =>
                            setNotificationsEnabled({ ...notificationsEnabled, sms: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Notification Types</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Appointment Confirmations</p>
                          <p className="text-sm text-gray-500">
                            Receive notifications when appointments are booked or changed
                          </p>
                        </div>
                        <Switch
                          checked={notificationsEnabled.appointments}
                          onCheckedChange={(checked) =>
                            setNotificationsEnabled({ ...notificationsEnabled, appointments: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Appointment Reminders</p>
                          <p className="text-sm text-gray-500">Receive reminders before your scheduled appointments</p>
                        </div>
                        <Switch
                          checked={notificationsEnabled.reminders}
                          onCheckedChange={(checked) =>
                            setNotificationsEnabled({ ...notificationsEnabled, reminders: checked })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Platform Updates</p>
                          <p className="text-sm text-gray-500">Receive updates about new features and services</p>
                        </div>
                        <Switch
                          checked={notificationsEnabled.updates}
                          onCheckedChange={(checked) =>
                            setNotificationsEnabled({ ...notificationsEnabled, updates: checked })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Reminder Timing</h3>
                      <div className="space-y-2">
                        <Label htmlFor="reminder-time">Appointment Reminder Time</Label>
                        <select
                          id="reminder-time"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                        >
                          <option value="24h">24 hours before</option>
                          <option value="12h">12 hours before</option>
                          <option value="6h">6 hours before</option>
                          <option value="2h">2 hours before</option>
                          <option value="1h">1 hour before</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="security">
                <Card>
                  <CardHeader>
                    <CardTitle>Privacy & Security</CardTitle>
                    <CardDescription>Manage your account security and privacy settings</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Password</h3>
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button className="mt-2">Update Password</Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Enable Two-Factor Authentication</p>
                          <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Privacy Settings</h3>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Share Progress with Therapist</p>
                          <p className="text-sm text-gray-500">
                            Allow your therapist to view your progress and assessment results
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Share Data for Research</p>
                          <p className="text-sm text-gray-500">
                            Allow anonymized data to be used for mental health research
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Account Actions</h3>
                      <div className="flex flex-col gap-2">
                        <Button variant="outline">Download My Data</Button>
                        <Button variant="outline" className="text-red-600 hover:text-red-600 hover:bg-red-50">
                          Deactivate Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing">
                <Card>
                  <CardHeader>
                    <CardTitle>Billing & Payments</CardTitle>
                    <CardDescription>Manage your payment methods and billing information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Payment Methods</h3>
                      <div className="border rounded-md p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-gray-100 p-2 rounded-md">
                            <CreditCard className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">Visa ending in 4242</p>
                            <p className="text-sm text-gray-500">Expires 12/2025</p>
                          </div>
                        </div>
                        <Badge>Default</Badge>
                      </div>
                      <Button variant="outline">Add Payment Method</Button>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Insurance Information</h3>
                      <div className="space-y-2">
                        <Label htmlFor="insurance-provider">Insurance Provider</Label>
                        <Input id="insurance-provider" defaultValue="Blue Cross Blue Shield" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="insurance-id">Insurance ID</Label>
                        <Input id="insurance-id" defaultValue="XYZ123456789" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="group-number">Group Number</Label>
                        <Input id="group-number" defaultValue="GRP987654321" />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Billing Address</h3>
                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Address</Label>
                        <Input id="billing-address" defaultValue="123 Main St" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="billing-city">City</Label>
                          <Input id="billing-city" defaultValue="New York" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-state">State</Label>
                          <Input id="billing-state" defaultValue="NY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-zip">ZIP Code</Label>
                          <Input id="billing-zip" defaultValue="10001" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Billing History</h3>
                      <div className="border rounded-md overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Description
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Apr 5, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                Therapy Session - Dr. Sarah Johnson
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">$150.00</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                  Paid
                                </Badge>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Mar 29, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                Therapy Session - Dr. Sarah Johnson
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">$150.00</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                  Paid
                                </Badge>
                              </td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">Mar 22, 2025</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                Therapy Session - Dr. Sarah Johnson
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">$150.00</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
                                  Paid
                                </Badge>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <Button variant="outline">View All Transactions</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
