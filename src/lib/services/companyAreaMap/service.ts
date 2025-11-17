import { createClient } from "@/utils/supabase/client"
import type { CompanyAreaMap } from "@/lib/types"

export async function listCompanyAreaMap(companyId?: string): Promise<CompanyAreaMap[]> {
  const sb = createClient()
  let q = sb.from("company_area_map").select("*")
  if (companyId) q = q.eq("company_id", companyId)
  const { data, error } = await q
  if (error) throw error
  return data ?? []
}

export async function upsertMapping(companyId: string, areaId: string, enabled: boolean): Promise<CompanyAreaMap> {
  const sb = createClient()
  const { data, error } = await sb
    .from("company_area_map")
    .upsert({ company_id: companyId, area_catalog_id: areaId, enabled }, { onConflict: "company_id,area_catalog_id" })
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function setMappingEnabled(companyId: string, areaId: string, enabled: boolean): Promise<void> {
  const sb = createClient()
  const { error } = await sb
    .from("company_area_map")
    .update({ enabled })
    .eq("company_id", companyId)
    .eq("area_catalog_id", areaId)
  if (error) throw error
}

export async function deleteMapping(companyId: string, areaId: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb
    .from("company_area_map")
    .delete()
    .eq("company_id", companyId)
    .eq("area_catalog_id", areaId)
  if (error) throw error
}