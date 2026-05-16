
import React from 'react';

const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const dimensions = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`
      ${dimensions[size]} 
      bg-gradient-to-br from-blue-500 via-indigo-600 to-blue-700 
      rounded-lg flex items-center justify-center 
      shadow-lg shadow-blue-500/20 
      group-hover:scale-110 group-hover:rotate-3 
      transition-all duration-300 ease-out
      animate-logo-tech
      relative
      overflow-hidden
    `}>
      {/* Glossy overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg" 
        className="w-4/5 h-4/5 text-white relative z-10"
      >
        <path 
          d="M13 3L4 14H11V21L20 10H13V3Z" 
          fill="currentColor" 
          stroke="white" 
          strokeWidth="0.5"
          strokeLinecap="round" 
          strokeLinejoin="round"
          className="animate-bolt transition-all duration-300"
        />
        <path 
          d="M3 21L10 14M21 3L14 10" 
          stroke="white" 
          strokeWidth="2.5" 
          strokeLinecap="round"
          className="opacity-60 group-hover:opacity-100 group-hover:stroke-[3] transition-all duration-300"
        />
      </svg>
      
      {/* Inner Glow */}
      <div className="absolute inset-0 rounded-lg border border-white/20 pointer-events-none"></div>
    </div>
  );
};

export default Logo;
