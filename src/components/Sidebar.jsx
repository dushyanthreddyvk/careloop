import { motion } from "framer-motion";
import {
  Activity,
  CalendarDays,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  ShieldAlert,
  UserRound,
  Users,
  LogOut,
} from "lucide-react";
import { Button } from "./Button";

const iconMap = {
  login: HeartPulse,
  dashboard: LayoutDashboard,
  doctors: Users,
  appointments: CalendarDays,
  queue: Activity,
  records: ClipboardList,
  emergency: ShieldAlert,
  profile: UserRound,
};

export function Sidebar({ pages, activePage, onNavigate, onLogout }) {
  return (
    <>
      <aside className="hidden w-80 shrink-0 lg:block">
        <div className="sticky top-6 rounded-[32px] border border-white/80 bg-slate-950 px-6 py-7 text-white shadow-[0_24px_70px_-28px_rgba(15,23,42,0.5)]">
          <div className="mb-10">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-sky-500 via-blue-500 to-teal-400 text-xl font-bold">
              C
            </div>
            <h2 className="text-2xl font-semibold">CARELOOP</h2>
            <p className="mt-2 text-sm text-slate-300">
              Smart Hospital OPD and Health Companion
            </p>
          </div>

          <nav className="space-y-2">
            {pages.map((page) => {
              const Icon = iconMap[page.id];
              const active = activePage === page.id;
              return (
                <motion.button
                  key={page.id}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigate(page.id)}
                  className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-sm transition ${
                    active
                      ? "bg-white text-slate-900 shadow-lg"
                      : "text-slate-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{page.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {onLogout && (
            <div className="mt-8 border-t border-white/20 pt-8">
              <Button
                variant="default"
                onClick={onLogout}
                className="flex w-full items-center justify-center gap-2 bg-red-600 hover:bg-red-700"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          )}
        </div>
      </aside>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/70 bg-white/92 px-3 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto grid max-w-xl grid-cols-4 gap-2">
          {pages.slice(1).map((page) => {
            const Icon = iconMap[page.id];
            const active = activePage === page.id;
            return (
              <motion.button
                key={page.id}
                whileTap={{ scale: 0.96 }}
                onClick={() => onNavigate(page.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-2xl px-2 py-3 text-[11px] font-medium ${
                  active ? "bg-sky-50 text-sky-700" : "text-slate-500"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{page.shortLabel}</span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </>
  );
}
