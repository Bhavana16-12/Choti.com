import React from 'react';
import { Card } from '../components/ui/Card';

export const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-[hsl(var(--muted-foreground))] mb-8">
        Last updated: August 2026
      </p>

      <Card className="p-8 prose prose-invert max-w-none space-y-6 text-[hsl(var(--muted-foreground))]">
        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">1. No Login Required</h2>
        <p>
          CHITTI Media does not require you to create an account, log in, or provide any personal identification information to use our core tools.
        </p>

        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">2. Temporary Processing</h2>
        <p>
          When you use our MP4 to MP3 converter, your files are uploaded to our servers purely for the purpose of conversion.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Uploaded files are processed in a temporary directory.</li>
          <li>Files are <strong>automatically deleted</strong> immediately after successful processing.</li>
          <li>If an error occurs, the temporary files are also cleaned up automatically.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">3. No Permanent Storage</h2>
        <p>
          We do not retain, store, backup, or share any of the media files you upload or process through CHITTI Media. Your media remains yours.
        </p>

        <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">4. Analytics and Tracking</h2>
        <p>
          We employ minimal, privacy-friendly analytics to understand basic usage patterns and ensure the service remains stable. We do not use intrusive tracking, nor do we sell data to advertisers.
        </p>
      </Card>
    </div>
  );
};
