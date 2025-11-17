"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Option } from "../types"
import { Control, FieldValues } from "react-hook-form"

interface SelectFieldProps<TValues extends FieldValues = FieldValues> {
  control: Control<TValues>
  name: string
  label?: string
  description?: string
  disabled?: boolean
  placeholder?: string
  options?: Option[]
}

export function SelectField<TValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
  placeholder,
  options = [],
}: SelectFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select value={field.value ?? ""} onValueChange={field.onChange} disabled={disabled}>
              <SelectTrigger>
                <SelectValue placeholder={placeholder ?? "Selecciona…"} />
              </SelectTrigger>
              <SelectContent>
                {options.map(opt => (
                  <SelectItem key={`${opt.value}`} value={`${opt.value}`}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
