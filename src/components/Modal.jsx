import { AnimatePresence, motion } from "framer-motion";
import { modalVariant } from "../animations/variants";
import { Button } from "./Button";

export function Modal({
  open,
  title,
  subtitle,
  primaryLabel = "Confirm",
  secondaryLabel = "Close",
  onPrimary,
  onClose,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/35 p-4 backdrop-blur-sm sm:items-center"
        >
          <motion.div
            variants={modalVariant}
            initial="initial"
            animate="animate"
            exit="exit"
            className="w-full max-w-md rounded-[30px] border border-white/80 bg-white p-6 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.5)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
              Appointment Confirmed
            </p>
            <h3 className="mt-3 text-2xl font-semibold text-slate-900">{title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-500">{subtitle}</p>
            <div className="mt-6 flex gap-3">
              <Button className="flex-1" onClick={onPrimary}>
                {primaryLabel}
              </Button>
              <Button variant="secondary" className="flex-1" onClick={onClose}>
                {secondaryLabel}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
