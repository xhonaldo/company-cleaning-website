'use client';

import { useState } from 'react';
import { content } from '@/lib/content';
import type { FC } from 'react';
import { Header } from './header';
import { Hero } from './hero';
import { Services } from './services';
import { Gallery } from './gallery';
import { Testimonials } from './testimonials';
import { ServiceArea } from './service-area';
import { Faq } from './faq';
import { Booking } from './booking';
import { Footer } from './footer';
import { AiCleanTip } from './ai-clean-tip';
import { ContactSection } from './contact-section';
import Chatbot from './chatbot';


export type Language = 'en' | 'de';

export const LandingPage: FC = () => {
  const [language, setLanguage] = useState<Language>('de');

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex-grow">
        <Hero language={language} />
        <Services language={language} />
        <Gallery language={language} />
        <Testimonials language={language} />
        <Faq language={language} />
        <ServiceArea language={language} />
        <div className="py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4 grid gap-12 md:gap-16 lg:grid-cols-2">
            <AiCleanTip language={language} />
            <Booking language={language} />
          </div>
        </div>
      </main>
      <ContactSection language={language} />
      <Footer language={language} />

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/491723025501?text=${encodeURIComponent(content.whatsapp.en)}%0A${encodeURIComponent(content.whatsapp.de)}`}
        className="fixed bottom-6 left-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-200 ease-in-out flex items-center justify-center z-50"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>
      <div   >
        <Chatbot language={language} />
      </div>
    </div>
  );
};
