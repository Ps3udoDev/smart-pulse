'use client'
import { create } from 'zustand'
import { toast } from 'sonner'

export type ConfirmOptions = {
    title?: string
    body?: string
    description?: string
    confirmText?: string
    cancelText?: string
    destructive?: boolean
}

type UIState = {
    notify: {
        success: (msg: string, opts?: { description?: string }) => void
        error: (msg: string, opts?: { description?: string }) => void
        warning: (msg: string, opts?: { description?: string }) => void
        info: (msg: string, opts?: { description?: string }) => void
    }

    confirmOpen: boolean
    confirmOpts: ConfirmOptions
    _resolver?: (value: boolean) => void
    confirm: (opts: ConfirmOptions) => Promise<boolean>
    _setConfirmOpen: (open: boolean) => void
    _resolveConfirm: (value: boolean) => void
}

export const useUIStore = create<UIState>((set, get) => ({
    notify: {
        success: (msg: string, opts?: { description?: string }) => {
            toast.success(msg, { description: opts?.description })
        },
        error: (msg: string, opts?: { description?: string }) => {
            toast.error(msg, { description: opts?.description })
        },
        warning: (msg: string, opts?: { description?: string }) => {
            toast.warning(msg, { description: opts?.description })
        },
        info: (msg: string, opts?: { description?: string }) => {
            toast.info(msg, { description: opts?.description })
        },
    },

    confirmOpen: false,
    confirmOpts: {
        title: 'Are you sure?',
        description: 'This action cannot be undone.',
        confirmText: 'Continue',
        cancelText: 'Cancel',
        destructive: false,
    },
    _resolver: undefined,

    confirm: (opts) =>
        new Promise<boolean>((resolve) => {
            set({
                confirmOpen: true,
                confirmOpts: { ...get().confirmOpts, ...opts },
                _resolver: resolve
            })
        }),

    _setConfirmOpen: (open) => set({ confirmOpen: open }),

    _resolveConfirm: (value) => {
        const res = get()._resolver
        res?.(value)
        set({ confirmOpen: false, _resolver: undefined })
    },
}))