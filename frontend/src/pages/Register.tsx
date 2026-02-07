import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import api from '../api/client';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/register', { fullName, email, password });
      navigate('/login'); // Redirect to login after success
    } catch (err: any) {
      setError('Registration Failed. Email may be in use.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-void p-4">
      <div className="w-full max-w-md bg-surface border border-border p-8 rounded-lg shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-neon-purple to-neon-blue" />

        <div className="flex flex-col items-center gap-2 mb-8">
            <div className="p-3 bg-void rounded-full border border-border">
                <UserPlus className="w-6 h-6 text-neon-purple" />
            </div>
            <h1 className="text-2xl font-bold font-mono tracking-tight">NEW_OPERATIVE</h1>
            <p className="text-text-secondary text-sm">Create your credentials.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <div className="bg-neon-red/10 border border-neon-red/20 text-neon-red p-3 rounded text-sm font-mono text-center">
              {error}
            </div>
          )}
          
          <Input 
            label="Full Designation" 
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input 
            label="Email Identity" 
            type="email" 
            placeholder="operative@clarity.xyz"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          <Input 
            label="Set Passcode" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="outline" disabled={loading} className="mt-2 border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white">
            {loading ? 'Processing...' : 'Register ID'}
          </Button>

          <div className="text-center mt-4">
            <span className="text-text-secondary text-sm">Already operative? </span>
            <Link to="/login" className="text-neon-blue hover:text-neon-purple text-sm font-medium transition-colors">
              Access Terminal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}