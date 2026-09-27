import { CheckCircle, XCircle, Info } from 'lucide-react';
import { useToastStore } from '../../stores/toastStore';

export function Toaster() {
  const toasts = useToastStore((s) => s.toasts);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 md:bottom-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50 pointer-events-none">
      {toasts.map((toast) => {
        const Icon =
          toast.type === 'success' ? CheckCircle :
          toast.type === 'error' ? XCircle : Info;

        return (
          <div
            key={toast.id}
            className="bg-neutral-900 dark:bg-neutral-800 text-white px-4 py-2.5 rounded-xl shadow-elevated text-sm flex items-center gap-2 animate-fade-in"
          >
            <Icon
              size={16}
              className={
                toast.type === 'success'
                  ? 'text-success'
                  : toast.type === 'error'
                  ? 'text-danger'
                  : 'text-info'
              }
            />
            {toast.message}
          </div>
        );
      })}
    </div>
  );
}