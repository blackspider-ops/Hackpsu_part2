
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/auth/LoginForm';
import Logo from '../components/Logo';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (email: string, password: string) => {
    const success = await login(email, password);
    
    if (success) {
      // Show success toast notification
      toast({
        title: "Login successful!",
        description: "Redirecting you to the dashboard...",
      });
    } else {
      // Show error toast notification
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel - image/welcome */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-tuktuk to-tuktuk-light p-8 text-white flex-col justify-between">
        <div className="mb-auto">
          <Logo size="lg" withText />
        </div>
        <div className="space-y-6">
          <img src="/Home_icon.svg" alt="TUK TUK Vector Graphic" className="w-full max-w-xl h-auto mb-6" />
          <h1 className="text-4xl font-bold">Welcome Back!</h1>
          <p className="text-xl">Connect with fellow students and share rides around campus and beyond.</p>
          <div className="h-1 w-20 bg-white rounded-full opacity-50"></div>
          <p className="text-sm opacity-80">
            "TUK TUK has completely changed how I get around campus. Finding rides is so easy now!"
            <br />— Sarah, Penn State University
          </p>
        </div>
      </div>
      
      {/* Right panel - login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 md:hidden">
            <Logo size="lg" withText />
          </div>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    </div>
  );
};

export default Login;
