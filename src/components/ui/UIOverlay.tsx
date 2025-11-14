'use client';
import { useEffect } from 'react';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useUIStore } from '@/store/ui-store';

export default function UIOverlay() {
  const { notify, confirmOpen, confirmOpts, _setConfirmOpen, _resolveConfirm } = useUIStore();

  useEffect(() => {
    useUIStore.setState({
      notify: {
        success: (msg, opts) => toast.success(msg, { description: opts?.description, position: 'top-right' }),
        error: (msg, opts) => toast.error(msg, { description: opts?.description, position: 'top-right' }),
        warning: (msg, opts) => toast.warning(msg, { description: opts?.description, position: 'top-right' }),
        info: (msg, opts) => toast.info(msg, { description: opts?.description, position: 'top-right' }),
      },
    });
  }, []);

  return (
    <>
      <Toaster position="top-right" />

      <AlertDialog open={confirmOpen} onOpenChange={_setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className={confirmOpts.destructive ? 'text-[hsl(var(--destructive))]' : ''}>
              {confirmOpts.title ?? 'Are you sure?'}
            </AlertDialogTitle>
            {confirmOpts.description && (
              <AlertDialogDescription>{confirmOpts.description}</AlertDialogDescription>
            )}
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => _resolveConfirm(false)}>
              {confirmOpts.cancelText ?? 'Cancel'}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => _resolveConfirm(true)}
              className={confirmOpts.destructive ? 'bg-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive))/90]' : undefined}
            >
              {confirmOpts.confirmText ?? 'Continue'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}