import { createClient } from "@/utils/supabase/client"
import type { CompanyProfileTypeMap } from "@/lib/types"

export async function listCompanyProfileTypeMaps(companyId?: string): Promise<CompanyProfileTypeMap[]> {
  const sb = createClient()
  let q = sb.from("company_profile_type_map").select("*")
  if (companyId) q = q.eq("company_id", companyId)
  const { data, error } = await q
  if (error) throw error
  return data ?? []
}

export async function upsertProfileTypeMapping(
  companyId: string,
  profileTypeId: string,
  enabled: boolean
): Promise<CompanyProfileTypeMap> {
  const sb = createClient()
  const { data, error } = await sb
    .from("company_profile_type_map")
    .upsert(
      { company_id: companyId, profile_type_catalog_id: profileTypeId, enabled },
      { onConflict: "company_id,profile_type_catalog_id" }
    )
    .select("*")
    .single()

  if (error) throw error
  return data!
}

export async function setProfileTypeMappingEnabled(
  companyId: string,
  profileTypeId: string,
  enabled: boolean
): Promise<void> {
  const sb = createClient()
  const { error } = await sb
    .from("company_profile_type_map")
    .update({ enabled })
    .eq("company_id", companyId)
    .eq("profile_type_catalog_id", profileTypeId)

  if (error) throw error
}

export async function deleteProfileTypeMapping(companyId: string, profileTypeId: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb
    .from("company_profile_type_map")
    .delete()
    .eq("company_id", companyId)
    .eq("profile_type_catalog_id", profileTypeId)

  if (error) throw error
}