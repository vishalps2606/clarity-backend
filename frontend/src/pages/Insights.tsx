import { useEffect, useState } from 'react';
import AppLayout from '../layouts/AppLayout';
import { StatCard } from '../components/StatCard';
import api from '../api/client';
import { Activity, CheckCircle, AlertOctagon, TrendingUp, BrainCircuit } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function Insights() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/insights/weekly')
       .then(res => setData(res.data))
       .catch(err => console.error("Failed to load insights"))
       .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <AppLayout>
        <div className="h-full flex flex-col items-center justify-center text-neon-blue font-mono animate-pulse">
            <BrainCircuit size={48} className="mb-4" />
            ANALYZING NEURAL PATTERNS...
        </div>
    </AppLayout>
  );

  // Prepare Chart Data
  const chartData = [
    { name: 'Completed', value: data.completedTasks },
    { name: 'Incomplete', value: data.totalTasks - data.completedTasks },
  ];
  
  const COLORS = ['#0AFF60', '#2A2A2A']; // Neon Green vs Dark Gray

  return (
    <AppLayout>
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-text-primary">Weekly Report</h2>
        <p className="text-text-secondary">Performance analysis for the last 7 days.</p>
      </header>

      {/* THE VERDICT (AI Feedback) */}
      <div className="bg-surface border-l-4 border-neon-purple p-6 rounded-r-lg mb-8 shadow-[0_0_20px_rgba(188,19,254,0.1)]">
        <h3 className="text-neon-purple font-mono text-xs uppercase tracking-widest mb-2">System Verdict</h3>
        <p className="text-xl md:text-2xl font-medium text-text-primary italic">
          "{data.feedbackMessage}"
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Completion Rate"
          value={`${data.completionPercentage}%`}
          icon={<CheckCircle size={24} />}
          trend={data.completionPercentage > 80 ? 'positive' : data.completionPercentage < 50 ? 'negative' : 'neutral'}
          description="Tasks completed vs. planned."
        />
        
        <StatCard 
          label="Slippage"
          value={`${data.slippagePercentage}%`}
          icon={<AlertOctagon size={24} />}
          trend={data.slippagePercentage > 20 ? 'negative' : 'positive'}
          description="Tasks delayed or rescheduled."
        />

        <StatCard 
          label="Est. Accuracy"
          value={`${data.avgEstimationErrorMinutes > 0 ? '+' : ''}${data.avgEstimationErrorMinutes}m`}
          icon={<Activity size={24} />}
          trend={Math.abs(data.avgEstimationErrorMinutes) > 30 ? 'negative' : 'positive'}
          description="Avg difference between plan & reality."
        />

        <StatCard 
          label="Total Volume"
          value={data.totalTasks}
          icon={<TrendingUp size={24} />}
          description="Total tasks processed this week."
        />
      </div>

      {/* VISUALIZATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart Card */}
        <div className="bg-surface border border-border p-6 rounded-lg flex flex-col items-center justify-center">
             <h4 className="text-sm font-mono text-text-secondary w-full text-left mb-4">EXECUTION RATIO</h4>
             <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip 
                            contentStyle={{ backgroundColor: '#121212', borderColor: '#2A2A2A', color: '#EDEDED' }}
                            itemStyle={{ color: '#00F0FF' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="flex gap-6 mt-4 text-xs font-mono">
                 <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-neon-green rounded-full" />
                     <span>Completed</span>
                 </div>
                 <div className="flex items-center gap-2">
                     <div className="w-3 h-3 bg-border rounded-full" />
                     <span>Incomplete</span>
                 </div>
             </div>
        </div>

        {/* Text Summary Card */}
        <div className="bg-surface border border-border p-6 rounded-lg">
            <h4 className="text-sm font-mono text-text-secondary mb-4">KEY METRICS EXPLAINED</h4>
            <div className="space-y-4 text-sm text-text-muted">
                <p>
                    <strong className="text-text-primary">Slippage:</strong> A high percentage means you are pushing tasks to "Tomorrow" too often. If this is red, stop hitting the "Delay" button.
                </p>
                <p>
                    <strong className="text-text-primary">Estimation Error:</strong> If this is positive (e.g., +45m), you are underestimating how long things take. Add buffer time to your next Focus Session.
                </p>
                <p>
                    <strong className="text-text-primary">Feedback Loop:</strong> This report refreshes every Monday. Use today's data to plan your next Goal.
                </p>
            </div>
        </div>
      </div>
    </AppLayout>
  );
}