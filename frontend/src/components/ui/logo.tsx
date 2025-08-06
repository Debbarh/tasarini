
import React from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 40, className = "" }: LogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(147, 51, 234)" />
          <stop offset="50%" stopColor="rgb(59, 130, 246)" />
          <stop offset="100%" stopColor="rgb(236, 72, 153)" />
        </linearGradient>
      </defs>
      
      {/* Cercle principal */}
      <circle
        cx="20"
        cy="14"
        r="10"
        stroke="url(#logoGradient)"
        strokeWidth="2.5"
        fill="none"
      />
      
      {/* Cercle intérieur */}
      <circle
        cx="20"
        cy="14"
        r="4"
        fill="url(#logoGradient)"
      />
      
      {/* Forme de pin/localisation */}
      <path
        d="M15 24 L20 35 L25 24 L30 26 L20 24 L10 26 Z"
        fill="url(#logoGradient)"
        stroke="url(#logoGradient)"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      
      {/* Connexion entre le cercle et la forme */}
      <line
        x1="20"
        y1="24"
        x2="20"
        y2="24"
        stroke="url(#logoGradient)"
        strokeWidth="2"
      />
    </svg>
  );
};

export default Logo;
