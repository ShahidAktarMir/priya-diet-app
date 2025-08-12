import React, { createContext, useContext, useReducer, useCallback } from 'react';

// Toast types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// Toast actions
const TOAST_ACTIONS = {
  ADD_TOAST: 'ADD_TOAST',
  REMOVE_TOAST: 'REMOVE_TOAST',
  CLEAR_ALL: 'CLEAR_ALL'
};

// Initial state
const initialState = {
  toasts: []
};

// Reducer function
function toastReducer(state, action) {
  switch (action.type) {
    case TOAST_ACTIONS.ADD_TOAST:
      return {
        ...state,
        toasts: [...state.toasts, action.payload]
      };
    case TOAST_ACTIONS.REMOVE_TOAST:
      return {
        ...state,
        toasts: state.toasts.filter(toast => toast.id !== action.payload)
      };
    case TOAST_ACTIONS.CLEAR_ALL:
      return {
        ...state,
        toasts: []
      };
    default:
      return state;
  }
}

// Create context
const ToastContext = createContext();

// Toast provider component
export function ToastProvider({ children }) {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  // Add toast function
  const addToast = useCallback((message, type = TOAST_TYPES.INFO, options = {}) => {
    const id = Date.now() + Math.random();
    const toast = {
      id,
      message,
      type,
      duration: options.duration || 5000,
      persistent: options.persistent || false,
      action: options.action || null,
      createdAt: Date.now()
    };

    dispatch({ type: TOAST_ACTIONS.ADD_TOAST, payload: toast });

    // Auto-remove toast if not persistent
    if (!toast.persistent) {
      setTimeout(() => {
        dispatch({ type: TOAST_ACTIONS.REMOVE_TOAST, payload: id });
      }, toast.duration);
    }

    return id;
  }, []);

  // Remove toast function
  const removeToast = useCallback((id) => {
    dispatch({ type: TOAST_ACTIONS.REMOVE_TOAST, payload: id });
  }, []);

  // Clear all toasts
  const clearAllToasts = useCallback(() => {
    dispatch({ type: TOAST_ACTIONS.CLEAR_ALL });
  }, []);

  // Convenience methods
  const showSuccess = useCallback((message, options) => 
    addToast(message, TOAST_TYPES.SUCCESS, options), [addToast]);
  
  const showError = useCallback((message, options) => 
    addToast(message, TOAST_TYPES.ERROR, options), [addToast]);
  
  const showWarning = useCallback((message, options) => 
    addToast(message, TOAST_TYPES.WARNING, options), [addToast]);
  
  const showInfo = useCallback((message, options) => 
    addToast(message, TOAST_TYPES.INFO, options), [addToast]);

  const value = {
    toasts: state.toasts,
    addToast,
    removeToast,
    clearAllToasts,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
}

// Custom hook to use toast context
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}