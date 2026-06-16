import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import PastAnalyses from "./components/PastAnalyses";
import Result from "./components/Result";
import Report from "./components/Report";
import NotFound from "./components/NotFound";

// Protect private routes
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" replace />;
};

// Prevent logged-in users from accessing login/register
const PublicRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/" replace /> : children;
};

const App = () => {
  return (
    <main>
      <Routes>
        {/* Public Routes */}
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

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/result" element={<Result />} />
          <Route path="/past-analyses" element={<PastAnalyses />} />
          <Route path="/past-analyses/:resumeId" element={<Report />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
