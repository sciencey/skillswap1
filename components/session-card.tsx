import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

interface SessionCardProps {
  session: {
    id: string
    title: string
    date: string
    duration: number
    status: string
    participant: {
      name: string
      avatar: string
    }
    isTeaching: boolean
  }
}

export function SessionCard({ session }: SessionCardProps) {
  const formattedDate = new Date(session.date).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  })

  const formattedTime = new Date(session.date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{session.title}</h3>
            <Badge variant={session.status === "upcoming" ? "default" : "secondary"} className="mt-1">
              {session.status === "upcoming" ? "Upcoming" : "Completed"}
            </Badge>
          </div>
          <Badge variant={session.isTeaching ? "outline" : "secondary"}>
            {session.isTeaching ? "Teaching" : "Learning"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="space-y-3">
          <div className="flex items-center text-sm">
            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>
              {formattedDate} at {formattedTime}
            </span>
          </div>
          <div className="flex items-center text-sm">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span>{session.duration} minutes</span>
          </div>
          <div className="flex items-center pt-2">
            <span className="text-sm mr-2">With:</span>
            <Avatar className="h-6 w-6 mr-2">
              <AvatarImage src={session.participant.avatar} alt={session.participant.name} />
              <AvatarFallback>{session.participant.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{session.participant.name}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {session.status === "upcoming" ? (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1">
              Reschedule
            </Button>
            <Button className="flex-1">Join Session</Button>
          </div>
        ) : (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1">
              View Details
            </Button>
            <Button className="flex-1">Leave Feedback</Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

