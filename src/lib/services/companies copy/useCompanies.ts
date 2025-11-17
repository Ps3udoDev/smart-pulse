"use client"
import useSWR from "swr"
import { listCompanies, createCompany, updateCompany, deleteCompany } from "./service"
import type { Company } from "@/lib/types"
import { useSWRConfig } from "swr"

export function useCompanies() {
  return useSWR<Company[]>("companies", listCompanies)
}

export function useCompanyMutations() {
  const { mutate } = useSWRConfig()
  return {
    async create(payload: Partial<Company>) {
      const c = await createCompany(payload)
      await mutate("companies")
      return c
    },
    async update(id: string, patch: Partial<Company>) {
      const c = await updateCompany(id, patch)
      await mutate("companies")
      return c
    },
    async remove(id: string) {
      await deleteCompany(id)
      await mutate("companies")
    },
  }
}
