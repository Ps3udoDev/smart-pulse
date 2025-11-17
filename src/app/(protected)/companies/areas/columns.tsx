"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { EditableCheckbox } from "@/components/custom/inputs/EditableCheckbox"
import { EditableInput } from "@/components/custom/inputs/EditableInput"
import { AreaRow } from "./types"

export function createColumns(actions: {
  onToggleEnabled: (id: string, enabled: boolean) => void
  onEditDescription: (id: string, description: string) => void
  onDeleteArea: (id: string) => void
}): ColumnDef<AreaRow>[] {
  return [
    {
      id: "enabled",
      header: "Habilitado",
      size: 100,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <EditableCheckbox
            checked={row.original.enabled}
            onChange={(checked) =>
              actions.onToggleEnabled(row.original.id, checked)
            }
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Nombre",
      size: 200,
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      id: "description",
      header: "Descripción",
      cell: ({ row }) => (
        <EditableInput
          value={row.original.description ?? ""}
          onSave={(value) =>
            actions.onEditDescription(row.original.id, value)
          }
          placeholder="Sin descripción..."
          multiline
        />
      ),
    },
    {
      id: "actions",
      header: "",
      size: 80,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => actions.onDeleteArea(row.original.id)}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]
}