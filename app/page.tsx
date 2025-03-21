import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, Clock, Users } from "lucide-react"
import FeatureCard from "@/components/feature-card"

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Share Skills, Build Community
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  SkillSwap connects people who want to teach with those who want to learn. Exchange your knowledge and
                  grow together.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/register" passHref>
                  <Button size="lg">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/explore" passHref>
                  <Button variant="outline" size="lg">
                    Explore Skills
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/40 rounded-lg"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <h3 className="text-2xl font-bold mb-2">Join Our Community</h3>
                    <p className="text-muted-foreground">
                      Connect with skilled people in your area and start exchanging knowledge today
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How SkillSwap Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform makes it easy to connect with others and exchange skills
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
            <FeatureCard
              icon={<Users className="h-10 w-10 text-primary" />}
              title="Create Your Profile"
              description="Sign up and list the skills you can teach and those you want to learn"
            />
            <FeatureCard
              icon={<BookOpen className="h-10 w-10 text-primary" />}
              title="Find Matches"
              description="Our system matches you with people who have complementary skills"
            />
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-primary" />}
              title="Exchange Time"
              description="Teach what you know and learn what you want using our time banking system"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Start Swapping Skills?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join our growing community of learners and teachers today
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/register" passHref>
                <Button size="lg">
                  Sign Up Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

