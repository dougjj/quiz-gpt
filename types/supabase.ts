export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number
          checksum: string
          finished_at: string | null
          id: string
          logs: string | null
          migration_name: string
          rolled_back_at: string | null
          started_at: string
        }
        Insert: {
          applied_steps_count?: number
          checksum: string
          finished_at?: string | null
          id: string
          logs?: string | null
          migration_name: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Update: {
          applied_steps_count?: number
          checksum?: string
          finished_at?: string | null
          id?: string
          logs?: string | null
          migration_name?: string
          rolled_back_at?: string | null
          started_at?: string
        }
        Relationships: []
      }
      Question: {
        Row: {
          answer: string
          createdAt: string
          explanation: string
          id: number
          options: Json
          question: string
          topic: string
        }
        Insert: {
          answer: string
          createdAt?: string
          explanation: string
          id?: number
          options: Json
          question: string
          topic?: string
        }
        Update: {
          answer?: string
          createdAt?: string
          explanation?: string
          id?: number
          options?: Json
          question?: string
          topic?: string
        }
        Relationships: []
      }
      RawPage: {
        Row: {
          created_at: string
          id: number
          page: string
          topic: string
        }
        Insert: {
          created_at?: string
          id?: number
          page?: string
          topic?: string
        }
        Update: {
          created_at?: string
          id?: number
          page?: string
          topic?: string
        }
        Relationships: []
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
