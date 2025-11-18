"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import type { Pillars } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { DataTable } from "@/components/custom/tables/DataTable"
import { createColumns } from "./columns"
import { CreatePillarDialog } from "./CreatePillarDialog"
import { useUIStore } from "@/store/ui-store"
import { usePillars, usePillarMutations } from "@/lib/services/pillars/usePillars"

export default function PillarsPage() {
  const { confirm, notify } = useUIStore()
  const { data: pillars = [], isLoading } = usePillars()
  const pillarMut = usePillarMutations()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  const filteredPillars: Pillars[] = useMemo(() => {
    if (!searchQuery.trim()) return pillars

    const needle = searchQuery.trim().toLowerCase()
    return pillars.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.code.toLowerCase().includes(needle) ||
        (p.description ?? "").toLowerCase().includes(needle)
    )
  }, [pillars, searchQuery])

  // Crear nuevo pilar
  async function handleCreatePillar(values: {
    name: string
    code: string
    description: string
  }) {
    try {
      await pillarMut.create({
        name: values.name,
        code: values.code,
        description: values.description || null,
      } as Partial<Pillars>)
      notify.success("Pilar creado exitosamente")
      setDialogOpen(false)
    } catch (e: any) {
      notify.error("Error al crear pilar", {
        description: e?.message || "Ocurrió un error inesperado",
      })
      throw e
    }
  }

  // Eliminar pilar
  async function handleDeletePillar(id: string, name: string) {
    const ok = await confirm({
      title: "Eliminar pilar",
      body: `¿Estás seguro de eliminar el pilar "${name}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
    })
    if (!ok) return

    try {
      await pillarMut.remove(id)
      notify.success("Pilar eliminado")
    } catch (e: any) {
      notify.error("Error al eliminar pilar", {
        description: e?.message,
      })
    }
  }

  const columns = createColumns({
    onDeletePillar: handleDeletePillar,
  })

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumbs */}
      <div className="px-6 pt-6 pb-4">
        <div className="text-sm text-muted-foreground">
          Admin / DMIS /{" "}
          <span className="text-foreground font-medium">Pilares</span>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="px-6 pb-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[280px] max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, código o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Botón Crear */}
          <div className="ml-auto">
            <Button onClick={() => setDialogOpen(true)}>
              <Search className="mr-2 h-4 w-4" />
              Nuevo pilar
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="flex-1 px-6 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Cargando pilares...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={filteredPillars} />
        )}
      </div>

      {/* Dialog de Creación */}
      <CreatePillarDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreatePillar}
      />
    </div>
  )
}
