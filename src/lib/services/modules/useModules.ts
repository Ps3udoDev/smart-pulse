"use client"
import useSWR from "swr"
import { listModules, createModule, updateModule, deleteModule } from "./service"
import type { Module } from "@/lib/types"
import { useSWRConfig } from "swr"

export function useModules() {
  return useSWR<Module[]>("modules", listModules)
}

export function useModuleMutations() {
  const { mutate } = useSWRConfig()
  return {
    async create(payload: Partial<Module>) {
      const m = await createModule(payload)
      await mutate("modules")
      return m
    },
    async update(id: string, patch: Partial<Module>) {
      const m = await updateModule(id, patch)
      await mutate("modules")
      return m
    },
    async remove(id: string) {
      await deleteModule(id)
      await mutate("modules")
    },
  }
}
