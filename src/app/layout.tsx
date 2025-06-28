import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

import { content } from '@/lib/content';

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

        {/* WhatsApp Button */}
        <a
          // Replace 'en' with your actual locale variable
           href={`https://wa.me/491723025501?text=${encodeURIComponent(content.whatsapp.en)}%0A${encodeURIComponent(content.whatsapp.de)}`}
          
          className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 ease-in-out flex items-center justify-center z-50"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          
        >
          <i className="fab fa-whatsapp text-2xl"></i>
    
        </a>
      </body>
    </html>
  );
}
