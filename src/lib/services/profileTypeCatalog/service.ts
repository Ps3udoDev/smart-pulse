import { createClient } from "@/utils/supabase/client"
import type { ProfileTypeCatalog } from "@/lib/types"

export async function listProfileTypes(): Promise<ProfileTypeCatalog[]> {
  const sb = createClient()
  const { data, error } = await sb
    .from("profile_type_catalog")
    .select("*")
    .order("name", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getProfileType(id: string): Promise<ProfileTypeCatalog | null> {
  const sb = createClient()
  const { data, error } = await sb
    .from("profile_type_catalog")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data ?? null
}

export async function createProfileType(payload: Partial<ProfileTypeCatalog>): Promise<ProfileTypeCatalog> {
  const sb = createClient()
  const { data, error } = await sb
    .from("profile_type_catalog")
    .insert(payload)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function updateProfileType(id: string, patch: Partial<ProfileTypeCatalog>): Promise<ProfileTypeCatalog> {
  const sb = createClient()
  const { data, error } = await sb
    .from("profile_type_catalog")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function deleteProfileType(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from("profile_type_catalog").delete().eq("id", id)
  if (error) throw error
}
