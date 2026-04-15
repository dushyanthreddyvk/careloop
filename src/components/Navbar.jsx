import { Bell, Search, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./Button";

export function Navbar({ currentPage, onLogout }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-0 z-30 mb-6 border border-white/70 bg-white/80 px-4 py-4 backdrop-blur-xl shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] sm:px-6 lg:rounded-[28px]"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-teal-600">
            CARELOOP
          </p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            {currentPage.title}
          </h1>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 transition focus-within:border-sky-300 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-sky-500/10">
            <Search className="h-4 w-4 text-slate-400 transition group-focus-within:text-sky-500" />
            <input
              className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400 sm:w-52"
              placeholder="Search records, doctors..."
            />
          </label>

          <div className="flex items-center gap-3">
            <Button variant="secondary" className="h-12 w-12 rounded-2xl px-0">
              <Bell className="h-4 w-4" />
            </Button>
            {onLogout && (
              <Button 
                variant="secondary" 
                className="h-12 w-12 rounded-2xl px-0"
                onClick={onLogout}
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            )}
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-teal-400 text-sm font-semibold text-white">
                CL
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-slate-800">Careloop User</p>
                <p className="text-xs text-slate-500">Smart OPD Companion</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
