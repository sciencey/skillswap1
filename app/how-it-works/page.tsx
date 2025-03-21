import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Users, Calendar, MessageSquare, Star } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="container py-10">
      <div className="max-w-3xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">How SkillSwap Works</h1>
        <p className="text-xl text-muted-foreground">
          Our platform makes it easy to connect with others and exchange skills in your community
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
        <Card>
          <CardHeader>
            <Users className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Create Your Profile</CardTitle>
            <CardDescription>Sign up and list the skills you can teach and those you want to learn</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Build a detailed profile showcasing your expertise and learning interests. Add a bio, location, and skill
              levels to help others find you.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <BookOpen className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Find Matches</CardTitle>
            <CardDescription>Our system matches you with people who have complementary skills</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Browse potential matches or let our algorithm suggest people nearby who can teach what you want to learn
              and learn what you can teach.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <MessageSquare className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Connect</CardTitle>
            <CardDescription>Message potential matches to discuss skill exchange opportunities</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Reach out to potential matches through our messaging system to discuss your learning goals and teaching
              style.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Calendar className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Schedule Sessions</CardTitle>
            <CardDescription>Arrange convenient times and locations for your skill exchange sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Use our built-in scheduling tool to find mutually convenient times. Choose in-person meetings at local
              venues or virtual sessions for remote learning.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Clock className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Exchange Time</CardTitle>
            <CardDescription>Teach what you know and learn what you want using our time banking system</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              For every hour you spend teaching, you earn an hour in your time bank. Use these hours to learn from
              others, creating a fair and balanced exchange system.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Star className="h-10 w-10 text-primary mb-2" />
            <CardTitle>Review & Grow</CardTitle>
            <CardDescription>Leave feedback after sessions and build your reputation in the community</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Share your experience and help others find great teachers. As you participate more, you'll build a
              reputation and expand your learning network.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Time Banking Explained</h2>
        <p className="mb-6">
          SkillSwap uses a time banking system to ensure fair exchanges between members. Here's how it works:
        </p>

        <div className="space-y-4 mb-8">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Earning Hours</h3>
            <p className="text-muted-foreground">
              When you teach someone a skill, you earn hours in your time bank. For example, if you spend 2 hours
              teaching someone web development, you earn 2 hours.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Spending Hours</h3>
            <p className="text-muted-foreground">
              You can spend your earned hours to learn from others. If you want to take a 1-hour yoga class, you'll
              spend 1 hour from your time bank.
            </p>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Starting Balance</h3>
            <p className="text-muted-foreground">
              New members receive 5 hours in their time bank when they sign up, allowing them to start learning right
              away before they've had a chance to teach.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4">Community Guidelines</h2>
        <p className="mb-6">
          To ensure a positive experience for everyone, we ask all members to follow these guidelines:
        </p>

        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Be respectful and considerate in all interactions</li>
          <li>Arrive on time for scheduled sessions</li>
          <li>Provide honest and constructive feedback</li>
          <li>Prepare adequately for teaching sessions</li>
          <li>Communicate clearly about your skill level and expectations</li>
          <li>Respect others' privacy and personal boundaries</li>
        </ul>

        <div className="bg-muted p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to Start Swapping Skills?</h2>
          <p className="mb-4">Join our growing community of learners and teachers today</p>
          <div className="flex justify-center">
            <a
              href="/register"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              Sign Up Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

