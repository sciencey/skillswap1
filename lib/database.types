export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          location: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          name: string
          category: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string
          description?: string | null
          created_at?: string
        }
      }
      user_skills: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          proficiency_level: string
          hourly_rate: number
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_id: string
          proficiency_level: string
          hourly_rate?: number
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_id?: string
          proficiency_level?: string
          hourly_rate?: number
          description?: string | null
          created_at?: string
        }
      }
      skill_requests: {
        Row: {
          id: string
          user_id: string
          skill_id: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_id: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_id?: string
          description?: string | null
          created_at?: string
        }
      }
      time_bank: {
        Row: {
          id: string
          user_id: string
          balance: number
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          balance?: number
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          balance?: number
          updated_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          hours: number
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          hours: number
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          hours?: number
          description?: string | null
          created_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          teacher_id: string
          student_id: string
          skill_id: string
          status: string
          scheduled_date: string | null
          duration: number | null
          location: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          teacher_id: string
          student_id: string
          skill_id: string
          status: string
          scheduled_date?: string | null
          duration?: number | null
          location?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          teacher_id?: string
          student_id?: string
          skill_id?: string
          status?: string
          scheduled_date?: string | null
          duration?: number | null
          location?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          read: boolean
          created_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          read?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          read?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

