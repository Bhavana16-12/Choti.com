import React, { useState, useRef } from 'react';
import { UploadCloud, Music, FileVideo, CheckCircle2, RefreshCw, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const Converter = () => {
  const [file, setFile] = useState<File | null>(null);
  const [quality, setQuality] = useState('192k');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      if (!selectedFile.type.startsWith('video/')) {
        setError('Please select a valid video file.');
        return;
      }
      if (selectedFile.size > 50 * 1024 * 1024) { // 50MB
        setError('This file exceeds the current upload limit (50MB).');
        return;
      }
      setFile(selectedFile);
      setError(null);
      setIsDone(false);
      setDownloadUrl(null);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      if (!droppedFile.type.startsWith('video/')) {
        setError('Please drop a valid video file.');
        return;
      }
      setFile(droppedFile);
      setError(null);
      setIsDone(false);
    }
  };

  const handleConvert = async () => {
    if (!file) return;
    
    setIsProcessing(true);
    setError(null);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('quality', quality);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/convert/mp4-to-mp3`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Something went wrong while processing your file. Please try again.');
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setIsDone(true);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsProcessing(false);
    }
  };

  const reset = () => {
    setFile(null);
    setIsDone(false);
    setDownloadUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-3">MP4 → MP3 Converter</h1>
        <p className="text-[hsl(var(--muted-foreground))]">Turn your own video files into high-quality audio in seconds.</p>
      </div>

      <Card className="p-6 md:p-10 shadow-lg">
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
            {error}
          </div>
        )}

        {!file && !isDone && (
          <div 
            className="border-2 border-dashed border-[hsl(var(--border))] rounded-3xl p-12 text-center hover:border-[hsl(var(--primary))]/50 hover:bg-[hsl(var(--accent))]/50 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--secondary))] flex items-center justify-center mx-auto mb-4">
              <UploadCloud className="w-8 h-8 text-[hsl(var(--muted-foreground))]" />
            </div>
            <h3 className="text-xl font-medium mb-2">Drop your MP4 here</h3>
            <p className="text-[hsl(var(--muted-foreground))] mb-6">or click to browse files</p>
            <Button variant="secondary">Browse files</Button>
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="video/*" 
              onChange={handleFileChange}
            />
          </div>
        )}

        {file && !isDone && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[hsl(var(--secondary))]">
              <div className="w-12 h-12 rounded-xl bg-[hsl(var(--background))] flex items-center justify-center shrink-0">
                <FileVideo className="w-6 h-6 text-[hsl(var(--primary))]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{file.name}</p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">{formatSize(file.size)} • {file.type || 'Video'}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={reset} disabled={isProcessing}>Change</Button>
            </div>

            <div>
              <label className="block text-sm font-medium mb-3">Audio Quality</label>
              <div className="grid grid-cols-4 gap-3">
                {['128k', '192k', '256k', '320k'].map((q) => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    disabled={isProcessing}
                    className={`py-3 rounded-xl text-sm font-medium transition-colors border ${
                      quality === q 
                        ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] border-[hsl(var(--primary))]' 
                        : 'bg-transparent border-[hsl(var(--border))] hover:border-[hsl(var(--primary))]/50 text-[hsl(var(--foreground))] disabled:opacity-50'
                    }`}
                  >
                    {q.replace('k', ' kbps')}
                  </button>
                ))}
              </div>
            </div>

            <Button 
              className="w-full h-14 text-lg" 
              onClick={handleConvert} 
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Convert to MP3'
              )}
            </Button>
            
            <p className="text-xs text-center text-[hsl(var(--muted-foreground))]">
              Files are processed securely and automatically deleted immediately after conversion.
            </p>
          </div>
        )}

        {isDone && downloadUrl && (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Conversion Complete!</h3>
            <p className="text-[hsl(var(--muted-foreground))] mb-8">
              Your audio file is ready for download.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={downloadUrl} download={`chitti-${file?.name.split('.')[0] || 'audio'}.mp3`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  <Download className="w-5 h-5 mr-2" />
                  Download MP3
                </Button>
              </a>
              <Button size="lg" variant="secondary" onClick={reset} className="w-full sm:w-auto">
                Convert another file
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
