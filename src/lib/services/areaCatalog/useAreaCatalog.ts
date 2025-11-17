"use client"
import useSWR from "swr"
import { listAreaCatalog, createArea, updateArea, deleteArea } from "./service"
import type { AreaCatalog } from "@/lib/types"
import { useSWRConfig } from "swr"

export function useAreaCatalog() {
  return useSWR<AreaCatalog[]>("area_catalog", listAreaCatalog)
}

export function useAreaCatalogMutations() {
  const { mutate } = useSWRConfig()
  return {
    async create(payload: Partial<AreaCatalog>) {
      const a = await createArea(payload)
      await mutate("area_catalog")
      return a
    },
    async update(id: string, patch: Partial<AreaCatalog>) {
      const a = await updateArea(id, patch)
      await mutate("area_catalog")
      return a
    },
    async remove(id: string) {
      await deleteArea(id)
      await mutate("area_catalog")
    },
  }
}