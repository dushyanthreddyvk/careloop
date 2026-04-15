import { Clock4, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { cardHover } from "../animations/variants";

export function AppointmentCard({ appointment }) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="rounded-[28px] border border-white/70 bg-white/90 p-5"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-sky-600">{appointment.type}</p>
          <h3 className="mt-2 text-lg font-semibold text-slate-900">
            {appointment.doctor}
          </h3>
          <p className="text-sm text-slate-500">{appointment.department}</p>
        </div>
        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
          {appointment.status}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
          <Clock4 className="h-4 w-4 text-sky-600" />
          <span>{appointment.time}</span>
        </div>
        <div className="flex items-center gap-2 rounded-2xl bg-slate-50 px-3 py-3">
          <MapPin className="h-4 w-4 text-teal-600" />
          <span>{appointment.location}</span>
        </div>
      </div>
    </motion.div>
  );
}
