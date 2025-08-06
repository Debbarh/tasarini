
import React from 'react';
import Logo from '@/components/ui/logo';

interface BrandLogoProps {
  size?: number;
  showText?: boolean;
  textSize?: string;
  className?: string;
}

const BrandLogo = ({ 
  size = 40, 
  showText = true, 
  textSize = "text-3xl",
  className = "" 
}: BrandLogoProps) => {
  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <Logo size={size} />
      {showText && (
        <span className={`${textSize} font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent`}>
          TASARINI
        </span>
      )}
    </div>
  );
};

export default BrandLogo;
