"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { z } from "zod"
import { FieldValues, Control } from "react-hook-form"

interface TextareaFieldProps<TValues extends FieldValues = FieldValues> {
  control: Control<TValues>
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
}

export function TextareaField<TValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  disabled,
}: TextareaFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Textarea {...field} placeholder={placeholder} disabled={disabled} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
