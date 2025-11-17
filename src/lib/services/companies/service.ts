import { createClient } from "@/utils/supabase/client"
import type { Company } from "@/lib/types"

export async function listCompanies(): Promise<Company[]> {
  const sb = createClient()
  const { data, error } = await sb.from("companies").select("*").order("name", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getCompany(id: string): Promise<Company | null> {
  const sb = createClient()
  const { data, error } = await sb.from("companies").select("*").eq("id", id).single()
  if (error) throw error
  return data ?? null
}

export async function createCompany(payload: Partial<Company>): Promise<Company> {
  const sb = createClient()
  const { data, error } = await sb.from("companies").insert(payload).select("*").single()
  if (error) throw error
  return data!
}

export async function updateCompany(id: string, patch: Partial<Company>): Promise<Company> {
  const sb = createClient()
  const { data, error } = await sb.from("companies").update(patch).eq("id", id).select("*").single()
  if (error) throw error
  return data!
}

export async function deleteCompany(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from("companies").delete().eq("id", id)
  if (error) throw error
}