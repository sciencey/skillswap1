"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"

// Mock data for skills - in a real app, this would come from the database
const skillCategories = [
  {
    name: "Technology",
    skills: ["Programming", "Web Development", "Mobile App Development", "Data Science", "UI/UX Design"],
  },
  {
    name: "Arts & Crafts",
    skills: ["Painting", "Drawing", "Photography", "Knitting", "Pottery"],
  },
  {
    name: "Music",
    skills: ["Guitar", "Piano", "Singing", "Music Production", "DJ"],
  },
  {
    name: "Languages",
    skills: ["English", "Spanish", "French", "German", "Mandarin"],
  },
  {
    name: "Fitness",
    skills: ["Yoga", "Running", "Weight Training", "Dance", "Martial Arts"],
  },
  {
    name: "Cooking",
    skills: ["Baking", "Italian Cuisine", "Vegan Cooking", "Grilling", "Pastry"],
  },
]

interface SkillSelectorProps {
  selectedSkills: string[]
  setSelectedSkills: (skills: string[]) => void
  placeholder?: string
}

export function SkillSelector({
  selectedSkills,
  setSelectedSkills,
  placeholder = "Select skills",
}: SkillSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    } else {
      setSelectedSkills([...selectedSkills, skill])
    }
  }

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
  }

  return (
    <div className="space-y-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {selectedSkills.length > 0
              ? `${selectedSkills.length} skill${selectedSkills.length > 1 ? "s" : ""} selected`
              : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search skills..." />
            <CommandList>
              <CommandEmpty>No skill found.</CommandEmpty>
              {skillCategories.map((category) => (
                <CommandGroup key={category.name} heading={category.name}>
                  {category.skills.map((skill) => (
                    <CommandItem key={skill} value={skill} onSelect={() => handleSelect(skill)}>
                      <Check
                        className={cn("mr-2 h-4 w-4", selectedSkills.includes(skill) ? "opacity-100" : "opacity-0")}
                      />
                      {skill}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {selectedSkills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {selectedSkills.map((skill) => (
            <Badge key={skill} variant="secondary" className="flex items-center gap-1">
              {skill}
              <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}

