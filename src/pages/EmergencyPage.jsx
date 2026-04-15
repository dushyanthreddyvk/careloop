import { motion, AnimatePresence } from "framer-motion";
import { Ambulance, PhoneCall, Siren, TriangleAlert, X, Phone, MapPin, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../components/Button";
import { SectionHeader } from "../components/SectionHeader";

export function EmergencyPage() {
  const [sosTriggered, setSOSTriggered] = useState(false);
  const [sosConfirmed, setSOSConfirmed] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const handleTriggerSOS = () => {
    setSOSTriggered(true);
  };

  const handleConfirmSOS = () => {
    setSOSConfirmed(true);
    
    // Countdown timer
    let count = 5;
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      if (count <= 0) {
        clearInterval(timer);
        setTimeout(() => {
          setSOSTriggered(false);
          setSOSConfirmed(false);
          setCountdown(5);
        }, 2000);
      }
    }, 1000);
  };

  const handleCancelSOS = () => {
    setSOSTriggered(false);
    setSOSConfirmed(false);
    setCountdown(5);
  };
  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Emergency"
        title="Priority actions when every second matters"
        subtitle="Critical response shortcuts, blood group details, and emergency contact access."
      />

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[32px] border border-rose-200 bg-[linear-gradient(135deg,rgba(255,255,255,0.96),rgba(255,240,240,0.96))] p-6 shadow-[0_24px_70px_-28px_rgba(244,63,94,0.28)]"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-600">
              Critical Response
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-900">
              Immediate emergency support hub
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Trigger rapid assistance, share current condition details, and guide
              family or staff to the right emergency pathway.
            </p>
          </div>
          <Button 
            className="bg-gradient-to-r from-rose-500 to-orange-400 text-white shadow-rose-500/25"
            onClick={handleTriggerSOS}
          >
            Trigger SOS
          </Button>
        </div>
      </motion.section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { icon: Siren, title: "Hospital Emergency", value: "+91 1800-120-911" },
          { icon: Ambulance, title: "Ambulance Dispatch", value: "Nearest unit 4 min away" },
          { icon: PhoneCall, title: "Primary Contact", value: "Ananya Rao · +91 98765 21009" },
          { icon: TriangleAlert, title: "Critical Info", value: "Blood group B+ · Allergy: Penicillin" },
        ].map(({ icon: Icon, title, value }) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-[28px] border border-white/80 bg-white/90 p-5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
              <Icon className="h-5 w-5" />
            </div>
            <p className="mt-4 text-sm text-slate-500">{title}</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{value}</p>
          </motion.div>
        ))}
      </div>

      {/* SOS Modal */}
      <AnimatePresence>
        {sosTriggered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-[32px] bg-white p-6 shadow-2xl"
            >
              {!sosConfirmed ? (
                <>
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-100">
                    <Siren className="h-8 w-8 animate-bounce text-rose-600" />
                  </div>

                  <h2 className="mt-4 text-2xl font-semibold text-slate-900">
                    Confirm Emergency Request
                  </h2>
                  <p className="mt-3 text-sm text-slate-600">
                    This will immediately alert hospital emergency services, dispatch ambulance, and notify your emergency contacts.
                  </p>

                  <div className="mt-6 space-y-3 rounded-[24px] bg-rose-50 p-4">
                    {[
                      { icon: AlertCircle, title: "Status", value: "Active Emergency" },
                      { icon: MapPin, title: "Location", value: "Shared with services" },
                      { icon: Phone, title: "Emergency Contact", value: "Ananya Rao - Called" },
                    ].map(({ icon: Icon, title, value }) => (
                      <div key={title} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4 text-rose-600" />
                          <span className="text-xs text-slate-600">{title}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex gap-3">
                    <Button
                      onClick={handleConfirmSOS}
                      className="flex-1 bg-rose-600 hover:bg-rose-700"
                    >
                      Confirm & Send SOS
                    </Button>
                    <Button
                      onClick={handleCancelSOS}
                      variant="secondary"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                  >
                    <AlertCircle className="h-8 w-8 text-green-600" />
                  </motion.div>

                  <h2 className="text-2xl font-semibold text-slate-900 text-center">
                    SOS Activated!
                  </h2>
                  <p className="text-center text-sm text-slate-600">
                    Emergency services have been notified and are on their way.
                  </p>

                  <div className="w-full rounded-[24px] bg-green-50 p-4 text-center">
                    <p className="text-xs text-slate-600">ETA for ambulance</p>
                    <p className="mt-2 text-3xl font-bold text-green-600">{countdown}s</p>
                  </div>

                  <div className="w-full space-y-2 text-sm">
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                      <span className="text-slate-600">Hospital Notified</span>
                      <span className="text-green-600 font-semibold">✓ Done</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                      <span className="text-slate-600">Ambulance Dispatched</span>
                      <span className="text-green-600 font-semibold">✓ Done</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                      <span className="text-slate-600">Contact Notified</span>
                      <span className="text-green-600 font-semibold">✓ Done</span>
                    </div>
                  </div>

                  <p className="text-center text-xs text-slate-500 mt-2">
                    Stay calm. Help is on the way.
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
