import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { pageTransition } from "./animations/variants";
import { Modal } from "./components/Modal";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";
import { ToastNotification } from "./components/ToastNotification";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { theme } from "./styles/theme";
import { useAuth } from "./context/AuthContext";
import { useLogin } from "./hooks/useApi";
import { AppointmentBookingPage } from "./pages/AppointmentBookingPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DoctorDiscoveryPage } from "./pages/DoctorDiscoveryPage";
import { EmergencyPage } from "./pages/EmergencyPage";
import { LoginPage } from "./pages/LoginPage";
import { MedicalRecordsPage } from "./pages/MedicalRecordsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { QueueTrackingPage } from "./pages/QueueTrackingPage";

const pages = [
  { id: "login", label: "Login", shortLabel: "Login", title: "Secure Sign In" },
  {
    id: "dashboard",
    label: "Dashboard",
    shortLabel: "Home",
    title: "Patient Dashboard",
  },
  {
    id: "doctors",
    label: "Doctor Discovery",
    shortLabel: "Doctors",
    title: "Discover Doctors",
  },
  {
    id: "appointments",
    label: "Appointment Booking",
    shortLabel: "Book",
    title: "Book Appointment",
  },
  {
    id: "queue",
    label: "Queue Tracking",
    shortLabel: "Queue",
    title: "Live Queue Tracking",
  },
  {
    id: "records",
    label: "Medical Records",
    shortLabel: "Records",
    title: "Medical Records",
  },
  {
    id: "emergency",
    label: "Emergency",
    shortLabel: "SOS",
    title: "Emergency Hub",
  },
  {
    id: "profile",
    label: "Profile",
    shortLabel: "Profile",
    title: "Profile & Preferences",
  },
];

const doctors = [
  {
    id: 1,
    initials: "AM",
    name: "Dr. Aarya Menon",
    specialty: "Cardiologist",
    availability: "Available Today",
    hospital: "City Center Hospital",
    experience: "12+ years",
    rating: "4.9",
    fee: "Consultation fee ₹900",
  },
  {
    id: 2,
    initials: "RV",
    name: "Dr. Rohan Varma",
    specialty: "Neurologist",
    availability: "Next slot 2:15 PM",
    hospital: "Northside Clinic",
    experience: "9+ years",
    rating: "4.8",
    fee: "Consultation fee ₹1100",
  },
  {
    id: 3,
    initials: "SK",
    name: "Dr. Sara Khan",
    specialty: "Pediatrician",
    availability: "Available Tomorrow",
    hospital: "CARELOOP Pediatrics",
    experience: "11+ years",
    rating: "4.9",
    fee: "Consultation fee ₹750",
  },
  {
    id: 4,
    initials: "NP",
    name: "Dr. Neel Patel",
    specialty: "Dermatologist",
    availability: "Available Today",
    hospital: "Riverfront Medical",
    experience: "7+ years",
    rating: "4.7",
    fee: "Consultation fee ₹800",
  },
];

const appointments = [
  {
    id: 1,
    type: "Upcoming Appointment",
    doctor: "Dr. Aarya Menon",
    department: "Cardiology Department",
    time: "Today, 5:30 PM",
    location: "OPD Wing A, Room 204",
    status: "Confirmed",
  },
  {
    id: 2,
    type: "Follow-up Visit",
    doctor: "Dr. Sara Khan",
    department: "Pediatrics Department",
    time: "Apr 16, 11:15 AM",
    location: "Children’s Block, Room 104",
    status: "Scheduled",
  },
];

const records = [
  {
    id: 1,
    title: "Cardiology Consultation",
    date: "April 10, 2026",
    type: "Consultation",
    doctor: "Dr. Aarya Menon",
    summary:
      "ECG reviewed. Mild palpitations reported. Continue current beta blocker dose and repeat blood pressure monitoring for two weeks.",
  },
  {
    id: 2,
    title: "Complete Blood Count",
    date: "April 08, 2026",
    type: "Diagnostics",
    doctor: "Central Lab Services",
    summary:
      "CBC values within expected range. Hemoglobin stable. No immediate intervention required based on laboratory review.",
  },
  {
    id: 3,
    title: "Prescription Renewal",
    date: "April 03, 2026",
    type: "Medication",
    doctor: "Dr. Rohan Varma",
    summary:
      "Medication refill approved for migraine management. Continue dosage after meals and schedule follow-up if symptom frequency increases.",
  },
  {
    id: 4,
    title: "Dermatology Assessment",
    date: "March 28, 2026",
    type: "Consultation",
    doctor: "Dr. Neel Patel",
    summary:
      "Skin sensitivity improved since last review. Continue topical treatment for ten days and avoid direct irritants.",
  },
];

function App() {
  const { isAuthenticated, logout, user } = useAuth();
  const { login: performLogin } = useLogin();
  const [activePage, setActivePage] = useState("login");
  const [selectedDoctor, setSelectedDoctor] = useState(doctors[0]);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    // Redirect to login if not authenticated and trying to access protected page
    if (!isAuthenticated && activePage !== "login") {
      setActivePage("login");
    }
  }, [isAuthenticated, activePage]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 2800);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const navigate = (page) => {
    setActivePage(page);
  };

  const handleLogin = async (hospitalId, password) => {
    try {
      await performLogin(hospitalId, password);
      setToast({
        title: "Login successful",
        message: "Welcome back to CARELOOP!",
      });
      navigate("dashboard");
    } catch (error) {
      setToast({
        title: "Login failed",
        message: error.message || "Invalid credentials",
      });
    }
  };

  const handleLogout = () => {
    logout();
    setActivePage("login");
    setToast({
      title: "Logged out",
      message: "You have been successfully logged out.",
    });
  };

  const handleBookDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setActivePage("appointments");
    setToast({
      title: "Doctor selected",
      message: `${doctor.name} is ready for appointment booking.`,
    });
  };

  const confirmAppointment = () => {
    setShowModal(true);
  };

  const finishConfirmation = () => {
    setShowModal(false);
    setActivePage("queue");
    setToast({
      title: "Appointment booked",
      message: `${selectedDoctor.name} consultation confirmed with live queue tracking.`,
    });
  };

  const currentPage = pages.find((page) => page.id === activePage) ?? pages[0];

  const renderPage = () => {
    if (activePage === "login") {
      return <LoginPage onEnter={() => navigate("dashboard")} onLogin={handleLogin} />;
    }

    const pageContent = (() => {
      switch (activePage) {
        case "dashboard":
          return <DashboardPage appointments={appointments} />;
        case "doctors":
          return <DoctorDiscoveryPage doctors={doctors} onBook={handleBookDoctor} />;
        case "appointments":
          return (
            <AppointmentBookingPage
              selectedDoctor={selectedDoctor}
              onConfirm={confirmAppointment}
            />
          );
        case "queue":
          return <QueueTrackingPage />;
        case "records":
          return <MedicalRecordsPage records={records} />;
        case "emergency":
          return <EmergencyPage />;
        case "profile":
          return <ProfilePage user={user} onLogout={handleLogout} />;
        default:
          return <DashboardPage appointments={appointments} />;
      }
    })();

    return <ProtectedRoute>{pageContent}</ProtectedRoute>;
  };

  return (
    <div className={theme.shell}>
      <ToastNotification toast={toast} />
      <Modal
        open={showModal}
        title="Your visit has been scheduled"
        subtitle={`CARELOOP has reserved a consultation with ${selectedDoctor.name}. Queue updates and guidance will appear in real time.`}
        primaryLabel="Track Queue"
        secondaryLabel="Stay Here"
        onPrimary={finishConfirmation}
        onClose={() => setShowModal(false)}
      />

      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        {activePage !== "login" ? (
          <Sidebar
            pages={pages}
            activePage={activePage}
            onNavigate={navigate}
            onLogout={handleLogout}
          />
        ) : null}

        <main className={`min-w-0 flex-1 ${activePage !== "login" ? "pb-24 lg:pb-0" : ""}`}>
          {activePage !== "login" ? <Navbar currentPage={currentPage} onLogout={handleLogout} /> : null}

          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

export default App;
