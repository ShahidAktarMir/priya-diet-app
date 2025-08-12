import React from 'react';
import { createPortal } from 'react-dom';
import { useToast } from '../context/ToastContext';
import Toast from './Toast';

function ToastContainer() {
  const { toasts } = useToast();

  // Don't render if no toasts
  if (toasts.length === 0) return null;

  return createPortal(
    <div
      className="toast-container fixed top-4 right-4 z-50 space-y-3 pointer-events-none"
      aria-live="polite"
      aria-label="Notifications"
    >
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <Toast toast={toast} />
        </div>
      ))}
    </div>,
    document.body
  );
}

export default ToastContainer;