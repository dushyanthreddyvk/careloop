import { FileText, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { cardHover } from "../animations/variants";

export function MedicalRecordCard({ record }) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="rounded-[28px] border border-white/70 bg-white/90 p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <FileText className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{record.title}</h3>
            <p className="text-sm text-slate-500">{record.date}</p>
          </div>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
          {record.type}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-slate-600">
        <Stethoscope className="h-4 w-4 text-teal-600" />
        <span>{record.doctor}</span>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-500">{record.summary}</p>
    </motion.div>
  );
}
