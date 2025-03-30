
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectInstitute from "./pages/SelectInstitute";
import Dashboard from "./pages/Dashboard";
import FindRide from "./pages/FindRide";
import ListRide from "./pages/ListRide";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import { RideProvider } from "./context/RideContext";
import { AuthProvider, useAuth } from "./context/AuthContext";

// Component to handle root path redirection based on auth status
const RootRedirect = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Home />;
};

const queryClient = new QueryClient();

const App = () => {
  const [loading, setLoading] = useState(true);

  const handlePreloaderFinish = () => {
    setLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RideProvider>
          <Toaster />
          <Sonner />
          {loading ? (
            <Preloader onFinish={handlePreloaderFinish} />
          ) : (
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/home" element={<Home />} />
<Route path="/" element={<Root />} />
                  <Route path="/index" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/select-institute" element={<SelectInstitute />} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/find-ride" element={<ProtectedRoute><FindRide /></ProtectedRoute>} />
                  <Route path="/list-ride" element={<ProtectedRoute><ListRide /></ProtectedRoute>} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          )}
        </RideProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
