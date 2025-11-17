import { createClient } from "@/utils/supabase/client"
import type { Module } from "@/lib/types"

export async function listModules(): Promise<Module[]> {
  const sb = createClient()
  const { data, error } = await sb
    .from("modules")
    .select("*")
    .order("name", { ascending: true })
  if (error) throw error
  return data ?? []
}

export async function getModule(id: string): Promise<Module | null> {
  const sb = createClient()
  const { data, error } = await sb
    .from("modules")
    .select("*")
    .eq("id", id)
    .single()
  if (error) throw error
  return data ?? null
}

export async function createModule(payload: Partial<Module>): Promise<Module> {
  const sb = createClient()
  const { data, error } = await sb
    .from("modules")
    .insert(payload)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function updateModule(id: string, patch: Partial<Module>): Promise<Module> {
  const sb = createClient()
  const { data, error } = await sb
    .from("modules")
    .update(patch)
    .eq("id", id)
    .select("*")
    .single()
  if (error) throw error
  return data!
}

export async function deleteModule(id: string): Promise<void> {
  const sb = createClient()
  const { error } = await sb.from("modules").delete().eq("id", id)
  if (error) throw error
}
