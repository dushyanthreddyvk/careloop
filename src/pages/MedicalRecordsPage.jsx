import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "../animations/variants";
import { MedicalRecordCard } from "../components/MedicalRecordCard";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";

export function MedicalRecordsPage({ records }) {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Medical Records"
        title="Organized, accessible health history"
        subtitle="Consultation summaries, prescriptions, and lab updates are grouped for quick review."
        action={<Button variant="secondary">Export Summary</Button>}
      />

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-3 rounded-[28px] border border-white/80 bg-white/90 p-4 md:grid-cols-3"
      >
        {[
          ["Total Records", "24"],
          ["Prescriptions", "08"],
          ["Diagnostics", "06"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-4 xl:grid-cols-2"
      >
        {records.map((record) => (
          <motion.div key={record.id} variants={staggerItem}>
            <MedicalRecordCard record={record} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
