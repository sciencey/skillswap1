"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient, type Session } from "@supabase/auth-helpers-nextjs"
import type { SupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "@/lib/database.types"

type SupabaseContext = {
  supabase: SupabaseClient<Database>
  session: Session | null
}

const Context = createContext<SupabaseContext | undefined>(undefined)

export interface SupabaseProviderProps {
  children: React.ReactNode
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [supabase] = useState(() =>
  createClientComponentClient<Database>({
    supabaseUrl: 'https://trvgddvwxkfhmngiwryt.supabase.co',
    supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRydmdkZHZ3eGtmaG1uZ2l3cnl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1NzM1NjgsImV4cCI6MjA1ODE0OTU2OH0.7rTmhsOuZHAlbM-iHuke7WPa7WLjQR-wx9lJQ49VPIo'
  })
);

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session)
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase])

  return <Context.Provider value={{ supabase, session }}>{children}</Context.Provider>
}

export const useSupabase = () => {
  const context = useContext(Context)
  if (context === undefined) {
    throw new Error("useSupabase must be used inside SupabaseProvider")
  }
  return context
}

