"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface EditableInputProps {
  value: string
  onSave: (value: string) => void
  placeholder?: string
  className?: string
  multiline?: boolean
}

export function EditableInput({
  value: initialValue,
  onSave,
  placeholder = "Escribe aquí...",
  className,
  multiline = false,
}: EditableInputProps) {
  const [value, setValue] = React.useState(initialValue)
  const [isEditing, setIsEditing] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      if (!multiline && inputRef.current instanceof HTMLInputElement) {
        inputRef.current.select()
      }
    }
  }, [isEditing, multiline])

  const handleSave = () => {
    setIsEditing(false)
    const trimmedValue = value.trim()
    if (trimmedValue !== initialValue) {
      onSave(trimmedValue)
    } else {
      setValue(initialValue)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !multiline) {
      e.preventDefault()
      handleSave()
    }
    if (e.key === "Escape") {
      setValue(initialValue)
      setIsEditing(false)
    }
  }

  const baseClasses = cn(
    "w-full bg-transparent border-none outline-none resize-none",
    "focus:ring-0 focus:outline-none p-0",
    "text-sm text-foreground",
    className
  )

  const containerClasses = cn(
    "group rounded px-2 py-1 cursor-text transition-colors min-h-[32px] flex items-center",
    isEditing
      ? "bg-muted/50 ring-1 ring-ring"
      : "hover:bg-muted/30"
  )

  if (multiline) {
    return (
      <div 
        className={containerClasses} 
        onClick={() => {
          if (!isEditing) {
            setIsEditing(true)
          }
        }}
      >
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={baseClasses}
          rows={1}
          style={{ minHeight: '24px' }}
        />
      </div>
    )
  }

  return (
    <div 
      className={containerClasses} 
      onClick={() => {
        if (!isEditing) {
          setIsEditing(true)
        }
      }}
    >
      <input
        ref={inputRef as React.RefObject<HTMLInputElement>}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={baseClasses}
      />
    </div>
  )
}