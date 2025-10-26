import React from 'react';

const ArquiFiLogo = ({ size = 24, className = "", color = "currentColor", transparent = true, cyberpunk = false, animated = false }) => {
  return (
    <div className={`relative inline-block ${animated ? 'logo-animated' : ''}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 48 48" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className={`${className} ${animated ? 'logo-svg' : ''}`}
      >
        {/* Efecto de brillo de fondo */}
        {animated && (
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0099ff" />
              <stop offset="30%" stopColor="#00aaff" />
              <stop offset="70%" stopColor="#0088ff" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>
          </defs>
        )}
        
        <path 
          clipRule="evenodd" 
          d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" 
          fill={animated ? "url(#logoGradient)" : (transparent ? color : "white")} 
          fillRule="evenodd"
          filter={animated ? "url(#glow)" : undefined}
        />
      </svg>
      
      {/* Efecto de ondas */}
      {animated && (
        <div className="absolute inset-0 logo-waves"></div>
      )}
    </div>
  );
};

export default ArquiFiLogo;
