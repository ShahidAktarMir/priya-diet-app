import React, { useState, useEffect, useRef } from 'react';
import { useToast } from '../context/ToastContext';

// Toast icons
const ToastIcons = {
  success: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  error: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
  ),
  warning: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  ),
  info: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  )
};

function Toast({ toast }) {
  const { removeToast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const progressRef = useRef(null);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  // Toast styling based on type
  const toastStyles = {
    success: {
      bg: 'bg-gradient-to-r from-success-500 to-success-600',
      border: 'border-success-400',
      text: 'text-white',
      icon: 'text-success-100',
      progress: 'bg-success-200'
    },
    error: {
      bg: 'bg-gradient-to-r from-error-500 to-error-600',
      border: 'border-error-400',
      text: 'text-white',
      icon: 'text-error-100',
      progress: 'bg-error-200'
    },
    warning: {
      bg: 'bg-gradient-to-r from-warning-500 to-warning-600',
      border: 'border-warning-400',
      text: 'text-white',
      icon: 'text-warning-100',
      progress: 'bg-warning-200'
    },
    info: {
      bg: 'bg-gradient-to-r from-primary-500 to-primary-600',
      border: 'border-primary-400',
      text: 'text-white',
      icon: 'text-primary-100',
      progress: 'bg-primary-200'
    }
  };

  const style = toastStyles[toast.type] || toastStyles.info;

  // Handle toast lifecycle
  useEffect(() => {
    // Show toast
    const showTimer = setTimeout(() => setIsVisible(true), 50);

    // Start progress bar animation if not persistent
    if (!toast.persistent) {
      const startTime = Date.now();
      intervalRef.current = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, 100 - (elapsed / toast.duration) * 100);
        setProgress(remaining);
        
        if (remaining <= 0) {
          clearInterval(intervalRef.current);
        }
      }, 50);
    }

    return () => {
      clearTimeout(showTimer);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [toast.duration, toast.persistent]);

  // Handle toast removal
  const handleRemove = () => {
    setIsExiting(true);
    timeoutRef.current = setTimeout(() => {
      removeToast(toast.id);
    }, 300); // Match exit animation duration
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleRemove();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`
        toast-item relative max-w-sm w-full ${style.bg} ${style.border} ${style.text}
        border-2 rounded-xl shadow-large backdrop-blur-sm
        transform transition-all duration-300 ease-out
        ${isVisible && !isExiting ? 'animate-toast-slide-in' : ''}
        ${isExiting ? 'animate-toast-slide-out' : ''}
        hover:scale-105 hover:shadow-xl
        focus-within:ring-4 focus-within:ring-white/20
      `}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      {/* Progress bar */}
      {!toast.persistent && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 rounded-t-xl overflow-hidden">
          <div
            ref={progressRef}
            className={`h-full ${style.progress} transition-all duration-100 ease-linear animate-progress-bar`}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Toast content */}
      <div className="flex items-start p-4 pt-5">
        {/* Icon */}
        <div className={`flex-shrink-0 ${style.icon} mr-3 mt-0.5`}>
          {ToastIcons[toast.type]}
        </div>

        {/* Message */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium leading-5 break-words">
            {toast.message}
          </p>
          
          {/* Action button if provided */}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-xs font-semibold underline hover:no-underline focus:outline-none focus:ring-2 focus:ring-white/50 rounded"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          onClick={handleRemove}
          className="flex-shrink-0 ml-3 p-1 rounded-lg hover:bg-black/10 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors duration-200"
          aria-label="Close notification"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;