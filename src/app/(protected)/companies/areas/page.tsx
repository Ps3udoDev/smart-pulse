"use client"

import * as React from "react"
import { useEffect, useMemo, useState } from "react"
import type { AreaCatalog } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Search } from "lucide-react"
import { EditableDataTable } from "@/components/custom/tables/EditableDataTable"
import { createColumns } from "./columns"
import { mergeAreaMaps, type AreaRow, type AreaChange } from "./types"
import { CreateAreaDialog } from "./CreateAreaDialog"
import { useUIStore } from "@/store/ui-store"
import { useCompanies } from "@/lib/services/companies/useCompanies"
import {
  useAreaCatalog,
  useAreaCatalogMutations,
} from "@/lib/services/areaCatalog/useAreaCatalog"
import {
  useCompanyAreaMap,
  useCompanyAreaMapMutations,
} from "@/lib/services/companyAreaMap/useCompanyAreaMap"

type StatusFilter = "all" | "enabled" | "disabled"

export default function AreasPage() {
  const { confirm, notify } = useUIStore()
  const { data: companies = [] } = useCompanies()
  const { data: areas = [] } = useAreaCatalog()
  const [selectedCompany, setSelectedCompany] = useState<string>("all")
  const [status, setStatus] = useState<StatusFilter>("all")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [changes, setChanges] = useState<AreaChange[]>([])
  const [localStates, setLocalStates] = useState<Record<string, Partial<AreaRow>>>({})

  const companyId = selectedCompany === "all" ? null : selectedCompany

  const { data: maps = [] } = useCompanyAreaMap(companyId)
  const areaMut = useAreaCatalogMutations()
  const mapMut = useCompanyAreaMapMutations(companyId)

  // Establecer primera compañía automáticamente
  useEffect(() => {
    if (selectedCompany === "all" && companies.length > 0) {
      setSelectedCompany(companies[0].id)
    }
  }, [companies, selectedCompany])

  // Generar filas filtradas con estados locales aplicados
  const filteredRows: AreaRow[] = useMemo(() => {
    let merged = mergeAreaMaps(areas, maps, companyId)

    // Aplicar cambios locales para visualización inmediata
    merged = merged.map(row => ({
      ...row,
      ...(localStates[row.id] || {})
    }))

    // Filtro de estado
    if (status === "enabled") {
      merged = merged.filter((r) => r.enabled === true)
    } else if (status === "disabled") {
      merged = merged.filter((r) => r.enabled === false)
    }

    // Filtro de búsqueda
    if (searchQuery.trim()) {
      const needle = searchQuery.trim().toLowerCase()
      merged = merged.filter(
        (r) =>
          r.name.toLowerCase().includes(needle) ||
          (r.description ?? "").toLowerCase().includes(needle)
      )
    }

    return merged
  }, [areas, maps, companyId, status, searchQuery, localStates])

  // Manejar cambios
  function applyChange(change: AreaChange) {
    // Actualizar estado local para visualización inmediata
    setLocalStates(prev => ({
      ...prev,
      [change.id]: {
        ...prev[change.id],
        ...change
      }
    }))

    // Registrar cambio
    setChanges((prev) => {
      const idx = prev.findIndex((c) => c.id === change.id)
      
      // Obtener valores originales
      const originalRow = mergeAreaMaps(areas, maps, companyId).find(r => r.id === change.id)
      if (!originalRow) return prev

      // Construir el cambio combinado
      const combinedChange = idx >= 0 ? { ...prev[idx], ...change } : change

      // Verificar si hay diferencias con el original
      const hasEnabledChange = typeof combinedChange.enabled === 'boolean' && 
                               combinedChange.enabled !== originalRow.enabled
      const hasDescriptionChange = typeof combinedChange.description === 'string' && 
                                   combinedChange.description !== (originalRow.description ?? '')

      // Si no hay cambios reales, remover de la lista
      if (!hasEnabledChange && !hasDescriptionChange) {
        return prev.filter(c => c.id !== change.id)
      }

      // Si hay cambios, actualizar o agregar
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = combinedChange
        return next
      }
      return [...prev, change]
    })
  }

  // Guardar todos los cambios
  async function handleSaveAll() {
    const count = changes.length
    if (count === 0) return

    const ok = await confirm({
      title: "Confirmar cambios",
      body: `Se guardarán ${count} cambio(s) en las áreas.`,
      confirmText: "Guardar",
    })
    if (!ok) return

    try {
      for (const change of changes) {
        // Actualizar estado enabled
        if (typeof change.enabled === "boolean" && companyId) {
          if (change.enabled) {
            await mapMut.upsert(change.id, true)
          } else {
            await mapMut.setEnabled(change.id, false)
          }
        }

        // Actualizar descripción
        if (typeof change.description !== "undefined") {
          await areaMut.update(change.id, {
            description: change.description || null,
          })
        }
      }

      notify.success("Cambios guardados exitosamente")
      setChanges([])
      setLocalStates({})
    } catch (e: any) {
      notify.error("Error al guardar cambios", {
        description: e?.message || "Ocurrió un error inesperado",
      })
    }
  }

  // Crear nueva área
  async function handleCreateArea(values: {
    name: string
    description: string
  }) {
    try {
      await areaMut.create({
        name: values.name,
        description: values.description || null,
        is_active: true,
      } as Partial<AreaCatalog>)
      notify.success("Área creada exitosamente")
    } catch (e: any) {
      notify.error("Error al crear área", {
        description: e?.message || "Ocurrió un error inesperado",
      })
    }
  }

  // Eliminar área
  async function handleDeleteArea(id: string) {
    const ok = await confirm({
      title: "Eliminar área",
      body: "Esta acción no se puede deshacer. ¿Estás seguro?",
      confirmText: "Eliminar",
    })
    if (!ok) return

    try {
      await areaMut.remove(id)
      notify.success("Área eliminada")
      // Remover cambios pendientes de esta área
      setChanges((prev) => prev.filter((c) => c.id !== id))
      setLocalStates(prev => {
        const next = { ...prev }
        delete next[id]
        return next
      })
    } catch (e: any) {
      notify.error("Error al eliminar área", {
        description: e?.message,
      })
    }
  }

  const columns = createColumns({
    onToggleEnabled: (id, enabled) => applyChange({ id, enabled }),
    onEditDescription: (id, description) => applyChange({ id, description }),
    onDeleteArea: handleDeleteArea,
  })

  return (
    <div className="flex flex-col h-full">
      {/* Breadcrumbs */}
      <div className="px-6 pt-6 pb-4">
        <div className="text-sm text-muted-foreground">
          Admin / Catálogos /{" "}
          <span className="text-foreground font-medium">Áreas</span>
        </div>
      </div>

      {/* Filtros y Acciones */}
      <div className="px-6 pb-4 space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          {/* Selector de Empresa */}
          <Select value={selectedCompany} onValueChange={setSelectedCompany}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Seleccionar empresa" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas las empresas</SelectItem>
              {companies.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Filtro de Estado */}
          <Select value={status} onValueChange={(v: StatusFilter) => setStatus(v)}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="enabled">Habilitadas</SelectItem>
              <SelectItem value="disabled">Deshabilitadas</SelectItem>
            </SelectContent>
          </Select>

          {/* Buscador */}
          <div className="relative flex-1 min-w-[280px] max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o descripción..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Botón Crear */}
          <CreateAreaDialog onCreated={handleCreateArea} />

          {/* Indicador de Cambios y Botón Guardar */}
          <div className="ml-auto flex items-center gap-3">
            {changes.length > 0 && (
              <Badge variant="secondary" className="px-3">
                {changes.length} cambio{changes.length > 1 ? "s" : ""}
              </Badge>
            )}
            <Button
              onClick={handleSaveAll}
              disabled={changes.length === 0}
              size="default"
            >
              <Save className="mr-2 h-4 w-4" />
              Guardar cambios
            </Button>
          </div>
        </div>
      </div>

      {/* Tabla */}
      <div className="flex-1 px-6 pb-6">
        <EditableDataTable columns={columns} data={filteredRows} />
      </div>
    </div>
  )
}