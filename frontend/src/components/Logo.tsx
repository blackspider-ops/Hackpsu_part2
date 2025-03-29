
import React from 'react';
import { Car } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  animated?: boolean;
}

const Logo = ({ size = 'md', withText = true, animated = false }: LogoProps) => {
  const sizeClass = {
    sm: 'h-6 w-6',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const textSizeClass = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`text-tuktuk ${animated ? 'animate-bounce' : ''}`}>
        <Car className={sizeClass[size]} />
      </div>
      {withText && (
        <span className={`font-bold ${textSizeClass[size]} text-tuktuk`}>
          TUK TUK
        </span>
      )}
    </div>
  );
};

export default Logo;
