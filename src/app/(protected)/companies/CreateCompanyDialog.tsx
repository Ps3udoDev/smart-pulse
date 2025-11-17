"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload } from "lucide-react"
import { uploadCompanyFile } from "@/lib/services/companies/service"
import Image from "next/image"

interface CreateCompanyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: (values: {
    name: string
    color: string
    domain: string
    logo_url?: string
    bg_url?: string
  }) => Promise<void>
}

export function CreateCompanyDialog({ open, onOpenChange, onCreated }: CreateCompanyDialogProps) {
  const [name, setName] = React.useState("")
  const [color, setColor] = React.useState("#000000")
  const [domain, setDomain] = React.useState("")
  const [logoFile, setLogoFile] = React.useState<File | null>(null)
  const [bgFile, setBgFile] = React.useState<File | null>(null)
  const [logoPreview, setLogoPreview] = React.useState<string | null>(null)
  const [bgPreview, setBgPreview] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [uploadProgress, setUploadProgress] = React.useState<string>("")

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleBgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setBgFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setBgPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setIsSubmitting(true)
    try {
      let logoUrl: string | undefined
      let bgUrl: string | undefined

      // Subir logo si existe
      if (logoFile) {
        setUploadProgress("Subiendo logo...")
        logoUrl = await uploadCompanyFile(logoFile, "company-assets", "logos")
      }

      // Subir background si existe
      if (bgFile) {
        setUploadProgress("Subiendo background...")
        bgUrl = await uploadCompanyFile(bgFile, "company-assets", "backgrounds")
      }

      setUploadProgress("Creando empresa...")
      await onCreated({
        name: name.trim(),
        color,
        domain: domain.trim(),
        logo_url: logoUrl,
        bg_url: bgUrl,
      })

      // Resetear formulario
      setName("")
      setColor("#000000")
      setDomain("")
      setLogoFile(null)
      setBgFile(null)
      setLogoPreview(null)
      setBgPreview(null)
      setUploadProgress("")
    } catch (error) {
      console.error("Error al crear empresa:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-card max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Crear nueva empresa</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la empresa *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ej: Acme Corporation"
              required
              maxLength={100}
              autoFocus
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="domain">Dominio</Label>
            <Input
              id="domain"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="Ej: acme.com"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color corporativo *</Label>
            <div className="flex gap-2">
              <Input
                id="color"
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-20 h-10 cursor-pointer"
              />
              <Input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="#000000"
                maxLength={7}
                className="flex-1 font-mono"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Logo</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("logo")?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {logoFile ? logoFile.name : "Seleccionar logo"}
              </Button>
              <input
                id="logo"
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                className="hidden"
              />
            </div>
            {logoPreview && (
              <div className="relative w-32 h-32 rounded-md overflow-hidden bg-muted border">
                <Image
                  src={logoPreview}
                  alt="Vista previa del logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="bg">Background</Label>
            <div className="flex items-center gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("bg")?.click()}
                className="w-full"
              >
                <Upload className="mr-2 h-4 w-4" />
                {bgFile ? bgFile.name : "Seleccionar background"}
              </Button>
              <input
                id="bg"
                type="file"
                accept="image/*"
                onChange={handleBgChange}
                className="hidden"
              />
            </div>
            {bgPreview && (
              <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted border">
                <Image
                  src={bgPreview}
                  alt="Vista previa del background"
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>

          {uploadProgress && (
            <div className="text-sm text-muted-foreground text-center">
              {uploadProgress}
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={!name.trim() || isSubmitting}>
              {isSubmitting ? "Creando..." : "Crear empresa"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
