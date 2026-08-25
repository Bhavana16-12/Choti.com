import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, CheckCircle2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Video Downloader', path: '/video-downloader' },
    { name: 'MP4 → MP3', path: '/mp4-to-mp3' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'FAQ', path: '/faq' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-[hsl(var(--background))]/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">C</span>
            </div>
            <span className="font-bold text-xl tracking-tight">CHITTI Media</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1 ml-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[hsl(var(--accent))] hover:text-[hsl(var(--accent-foreground))]",
                  location.pathname === link.path ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]" : "text-[hsl(var(--muted-foreground))]"
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[hsl(var(--secondary))] text-[hsl(var(--secondary-foreground))] text-xs font-medium border border-[hsl(var(--border))] shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-[hsl(var(--primary))]" />
            No Login Required
          </div>
          
          <Button variant="ghost" size="sm" onClick={toggleTheme} className="w-9 h-9 rounded-full p-0">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button variant="ghost" size="sm" className="md:hidden w-9 h-9 p-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-b bg-[hsl(var(--background))] p-4 flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
              className={cn(
                "px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                location.pathname === link.path ? "bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))]" : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
