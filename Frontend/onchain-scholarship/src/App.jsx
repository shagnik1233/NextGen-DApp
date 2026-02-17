import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import UserSelection from "./pages/UserSelection";
import LoginPage from "./pages/LoginPage";
import StudentDashboard from "./pages/StudentDashboard";
import DonorDashboard from "./pages/DonorDashboard";
import FacultyDashboard from "./pages/FacultyDashboard";

import WalletButton from "./components/WalletButton";

/* ================= HEADER ================= */
/* Shown ONLY on dashboard routes */
const Header = () => (
  <div className="flex justify-between items-center px-6 py-4 border-b bg-white">
    <h1 className="text-xl font-bold">NextGen Scholar Network</h1>
    <WalletButton />
  </div>
);

/* ================= LAYOUT ================= */
const Layout = ({ children }) => {
  const location = useLocation();
  const showHeader = location.pathname.startsWith("/dashboard");

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  );
};

/* ================= APP ================= */
const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/user-selection" element={<UserSelection />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Dashboards (contract enforces access) */}
          <Route path="/dashboard/student" element={<StudentDashboard />} />
          <Route path="/dashboard/donor" element={<DonorDashboard />} />
          <Route path="/dashboard/faculty" element={<FacultyDashboard />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
