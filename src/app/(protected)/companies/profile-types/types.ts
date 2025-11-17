import type { ProfileTypeCatalog, CompanyProfileTypeMap } from "@/lib/types"

export type ProfileTypeRow = {
  id: string
  name: string
  description: string | null
  enabled: boolean
  isChanged?: boolean
}

export type ProfileTypeChange = {
  id: string
  enabled?: boolean
  description?: string
}

export function mergeProfileTypeMaps(
  profileTypes: ProfileTypeCatalog[],
  maps: CompanyProfileTypeMap[],
  companyId: string | null
): ProfileTypeRow[] {
  if (!companyId) {
    // Mostrar todo el catálogo sin filtro de empresa
    return profileTypes.map((pt) => ({
      id: pt.id,
      name: pt.name,
      description: pt.description,
      enabled: false,
    }))
  }

  // Filtrar tipos de perfil según company_profile_type_map
  return profileTypes.map((pt) => {
    const mapping = maps.find(
      (m) => m.profile_type_catalog_id === pt.id && m.company_id === companyId
    )
    return {
      id: pt.id,
      name: pt.name,
      description: pt.description,
      enabled: mapping?.enabled ?? false,
    }
  })
}
