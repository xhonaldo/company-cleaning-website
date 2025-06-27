'use client';

import { useState } from 'react';
import type { FC } from 'react';
import { Header } from './header';
import { Hero } from './hero';
import { Services } from './services';
import { Gallery } from './gallery';
import { Testimonials } from './testimonials';
import { ServiceArea } from './service-area';
import { Booking } from './booking';
import { Footer } from './footer';
import { AiCleanTip } from './ai-clean-tip';

export type Language = 'en' | 'de';

export const LandingPage: FC = () => {
  const [language, setLanguage] = useState<Language>('en');

  return (
    <div className="flex flex-col min-h-screen">
      <Header language={language} setLanguage={setLanguage} />
      <main className="flex-grow">
        <Hero language={language} />
        <Services language={language} />
        <Gallery language={language} />
        <Testimonials language={language} />
        <ServiceArea language={language} />
        <div className="py-12 md:py-24 bg-background">
          <div className="container mx-auto px-4 grid gap-12 md:gap-16 lg:grid-cols-2">
            <AiCleanTip language={language} />
            <Booking language={language} />
          </div>
        </div>
      </main>
      <Footer language={language} />
    </div>
  );
};
