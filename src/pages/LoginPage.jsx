import { motion } from "framer-motion";
import { ShieldCheck, Stethoscope, Waves } from "lucide-react";
import { useState } from "react";
import { staggerContainer, staggerItem } from "../animations/variants";
import { Button } from "../components/Button";
import { useAuth } from "../context/AuthContext";

export function LoginPage({ onEnter, onLogin }) {
  const { login } = useAuth();
  const [hospitalId, setHospitalId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDemoLogin = async () => {
    setLoading(true);
    setError("");
    try {
      // Demo login - simulates successful authentication
      await new Promise(resolve => 
        setTimeout(() => {
          login({
            id: 'CL-2026-0012',
            name: 'John Patient',
            email: 'patient@careloop.com',
            token: 'demo_token_' + Date.now(),
          });
          onEnter?.();
          resolve();
        }, 800)
      );
    } catch (err) {
      setError("Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      // Accept any non-empty credentials without backend
      if (!hospitalId.trim() || !password.trim()) {
        setError("Please enter both Hospital ID and Password");
        setLoading(false);
        return;
      }

      // Mock authentication with provided credentials
      await new Promise(resolve => 
        setTimeout(() => {
          login({
            id: hospitalId,
            name: hospitalId.includes('-') ? 'Patient User' : 'Dr. ' + hospitalId,
            email: `${hospitalId}@careloop.com`,
            token: 'auth_token_' + Date.now(),
          });
          onEnter?.();
          resolve();
        }, 1000)
      );
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="grid min-h-[80vh] gap-6 lg:grid-cols-[1.2fr_0.9fr]">
      <motion.section
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="relative overflow-hidden rounded-[32px] border border-white/80 bg-slate-950 px-6 py-8 text-white shadow-[0_30px_90px_-30px_rgba(15,23,42,0.6)] sm:px-8 sm:py-10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.32),_transparent_28%),radial-gradient(circle_at_bottom_right,_rgba(20,184,166,0.28),_transparent_30%)]" />
        <div className="relative z-10">
          <motion.p
            variants={staggerItem}
            className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-300"
          >
            Smart Hospital Experience
          </motion.p>
          <motion.h2
            variants={staggerItem}
            className="mt-5 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl"
          >
            Connected OPD journeys with calm, real-time healthcare orchestration.
          </motion.h2>
          <motion.p
            variants={staggerItem}
            className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-base"
          >
            CARELOOP brings scheduling, live queue tracking, health records, and
            emergency-ready support into one polished patient companion.
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="mt-8 grid gap-4 sm:grid-cols-3"
          >
            {[
              {
                icon: ShieldCheck,
                title: "Secure Access",
                text: "Protected login with hospital-grade privacy.",
              },
              {
                icon: Waves,
                title: "Live Flow",
                text: "Queue intelligence and appointment orchestration.",
              },
              {
                icon: Stethoscope,
                title: "Health Companion",
                text: "Records, alerts, and doctor discovery in one place.",
              },
            ].map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="rounded-[24px] border border-white/10 bg-white/8 p-4 backdrop-blur-sm"
              >
                <Icon className="h-5 w-5 text-sky-300" />
                <h3 className="mt-4 font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-slate-300">{text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="rounded-[32px] border border-white/80 bg-white/90 p-6 shadow-[0_24px_70px_-28px_rgba(15,23,42,0.28)] sm:p-8"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.26em] text-teal-600">
          Welcome Back
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-slate-900">
          Sign in to CARELOOP
        </h2>
        <p className="mt-3 text-sm text-slate-500">
          Access your OPD dashboard, upcoming consultations, and digital records.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <motion.label
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="block"
          >
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Hospital ID
            </span>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              placeholder="CL-2026-0012"
              value={hospitalId}
              onChange={(e) => setHospitalId(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
            />
          </motion.label>

          <motion.label
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="block"
          >
            <span className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </span>
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-sky-300 focus:bg-white focus:shadow-[0_0_0_4px_rgba(14,165,233,0.12)]"
            />
          </motion.label>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
            >
              {error}
            </motion.div>
          )}

          <div className="flex flex-col gap-3">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">or</span>
              </div>
            </div>

            <Button 
              type="button"
              variant="secondary"
              className="w-full"
              onClick={handleDemoLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Try Demo Login"}
            </Button>
          </div>

          <div className="mt-6 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-slate-500">
              <input type="checkbox" className="rounded border-slate-300" />
              Keep me signed in
            </label>
            <button type="button" className="font-medium text-sky-700">
              Need help?
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}
