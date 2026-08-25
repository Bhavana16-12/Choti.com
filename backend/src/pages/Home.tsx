import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Tv, Camera, Link as LinkIcon, FileVideo, Music } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

export const Home = () => {
  const [url, setUrl] = useState('');
  const navigate = useNavigate();

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      navigate(`/video-downloader?url=${encodeURIComponent(url.trim())}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-16 pb-24 text-center">
      <div className="inline-flex items-center rounded-full border bg-[hsl(var(--card))] px-3 py-1 text-sm font-medium mb-8 shadow-sm">
        <span className="flex h-2 w-2 rounded-full bg-[hsl(var(--primary))] mr-2"></span>
        No login. No ads. Just tools.
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
        Convert. Download. <br className="hidden sm:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[hsl(var(--primary))] to-purple-500">Keep it Simple.</span>
      </h1>
      
      <p className="text-lg md:text-xl text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto mb-12">
        Simple media tools for content you own or are authorized to download.
      </p>

      <Card className="w-full max-w-3xl p-2 pl-4 pr-2 mx-auto rounded-3xl shadow-xl shadow-black/5 bg-[hsl(var(--card))]/60 backdrop-blur-xl border border-[hsl(var(--border))]/50 mb-6">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row items-center gap-2">
          <div className="flex-1 w-full flex items-center gap-3">
            <LinkIcon className="w-5 h-5 text-[hsl(var(--muted-foreground))]" />
            <Input 
              type="url" 
              placeholder="Paste a YouTube, Instagram Reel, or supported media URL..." 
              className="border-0 bg-transparent shadow-none focus-visible:ring-0 px-0 h-16 text-lg w-full"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto shrink-0 shadow-md h-14">
            Analyze URL
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </form>
      </Card>

      <div className="flex flex-wrap justify-center items-center gap-4 text-sm text-[hsl(var(--muted-foreground))] mb-16">
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--secondary))]">
          <Tv className="w-4 h-4 text-red-500" /> YouTube
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--secondary))]">
          <Camera className="w-4 h-4 text-pink-500" /> Instagram
        </div>
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(var(--secondary))]">
          <LinkIcon className="w-4 h-4" /> Direct Video
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto text-left mt-8">
        <Card className="p-8 hover:border-[hsl(var(--primary))]/50 transition-colors group cursor-pointer" onClick={() => navigate('/mp4-to-mp3')}>
          <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--secondary))] flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--primary))]/10 transition-colors">
            <Music className="w-7 h-7 text-[hsl(var(--primary))]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">MP4 → MP3 Converter</h3>
          <p className="text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
            Turn your own video files into high-quality audio in seconds. Support for multiple bitrates and formats.
          </p>
          <Button variant="outline" className="w-full group-hover:bg-[hsl(var(--accent))]">
            Upload Video
          </Button>
        </Card>

        <Card className="p-8 hover:border-[hsl(var(--primary))]/50 transition-colors group cursor-pointer" onClick={() => navigate('/video-downloader')}>
          <div className="w-14 h-14 rounded-2xl bg-[hsl(var(--secondary))] flex items-center justify-center mb-6 group-hover:bg-[hsl(var(--primary))]/10 transition-colors">
            <FileVideo className="w-7 h-7 text-[hsl(var(--primary))]" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Video Downloader</h3>
          <p className="text-[hsl(var(--muted-foreground))] mb-6 leading-relaxed">
            Download authorized videos directly from supported platforms in the highest quality available.
          </p>
          <Button variant="outline" className="w-full group-hover:bg-[hsl(var(--accent))]">
            Open Downloader
          </Button>
        </Card>
      </div>
    </div>
  );
};
