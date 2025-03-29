
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SignupForm from '../components/auth/SignupForm';
import Logo from '../components/Logo';
import { useToast } from '@/hooks/use-toast';

const Signup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignup = (name: string, email: string, password: string) => {
    // In a real app, you would create the user account here
    toast({
      title: "Account created!",
      description: "Redirecting you to the institute selection page...",
    });
    
    // Simulate signup success and redirect
    setTimeout(() => {
      navigate('/select-institute');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel - image/welcome */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-tuktuk to-tuktuk-light p-8 text-white flex-col justify-between">
        <div className="mb-auto">
          <Logo size="lg" withText />
        </div>
        <div className="space-y-6">
          <h1 className="text-4xl font-bold">Join Our Community</h1>
          <p className="text-xl">Connect with fellow students and share rides around campus and beyond.</p>
          <div className="h-1 w-20 bg-white rounded-full opacity-50"></div>
          <p className="text-sm opacity-80">
            "TUK TUK has completely changed how I get around campus. Finding rides is so easy now!"
            <br />— Sarah, Penn State University
          </p>
        </div>
      </div>
      
      {/* Right panel - signup form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 md:hidden">
            <Logo size="lg" withText />
          </div>
          <SignupForm onSignup={handleSignup} />
        </div>
      </div>
    </div>
  );
};

export default Signup;
