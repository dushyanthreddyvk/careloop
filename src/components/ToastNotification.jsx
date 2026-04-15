import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { toastVariant } from "../animations/variants";

export function ToastNotification({ toast }) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[60]">
      <AnimatePresence>
        {toast ? (
          <motion.div
            variants={toastVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex items-start gap-3 rounded-[24px] border border-white/80 bg-white/95 px-4 py-4 shadow-[0_22px_80px_-28px_rgba(15,23,42,0.5)] backdrop-blur-xl"
          >
            <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-500" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{toast.title}</p>
              <p className="mt-1 text-sm text-slate-500">{toast.message}</p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
