import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/Dashboard/Dashboard";
import About from "../pages/About/About";
import Resume from "../pages/Resume/Resume";
import Jobs from "../pages/Jobs/Jobs";
import SavedJobs from "../pages/SavedJobs/SavedJobs";
import Applications from "../pages/Applications/Applications";
import Profile from "../pages/Profile/Profile";
import Notifications from "../pages/Notifications/Notifications";
import ResumeBuilder from "../pages/ResumeBuilder/ResumeBuilder";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ProtectedRoute from "../components/ProtectedRoute";
import PublicRoute from "../components/PublicRoute";

function AppRoutes() {

  return (

    <Routes>

      {/* Public Routes */}

      <Route path="/" element={<Landing />} />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      <Route
        path="/login"
        element={
          <PublicRoute>
           <Login />
          </PublicRoute>
        }
      />

      <Route path="/notifications" element={<Notifications />} />

      {/* Protected Pages */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume"
        element={
          <ProtectedRoute>
            <Resume />
          </ProtectedRoute>
        }
      />

      <Route
        path="/jobs"
        element={
          <ProtectedRoute>
            <Jobs />
          </ProtectedRoute>
        }
      />

      <Route
        path="/saved-jobs"
        element={
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/applications"
        element={
          <ProtectedRoute>
            <Applications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/resume-builder"
        element={
          <ProtectedRoute>
            <ResumeBuilder />
          </ProtectedRoute>
        }
      />

      <Route path="/about" element={<About />} />

      <Route
        path="/forgot-password"
        element={
          <PublicRoute>
            <ForgotPassword />
          </PublicRoute>
        }
      />
    </Routes>

  );

}

export default AppRoutes;