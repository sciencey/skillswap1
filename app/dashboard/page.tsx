"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Users, BookOpen, MessageSquare } from "lucide-react"
import Link from "next/link"
import { SkillMatchCard } from "@/components/skill-match-card"
import { SessionCard } from "@/components/session-card"

// Mock data for the dashboard
const mockMatches = [
  {
    id: "1",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "New York, NY",
    },
    teachSkill: "Web Development",
    learnSkill: "Photography",
    matchScore: 95,
  },
  {
    id: "2",
    user: {
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "San Francisco, CA",
    },
    teachSkill: "Spanish",
    learnSkill: "Guitar",
    matchScore: 88,
  },
  {
    id: "3",
    user: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Chicago, IL",
    },
    teachSkill: "Yoga",
    learnSkill: "Data Science",
    matchScore: 82,
  },
]

const mockSessions = [
  {
    id: "1",
    title: "Introduction to Web Development",
    date: "2025-03-25T14:00:00Z",
    duration: 60,
    status: "upcoming",
    participant: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isTeaching: true,
  },
  {
    id: "2",
    title: "Photography Basics",
    date: "2025-03-27T10:00:00Z",
    duration: 90,
    status: "upcoming",
    participant: {
      name: "Michael Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isTeaching: false,
  },
  {
    id: "3",
    title: "Spanish Conversation Practice",
    date: "2025-03-20T16:00:00Z",
    duration: 45,
    status: "completed",
    participant: {
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    isTeaching: false,
  },
]

export default function Dashboard() {
  const router = useRouter()
  const { supabase, session } = useSupabase()
  const [timeBalance, setTimeBalance] = useState(5)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!session) {
      router.push("/login")
      return
    }

    const fetchUserData = async () => {
      try {
        // In a real app, we would fetch the user's time balance from the database
        // For now, we'll use the mock data
        setTimeBalance(5)
        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setIsLoading(false)
      }
    }

    fetchUserData()
  }, [session, router, supabase])

  if (!session || isLoading) {
    return <div className="container py-10">Loading...</div>
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Time Balance</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{timeBalance} hours</div>
            <p className="text-xs text-muted-foreground">Available to spend on learning</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Matches</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockMatches.length}</div>
            <p className="text-xs text-muted-foreground">People with complementary skills</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessions</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockSessions.filter((s) => s.status === "upcoming").length}</div>
            <p className="text-xs text-muted-foreground">Upcoming teaching/learning sessions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="matches">Skill Matches</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="matches" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Your Skill Matches</h2>
            <Link href="/explore" passHref>
              <Button variant="outline">Find More Matches</Button>
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockMatches.map((match) => (
              <SkillMatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="sessions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
            <Button variant="outline">Schedule New Session</Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockSessions
              .filter((session) => session.status === "upcoming")
              .map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
          </div>

          <h2 className="text-xl font-semibold mt-8">Past Sessions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockSessions
              .filter((session) => session.status === "completed")
              .map((session) => (
                <SessionCard key={session.id} session={session} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

