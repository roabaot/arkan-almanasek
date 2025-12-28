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

const toastPositions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

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
      setToasts((prev) => {
        const targetPosition = toastPosition ?? position;

        const samePosition = prev.filter(
          (toast) => toast.position === targetPosition
        );
        const otherPositions = prev.filter(
          (toast) => toast.position !== targetPosition
        );

        const updatedForPosition = [
          ...samePosition,
          { id, type, message, position: targetPosition },
        ];

        // keep only the last 3 toasts for this specific position
        const limitedForPosition =
          updatedForPosition.length > 3
            ? updatedForPosition.slice(updatedForPosition.length - 3)
            : updatedForPosition;

        return [...otherPositions, ...limitedForPosition];
      });
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
          {toastPositions.map((toastPosition) => {
            const positionToasts = toasts.filter(
              (toast) => toast.position === toastPosition
            );

            if (positionToasts.length === 0) return null;

            return (
              <div
                key={toastPosition}
                className={`pointer-events-none absolute flex flex-col px-4 space-y-2 ${positionClasses[toastPosition]}`}
              >
                <AnimatePresence>
                  {positionToasts.map((toast) => (
                    <motion.div
                      key={toast.id}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      transition={{ duration: 0.7, type: "spring" }}
                      className={`rounded-md px-4 py-3 shadow-lg pointer-events-auto text-sm font-secondary ${
                        toast.type === "success"
                          ? "bg-emerald-600 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {toast.message}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
