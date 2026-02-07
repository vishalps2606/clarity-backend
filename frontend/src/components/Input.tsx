import { type InputHTMLAttributes, forwardRef } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-xs font-mono text-neon-blue/80 uppercase tracking-wider">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={twMerge(clsx(
            "bg-surface border border-border rounded px-4 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-neon-blue focus:shadow-[0_0_10px_rgba(0,240,255,0.2)] transition-all duration-200",
            error && "border-neon-red focus:border-neon-red focus:shadow-[0_0_10px_rgba(255,0,60,0.2)]",
            className
          ))}
          {...props}
        />
        {error && (
          <span className="text-xs text-neon-red font-mono">{error}</span>
        )}
      </div>
    );
  }
);