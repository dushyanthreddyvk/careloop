import { motion } from "framer-motion";
import { Clock3, MapPinned, Sparkles } from "lucide-react";
import { QueueProgress } from "../components/QueueProgress";
import { SectionHeader } from "../components/SectionHeader";

export function QueueTrackingPage() {
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Queue Tracking"
        title="Monitor your live OPD position"
        subtitle="Real-time queue movement with predicted wait time and room guidance."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <QueueProgress current={18} total={25} wait={12} room="Consultation Room 204" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: Clock3,
                title: "Expected wait",
                detail: "12 minutes",
                accent: "text-sky-600 bg-sky-50",
              },
              {
                icon: MapPinned,
                title: "Check-in desk",
                detail: "Counter B",
                accent: "text-teal-600 bg-teal-50",
              },
              {
                icon: Sparkles,
                title: "Auto alerts",
                detail: "Enabled",
                accent: "text-violet-600 bg-violet-50",
              },
            ].map(({ icon: Icon, title, detail, accent }) => (
              <div
                key={title}
                className="rounded-[28px] border border-white/80 bg-white/90 p-5"
              >
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-4 text-sm text-slate-500">{title}</p>
                <p className="mt-2 text-xl font-semibold text-slate-900">{detail}</p>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-[32px] border border-white/80 bg-white/90 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900">Queue movement</h3>
          <div className="mt-6 space-y-4">
            {[
              ["10:14 AM", "Token 14 completed"],
              ["10:22 AM", "Token 15 entered room 204"],
              ["10:31 AM", "Token 16 in consultation"],
              ["10:38 AM", "You are approaching next 3 patients"],
            ].map(([time, detail]) => (
              <motion.div
                key={`${time}-${detail}`}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4 rounded-[24px] bg-slate-50 p-4"
              >
                <div className="text-sm font-semibold text-sky-700">{time}</div>
                <p className="text-sm text-slate-600">{detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </div>
  );
}
