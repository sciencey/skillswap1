"use client"

import type React from "react"

import { useState } from "react"
import { useSupabase } from "@/lib/supabase-provider"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SkillMatchCard } from "@/components/skill-match-card"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data for the explore page
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
  {
    id: "4",
    user: {
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Austin, TX",
    },
    teachSkill: "Guitar",
    learnSkill: "French",
    matchScore: 78,
  },
  {
    id: "5",
    user: {
      name: "Sarah Thompson",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Seattle, WA",
    },
    teachSkill: "Data Science",
    learnSkill: "Yoga",
    matchScore: 75,
  },
  {
    id: "6",
    user: {
      name: "Alex Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      location: "Miami, FL",
    },
    teachSkill: "Photography",
    learnSkill: "Web Development",
    matchScore: 72,
  },
]

export default function Explore() {
  const { session } = useSupabase()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [filteredMatches, setFilteredMatches] = useState(mockMatches)
  const [distance, setDistance] = useState([50])
  const [skillCategories, setSkillCategories] = useState<string[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, we would filter the matches based on the search query
    // For now, we'll just use the mock data
    setFilteredMatches(mockMatches)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Explore Skills</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search skills or users..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button type="submit">Search</Button>
        </form>
        <div className="flex gap-2">
          <Select defaultValue="nearest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nearest">Nearest to you</SelectItem>
              <SelectItem value="match">Best match</SelectItem>
              <SelectItem value="recent">Recently active</SelectItem>
            </SelectContent>
          </Select>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filter</SheetTitle>
                <SheetDescription>Narrow down your search results</SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-6">
                <div className="space-y-2">
                  <Label>Distance</Label>
                  <div className="pt-4">
                    <Slider defaultValue={[50]} max={100} step={1} value={distance} onValueChange={setDistance} />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-muted-foreground">0 miles</span>
                      <span className="text-sm font-medium">{distance[0]} miles</span>
                      <span className="text-sm text-muted-foreground">100 miles</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Skill Categories</Label>
                  <div className="space-y-2">
                    {["Technology", "Arts & Crafts", "Music", "Languages", "Fitness", "Cooking"].map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={skillCategories.includes(category)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSkillCategories([...skillCategories, category])
                            } else {
                              setSkillCategories(skillCategories.filter((c) => c !== category))
                            }
                          }}
                        />
                        <label
                          htmlFor={category}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <Button className="w-full">Apply Filters</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="teaching">Teaching</TabsTrigger>
          <TabsTrigger value="learning">Learning</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches.map((match) => (
              <SkillMatchCard key={match.id} match={match} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="teaching" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches
              .filter((match) => match.learnSkill === "Web Development" || match.learnSkill === "Photography")
              .map((match) => (
                <SkillMatchCard key={match.id} match={match} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="learning" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredMatches
              .filter((match) => match.teachSkill === "Web Development" || match.teachSkill === "Photography")
              .map((match) => (
                <SkillMatchCard key={match.id} match={match} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

