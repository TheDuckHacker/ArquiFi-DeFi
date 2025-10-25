import React from 'react';

const ArquiFiLogo = ({ size = 24, className = "", color = "currentColor" }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 48 48" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        clipRule="evenodd" 
        d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z" 
        fill={color} 
        fillRule="evenodd"
      />
    </svg>
  );
};

export default ArquiFiLogo;
