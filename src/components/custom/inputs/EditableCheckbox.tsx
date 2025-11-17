"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

interface EditableCheckboxProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  disabled?: boolean
}

export function EditableCheckbox({
  checked,
  onChange,
  label,
  disabled = false,
}: EditableCheckboxProps) {
  const [localChecked, setLocalChecked] = React.useState(checked)

  // Sincronizar con el prop checked
  React.useEffect(() => {
    setLocalChecked(checked)
  }, [checked])

  const handleChange = (value: boolean) => {
    setLocalChecked(value)
    onChange(value)
  }

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        checked={localChecked}
        onCheckedChange={handleChange}
        disabled={disabled}
        className={cn(
          "transition-all",
          !disabled && "hover:scale-110"
        )}
      />
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {label}
        </label>
      )}
    </div>
  )
}