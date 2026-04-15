import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { cardHover } from "../animations/variants";
import { Button } from "./Button";

export function DoctorCard({ doctor, onBook }) {
  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.22)]"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 to-teal-400 text-lg font-semibold text-white">
          {doctor.initials}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{doctor.name}</h3>
              <p className="text-sm text-slate-500">{doctor.specialty}</p>
            </div>
            <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-600">
              {doctor.availability}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-medium text-sky-700">
              {doctor.hospital}
            </span>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              {doctor.experience}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{doctor.rating}</span>
          </div>
          <p className="mt-1 text-sm text-slate-500">{doctor.fee}</p>
        </div>
        <Button onClick={() => onBook(doctor)}>Book Slot</Button>
      </div>
    </motion.div>
  );
}
