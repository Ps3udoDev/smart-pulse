"use client"
import useSWR from "swr"
import { listProfileTypes, createProfileType, updateProfileType, deleteProfileType } from "./service"
import type { ProfileTypeCatalog } from "@/lib/types"
import { useSWRConfig } from "swr"

export function useProfileTypeCatalog() {
  return useSWR<ProfileTypeCatalog[]>("profile_type_catalog", listProfileTypes)
}

export function useProfileTypeCatalogMutations() {
  const { mutate } = useSWRConfig()
  return {
    async create(payload: Partial<ProfileTypeCatalog>) {
      const pt = await createProfileType(payload)
      await mutate("profile_type_catalog")
      return pt
    },
    async update(id: string, patch: Partial<ProfileTypeCatalog>) {
      const pt = await updateProfileType(id, patch)
      await mutate("profile_type_catalog")
      return pt
    },
    async remove(id: string) {
      await deleteProfileType(id)
      await mutate("profile_type_catalog")
    },
  }
}
