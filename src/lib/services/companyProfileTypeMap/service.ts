import { createClient } from "@/utils/supabase/client"
import type { CompanyProfileTypeMap } from "@/lib/types"

export async function listCompanyProfileTypeMaps(): Promise<CompanyProfileTypeMap[]> {
  const sb = createClient()
  const { data, error } = await sb
    .from("company_profile_type_map")
    .select("*")
    .order("created_at", { ascending: false })
  if (error) throw error
  return data ?? []
}

export async function getCompanyProfileTypeMap(id: string): Promise<CompanyProfileTypeMap | null> {
  const sb = createClient()
  const { data, error } = await sb
    .from("company_profile_type_map")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data ?? null
}

export async function createCompanyProfileTypeMap(payload: Partial<CompanyProfileTypeMap>): Promise<CompanyProfileTypeMap> {
  const sb = createClient()
  const { data, error } = await sb
    .from("company_profile_type_map")
    .insert(payload)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function updateCompanyProfileTypeMap(id: string, patch: Partial<CompanyProfileTypeMap>): Promise<CompanyProfileTypeMap> {
  const sb = createClient()
  const { data, error } = await sb
    .from("company_profile_type_map")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function deleteCompanyProfileTypeMap(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from("company_profile_type_map").delete().eq("id", id)
  if (error) throw error
}
