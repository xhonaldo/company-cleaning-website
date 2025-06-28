import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

import { content } from '@/lib/content';
import Chatbot from '@/components/chatbot';

export const metadata: Metadata = {
  title: 'META REINIGUNG - Professional Cleaning Services',
  description: 'Your reliable partner for cleaning services in Germany.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Assuming locale is determined elsewhere, e.g., via route params or context
    // For demonstration, let's assume a default 'en' or get it from a placeholder
    <html lang="en">

      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Add this for a simple WhatsApp icon */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"></link>
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
