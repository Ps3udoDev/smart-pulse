import { createClient } from "@/utils/supabase/client"
import type { AreaCatalog } from "@/lib/types"

export async function listAreaCatalog(): Promise<AreaCatalog[]> {
  const sb = createClient()
  const { data, error } = await sb.from("area_catalog").select("*").order("sort_order", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getAreaById(id: string): Promise<AreaCatalog | null> {
  const sb = createClient()
  const { data, error } = await sb.from("area_catalog").select("*").eq("id", id).single()
  if (error) throw error
  return data ?? null
}

export async function createArea(payload: Partial<AreaCatalog>): Promise<AreaCatalog> {
  const sb = createClient()
  const { data, error } = await sb.from("area_catalog").insert(payload).select("*").single()
  if (error) throw error
  return data!
}

export async function updateArea(id: string, patch: Partial<AreaCatalog>): Promise<AreaCatalog> {
  const sb = createClient()
  const { data, error } = await sb.from("area_catalog").update(patch).eq("id", id).select("*").single()
  if (error) throw error
  return data!
}

export async function deleteArea(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from("area_catalog").delete().eq("id", id)
  if (error) throw error
}