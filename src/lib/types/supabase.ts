export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      answer_options: {
        Row: {
          id: string
          question_id: string
          score: number
          sort_order: number
          text: string
        }
        Insert: {
          id?: string
          question_id: string
          score: number
          sort_order: number
          text: string
        }
        Update: {
          id?: string
          question_id?: string
          score?: number
          sort_order?: number
          text?: string
        }
        Relationships: [
          {
            foreignKeyName: "answer_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "answer_options_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "v_questions_with_code"
            referencedColumns: ["id"]
          },
        ]
      }
      app_settings: {
        Row: {
          created_at: string
          created_by: string | null
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          created_at?: string
          created_by?: string | null
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: []
      }
      app_user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at: string
          updated_by: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          role: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          role?: Database["public"]["Enums"]["app_role"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_app_user_roles_profile"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      area_catalog: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      companies: {
        Row: {
          bg_url: string | null
          created_at: string
          created_by: string | null
          domain: string | null
          id: string
          is_active: boolean
          logo_url: string | null
          name: string
          primary_color: string | null
          slug: string | null
          terms_url: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          bg_url?: string | null
          created_at?: string
          created_by?: string | null
          domain?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name: string
          primary_color?: string | null
          slug?: string | null
          terms_url?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          bg_url?: string | null
          created_at?: string
          created_by?: string | null
          domain?: string | null
          id?: string
          is_active?: boolean
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          slug?: string | null
          terms_url?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      company_area_map: {
        Row: {
          alias: string | null
          area_catalog_id: string
          company_id: string
          created_at: string
          created_by: string | null
          enabled: boolean
          id: string
          sort_order: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          alias?: string | null
          area_catalog_id: string
          company_id: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          id?: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          alias?: string | null
          area_catalog_id?: string
          company_id?: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          id?: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_area_map_area_catalog_id_fkey"
            columns: ["area_catalog_id"]
            isOneToOne: false
            referencedRelation: "area_catalog"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_area_map_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profile_type_map: {
        Row: {
          alias: string | null
          company_id: string
          created_at: string
          created_by: string | null
          enabled: boolean
          id: string
          profile_type_catalog_id: string
          sort_order: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          alias?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          id?: string
          profile_type_catalog_id: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          alias?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          enabled?: boolean
          id?: string
          profile_type_catalog_id?: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "company_profile_type_map_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_profile_type_map_profile_type_catalog_id_fkey"
            columns: ["profile_type_catalog_id"]
            isOneToOne: false
            referencedRelation: "profile_type_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      concepts: {
        Row: {
          description: string | null
          id: string
          name: string
          pillar_id: string
        }
        Insert: {
          description?: string | null
          id?: string
          name: string
          pillar_id: string
        }
        Update: {
          description?: string | null
          id?: string
          name?: string
          pillar_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "concepts_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "pillars"
            referencedColumns: ["id"]
          },
        ]
      }
      dmi_answers: {
        Row: {
          answer_option_id: string
          answered_at: string
          dmi_id: string
          question_id: string
          score: number
          user_id: string
        }
        Insert: {
          answer_option_id: string
          answered_at?: string
          dmi_id: string
          question_id: string
          score: number
          user_id: string
        }
        Update: {
          answer_option_id?: string
          answered_at?: string
          dmi_id?: string
          question_id?: string
          score?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dmi_answers_answer_option_id_fkey"
            columns: ["answer_option_id"]
            isOneToOne: false
            referencedRelation: "answer_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmi_answers_dmi_id_fkey"
            columns: ["dmi_id"]
            isOneToOne: false
            referencedRelation: "dmis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmi_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmi_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "v_questions_with_code"
            referencedColumns: ["id"]
          },
        ]
      }
      dmi_participants: {
        Row: {
          completed_at: string | null
          dmi_id: string
          started_at: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          dmi_id: string
          started_at?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          dmi_id?: string
          started_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dmi_participants_dmi_id_fkey"
            columns: ["dmi_id"]
            isOneToOne: false
            referencedRelation: "dmis"
            referencedColumns: ["id"]
          },
        ]
      }
      dmis: {
        Row: {
          company_id: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          questionnaire_id: string
          status: string
          target_participants: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          company_id: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          questionnaire_id: string
          status?: string
          target_participants?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          company_id?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          questionnaire_id?: string
          status?: string
          target_participants?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmis_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmis_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
      memberships: {
        Row: {
          area_map_id: string | null
          company_id: string
          created_at: string
          created_by: string | null
          generation: string | null
          is_active: boolean
          join_date: string | null
          profile_completed: boolean
          profile_type_map_id: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          years_of_service: number | null
        }
        Insert: {
          area_map_id?: string | null
          company_id: string
          created_at?: string
          created_by?: string | null
          generation?: string | null
          is_active?: boolean
          join_date?: string | null
          profile_completed?: boolean
          profile_type_map_id?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id: string
          years_of_service?: number | null
        }
        Update: {
          area_map_id?: string | null
          company_id?: string
          created_at?: string
          created_by?: string | null
          generation?: string | null
          is_active?: boolean
          join_date?: string | null
          profile_completed?: boolean
          profile_type_map_id?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          years_of_service?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_membership_area_map"
            columns: ["area_map_id"]
            isOneToOne: false
            referencedRelation: "company_area_map"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_membership_profile_type_map"
            columns: ["profile_type_map_id"]
            isOneToOne: false
            referencedRelation: "company_profile_type_map"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_memberships_profile"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      modules: {
        Row: {
          code: string
          content: string | null
          created_at: string
          created_by: string | null
          id: string
          name: string
          parent_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          code: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          parent_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          code?: string
          content?: string | null
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          parent_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "modules_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      pillars: {
        Row: {
          code: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          code: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          code?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profile_type_catalog: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          is_active: boolean
          name: string
          sort_order: number | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          sort_order?: number | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          created_by: string | null
          email: string | null
          first_name: string | null
          full_name: string | null
          gender: string | null
          id: string
          last_name: string | null
          metadata: Json
          phone: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id: string
          last_name?: string | null
          metadata?: Json
          phone?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          created_by?: string | null
          email?: string | null
          first_name?: string | null
          full_name?: string | null
          gender?: string | null
          id?: string
          last_name?: string | null
          metadata?: Json
          phone?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      question_concepts: {
        Row: {
          concept_id: string
          question_id: string
          weight: number
        }
        Insert: {
          concept_id: string
          question_id: string
          weight?: number
        }
        Update: {
          concept_id?: string
          question_id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "question_concepts_concept_id_fkey"
            columns: ["concept_id"]
            isOneToOne: false
            referencedRelation: "concepts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_concepts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_concepts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "v_questions_with_code"
            referencedColumns: ["id"]
          },
        ]
      }
      question_modules: {
        Row: {
          kind: Database["public"]["Enums"]["module_link_kind"]
          module_id: string
          question_id: string
        }
        Insert: {
          kind?: Database["public"]["Enums"]["module_link_kind"]
          module_id: string
          question_id: string
        }
        Update: {
          kind?: Database["public"]["Enums"]["module_link_kind"]
          module_id?: string
          question_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "question_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_modules_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "question_modules_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "v_questions_with_code"
            referencedColumns: ["id"]
          },
        ]
      }
      questionnaires: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          name: string
          status: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          name: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          version: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          name?: string
          status?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: []
      }
      questions: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          order_in_pillar: number
          pillar_id: string
          questionnaire_id: string
          text: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          order_in_pillar: number
          pillar_id: string
          questionnaire_id: string
          text: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          order_in_pillar?: number
          pillar_id?: string
          questionnaire_id?: string
          text?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "pillars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      v_dmi_answers: {
        Row: {
          answer_option_id: string | null
          answered_at: string | null
          dmi_id: string | null
          pillar_id: string | null
          question_code: string | null
          question_id: string | null
          questionnaire_id: string | null
          score: number | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmi_answers_answer_option_id_fkey"
            columns: ["answer_option_id"]
            isOneToOne: false
            referencedRelation: "answer_options"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmi_answers_dmi_id_fkey"
            columns: ["dmi_id"]
            isOneToOne: false
            referencedRelation: "dmis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmi_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "questions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dmi_answers_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "v_questions_with_code"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "pillars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
      v_dmi_user_pillar_scores: {
        Row: {
          dmi_id: string | null
          pillar_avg: number | null
          pillar_id: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmi_answers_dmi_id_fkey"
            columns: ["dmi_id"]
            isOneToOne: false
            referencedRelation: "dmis"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "pillars"
            referencedColumns: ["id"]
          },
        ]
      }
      v_dmi_user_scores: {
        Row: {
          dmi_avg: number | null
          dmi_id: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "dmi_answers_dmi_id_fkey"
            columns: ["dmi_id"]
            isOneToOne: false
            referencedRelation: "dmis"
            referencedColumns: ["id"]
          },
        ]
      }
      v_memberships_enriched: {
        Row: {
          area_map_id: string | null
          company_id: string | null
          created_at: string | null
          created_by: string | null
          generation: string | null
          is_active: boolean | null
          join_date: string | null
          profile_completed: boolean | null
          profile_type_map_id: string | null
          updated_at: string | null
          updated_by: string | null
          user_id: string | null
          years_of_service: number | null
          years_of_service_live: number | null
        }
        Insert: {
          area_map_id?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          generation?: string | null
          is_active?: boolean | null
          join_date?: string | null
          profile_completed?: boolean | null
          profile_type_map_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
          years_of_service?: number | null
          years_of_service_live?: never
        }
        Update: {
          area_map_id?: string | null
          company_id?: string | null
          created_at?: string | null
          created_by?: string | null
          generation?: string | null
          is_active?: boolean | null
          join_date?: string | null
          profile_completed?: boolean | null
          profile_type_map_id?: string | null
          updated_at?: string | null
          updated_by?: string | null
          user_id?: string | null
          years_of_service?: number | null
          years_of_service_live?: never
        }
        Relationships: [
          {
            foreignKeyName: "fk_membership_area_map"
            columns: ["area_map_id"]
            isOneToOne: false
            referencedRelation: "company_area_map"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_membership_profile_type_map"
            columns: ["profile_type_map_id"]
            isOneToOne: false
            referencedRelation: "company_profile_type_map"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_memberships_profile"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "memberships_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      v_questions_with_code: {
        Row: {
          code: string | null
          created_at: string | null
          created_by: string | null
          id: string | null
          order_in_pillar: number | null
          pillar_id: string | null
          questionnaire_id: string | null
          text: string | null
          updated_at: string | null
          updated_by: string | null
        }
        Relationships: [
          {
            foreignKeyName: "questions_pillar_id_fkey"
            columns: ["pillar_id"]
            isOneToOne: false
            referencedRelation: "pillars"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "questions_questionnaire_id_fkey"
            columns: ["questionnaire_id"]
            isOneToOne: false
            referencedRelation: "questionnaires"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      fn_add_membership: {
        Args: {
          p_area_map_id?: string
          p_company_id: string
          p_generation?: string
          p_is_active?: boolean
          p_join_date?: string
          p_profile_completed?: boolean
          p_profile_type_map_id?: string
          p_user_id: string
        }
        Returns: undefined
      }
      fn_analytics_orchestrator: {
        Args: {
          bucket_edges?: number[]
          company_id?: string
          dmi_id?: string
          kind: string
          limit_n?: number
        }
        Returns: Json
      }
      fn_area_pillar_averages: {
        Args: { p_company_id: string; p_dmi_id: string }
        Returns: Json
      }
      fn_company_ranking: { Args: { limit_n?: number }; Returns: Json }
      fn_completion_breakdown: {
        Args: { company_id?: string; dmi_id?: string }
        Returns: Json
      }
      fn_dmi_history: { Args: { company_id?: string }; Returns: Json }
      fn_generation_pillar_averages: {
        Args: { p_company_id: string; p_dmi_id: string }
        Returns: Json
      }
      fn_kpis: { Args: { company_id?: string; dmi_id?: string }; Returns: Json }
      fn_me: { Args: never; Returns: Json }
      fn_pillar_averages: {
        Args: { company_id?: string; dmi_id?: string }
        Returns: Json
      }
      fn_profiletype_pillar_averages: {
        Args: { p_company_id: string; p_dmi_id: string }
        Returns: Json
      }
      fn_score_distribution: {
        Args: { bucket_edges?: number[]; company_id?: string; dmi_id?: string }
        Returns: Json
      }
      fn_set_user_role: {
        Args: {
          p_role: Database["public"]["Enums"]["app_role"]
          p_user_id: string
        }
        Returns: undefined
      }
      fn_user_pillar_averages: {
        Args: { p_company_id: string; p_dmi_id: string }
        Returns: Json
      }
      has_role: {
        Args: { p_role: Database["public"]["Enums"]["app_role"] }
        Returns: boolean
      }
      is_company_admin: { Args: { p_company: string }; Returns: boolean }
      is_global_admin: { Args: never; Returns: boolean }
      is_user_of_company: { Args: { p_company: string }; Returns: boolean }
    }
    Enums: {
      app_role: "user" | "company_admin" | "global_admin"
      module_link_kind: "primary" | "secondary"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "company_admin", "global_admin"],
      module_link_kind: ["primary", "secondary"],
    },
  },
} as const
