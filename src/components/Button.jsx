import { motion } from "framer-motion";

const base =
  "inline-flex items-center justify-center rounded-2xl px-4 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400";

const styles = {
  primary:
    "bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-500 text-white shadow-lg shadow-sky-500/25",
  secondary:
    "border border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-200/70",
  ghost: "bg-sky-50 text-sky-700",
};

export function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={`${base} ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
