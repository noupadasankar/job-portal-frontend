import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import axios from "axios";

import { useAuthStore } from "./store/authStore";
import { useUIStore } from "./store/uiStore";

// Layouts
import DashboardLayout from "./layouts/DashboardLayout";
import AuthLayout from "./layouts/AuthLayout";

// Auth Pages
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

// Job Seeker Pages
import JobSeekerDashboard from "./pages/jobseeker/Dashboard";
import FindJobs from "./pages/jobseeker/FindJobs";
import MyApplications from "./pages/jobseeker/MyApplications";
import SavedJobs from "./pages/jobseeker/SavedJobs";
import Profile from "./pages/jobseeker/Profile";
import Analytics from "./pages/jobseeker/Analytics";

// Employer Pages
import EmployerDashboard from "./pages/employer/Dashboard";
import PostJob from "./pages/employer/PostJob";
import MyJobs from "./pages/employer/MyJobs";
import Applications from "./pages/employer/Applications";
import CompanyProfile from "./pages/employer/CompanyProfile";
import EmployerAnalytics from "./pages/employer/Analytics";

// Common Pages
import JobDetails from "./pages/common/JobDetails";
import ApplicationDetails from "./pages/common/ApplicationDetails";
import Messages from "./pages/common/Messages";
import Notifications from "./pages/common/Notifications";
import Settings from "./pages/common/Settings";
import NotFound from "./pages/common/NotFound";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthorized, user } = useAuthStore();

  if (!isAuthorized) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Dashboard Redirect Based On Role
const DashboardRedirect = () => {
  const { user } = useAuthStore();

  if (user?.role === "Employer") {
    return <Navigate to="/employer/dashboard" replace />;
  }

  return <Navigate to="/jobseeker/dashboard" replace />;
};

function App() {
  const { setUser, setIsAuthorized } = useAuthStore();
  const { theme } = useUIStore();

  // Initialize theme
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Fetch logged-in user on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/getuser`,
          {
            withCredentials: true,
          }
        );

        setUser(data.user);

        if (typeof setIsAuthorized === "function") {
          setIsAuthorized(true);
        }
      } catch (error) {
        if (typeof setIsAuthorized === "function") {
          setIsAuthorized(false);
        }
      }
    };

    fetchUser();
  }, [setUser, setIsAuthorized]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Protected Dashboard Routes */}
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Main Dashboard Redirect */}
            <Route path="/dashboard" element={<DashboardRedirect />} />

            {/* Job Seeker Routes */}
            <Route
              path="/jobseeker/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Job Seeker"]}>
                  <JobSeekerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobs"
              element={
                <ProtectedRoute allowedRoles={["Job Seeker"]}>
                  <FindJobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/applications"
              element={
                <ProtectedRoute allowedRoles={["Job Seeker"]}>
                  <MyApplications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/saved-jobs"
              element={
                <ProtectedRoute allowedRoles={["Job Seeker"]}>
                  <SavedJobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute allowedRoles={["Job Seeker"]}>
                  <Profile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/jobseeker/analytics"
              element={
                <ProtectedRoute allowedRoles={["Job Seeker"]}>
                  <Analytics />
                </ProtectedRoute>
              }
            />

            {/* Employer Routes */}
            <Route
              path="/employer/dashboard"
              element={
                <ProtectedRoute allowedRoles={["Employer"]}>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/post-job"
              element={
                <ProtectedRoute allowedRoles={["Employer"]}>
                  <PostJob />
                </ProtectedRoute>
              }
            />

            <Route
              path="/my-jobs"
              element={
                <ProtectedRoute allowedRoles={["Employer"]}>
                  <MyJobs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employer/applications"
              element={
                <ProtectedRoute allowedRoles={["Employer"]}>
                  <Applications />
                </ProtectedRoute>
              }
            />

            <Route
              path="/company-profile"
              element={
                <ProtectedRoute allowedRoles={["Employer"]}>
                  <CompanyProfile />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employer/analytics"
              element={
                <ProtectedRoute allowedRoles={["Employer"]}>
                  <EmployerAnalytics />
                </ProtectedRoute>
              }
            />

            {/* Common Protected Routes */}
            <Route path="/job/:id" element={<JobDetails />} />
            <Route path="/application/:id" element={<ApplicationDetails />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors closeButton theme={theme} />
    </>
  );
}

export default App;