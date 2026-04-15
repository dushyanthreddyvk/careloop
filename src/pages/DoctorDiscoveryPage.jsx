import { motion } from "framer-motion";
import { Filter, SlidersHorizontal } from "lucide-react";
import { staggerContainer, staggerItem } from "../animations/variants";
import { DoctorCard } from "../components/DoctorCard";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";

export function DoctorDiscoveryPage({ doctors, onBook }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Doctor Discovery"
        title="Find specialists that fit your care journey"
        subtitle="Filter by expertise, hospital, and real-time availability."
        action={
          <div className="flex gap-3">
            <Button variant="secondary">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button variant="ghost">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Sort
            </Button>
          </div>
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-3 rounded-[28px] border border-white/80 bg-white/90 p-4 sm:grid-cols-4"
      >
        {["Cardiology", "Neurology", "Pediatrics", "Dermatology"].map((tag) => (
          <button
            key={tag}
            className="rounded-2xl bg-slate-50 px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-sky-50 hover:text-sky-700"
          >
            {tag}
          </button>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-4 xl:grid-cols-2"
      >
        {doctors.map((doctor) => (
          <motion.div key={doctor.id} variants={staggerItem}>
            <DoctorCard doctor={doctor} onBook={onBook} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
