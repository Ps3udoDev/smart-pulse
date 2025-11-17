"use client"
import useSWR from "swr"
import { listCompanyAreaMap, upsertMapping, setMappingEnabled, deleteMapping } from "./service"
import type { CompanyAreaMap } from "@/lib/types"
import { useSWRConfig } from "swr"

export function useCompanyAreaMap(companyId: string | null) {
  const key = companyId ? ["company_area_map", companyId] : null
  return useSWR<CompanyAreaMap[]>(key, () => listCompanyAreaMap(companyId!))
}

export function useCompanyAreaMapMutations(companyId: string | null) {
  const { mutate } = useSWRConfig()
  const key = companyId ? ["company_area_map", companyId] : null
  return {
    async upsert(areaId: string, enabled: boolean) {
      if (!companyId) return
      await upsertMapping(companyId, areaId, enabled)
      if (key) await mutate(key)
    },
    async setEnabled(areaId: string, enabled: boolean) {
      if (!companyId) return
      await setMappingEnabled(companyId, areaId, enabled)
      if (key) await mutate(key)
    },
    async remove(areaId: string) {
      if (!companyId) return
      await deleteMapping(companyId, areaId)
      if (key) await mutate(key)
    },
  }
}