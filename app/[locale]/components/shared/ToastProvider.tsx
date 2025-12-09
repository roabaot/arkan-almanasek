"use client";
import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

type ToastState = {
  id: number;
  type: ToastType;
  message: string;
  position: ToastPosition;
};

type ToastContextValue = {
  showToast: (args: {
    type?: ToastType;
    message: string;
    position?: ToastPosition;
  }) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return ctx;
};

let toastIdCounter = 1;

const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4 items-start justify-start",
  "top-center": "top-4 inset-x-0 justify-center",
  "top-right": "top-4 right-4 items-end justify-end",
  "bottom-left": "bottom-4 left-4 items-start justify-start",
  "bottom-center": "bottom-4 inset-x-0 justify-center",
  "bottom-right": "bottom-4 right-4 items-end justify-end",
};

const ToastProvider = ({
  children,
  position = "top-center",
}: {
  children: React.ReactNode;
  position?: ToastPosition;
}) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const showToast = useCallback(
    ({
      type = "success",
      message,
      position: toastPosition,
    }: {
      type?: ToastType;
      message: string;
      position?: ToastPosition;
    }) => {
      const id = toastIdCounter++;
      setToasts((prev) => [
        ...prev,
        { id, type, message, position: toastPosition ?? position },
      ]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3500);
    },
    [position]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed inset-0 z-[9999] pointer-events-none">
        <div className="absolute inset-0">
          <AnimatePresence>
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={`flex w-full max-w-sm px-4 ${
                  positionClasses[toast.position]
                }`}
              >
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.2 }}
                  className={`mb-2 rounded-md px-4 py-3 shadow-lg pointer-events-auto text-sm font-secondary ${
                    toast.type === "success"
                      ? "bg-emerald-600 text-white"
                      : "bg-red-600 text-white"
                  }`}
                >
                  {toast.message}
                </motion.div>
              </div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
