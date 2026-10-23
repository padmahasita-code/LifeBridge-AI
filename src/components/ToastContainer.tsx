import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md transition-all duration-200 ${
            toast.type === 'error'
              ? 'border-rose-500/30 bg-rose-950/90 text-rose-200'
              : toast.type === 'info'
              ? 'border-cyan-500/30 bg-slate-900/95 text-cyan-200'
              : 'border-emerald-500/30 bg-slate-900/95 text-emerald-200'
          }`}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            {toast.type === 'error' ? (
              <AlertCircle className="h-4 w-4 shrink-0 text-rose-400" />
            ) : toast.type === 'info' ? (
              <Info className="h-4 w-4 shrink-0 text-cyan-400" />
            ) : (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            )}
            <p className="text-xs font-medium leading-relaxed truncate">{toast.message}</p>
          </div>
          <button
            onClick={() => dismissToast(toast.id)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
};
