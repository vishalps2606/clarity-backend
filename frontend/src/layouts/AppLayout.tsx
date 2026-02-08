import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, Target, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { clsx } from 'clsx';

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const { logout } = useAuth();
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
    { icon: Target, label: 'Goals', path: '/goals' },
    { icon: Clock, label: 'Review', path: '/review' },
  ];

  return (
    <div className="flex h-screen w-full bg-void text-text-primary overflow-hidden">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-border bg-surface/50 flex flex-col justify-between p-4">
        <div>
          <div className="mb-8 px-2 flex items-center gap-2">
             <div className="w-8 h-8 bg-neon-blue rounded-full blur-[10px] opacity-50 absolute" />
             <h1 className="text-xl font-bold font-mono text-neon-blue relative z-10">CLARITY_OS</h1>
          </div>
          
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 font-mono text-sm",
                    isActive 
                      ? "bg-neon-blue/10 text-neon-blue border border-neon-blue/20 shadow-[0_0_10px_rgba(0,240,255,0.1)]" 
                      : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <button 
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 text-neon-red/80 hover:text-neon-red hover:bg-neon-red/10 rounded-md transition-all font-mono text-sm"
        >
          <LogOut size={18} />
          Disconnect
        </button>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {/* Background Grid Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
            {children}
        </div>
      </main>
    </div>
  );
}