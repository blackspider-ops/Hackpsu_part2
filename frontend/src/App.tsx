
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectInstitute from "./pages/SelectInstitute";
import Dashboard from "./pages/Dashboard";
import FindRide from "./pages/FindRide";
import ListRide from "./pages/ListRide";
import NotFound from "./pages/NotFound";
import Preloader from "./components/Preloader";
import { RideProvider } from "./context/RideContext";

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
              <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/select-institute" element={<SelectInstitute />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/find-ride" element={<FindRide />} />
                <Route path="/list-ride" element={<ListRide />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          )}
        </RideProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
