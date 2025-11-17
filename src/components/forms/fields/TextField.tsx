"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Control, FieldValues, Path } from "react-hook-form"

interface TextFieldProps<TValues extends FieldValues = FieldValues> {
  control: Control<TValues>
  name: Path<TValues>
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
}

export function TextField<TValues extends FieldValues = FieldValues>({
  control, 
  name, 
  label, 
  placeholder, 
  description, 
  disabled,
}: TextFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} placeholder={placeholder} disabled={disabled} />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}