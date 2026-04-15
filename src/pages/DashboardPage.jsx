import { motion } from "framer-motion";
import { CalendarCheck2, HeartPulse, ShieldAlert, TimerReset } from "lucide-react";
import {
  floatingCard,
  staggerContainer,
  staggerItem,
} from "../animations/variants";
import { AppointmentCard } from "../components/AppointmentCard";
import { QueueProgress } from "../components/QueueProgress";
import { SectionHeader } from "../components/SectionHeader";

const stats = [
  {
    title: "Upcoming Visits",
    value: "03",
    detail: "Across cardiology and diagnostics",
    icon: CalendarCheck2,
    accent: "from-sky-500 to-blue-500",
  },
  {
    title: "Vitals Trend",
    value: "Stable",
    detail: "Pulse and BP within target range",
    icon: HeartPulse,
    accent: "from-teal-500 to-cyan-500",
  },
  {
    title: "Emergency Access",
    value: "Fast",
    detail: "One-tap contact and live location support",
    icon: ShieldAlert,
    accent: "from-rose-500 to-orange-400",
  },
];

export function DashboardPage({ appointments }) {
  return (
    <div className="space-y-8">
      <section className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr]">
        <motion.div
          {...floatingCard(0)}
          className="overflow-hidden rounded-[32px] border border-white/80 bg-slate-950 p-7 text-white"
        >
          <div className="absolute" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-300">
            Today at a glance
          </p>
          <h2 className="mt-4 max-w-xl text-3xl font-semibold sm:text-4xl">
            Healthcare coordination that feels calm, fast, and visible.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Track the OPD queue, rebook consultations, review records, and keep
            essential emergency actions within immediate reach.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {["OPD Active", "Records Synced", "Prescriptions Updated"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm text-slate-100"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div {...floatingCard(0.12)}>
          <QueueProgress current={18} total={25} wait={12} room="Room 204, OPD Wing" />
        </motion.div>
      </section>

      <motion.section
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-3"
      >
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              variants={staggerItem}
              {...floatingCard(index * 0.08)}
              className="rounded-[28px] border border-white/70 bg-white/90 p-5"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${stat.accent} text-white`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="mt-5 text-sm text-slate-500">{stat.title}</p>
              <h3 className="mt-2 text-3xl font-semibold text-slate-900">
                {stat.value}
              </h3>
              <p className="mt-2 text-sm text-slate-500">{stat.detail}</p>
            </motion.div>
          );
        })}
      </motion.section>

      <section>
        <SectionHeader
          eyebrow="Appointments"
          title="Next consultations"
          subtitle="Your visits are organized with live status and location context."
        />
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-4 lg:grid-cols-2"
        >
          {appointments.map((appointment) => (
            <motion.div key={appointment.id} variants={staggerItem}>
              <AppointmentCard appointment={appointment} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-[32px] border border-white/80 bg-white/90 p-6"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700">
            <TimerReset className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Recovery timeline
            </h3>
            <p className="text-sm text-slate-500">
              Monitor follow-ups, diagnostics, and treatment milestones.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            ["Consultation", "Completed"],
            ["Lab Review", "In 2 days"],
            ["Medication Refill", "Next week"],
            ["Specialist Check", "Pending"],
          ].map(([title, status]) => (
            <div key={title} className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{title}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{status}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
