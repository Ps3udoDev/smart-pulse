import type { Database } from "./supabase";

export type Tables = Database['public']['Tables'];

export type AreaCatalog       = Tables['area_catalog']['Row'];
export type Company           = Tables['companies']['Row'];
export type CompanyAreaMap    = Tables['company_area_map']['Row'];

export type AreaCatalogInsert = Tables['area_catalog']['Insert'];
export type AreaCatalogUpdate = Tables['area_catalog']['Update'];
