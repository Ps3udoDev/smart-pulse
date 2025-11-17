"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Control, FieldValues } from "react-hook-form"

interface SwitchFieldProps<TValues extends FieldValues = FieldValues> {
  control: Control<TValues>
  name: string
  label?: string
  description?: string
  disabled?: boolean
}

export function SwitchField<TValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: SwitchFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem>
          <div className="flex items-center justify-between">
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Switch checked={!!field.value} onCheckedChange={field.onChange} disabled={disabled} />
            </FormControl>
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
