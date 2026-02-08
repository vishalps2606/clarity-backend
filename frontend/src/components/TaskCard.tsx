import { Clock, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface Task {
  id: number;
  title: string;
  status: 'READY' | 'IN_PROGRESS' | 'DONE';
  estimatedMinutes: number;
  dueDatetime: string;
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const isOverdue = new Date(task.dueDatetime) < new Date();

  return (
    <div className="group relative bg-surface border border-border p-4 rounded-lg hover:border-neon-blue/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* Hover Glow Effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-blue to-neon-purple opacity-0 group-hover:opacity-20 blur transition duration-300 rounded-lg" />
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-2">
          <span className={clsx(
            "text-[10px] font-mono px-2 py-0.5 rounded border uppercase",
            task.status === 'DONE' ? "border-neon-green text-neon-green bg-neon-green/10" :
            task.status === 'IN_PROGRESS' ? "border-neon-purple text-neon-purple bg-neon-purple/10" :
            "border-text-secondary text-text-secondary"
          )}>
            {task.status.replace('_', ' ')}
          </span>
          {isOverdue && <AlertCircle size={16} className="text-neon-red" />}
        </div>

        <h3 className="font-medium text-text-primary mb-4 line-clamp-2">{task.title}</h3>

        <div className="flex items-center gap-4 text-xs text-text-muted font-mono">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            <span>{task.estimatedMinutes}m</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Due: {new Date(task.dueDatetime).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}