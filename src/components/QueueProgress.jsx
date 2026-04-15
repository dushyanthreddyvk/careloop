import { motion } from "framer-motion";

export function QueueProgress({ current, total, wait, room }) {
  const percent = Math.min((current / total) * 100, 100);

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.22)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-sky-600">Live Queue</p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900">
            Patient {current} of {total}
          </h3>
        </div>
        <div className="rounded-2xl bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
          {wait} min ETA
        </div>
      </div>

      <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-sky-500 via-blue-500 to-teal-400"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
        <span>{percent.toFixed(0)}% progressed</span>
        <span>{room}</span>
      </div>
    </div>
  );
}
