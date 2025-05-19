"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Heart, User, Bell, Shield, CreditCard, Calendar, FileText } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (make sure you have your URL and Key in environment variables)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ProfilePage() {
  const [profileData, setProfileData] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState({
    email: false, // Default values, will be updated from database
    sms: false,
    appointments: false,
    reminders: false,
    updates: false,
  });

  useEffect(() => {
    // Fetch user profile data from Supabase on component mount
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from("profiles") // Replace "profiles" with your actual table name
          .select("*")
          .eq("id", user.id) // Assuming you have a user ID column
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        } else if (data) {
          setProfileData(data);
          // Assuming notification preferences are stored in a 'notifications' JSON column
          if (data.notifications) {
            setNotificationsEnabled(data.notifications);
          } else {
            // If not in a single column, fetch individual boolean columns
            setNotificationsEnabled({
              email: data.email_notifications ?? false, // Replace with your actual column names
              sms: data.sms_notifications ?? false,
              appointments: data.appointment_notifications ?? false,
              reminders: data.reminder_notifications ?? false,
              updates: data.update_notifications ?? false,
            });
          }
        }
      }
    }

    fetchProfile();
  }, []);

  // Function to handle saving changes to personal information
  async function handleSavePersonalInformation(event) {
    event.preventDefault();
    if (!profileData?.id) return;

    const firstName = event.target.firstName.value;
    const lastName = event.target.lastName.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const dob = event.target.dob.value;
    const gender = event.target.gender.value;
    const address = event.target.address.value;
    const city = event.target.city.value;
    const state = event.target.state.value;
    const zip = event.target.zip.value;
    const emergencyContact = event.target.emergencyContact.value;
    const bio = event.target.bio.value;

    const { data, error } = await supabase
      .from("profiles") // Replace "profiles" with your actual table name
      .update({
        first_name: firstName, // Replace with your actual column names
        last_name: lastName,
        email: email,
        phone_number: phone,
        date_of_birth: dob,
        gender: gender,
        address: address,
        city: city,
        state: state,
        zip_code: zip,
        emergency_contact: emergencyContact,
        bio: bio,
      })
      .eq("id", profileData.id);

    if (error) {
      console.error("Error updating profile:", error);
      // Optionally display an error message to the user
    } else {
      console.log("Profile updated successfully!");
      // Optionally display a success message to the user
      setProfileData({ ...profileData, firstName, lastName, email, phone, dob, gender, address, city, state, zip, emergencyContact, bio });
    }
  }

  // Function to handle saving notification preferences
  async function handleSaveNotifications() {
    if (!profileData?.id) return;

    const { error } = await supabase
      .from("profiles") // Replace "profiles" with your actual table name
      .update({
        // Assuming you store notification preferences in a 'notifications' JSON column
        notifications: notificationsEnabled,
        // If you have individual boolean columns, update them like this:
        // email_notifications: notificationsEnabled.email,
        // sms_notifications: notificationsEnabled.sms,
        // ...
      })
      .eq("id", profileData.id);

    if (error) {
      console.error("Error updating notifications:", error);
      // Optionally display an error message
    } else {
      console.log("Notification preferences updated!");
      // Optionally display a success message
    }
  }

  if (!profileData) {
    return <div>Loading profile...</div>; // Or a more informative loading state
  }

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
                    <AvatarImage src={profileData.avatar_url || "/placeholder.svg?height=100&width=100"} alt="User" /> {/* Assuming you have an avatar_url column */}
                    <AvatarFallback>{profileData.first_name?.[0]}{profileData.last_name?.[0]}</AvatarFallback> {/* Generate initials */}
                  </Avatar>
                  <h2 className="text-xl font-bold">{profileData.first_name} {profileData.last_name}</h2>
                  <p className="text-gray-500 mb-4">{profileData.email}</p>
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
                    <form onSubmit={handleSavePersonalInformation} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" name="firstName" defaultValue={profileData.first_name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" name="lastName" defaultValue={profileData.last_name} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" defaultValue={profileData.email} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" name="phone" defaultValue={profileData.phone_number} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" name="dob" defaultValue={profileData.date_of_birth} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <select id="gender" name="gender" className="w-full rounded-md border border-input bg-background px-3 py-2" defaultValue={profileData.gender}>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="non-binary">Non-binary</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>

                      <div className="space-y-2 col-span-full">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" name="address" defaultValue={profileData.address} />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 col-span-full">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input id="city" name="city" defaultValue={profileData.city} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input id="state" name="state" defaultValue={profileData.state} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="zip">ZIP Code</Label>
                          <Input id="zip" name="zip" defaultValue={profileData.zip_code} />
                        </div>
                      </div>

                      <div className="space-y-2 col-span-full">
                        <Label htmlFor="emergency-contact">Emergency Contact</Label>
                        <Input id="emergency-contact" name="emergencyContact" defaultValue={profileData.emergency_contact} />
                      </div>

                      <div className="space-y-2 col-span-full">
                        <Label htmlFor="bio">About Me (Optional)</Label>
                        <Textarea
                          id="bio"
                          name="bio"
                          placeholder="Share any information that might help your therapist understand you better"
                          className="min-h-[100px]"
                          defaultValue={profileData.bio}
                        />
                      </div>
                      <CardFooter className="flex justify-end col-span-full">
                        <Button type="submit">Save Changes</Button>
                      </CardFooter>
                    </form>
                  </CardContent>
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
                      <h3 className="text-lg font-medium">Notification