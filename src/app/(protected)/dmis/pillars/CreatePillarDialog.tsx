"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface CreatePillarDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (values: {
    name: string
    code: string
    description: string
  }) => Promise<void>
}

export function CreatePillarDialog({ open, onOpenChange, onCreated }: CreatePillarDialogProps) {
  const [name, setName] = React.useState("")
  const [code, setCode] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !code.trim()) return

    setIsSubmitting(true)
    try {
      await onCreated({
        name: name.trim(),
        code: code.trim(),
        description: description.trim(),
      })
      // Resetear formulario
      setName("")
      setCode("")
      setDescription("")
    } catch (error) {
      console.error("Error al crear pilar:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card">
        <DialogHeader>
          <DialogTitle>Crear nuevo pilar</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre del pilar *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Seguridad de la Información"
              required
              maxLength={100}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="code">Código *</Label>
            <Input
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Ej: SEC-001"
              required
              maxLength={50}
              className="font-mono"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe el pilar..."
              rows={4}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim() || !code.trim() || isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear pilar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
