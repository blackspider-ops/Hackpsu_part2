
import React, { useEffect, useState } from 'react';
import Logo from './Logo';

const Preloader = ({ onFinish }: { onFinish: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        onFinish();
      }, 500);
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div 
      className={`fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white to-gray-100 z-50 transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <div className="mb-4">
          <Logo size="lg" animated />
        </div>
        <p className="text-gray-500 animate-fade-in">Your campus ride sharing app</p>
      </div>
    </div>
  );
};

export default Preloader;
