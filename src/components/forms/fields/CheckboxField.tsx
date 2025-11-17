"use client"
import { FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { FieldValues, Control } from "react-hook-form"

interface CheckboxFieldProps<TValues extends FieldValues = FieldValues> {
  control: Control<TValues>
  name: string
  label?: string
  description?: string
  disabled?: boolean
}

export function CheckboxField<TValues extends FieldValues = FieldValues>({
  control,
  name,
  label,
  description,
  disabled,
}: CheckboxFieldProps<TValues>) {
  return (
    <FormField
      control={control}
      name={name as any}
      render={({ field }) => (
        <FormItem className="space-y-0">
          <div className="flex items-center gap-2">
            <FormControl>
              <Checkbox checked={!!field.value} onCheckedChange={(v) => field.onChange(!!v)} disabled={disabled} />
            </FormControl>
            {label && <FormLabel className="mb-0">{label}</FormLabel>}
          </div>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
