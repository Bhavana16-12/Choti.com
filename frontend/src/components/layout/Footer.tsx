import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t bg-[hsl(var(--card))] py-12 mt-12">
      <div className="container mx-auto px-4 max-w-5xl flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
        <div className="flex flex-col items-center md:items-start gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[hsl(var(--primary))] flex items-center justify-center">
              <span className="text-white font-bold text-sm leading-none">C</span>
            </div>
            <span className="font-bold text-lg">CHITTI Media</span>
          </div>
          <p className="text-sm text-[hsl(var(--muted-foreground))] italic text-center md:text-left">
            "Made simple by Chitti — because good tools should just work."
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[hsl(var(--muted-foreground))]">
          <Link to="/" className="hover:text-[hsl(var(--foreground))] transition-colors">Home</Link>
          <Link to="/video-downloader" className="hover:text-[hsl(var(--foreground))] transition-colors">Downloader</Link>
          <Link to="/mp4-to-mp3" className="hover:text-[hsl(var(--foreground))] transition-colors">MP4 → MP3</Link>
          <Link to="/how-it-works" className="hover:text-[hsl(var(--foreground))] transition-colors">How It Works</Link>
          <Link to="/faq" className="hover:text-[hsl(var(--foreground))] transition-colors">FAQ</Link>
          <Link to="/privacy" className="hover:text-[hsl(var(--foreground))] transition-colors">Privacy</Link>
          <Link to="/terms" className="hover:text-[hsl(var(--foreground))] transition-colors">Terms</Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4 max-w-5xl mt-8 pt-8 border-t text-center md:text-left">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">
          © {new Date().getFullYear()} CHITTI Media. All rights reserved. Download only content you own or have permission to use. Respect platform terms and copyright.
        </p>
      </div>
    </footer>
  );
};
