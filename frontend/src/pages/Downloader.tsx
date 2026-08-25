import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Tv, Camera, AlertCircle, Loader2, Download, RefreshCw, FileVideo, Music } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';

interface MediaInfo {
  title: string;
  duration: number;
  thumbnail: string;
  source: string;
  formats: { type: string; quality: string; resolution?: number }[];
  audioFormats: { type: string; quality: string }[];
}

export const Downloader = () => {
  const [searchParams] = useSearchParams();
  const initialUrl = searchParams.get('url') || '';
  
  const [url, setUrl] = useState(initialUrl);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [mediaInfo, setMediaInfo] = useState<MediaInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadStarted, setDownloadStarted] = useState(false);
  
  const [selectedFormat, setSelectedFormat] = useState('mp4');
  const [selectedQuality, setSelectedQuality] = useState('');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [downloadResult, setDownloadResult] = useState<{ url: string, filename: string } | null>(null);

  useEffect(() => {
    if (initialUrl) {
      handleAnalyze(new Event('submit') as any, initialUrl);
    }
  }, [initialUrl]);

  const handleAnalyze = async (e: React.FormEvent, submitUrl: string = url) => {
    e.preventDefault();
    if (!submitUrl.trim()) return;

    setIsAnalyzing(true);
    setError(null);
    setMediaInfo(null);
    setDownloadResult(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/download/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: submitUrl }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Please enter a valid URL.');
      }

      const data = await response.json();
      setMediaInfo(data);
      if (data.formats?.length > 0) {
        setSelectedFormat('mp4');
        setSelectedQuality(data.formats[0].quality);
      } else if (data.audioFormats?.length > 0) {
        setSelectedFormat('mp3');
        setSelectedQuality(data.audioFormats[0].quality);
      }
    } catch (err: any) {
      setError(err.message || 'We couldn\'t reach the source. Please check the URL and try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDownload = () => {
    if (!mediaInfo) return;
    
    setIsProcessing(true);
    setDownloadStarted(false);
    setError(null);

    const apiUrl = import.meta.env.VITE_API_URL || '/api';
    const params = new URLSearchParams({
      url,
      format: selectedFormat,
      quality: selectedQuality
    });
    
    // Use native browser navigation to trigger the download.
    window.location.href = `${apiUrl}/download/process?${params.toString()}`;

    // Reset the processing state after 5 seconds and show a success message
    setTimeout(() => {
      setIsProcessing(false);
      setDownloadStarted(true);
      
      // Hide the success message after 10 seconds
      setTimeout(() => {
        setDownloadStarted(false);
      }, 10000);
    }, 5000);
  };

  const formatDuration = (seconds: number) => {
    if (!seconds) return 'Unknown duration';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const reset = () => {
    setDownloadResult(null);
    setUrl('');
    setMediaInfo(null);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">Video & Reel Downloader</h1>
        <p className="text-[hsl(var(--muted-foreground))]">Paste a public URL for content you own or are authorized to download.</p>
        <p className="text-sm text-[hsl(var(--primary))] mt-2">Note: Instagram Reels may take 30-60 seconds to analyze. Please be patient!</p>
      </div>

      <Card className="p-4 mb-8">
        <form onSubmit={handleAnalyze} className="flex flex-col sm:flex-row gap-3">
          <Input 
            type="url" 
            placeholder="https://www.youtube.com/watch?v=..." 
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={isAnalyzing || isProcessing}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isAnalyzing || isProcessing} className="w-full sm:w-auto shrink-0">
            {isAnalyzing ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Search className="w-5 h-5 mr-2" />}
            Analyze
          </Button>
        </form>
      </Card>

      {error && (
        <div className="mb-8 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {mediaInfo && !downloadResult && (
        <div className="grid md:grid-cols-[300px_1fr] gap-6">
          <Card className="overflow-hidden">
            <div className="aspect-video w-full bg-[hsl(var(--secondary))] relative">
              {mediaInfo.thumbnail ? (
                <img src={mediaInfo.thumbnail} alt="Thumbnail" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileVideo className="w-10 h-10 text-[hsl(var(--muted-foreground))]" />
                </div>
              )}
              <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md font-medium backdrop-blur-sm">
                {formatDuration(mediaInfo.duration)}
              </div>
            </div>
            <div className="p-4 border-t">
              <h3 className="font-semibold line-clamp-2 mb-2" title={mediaInfo.title}>{mediaInfo.title || 'Unknown Title'}</h3>
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                {mediaInfo.source === 'YouTube' && <Tv className="w-4 h-4 text-red-500" />}
                {mediaInfo.source.includes('Instagram') && <Camera className="w-4 h-4 text-pink-500" />}
                <span>{mediaInfo.source}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 flex flex-col">
            <h3 className="text-xl font-bold mb-6">Download Options</h3>
            
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 py-3 px-4 rounded-xl font-medium border flex items-center justify-center gap-2 transition-colors ${selectedFormat === 'mp4' ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--accent))] border-[hsl(var(--border))]'}`}
                onClick={() => { setSelectedFormat('mp4'); setSelectedQuality(mediaInfo.formats[0]?.quality || ''); }}
                disabled={!mediaInfo.formats?.length}
              >
                <FileVideo className="w-5 h-5" /> Video (MP4)
              </button>
              <button
                className={`flex-1 py-3 px-4 rounded-xl font-medium border flex items-center justify-center gap-2 transition-colors ${selectedFormat === 'mp3' ? 'bg-[hsl(var(--primary))] text-white border-[hsl(var(--primary))]' : 'hover:bg-[hsl(var(--accent))] border-[hsl(var(--border))]'}`}
                onClick={() => { setSelectedFormat('mp3'); setSelectedQuality(mediaInfo.audioFormats[0]?.quality || ''); }}
                disabled={!mediaInfo.audioFormats?.length}
              >
                <Music className="w-5 h-5" /> Audio (MP3)
              </button>
            </div>

            <div className="mb-8 flex-1">
              <label className="block text-sm font-medium mb-3">Available Qualities</label>
              <div className="grid grid-cols-3 gap-3">
                {(selectedFormat === 'mp4' ? mediaInfo.formats : mediaInfo.audioFormats).map((q, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedQuality(q.quality)}
                    className={`py-2 rounded-xl text-sm font-medium transition-colors border ${
                      selectedQuality === q.quality 
                        ? 'bg-[hsl(var(--secondary))] text-[hsl(var(--foreground))] border-[hsl(var(--primary))]' 
                        : 'bg-transparent border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/30 text-[hsl(var(--foreground))]'
                    }`}
                  >
                    {q.quality}
                  </button>
                ))}
              </div>
            </div>

            <Button size="lg" className="w-full" onClick={handleDownload} disabled={isProcessing || !selectedQuality}>
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Processing (may take a minute)...
                </>
              ) : (
                'Download'
              )}
            </Button>
            
            {downloadStarted && (
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-md text-green-500 text-sm text-center">
                Download started! Check your browser's download manager.
              </div>
            )}
            <p className="text-xs text-center text-[hsl(var(--muted-foreground))] mt-4">
              Download only content you own or have permission to use.
            </p>
          </Card>
        </div>
      )}

      {downloadResult && (
        <Card className="p-10 text-center max-w-xl mx-auto mt-8 border-green-500/30">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <Download className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Ready for Download</h3>
          <p className="text-[hsl(var(--muted-foreground))] mb-8">
            File: {downloadResult.filename}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={downloadResult.url} download={downloadResult.filename} className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700 text-white">
                Download File
              </Button>
            </a>
            <Button size="lg" variant="outline" onClick={reset} className="w-full sm:w-auto">
              Start Over
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
