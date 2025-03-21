"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Upload } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SkillSelector } from "@/components/skill-selector"

export default function Profile() {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const [activeTab, setActiveTab] = useState("profile")
  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [teachSkills, setTeachSkills] = useState<string[]>([])
  const [learnSkills, setLearnSkills] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!session) {
      router.push("/login")
      return
    }

    const fetchProfile = async () => {
      try {
        // In a real app, we would fetch the user's profile from the database
        // For now, we'll use mock data
        setFullName("John Doe")
        setUsername("johndoe")
        setBio("I'm a software developer with a passion for teaching and learning new skills.")
        setLocation("New York, NY")
        setTeachSkills(["Web Development", "JavaScript", "React"])
        setLearnSkills(["Photography", "Spanish", "Guitar"])
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching profile:", error)
        setError("Failed to load profile")
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [session, router, supabase])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      // In a real app, we would update the user's profile in the database
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSaving(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("Failed to update profile")
      setIsSaving(false)
    }
  }

  const handleSkillsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setError(null)

    try {
      // In a real app, we would update the user's skills in the database
      // For now, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setIsSaving(false)
    } catch (error) {
      console.error("Error updating skills:", error)
      setError("Failed to update skills")
      setIsSaving(false)
    }
  }

  if (!session || isLoading) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt={fullName} />
                    <AvatarFallback>{fullName.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full h-8 w-8">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="text-xl font-bold">{fullName}</h2>
                <p className="text-muted-foreground">@{username}</p>
                <p className="text-sm text-muted-foreground mt-1">{location}</p>

                <div className="w-full mt-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Skills I can teach</h3>
                      <div className="flex flex-wrap gap-2">
                        {teachSkills.map((skill) => (
                          <Badge key={skill} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium mb-2">Skills I want to learn</h3>
                      <div className="flex flex-wrap gap-2">
                        {learnSkills.map((skill) => (
                          <Badge key={skill} variant="outline">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="profile">Profile Information</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>
            <TabsContent value="profile">
              <Card>
                <CardHeader>
                  <CardTitle>Edit Profile</CardTitle>
                  <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="skills">
              <Card>
                <CardHeader>
                  <CardTitle>Manage Skills</CardTitle>
                  <CardDescription>Update the skills you can teach and want to learn</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSkillsUpdate} className="space-y-6">
                    {error && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                      </Alert>
                    )}
                    <div className="space-y-4">
                      <Label>Skills You Can Teach</Label>
                      <SkillSelector
                        selectedSkills={teachSkills}
                        setSelectedSkills={setTeachSkills}
                        placeholder="Select skills you can teach"
                      />
                      <p className="text-sm text-muted-foreground">
                        Select skills you're proficient in and would be comfortable teaching to others
                      </p>
                    </div>
                    <div className="space-y-4">
                      <Label>Skills You Want to Learn</Label>
                      <SkillSelector
                        selectedSkills={learnSkills}
                        setSelectedSkills={setLearnSkills}
                        placeholder="Select skills you want to learn"
                      />
                      <p className="text-sm text-muted-foreground">
                        Select skills you're interested in learning from others
                      </p>
                    </div>
                    <Button type="submit" className="w-full" disabled={isSaving}>
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

