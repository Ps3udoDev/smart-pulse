"use client"
import useSWR from "swr"
import { listPillars, createPillar, updatePillar, deletePillar } from "./service"
import type { Pillar } from "@/lib/types"
import { useSWRConfig } from "swr"

export function usePillars() {
  return useSWR<Pillar[]>("pillars", listPillars)
}

export function usePillarMutations() {
  const { mutate } = useSWRConfig()
  return {
    async create(payload: Partial<Pillar>) {
      const p = await createPillar(payload)
      await mutate("pillars")
      return p
    },
    async update(id: string, patch: Partial<Pillar>) {
      const p = await updatePillar(id, patch)
      await mutate("pillars")
      return p
    },
    async remove(id: string) {
      await deletePillar(id)
      await mutate("pillars")
    },
  }
}
