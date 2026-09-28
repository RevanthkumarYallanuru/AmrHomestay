import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, User, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<UserRole>('guest');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    try {
      await login(email, role);
      navigate(role === 'admin' ? '/admin' : '/dashboard');
    } catch {
      console.error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="card-premium p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-serif font-bold text-2xl">V</span>
              </div>
            </Link>
            <h1 className="font-serif text-2xl text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">Sign in to continue to Viha Home Stay</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              type="button"
              onClick={() => setRole('guest')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                role === 'guest'
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-muted-foreground/30'
              }`}
            >
              <User className={`w-6 h-6 ${role === 'guest' ? 'text-accent' : 'text-muted-foreground'}`} />
              <span className={`text-sm font-medium ${role === 'guest' ? 'text-accent' : 'text-muted-foreground'}`}>
                Guest
              </span>
            </button>
            <button
              type="button"
              onClick={() => setRole('admin')}
              className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${
                role === 'admin'
                  ? 'border-accent bg-accent/5'
                  : 'border-border hover:border-muted-foreground/30'
              }`}
            >
              <Shield className={`w-6 h-6 ${role === 'admin' ? 'text-accent' : 'text-muted-foreground'}`} />
              <span className={`text-sm font-medium ${role === 'admin' ? 'text-accent' : 'text-muted-foreground'}`}>
                Admin
              </span>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative mt-1">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  defaultValue="demo123"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-sm text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-sm text-accent hover:underline">
                Forgot password?
              </a>
            </div>

            <Button type="submit" className="btn-gold w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : `Sign in as ${role === 'admin' ? 'Admin' : 'Guest'}`}
            </Button>
          </form>

          {/* Demo hint */}
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Demo Mode:</strong> Enter any email to login. Try{' '}
              <span className="text-accent">admin@viha.com</span> for admin or{' '}
              <span className="text-accent">priya@example.com</span> for guest.
            </p>
          </div>

          {/* Sign up link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
