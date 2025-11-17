import type { AreaCatalog, CompanyAreaMap } from "@/lib/types"

export type AreaRow = {
  id: string
  name: string
  description: string | null
  enabled: boolean
  isChanged?: boolean
}

export type AreaChange = {
  id: string
  enabled?: boolean
  description?: string
}

export function mergeAreaMaps(
  areas: AreaCatalog[],
  maps: CompanyAreaMap[],
  companyId: string | null
): AreaRow[] {
  if (!companyId) {
    // Mostrar todo el catálogo sin filtro de empresa
    return areas.map((a) => ({
      id: a.id,
      name: a.name,
      description: a.description,
      enabled: false,
    }))
  }

  // Filtrar áreas según company_area_map
  return areas.map((a) => {
    const mapping = maps.find(
      (m) => m.area_catalog_id === a.id && m.company_id === companyId
    )
    return {
      id: a.id,
      name: a.name,
      description: a.description,
      enabled: mapping?.enabled ?? false,
    }
  })
}