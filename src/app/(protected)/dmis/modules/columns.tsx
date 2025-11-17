"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Module } from "@/lib/types"

export function createColumns(actions: {
  onDeleteModule: (id: string, name: string) => void
}): ColumnDef<Module>[] {
  return [
    {
      accessorKey: "code",
      header: "Código",
      size: 150,
      cell: ({ row }) => (
        <span className="font-mono font-medium">{row.original.code}</span>
      ),
    },
    {
      accessorKey: "name",
      header: "Nombre",
      size: 250,
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "content",
      header: "Contenido",
      cell: ({ row }) => (
        <span className="text-muted-foreground line-clamp-2">
          {row.original.content || "Sin contenido"}
        </span>
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
            onClick={() => actions.onDeleteModule(row.original.id, row.original.name)}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]
}
