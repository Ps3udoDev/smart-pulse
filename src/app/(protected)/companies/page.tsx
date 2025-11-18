"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import type { Company } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Plus } from "lucide-react"
import { createColumns } from "./columns"
import { CreateCompanyDialog } from "./CreateCompanyDialog"
import { useUIStore } from "@/store/ui-store"
import { useCompanies, useCompanyMutations } from "@/lib/services/companies/useCompanies"
import { DataTable } from "@/components/custom/tables/DataTable"

export default function CompaniesPage() {
  const { confirm, notify } = useUIStore()
  const { data: companies = [], isLoading } = useCompanies()
  const companyMut = useCompanyMutations()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  // Filtrar empresas por búsqueda
  const filteredCompanies: Company[] = useMemo(() => {
    if (!searchQuery.trim()) return companies

    const needle = searchQuery.trim().toLowerCase()
    return companies.filter(
      (c) =>
        c.name.toLowerCase().includes(needle) ||
        (c.domain ?? "").toLowerCase().includes(needle)
    )
  }, [companies, searchQuery])

  // Crear nueva empresa
  async function handleCreateCompany(values: {
    name: string
    color: string
    domain: string
    logo_url?: string
    bg_url?: string
  }) {
    try {
      await companyMut.create({
        name: values.name,
        color: values.color,
        domain: values.domain || null,
        logo_url: values.logo_url || null,
        bg_url: values.bg_url || null,
        is_active: true,
      } as Partial<Company>)
      notify.success("Empresa creada exitosamente")
      setDialogOpen(false)
    } catch (e: any) {
      notify.error("Error al crear empresa", {
        description: e?.message || "Ocurrió un error inesperado",
      })
      throw e
    }
  }

  async function handleDeleteCompany(id: string, name: string) {
    const ok = await confirm({
      title: "Eliminar empresa",
      body: `¿Estás seguro de eliminar la empresa "${name}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
    })
    if (!ok) return

    try {
      await companyMut.remove(id)
      notify.success("Empresa eliminada")
    } catch (e: any) {
      notify.error("Error al eliminar empresa", {
        description: e?.message,
      })
    }
  }

  const columns = createColumns({
    onDeleteCompany: handleDeleteCompany,
  })

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumbs */}
      <div className="px-6 pt-6 pb-4">
        <div className="text-sm text-muted-foreground">
          Admin /{" "}
          <span className="text-foreground font-medium">Empresas</span>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="px-6 pb-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[280px] max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o dominio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Botón Crear */}
          <div className="ml-auto">
            <Button onClick={() => setDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Nueva empresa
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="flex-1 px-6 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Cargando empresas...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={filteredCompanies} />
        )}
      </div>

      {/* Dialog de Creación */}
      <CreateCompanyDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreateCompany}
      />
    </div>
  )
}
