import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090014] focus:ring-primary overflow-hidden group font-display tracking-wide";
  
  const variants = {
    // Primary: Purple to Pink gradient
    primary: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white hover:shadow-[0_0_25px_rgba(217,70,239,0.6)] border border-transparent hover:scale-105",
    // Secondary: Orange/Sunset gradient
    secondary: "bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] border border-transparent hover:-translate-y-0.5",
    // Outline - Modified to use text-textMain instead of text-white for Light Mode visibility
    outline: "bg-transparent border border-fuchsia-500/30 text-textMain hover:bg-fuchsia-500/10 hover:border-fuchsia-500/60 shadow-[0_0_10px_rgba(217,70,239,0.1)]",
    ghost: "bg-transparent text-gray-300 hover:text-white hover:bg-white/5"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
      {variant === 'primary' && (
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-orange-500 transition-transform duration-500 ease-out opacity-70 blur-lg" />
      )}
    </button>
  );
};