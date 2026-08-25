import React from 'react';
import { Card } from '../components/ui/Card';

export const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
      <Card className="p-8 mt-8 text-[hsl(var(--muted-foreground))] space-y-4">
        <p>By using CHITTI Media, you agree that you will only download or process content that you own, have explicit permission to use, or that is authorized for download by the respective platform.</p>
        <p>CHITTI Media does not bypass DRM or security restrictions and is designed as a simple utility for personal use.</p>
        <p>We are not responsible for any copyright infringement committed by users of this tool.</p>
      </Card>
    </div>
  );
};
