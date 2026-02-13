import { ReactNode } from 'react';
import { clsx } from 'clsx';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: 'positive' | 'negative' | 'neutral';
  description?: string;
}

export function StatCard({ label, value, icon, trend = 'neutral', description }: StatCardProps) {
  return (
    <div className="bg-surface border border-border p-6 rounded-lg relative overflow-hidden group hover:border-neon-blue/30 transition-all">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-xs font-mono text-text-secondary uppercase tracking-wider">{label}</p>
          <h3 className={clsx(
            "text-3xl font-bold mt-2 font-mono",
            trend === 'positive' ? "text-neon-green" : 
            trend === 'negative' ? "text-neon-red" : "text-text-primary"
          )}>
            {value}
          </h3>
        </div>
        <div className="p-3 bg-void rounded border border-border text-neon-blue">
          {icon}
        </div>
      </div>
      
      {description && (
        <p className="text-xs text-text-muted mt-2 border-t border-border pt-2">
          {description}
        </p>
      )}

      {/* Background Glow Effect */}
      <div className={clsx(
        "absolute -bottom-10 -right-10 w-24 h-24 rounded-full blur-[40px] opacity-20",
        trend === 'positive' ? "bg-neon-green" : 
        trend === 'negative' ? "bg-neon-red" : "bg-neon-blue"
      )} />
    </div>
  );
}