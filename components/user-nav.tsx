"use client"

import type { Session } from "@supabase/supabase-js"
import { useRouter } from "next/navigation"
import { useSupabase } from "@/lib/supabase-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, User, MessageSquare, Clock } from "lucide-react"
import Link from "next/link"

interface UserNavProps {
  session: Session
}

export function UserNav({ session }: UserNavProps) {
  const router = useRouter()
  const { supabase } = useSupabase()
  const user = session?.user

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  // Get initials from email
  const getInitials = (email: string) => {
    return email.substring(0, 2).toUpperCase()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.user_metadata?.avatar_url} alt={user?.email || ""} />
            <AvatarFallback>{user?.email ? getInitials(user.email) : "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.email}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/dashboard">
            <DropdownMenuItem>
              <Clock className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </DropdownMenuItem>
          </Link>
          <Link href="/messages">
            <DropdownMenuItem>
              <MessageSquare className="mr-2 h-4 w-4" />
              <span>Messages</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

