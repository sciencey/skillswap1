"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useSupabase } from "@/lib/supabase-provider"
import { useState, useEffect } from "react"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Header() {
  const pathname = usePathname()
  const { supabase, session } = useSupabase()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [session])

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Explore", href: "/explore" },
    { name: "How It Works", href: "/how-it-works" },
  ]

  const userNavigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "My Skills", href: "/my-skills" },
    { name: "Messages", href: "/messages" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === item.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {session &&
                  userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`text-sm font-medium transition-colors hover:text-primary ${
                        pathname === item.href ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">SkillSwap</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathname === item.href ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <ModeToggle />
          {!isLoading && (
            <>
              {session ? (
                <UserNav session={session} />
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login" passHref>
                    <Button variant="ghost" size="sm">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/register" passHref>
                    <Button size="sm">Sign up</Button>
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

