export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          full_name: string | null
          user_type: "patient" | "therapist" | "caregiver" | "admin"
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          user_type?: "patient" | "therapist" | "caregiver" | "admin"
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          user_type?: "patient" | "therapist" | "caregiver" | "admin"
        }
      }
      patients: {
        Row: {
          id: string
          created_at: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          date_of_birth: string | null
          gender: string | null
          address: string | null
          emergency_contact: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          emergency_contact?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          emergency_contact?: string | null
        }
      }
      therapists: {
        Row: {
          id: string
          created_at: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone: string | null
          specialization: string | null
          bio: string | null
          years_of_experience: number | null
          education: string | null
          license_number: string | null
          hospital_id: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          first_name: string
          last_name: string
          email: string
          phone?: string | null
          specialization?: string | null
          bio?: string | null
          years_of_experience?: number | null
          education?: string | null
          license_number?: string | null
          hospital_id?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          first_name?: string
          last_name?: string
          email?: string
          phone?: string | null
          specialization?: string | null
          bio?: string | null
          years_of_experience?: number | null
          education?: string | null
          license_number?: string | null
          hospital_id?: string | null
        }
      }
      caregivers: {
        Row: {
          id: string
          user_id: string
          relationship_to_patient: string | null
          phone: string | null
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          user_id: string
          relationship_to_patient?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          user_id?: string
          relationship_to_patient?: string | null
          phone?: string | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      caregiver_patients: {
        Row: {
          id: string
          caregiver_id: string
          patient_id: string
          created_at: string
        }
        Insert: {
          id?: string
          caregiver_id: string
          patient_id: string
          created_at?: string
        }
        Update: {
          id?: string
          caregiver_id?: string
          patient_id?: string
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          therapist_id: string
          date: string
          start_time: string
          end_time: string
          type: "virtual" | "in-person"
          status: "scheduled" | "completed" | "cancelled" | "no-show"
          hospital_id: string | null
          booked_by_id: string
          booked_by_type: "patient" | "caregiver"
          created_at: string
          updated_at: string
          notes: string | null
        }
        Insert: {
          id?: string
          patient_id: string
          therapist_id: string
          date: string
          start_time: string
          end_time: string
          type: "virtual" | "in-person"
          status?: "scheduled" | "completed" | "cancelled" | "no-show"
          hospital_id?: string | null
          booked_by_id: string
          booked_by_type: "patient" | "caregiver"
          created_at?: string
          updated_at?: string
          notes?: string | null
        }
        Update: {
          id?: string
          patient_id?: string
          therapist_id?: string
          date?: string
          start_time?: string
          end_time?: string
          type?: "virtual" | "in-person"
          status?: "scheduled" | "completed" | "cancelled" | "no-show"
          hospital_id?: string | null
          booked_by_id?: string
          booked_by_type?: "patient" | "caregiver"
          created_at?: string
          updated_at?: string
          notes?: string | null
        }
      }
      hospitals: {
        Row: {
          id: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          phone: string
          email: string | null
          website: string | null
          operating_hours: Json | null
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          address: string
          city: string
          state: string
          zip_code: string
          phone: string
          email?: string | null
          website?: string | null
          operating_hours?: Json | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          address?: string
          city?: string
          state?: string
          zip_code?: string
          phone?: string
          email?: string | null
          website?: string | null
          operating_hours?: Json | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      disorders: {
        Row: {
          id: string
          name: string
          description: string | null
          symptoms: string[] | null
          severity_scale: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          symptoms?: string[] | null
          severity_scale?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          symptoms?: string[] | null
          severity_scale?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      patient_disorders: {
        Row: {
          id: string
          patient_id: string
          disorder_id: string
          severity: number | null
          diagnosed_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          disorder_id: string
          severity?: number | null
          diagnosed_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          disorder_id?: string
          severity?: number | null
          diagnosed_at?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      surveys: {
        Row: {
          id: string
          title: string
          description: string | null
          questions: Json
          created_at: string
          updated_at: string
          is_active: boolean
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          questions: Json
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          questions?: Json
          created_at?: string
          updated_at?: string
          is_active?: boolean
        }
      }
      survey_responses: {
        Row: {
          id: string
          survey_id: string
          patient_id: string
          responses: Json
          completed_at: string
          created_at: string
        }
        Insert: {
          id?: string
          survey_id: string
          patient_id: string
          responses: Json
          completed_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          survey_id?: string
          patient_id?: string
          responses?: Json
          completed_at?: string
          created_at?: string
        }
      }
      therapist_availability: {
        Row: {
          id: string
          therapist_id: string
          day_of_week: number
          start_time: string
          end_time: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          therapist_id: string
          day_of_week: number
          start_time: string
          end_time: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          therapist_id?: string
          day_of_week?: number
          start_time?: string
          end_time?: string
          created_at?: string
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          patient_id: string
          therapist_id: string
          appointment_id: string | null
          rating: number
          content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          therapist_id: string
          appointment_id?: string | null
          rating: number
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          therapist_id?: string
          appointment_id?: string | null
          rating?: number
          content?: string | null
          created_at?: string
          updated_at?: string
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
  }
}
