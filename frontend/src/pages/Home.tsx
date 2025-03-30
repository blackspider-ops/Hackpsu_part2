import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  
  // Redirect to dashboard if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left panel - image/welcome */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-tuktuk to-tuktuk-light p-8 text-white flex-col justify-between">
        <div className="mb-auto">
          <Logo size="lg" withText animated white />
        </div>
        <div className="space-y-6">
          <img src="/Home_icon.svg" alt="TUK TUK Vector Graphic" className="w-full max-w-xl h-auto mb-6" />
          <h1 className="text-5xl font-bold">Welcome to TUK TUK</h1>
          <p className="text-xl">The easiest way to connect with fellow students and share rides around campus and beyond.</p>
          <div className="h-1 w-20 bg-white rounded-full opacity-50"></div>
          <p className="text-sm opacity-80">
            "TUK TUK has completely changed how I get around campus. Finding rides is so easy now!"
            <br />— Sarah, Penn State University
          </p>
        </div>
      </div>
      
      {/* Right panel - call to action */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="flex justify-center mb-6 md:hidden">
              <Logo size="lg" withText animated white />
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Ready to ride?</h2>
            <p className="mt-2 text-gray-600">
              Join our community of students sharing rides and making connections.
            </p>
          </div>
          
          <div className="space-y-4">
            <Button 
              className="w-full py-6 text-lg bg-tuktuk hover:bg-tuktuk-light" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full py-6 text-lg border-tuktuk text-tuktuk hover:bg-tuktuk/10"
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Need a ride for your next campus event?</p>
            <p>TUK TUK connects you with fellow students going your way.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;