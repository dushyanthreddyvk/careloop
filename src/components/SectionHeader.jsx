import { motion } from "framer-motion";

export function SectionHeader({ eyebrow, title, subtitle, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5 }}
      className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"
    >
      <div>
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-600">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-xl font-semibold text-slate-900 sm:text-2xl">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-sm text-slate-500">{subtitle}</p>
        ) : null}
      </div>
      {action}
    </motion.div>
  );
}
