
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'About', href: '/#about' },
  { name: 'Contact', href: '/#contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isLoggedIn = false; // This would be replaced with actual auth state
  const isActive = (path: string) => location.pathname === path || (path !== '/' && location.pathname.startsWith(path));

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">vueAuth</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                isActive(link.href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <Button variant="outline" size="sm" onClick={() => console.log('logout')}>
              Log Out
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="primary" size="sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'absolute top-16 left-0 right-0 z-20 bg-background/95 backdrop-blur-md shadow-md transition-all duration-300 ease-out-expo md:hidden overflow-hidden border-t',
          mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="px-4 py-4 space-y-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary px-4 py-2 rounded-md',
                  isActive(link.href) ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col space-y-2 pt-2 border-t">
            {isLoggedIn ? (
              <Button 
                variant="outline" 
                onClick={() => {
                  console.log('logout');
                  setMobileMenuOpen(false);
                }}
              >
                Log Out
              </Button>
            ) : (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="ghost" className="w-full">Sign In</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
