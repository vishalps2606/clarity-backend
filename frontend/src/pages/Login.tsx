import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../api/client';
import { Lock } from 'lucide-react'; // Ensure you installed lucide-react

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token); // Save token
      navigate('/dashboard'); // Go to app
    } catch (err: any) {
      setError('Access Denied: Invalid Credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-void p-4">
      <div className="w-full max-w-md bg-surface border border-border p-8 rounded-lg shadow-2xl relative overflow-hidden">
        
        {/* Decorative Top Line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-blue to-neon-purple" />

        <div className="flex flex-col items-center gap-2 mb-8">
            <div className="p-3 bg-void rounded-full border border-border">
                <Lock className="w-6 h-6 text-neon-blue" />
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tight">CLARITY_ACCESS</h1>
            <p className="text-text-secondary text-sm">Identify yourself.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-neon-red/10 border border-neon-red/20 text-neon-red p-3 rounded text-sm font-mono text-center">
              {error}
            </div>
          )}
          
          <Input 
            label="Email Identity" 
            type="email" 
            placeholder="operative@clarity.xyz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input 
            label="Passcode" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" disabled={loading} className="mt-2">
            {loading ? 'Authenticating...' : 'Initialize Session'}
          </Button>

          <div className="text-center mt-4">
            <span className="text-text-secondary text-sm">New user? </span>
            <Link to="/register" className="text-neon-blue hover:text-neon-purple text-sm font-medium transition-colors">
              Register ID
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}