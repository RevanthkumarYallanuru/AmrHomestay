import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  CalendarDays,
  BedDouble,
  MessageSquare,
  Users,
  DollarSign,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  ClipboardList,
  Mail,
  StickyNote,
  ChevronLeft,
  Image,
  Wifi,
} from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const adminNavItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: CalendarDays, label: 'Bookings', href: '/admin/bookings' },
  { icon: BedDouble, label: 'Rooms', href: '/admin/rooms' },
  { icon: MessageSquare, label: 'Reviews', href: '/admin/reviews' },
  { icon: Users, label: 'Staff', href: '/admin/staff' },
  { icon: DollarSign, label: 'Earnings', href: '/admin/earnings' },
  { icon: Image, label: 'Gallery', href: '/admin/gallery' },
  { icon: Wifi, label: 'Amenities', href: '/admin/amenities' },
  { icon: ClipboardList, label: 'Check-In/Out', href: '/admin/checkins' },
  { icon: Mail, label: 'Messages', href: '/admin/messages' },
  { icon: StickyNote, label: 'Notes', href: '/admin/notes' },
];

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] flex">
      {/* Desktop Sidebar */}
      <aside
        className={`hidden lg:flex flex-col bg-[#1a2e1a] transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-20'
        }`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#b8860b] flex items-center justify-center">
                <span className="text-white font-serif font-bold">V</span>
              </div>
              <div>
                <span className="font-serif text-sm font-semibold text-white block">
                  Viha Home Stay
                </span>
                <span className="text-xs text-white/50">HOST ADMIN</span>
              </div>
            </Link>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-white/70" />
            ) : (
              <Menu className="w-5 h-5 text-white/70" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
          {adminNavItems.map(item => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#b8860b] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Settings & Logout */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <Settings className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Settings</span>}
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all w-full"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>

        {/* User */}
        {sidebarOpen && (
          <div className="p-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-[#b8860b] text-white">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || 'Admin'}
                </p>
                <p className="text-xs text-white/50 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-[#1a2e1a] border-b border-white/10 flex items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#b8860b] flex items-center justify-center">
            <span className="text-white font-serif font-bold">V</span>
          </div>
          <span className="font-serif text-sm font-semibold text-white">Viha</span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-white/10"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#1a2e1a] pt-16"
          >
            <nav className="py-4 px-3 space-y-1">
              {adminNavItems.map(item => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-[#b8860b] text-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-white/10 hover:text-white transition-all w-full mt-4"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:min-h-0">
        {/* Top Bar */}
        <header className="hidden lg:flex h-16 items-center justify-between px-6 bg-white border-b border-[#e8e4dd]">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-medium text-foreground">
              {adminNavItems.find(item => item.href === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative hover:bg-[#f5f3ef]">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#b8860b] rounded-full" />
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-[#b8860b] text-white text-sm">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-auto mt-16 lg:mt-0 bg-[#faf9f6]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
