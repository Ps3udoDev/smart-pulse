"use client"
import useSWR from "swr"
import { listCompanyProfileTypeMaps, createCompanyProfileTypeMap, updateCompanyProfileTypeMap, deleteCompanyProfileTypeMap } from "./service"
import type { CompanyProfileTypeMap } from "@/lib/types"
import { useSWRConfig } from "swr"

export function useCompanyProfileTypeMap() {
  return useSWR<CompanyProfileTypeMap[]>("company_profile_type_map", listCompanyProfileTypeMaps)
}

export function useCompanyProfileTypeMapMutations() {
  const { mutate } = useSWRConfig()
  return {
    async create(payload: Partial<CompanyProfileTypeMap>) {
      const map = await createCompanyProfileTypeMap(payload)
      await mutate("company_profile_type_map")
      return map
    },
    async update(id: string, patch: Partial<CompanyProfileTypeMap>) {
      const map = await updateCompanyProfileTypeMap(id, patch)
      await mutate("company_profile_type_map")
      return map
    },
    async remove(id: string) {
      await deleteCompanyProfileTypeMap(id)
      await mutate("company_profile_type_map")
    },
  }
}
