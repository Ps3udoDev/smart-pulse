"use client"

import useSWR from "swr"
import { useSWRConfig } from "swr"
import type { CompanyProfileTypeMap } from "@/lib/types"
import {
  listCompanyProfileTypeMaps,
  upsertProfileTypeMapping,
  setProfileTypeMappingEnabled,
  deleteProfileTypeMapping,
} from "./service"

export function useCompanyProfileTypeMap(companyId: string | null) {
  const key = companyId ? ["company_profile_type_map", companyId] : null
  return useSWR<CompanyProfileTypeMap[]>(key, () => listCompanyProfileTypeMaps(companyId!))
}

export function useCompanyProfileTypeMapMutations(companyId: string | null) {
  const { mutate } = useSWRConfig()
  const key = companyId ? ["company_profile_type_map", companyId] : null

  return {
    async upsert(profileTypeId: string, enabled: boolean) {
      if (!companyId) return
      await upsertProfileTypeMapping(companyId, profileTypeId, enabled)
      if (key) await mutate(key)
    },

    async setEnabled(profileTypeId: string, enabled: boolean) {
      if (!companyId) return
      await setProfileTypeMappingEnabled(companyId, profileTypeId, enabled)
      if (key) await mutate(key)
    },

    async remove(profileTypeId: string) {
      if (!companyId) return
      await deleteProfileTypeMapping(companyId, profileTypeId)
      if (key) await mutate(key)
    },
  }
}