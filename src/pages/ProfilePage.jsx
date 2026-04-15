import { motion } from "framer-motion";
import { BadgeCheck, HeartPulse, ShieldPlus, LogOut } from "lucide-react";
import { SectionHeader } from "../components/SectionHeader";
import { Button } from "../components/Button";

export function ProfilePage({ user, onLogout }) {
  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-white/80 bg-white/90 p-6"
      >
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-[28px] bg-gradient-to-br from-sky-500 to-teal-400 text-2xl font-semibold text-white">
            {user?.name ? user.name.substring(0, 2).toUpperCase() : "CL"}
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-600">
              Patient Profile
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              {user?.name || "Careloop User"}
            </h2>
            <p className="mt-2 text-sm text-slate-500">UHID: {user?.id || "CL-2026-0012"}</p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Age", "32"],
            ["Gender", "Female"],
            ["Blood Group", "B+"],
            ["Insurance", "Active"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-[24px] bg-slate-50 p-4">
              <p className="text-sm text-slate-500">{label}</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="space-y-6">
        <SectionHeader
          eyebrow="Health Companion"
          title="Personalized care preferences"
          subtitle="Key identity, emergency, and wellness details across your hospital experience."
        />

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              icon: BadgeCheck,
              title: "Verification",
              detail: "Identity and insurance validated",
              accent: "bg-sky-50 text-sky-700",
            },
            {
              icon: HeartPulse,
              title: "Vitals Sync",
              detail: "Last connected 12 minutes ago",
              accent: "bg-teal-50 text-teal-700",
            },
            {
              icon: ShieldPlus,
              title: "Protection",
              detail: "Emergency card ready for sharing",
              accent: "bg-indigo-50 text-indigo-700",
            },
          ].map(({ icon: Icon, title, detail, accent }) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-[28px] border border-white/80 bg-white/90 p-5"
            >
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${accent}`}>
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
              <p className="mt-2 text-sm text-slate-500">{detail}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-white/80 bg-white/90 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900">Preferences</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              ["Notifications", "Queue and appointment alerts enabled"],
              ["Language", "English"],
              ["Preferred Hospital", "Careloop City Center"],
              ["Emergency Consent", "Granted for quick triage"],
            ].map(([label, detail]) => (
              <div key={label} className="rounded-[24px] bg-slate-50 p-4">
                <p className="text-sm text-slate-500">{label}</p>
                <p className="mt-2 font-semibold text-slate-900">{detail}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {onLogout && (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] border border-red-200 bg-red-50 p-6"
          >
            <h3 className="text-lg font-semibold text-slate-900">Account</h3>
            <p className="mt-2 text-sm text-slate-500">
              Sign out of your CARELOOP account on this device.
            </p>
            <Button
              onClick={onLogout}
              className="mt-4 flex items-center gap-2 bg-red-600 hover:bg-red-700"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
