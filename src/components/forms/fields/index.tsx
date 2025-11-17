"use client"
import { Control, FieldValues } from "react-hook-form"
import { FieldConfig } from "../types"
import { TextField } from "./TextField"
import { TextareaField } from "./TextareaField"
import { NumberField } from "./NumberField"
import { CheckboxField } from "./CheckboxField"
import { SelectField } from "./SelectField"
import { SwitchField } from "./SwitchField"

interface FieldRendererProps<TValues extends FieldValues = FieldValues> {
  control: Control<TValues>
  field: FieldConfig<TValues>
  values: TValues
}

export function FieldRenderer<TValues extends FieldValues = FieldValues>({
  control,
  field,
  values,
}: FieldRendererProps<TValues>) {
  const hidden = typeof field.hidden === "function" ? field.hidden(values) : field.hidden
  if (hidden) return null

  const col = field.colSpan ? `col-span-${field.colSpan}` : "col-span-1"

  const commonProps = {
    control,
    name: field.name,
    label: field.label,
    description: field.description,
    disabled: field.disabled,
  }

  switch (field.type) {
    case "text":
      return (
        <div className={col}>
          <TextField 
            {...commonProps}
            placeholder={field.placeholder} 
          />
        </div>
      )
    case "textarea":
      return (
        <div className={col}>
          <TextareaField 
            {...commonProps}
            placeholder={field.placeholder} 
          />
        </div>
      )
    case "number":
      return (
        <div className={col}>
          <NumberField 
            {...commonProps}
            placeholder={field.placeholder} 
          />
        </div>
      )
    case "checkbox":
      return (
        <div className={col}>
          <CheckboxField 
            {...commonProps}
          />
        </div>
      )
    case "switch":
      return (
        <div className={col}>
          <SwitchField 
            {...commonProps}
          />
        </div>
      )
    case "select":
      return (
        <div className={col}>
          <SelectField 
            {...commonProps}
            placeholder={field.placeholder} 
            options={field.options} 
          />
        </div>
      )
    default:
      return null
  }
}