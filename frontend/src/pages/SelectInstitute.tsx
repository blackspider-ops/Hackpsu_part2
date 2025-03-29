
import React from 'react';
import { useNavigate } from 'react-router-dom';
import InstituteSelector from '../components/auth/InstituteSelector';
import Logo from '../components/Logo';
import { useToast } from '@/hooks/use-toast';

const SelectInstitute = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSelectInstitute = (instituteId: string) => {
    // In a real app, you would store the selected institute
    toast({
      title: "Institute selected!",
      description: "Redirecting you to the dashboard...",
    });
    
    // Redirect to dashboard after selection
    setTimeout(() => {
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-white to-gray-100">
      <div className="mb-8">
        <Logo size="lg" withText />
      </div>
      <InstituteSelector onSelect={handleSelectInstitute} />
    </div>
  );
};

export default SelectInstitute;
