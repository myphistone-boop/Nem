import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`
      glass-panel rounded-3xl p-6 relative overflow-hidden group
      ${hoverEffect ? 'transition-all duration-500 hover:-translate-y-2 hover:border-fuchsia-500/40 hover:shadow-[0_10px_40px_-10px_rgba(217,70,239,0.25)]' : ''}
      ${className}
    `}>
      {children}
      {/* Subtle colorful shine effect on top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-400/50 to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
};