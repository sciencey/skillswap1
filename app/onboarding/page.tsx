"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, ArrowRight } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillSelector } from "@/components/skill-selector"

export default function Onboarding() {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const [activeTab, setActiveTab] = useState("profile")
  const [fullName, setFullName] = useState("")
  const [bio, setBio] = useState("")
  const [location, setLocation] = useState("")
  const [teachSkills, setTeachSkills] = useState<string[]>([])
  const [learnSkills, setLearnSkills] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  if (!session) {
    router.push("/login")
    return null
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: fullName,
          bio,
          location,
          updated_at: new Date().toISOString(),
        })
        .eq("id", session.user.id)

      if (error) {
        setError(error.message)
        return
      }

      setActiveTab("skills")
    } catch (error) {
      console.error("Error updating profile:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSkillsUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // This would be implemented to save the selected skills
      // For now, we'll just move to the next step
      router.push("/dashboard")
    } catch (error) {
      console.error("Error updating skills:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Welcome to SkillSwap</h1>
        <p className="text-muted-foreground mt-2">Let's set up your profile and skills</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="skills">Your Skills</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Complete Your Profile</CardTitle>
              <CardDescription>Tell us a bit about yourself so others can get to know you</CardDescription>
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
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell us about yourself, your interests, and your background"
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Continue"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card>
            <CardHeader>
              <CardTitle>Your Skills</CardTitle>
              <CardDescription>Tell us what skills you can teach and what you want to learn</CardDescription>
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
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Complete Setup"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

