"use client"

import { useForm, FormProvider, FieldValues } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { FieldRenderer } from "./fields"
import { DynamicFormProps } from "./types"

/**
 * Formulario genérico y atómico, configurable vía fields + schema.
 * Integra shadcn/ui + RHF + Zod (patrón recomendado).
 */
export function DynamicForm<TSchema extends z.ZodObject<any>>({
    schema,
    fields,
    defaultValues,
    onSubmit,
    submitLabel = "Guardar",
    columns = "grid-cols-1 md:grid-cols-2",
    className,
    footerSlot,
}: DynamicFormProps<TSchema>) {
    type FormData = z.infer<TSchema>
    
    const methods = useForm({
        resolver: zodResolver(schema) as any,
        defaultValues: (defaultValues || {}) as any,
        mode: "onSubmit",
    })
    
    const { handleSubmit, control, watch, formState } = methods
    const values = watch() as FormData
    
    return (
        <FormProvider {...methods}>
            <Form {...methods}>
                <form 
                    onSubmit={handleSubmit(onSubmit as any)} 
                    className={["space-y-4", className].filter(Boolean).join(" ")}
                >
                    <div className={`grid ${columns} gap-4`}>
                        {fields.map((f) => (
                            <FieldRenderer
                                key={f.name as string}
                                control={control}
                                field={f as any}
                                values={values}
                            />
                        ))}
                    </div>
                    
                    <div className="flex items-center justify-end gap-2 pt-2">
                        {footerSlot}
                        <Button type="submit" disabled={formState.isSubmitting}>
                            {formState.isSubmitting ? "Guardando…" : submitLabel}
                        </Button>
                    </div>
                </form>
            </Form>
        </FormProvider>
    )
}