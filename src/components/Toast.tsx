import React from 'react';

export interface ToastMessage {
  id: string;
  text: string;
  icon?: string;
  type?: 'success' | 'info' | 'warning';
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 pointer-events-none flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto px-4 py-3 rounded-xl bg-surface-panel/95 border border-brand-gold/40 shadow-2xl backdrop-blur-xl flex items-center gap-3 text-text-primary text-[13px] animate-in fade-in slide-in-from-bottom-2 duration-200"
          onClick={() => onDismiss(toast.id)}
        >
          <span className="material-symbols-outlined text-brand-gold text-[18px]">
            {toast.icon || 'check_circle'}
          </span>
          <span className="font-sans font-medium">{toast.text}</span>
          <button
            type="button"
            className="text-text-muted hover:text-text-primary ml-2 text-xs"
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(toast.id);
            }}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
