import { z } from "zod"
import { Control, FieldValues, Path } from "react-hook-form"

export type FieldType =
    | "text"
    | "textarea"
    | "number"
    | "checkbox"
    | "switch"
    | "select"

export type Option = { label: string; value: string | number }

export type FieldConfig<TValues extends FieldValues = FieldValues> = {
    name: Path<TValues>
    type: FieldType
    label?: string
    placeholder?: string
    description?: string
    disabled?: boolean
    options?: Option[]
    hidden?: boolean | ((values: TValues) => boolean)
    colSpan?: 1 | 2 | 3 | 4 | 5 | 6
}

export type DynamicFormProps<TSchema extends z.ZodObject<any>> = {
    schema: TSchema
    fields: FieldConfig<z.infer<TSchema>>[]
    defaultValues?: Partial<z.infer<TSchema>>
    onSubmit: (values: z.infer<TSchema>) => void | Promise<void>
    submitLabel?: string
    columns?: string
    className?: string
    footerSlot?: React.ReactNode
}

export type RHFControl<TValues extends FieldValues = FieldValues> = Control<TValues>