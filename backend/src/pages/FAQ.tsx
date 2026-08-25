import React from 'react';
import { Card } from '../components/ui/Card';

export const FAQ = () => {
  const faqs = [
    {
      q: "Do I need an account?",
      a: "No. CHITTI Media is designed to work completely without account creation."
    },
    {
      q: "Is it free?",
      a: "The website is designed as a free utility. Hosting and processing limits may apply."
    },
    {
      q: "Can I download any video?",
      a: "Only content that you own or are authorized to download, and sources supported by the application. We respect platform terms and do not bypass security restrictions."
    },
    {
      q: "Can I convert MP4 to MP3?",
      a: "Yes. You can upload a supported video file from your device and convert it to high-quality MP3 audio."
    },
    {
      q: "Can I paste a YouTube or Instagram Reel URL?",
      a: "The application can analyze supported and authorized public URLs, but unsupported content will be clearly reported."
    },
    {
      q: "Are my uploaded files stored?",
      a: "No. Files are processed temporarily on the server and are automatically removed immediately after processing or conversion is complete."
    }
  ];

  return (
    <div className="max-w-3xl mx-auto py-12">
      <h1 className="text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
      <p className="text-[hsl(var(--muted-foreground))] text-center mb-12">
        Everything you need to know about CHITTI Media.
      </p>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <Card key={index} className="p-6">
            <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
            <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
