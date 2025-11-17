"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Company } from "@/lib/types"
import Image from "next/image"

export function createColumns(actions: {
  onDeleteCompany: (id: string, name: string) => void
}): ColumnDef<Company>[] {
  return [
    {
      accessorKey: "logo_url",
      header: "Logo",
      size: 80,
      cell: ({ row }) => (
        <div className="flex justify-center">
          {row.original.logo_url ? (
            <div className="relative w-10 h-10 rounded-md overflow-hidden bg-muted">
              <Image
                src={row.original.logo_url}
                alt={`Logo de ${row.original.name}`}
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                {row.original.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
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
      accessorKey: "domain",
      header: "Dominio",
      size: 200,
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {row.original.domain || "Sin dominio"}
        </span>
      ),
    },
    {
      accessorKey: "color",
      header: "Color",
      size: 120,
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 rounded border"
            style={{ backgroundColor: row.original.primary_color || "#000000" }}
          />
          <span className="text-sm font-mono">
            {row.original.primary_color || "#000000"}
          </span>
        </div>
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
            onClick={() => actions.onDeleteCompany(row.original.id, row.original.name)}
            className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ]
}
