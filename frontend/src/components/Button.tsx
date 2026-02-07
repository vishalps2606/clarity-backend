import type { ButtonHTMLAttributes } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'danger';
}

export const Button = ({ className, variant = 'primary', ...props }: ButtonProps) => {
  const baseStyles = "px-4 py-2 rounded font-medium transition-all duration-200 disabled:opacity-50";
  
  const variants = {
    primary: "bg-neon-blue text-black hover:bg-neon-blue/80 hover:shadow-[0_0_15px_rgba(0,240,255,0.5)]",
    outline: "border border-border text-text-primary hover:border-neon-blue hover:text-neon-blue",
    danger: "bg-neon-red/10 text-neon-red border border-neon-red/20 hover:bg-neon-red/20",
  };

  return (
    <button 
      className={cn(baseStyles, variants[variant], className)} 
      {...props} 
    />
  );
};