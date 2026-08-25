import React from 'react';
import { Card } from '../components/ui/Card';
import { UploadCloud, FileVideo, Download, Settings } from 'lucide-react';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <UploadCloud className="w-8 h-8 text-blue-500" />,
      title: "1. Provide Your Media",
      desc: "Paste an authorized public URL or upload your own MP4 video file directly into our secure tool."
    },
    {
      icon: <Settings className="w-8 h-8 text-orange-500" />,
      title: "2. Choose Options",
      desc: "Select the format and quality you need. Whether it's the highest video resolution available or a specific audio bitrate."
    },
    {
      icon: <Download className="w-8 h-8 text-green-500" />,
      title: "3. Fast Processing",
      desc: "Our secure servers process the media, convert it if necessary, and immediately provide you with a clean download link."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">How It Works</h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-xl mx-auto">
          CHITTI Media makes converting and downloading your authorized media incredibly simple. No complex software, no ads, no waiting.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <Card key={i} className="p-8 text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--secondary))] flex items-center justify-center mb-6">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
            <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">
              {step.desc}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
