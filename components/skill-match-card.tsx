import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MessageSquare } from "lucide-react"
import Link from "next/link"

interface SkillMatchProps {
  match: {
    id: string
    user: {
      name: string
      avatar: string
      location: string
    }
    teachSkill: string
    learnSkill: string
    matchScore: number
  }
}

export function SkillMatchCard({ match }: SkillMatchProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={match.user.avatar} alt={match.user.name} />
            <AvatarFallback>{match.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{match.user.name}</h3>
            <p className="text-sm text-muted-foreground">{match.user.location}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-2">
          <div>
            <p className="text-sm font-medium">Can teach you:</p>
            <Badge variant="secondary" className="mt-1">
              {match.teachSkill}
            </Badge>
          </div>
          <div>
            <p className="text-sm font-medium">Wants to learn:</p>
            <Badge variant="outline" className="mt-1">
              {match.learnSkill}
            </Badge>
          </div>
          <div className="pt-2">
            <p className="text-sm font-medium">Match score:</p>
            <div className="w-full bg-muted rounded-full h-2.5 mt-1">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: `${match.matchScore}%` }}></div>
            </div>
            <p className="text-xs text-right mt-1">{match.matchScore}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex space-x-2 w-full">
          <Link href={`/profile/${match.id}`} passHref className="flex-1">
            <Button variant="outline" className="w-full">
              View Profile
            </Button>
          </Link>
          <Link href={`/messages/${match.id}`} passHref>
            <Button size="icon">
              <MessageSquare className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}

