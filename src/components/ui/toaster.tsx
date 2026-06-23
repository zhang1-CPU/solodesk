import { useUIStore } from '@/stores/uiStore';
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from '@/components/ui/toast';

export function Toaster() {
  const toasts = useUIStore((state) => state.toasts);
  const removeToast = useUIStore((state) => state.removeToast);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, variant }) {
        return (
          <Toast
            key={id}
            variant={variant === 'destructive' ? 'destructive' : variant === 'success' ? 'success' : 'default'}
            onOpenChange={(open) => {
              if (!open) {
                removeToast(id);
              }
            }}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
