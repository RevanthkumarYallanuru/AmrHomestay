import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Compass,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

const guestNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Compass, label: 'Explore', href: '/amenities' },
  { icon: User, label: 'Profile', href: '/dashboard/profile' },
];

export function GuestLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white border-b border-[#e8e4dd] flex items-center justify-between px-4 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#b8860b] flex items-center justify-center">
            <span className="text-white font-serif font-bold">V</span>
          </div>
          <span className="font-serif text-lg font-semibold text-[#1a2e1a]">Viha Home Stay</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {guestNavItems.map(item => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-[#1a2e1a]' : 'text-[#6b7c6b] hover:text-[#1a2e1a]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Button 
            onClick={handleLogout}
            className="hidden md:inline-flex bg-[#b8860b] hover:bg-[#8b6914] text-white rounded-full px-5"
          >
            Logout
          </Button>
          <Avatar className="hidden md:flex w-9 h-9 border-2 border-[#b8860b]">
            <AvatarFallback className="bg-[#b8860b] text-white text-sm font-medium">
              {user?.name?.charAt(0) || 'G'}
            </AvatarFallback>
          </Avatar>
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-[#1a2e1a]" /> : <Menu className="w-6 h-6 text-[#1a2e1a]" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden fixed inset-x-0 top-16 z-40 bg-white border-b border-[#e8e4dd]"
        >
          <nav className="py-4 px-4 space-y-2">
            {guestNavItems.map(item => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-[#b8860b]/10 text-[#b8860b]'
                      : 'text-[#6b7c6b] hover:bg-[#f5f3ef]'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <div className="pt-4 border-t border-[#e8e4dd]">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-[#6b7c6b] hover:text-[#1a2e1a] rounded-lg"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </nav>
        </motion.div>
      )}

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
