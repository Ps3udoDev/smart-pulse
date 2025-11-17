"use client"

import * as React from "react"
import { useMemo, useState } from "react"
import type { Module } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { DataTable } from "@/components/custom/tables/DataTable"
import { createColumns } from "./columns"
import { CreateModuleDialog } from "./CreateModuleDialog"
import { useUIStore } from "@/store/ui-store"
import { useModules, useModuleMutations } from "@/lib/services/modules/useModules"

export default function ModulesPage() {
  const { confirm, notify } = useUIStore()
  const { data: modules = [], isLoading } = useModules()
  const moduleMut = useModuleMutations()
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [dialogOpen, setDialogOpen] = useState(false)

  // Filtrar módulos por búsqueda
  const filteredModules: Module[] = useMemo(() => {
    if (!searchQuery.trim()) return modules

    const needle = searchQuery.trim().toLowerCase()
    return modules.filter(
      (m) =>
        m.name.toLowerCase().includes(needle) ||
        m.code.toLowerCase().includes(needle) ||
        (m.content ?? "").toLowerCase().includes(needle)
    )
  }, [modules, searchQuery])

  // Crear nuevo módulo
  async function handleCreateModule(values: {
    name: string
    code: string
    content: string
  }) {
    try {
      await moduleMut.create({
        name: values.name,
        code: values.code,
        content: values.content || null,
      } as Partial<Module>)
      notify.success("Módulo creado exitosamente")
      setDialogOpen(false)
    } catch (e: any) {
      notify.error("Error al crear módulo", {
        description: e?.message || "Ocurrió un error inesperado",
      })
      throw e
    }
  }

  // Eliminar módulo
  async function handleDeleteModule(id: string, name: string) {
    const ok = await confirm({
      title: "Eliminar módulo",
      body: `¿Estás seguro de eliminar el módulo "${name}"? Esta acción no se puede deshacer.`,
      confirmText: "Eliminar",
    })
    if (!ok) return

    try {
      await moduleMut.remove(id)
      notify.success("Módulo eliminado")
    } catch (e: any) {
      notify.error("Error al eliminar módulo", {
        description: e?.message,
      })
    }
  }

  const columns = createColumns({
    onDeleteModule: handleDeleteModule,
  })

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumbs */}
      <div className="px-6 pt-6 pb-4">
        <div className="text-sm text-muted-foreground">
          Admin / DMIS /{" "}
          <span className="text-foreground font-medium">Módulos</span>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="px-6 pb-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Buscador */}
          <div className="relative flex-1 min-w-[280px] max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre, código o contenido..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Botón Crear */}
          <div className="ml-auto">
            <Button onClick={() => setDialogOpen(true)}>
              <Search className="mr-2 h-4 w-4" />
              Nuevo módulo
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="flex-1 px-6 pb-6">
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-muted-foreground">Cargando módulos...</p>
          </div>
        ) : (
          <DataTable columns={columns} data={filteredModules} />
        )}
      </div>

      {/* Dialog de Creación */}
      <CreateModuleDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onCreated={handleCreateModule}
      />
    </div>
  )
}
