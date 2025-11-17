"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FieldValues, Control } from "react-hook-form"

interface NumberFieldProps<TValues extends FieldValues = FieldValues> {
  control: Control<TValues>
  name: string
  label?: string
  placeholder?: string
  description?: string
  disabled?: boolean
}

export function NumberField<TValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  placeholder,
  description,
  disabled,
}: NumberFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              inputMode="decimal"
              type="number"
              onChange={(e) => field.onChange(e.target.value === "" ? "" : Number(e.target.value))}
              placeholder={placeholder}
              disabled={disabled}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
