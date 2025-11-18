import { createClient } from "@/utils/supabase/client"
import type { Pillars } from "@/lib/types"

export async function listPillars(): Promise<Pillars[]> {
  const sb = createClient()
  const { data, error } = await sb
    .from("pillars")
    .select("*")
    .order("name", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getPillar(id: string): Promise<Pillars | null> {
  const sb = createClient()
  const { data, error } = await sb
    .from("pillars")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data ?? null
}

export async function createPillar(payload: Partial<Pillars>): Promise<Pillars> {
  const sb = createClient()
  const { data, error } = await sb
    .from("pillars")
    .insert(payload)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function updatePillar(id: string, patch: Partial<Pillars>): Promise<Pillars> {
  const sb = createClient()
  const { data, error } = await sb
    .from("pillars")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function deletePillar(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from("pillars").delete().eq("id", id)
  if (error) throw error
}
