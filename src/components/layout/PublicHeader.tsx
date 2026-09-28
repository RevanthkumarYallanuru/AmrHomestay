import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { hotelInfo } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/rooms', label: 'Rooms' },
  { href: '/amenities', label: 'Amenities' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/contact', label: 'Contact' },
];

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user, isAdmin, isGuest } = useAuth();

  const isHomePage = location.pathname === '/';

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic styles based on scroll and page
  const headerBg = isHomePage && !scrolled
    ? 'bg-[#1a2e1a]/70 backdrop-blur-md'
    : 'bg-[#1a2e1a] shadow-lg';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#b8860b] flex items-center justify-center shadow-md">
              <span className="text-white font-serif font-bold text-2xl">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-semibold text-white leading-tight">
                {hotelInfo.name}
              </span>
              <span className="text-[10px] text-white/70 uppercase tracking-[0.2em] -mt-0.5">
                {hotelInfo.tagline}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.href
                    ? 'bg-[#b8860b] text-white'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA & Auth */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <Link to={isAdmin ? '/admin' : '/dashboard'}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-white/30 bg-white/90 text-[#1a2e1a] hover:bg-white hover:text-[#1a2e1a] rounded-full font-medium"
                >
                  <User className="w-4 h-4" />
                  {isAdmin ? 'Admin' : 'Dashboard'}
                </Button>
              </Link>
            ) : null}
            <Link to="/booking">
              <Button className="bg-[#b8860b] hover:bg-[#a07608] text-white px-6 rounded-full shadow-md hover:shadow-lg transition-all">
                Book Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-white" />
            ) : (
              <Menu className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-white/10"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? 'bg-[#b8860b] text-white'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-2">
                {user ? (
                  <Link to={isAdmin ? '/admin' : '/dashboard'} onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full border-white/30 text-white hover:bg-white hover:text-[#1a2e1a]">
                      {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                    </Button>
                  </Link>
                ) : null}
                <Link to="/booking" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="bg-[#b8860b] hover:bg-[#a07608] text-white w-full">
                    Book Now
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}
