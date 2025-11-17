import type { Database } from "./supabase";

export type Tables = Database['public']['Tables'];

export type AreaCatalog       = Tables['area_catalog']['Row'];
export type Company           = Tables['companies']['Row'];
export type CompanyAreaMap    = Tables['company_area_map']['Row'];
export type Module            = Tables['modules']['Row'];
export type Pillars            = Tables['pillars']['Row'];
export type ProfileTypeCatalog = Tables['profile_type_catalog']['Row'];
export type CompanyProfileTypeMap = Tables['company_profile_type_map']['Row'];


export type AreaCatalogInsert = Tables['area_catalog']['Insert'];
export type AreaCatalogUpdate = Tables['area_catalog']['Update'];
export type CompanyInsert = Tables['companies']['Insert'];
export type CompanyUpdate = Tables['companies']['Update'];
export type CompanyProfileTypeMapInsert = Tables['company_profile_type_map']['Insert'];
export type CompanyProfileTypeMapUpdate = Tables['company_profile_type_map']['Update'];
export type ModuleInsert = Tables['modules']['Insert'];
export type ModuleUpdate = Tables['modules']['Update'];
export type PillarsInsert = Tables['pillars']['Insert'];
export type PillarsUpdate = Tables['pillars']['Update'];
export type ProfileTypeCatalogInsert = Tables['profile_type_catalog']['Insert'];
export type ProfileTypeCatalogUpdate = Tables['profile_type_catalog']['Update'];
