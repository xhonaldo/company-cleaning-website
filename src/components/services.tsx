'use client';

import type { FC } from 'react';
import { Home, Building, Wind, Sun } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { content } from '@/lib/content';
import type { Language } from './landing-page';

interface ServicesProps {
  language: Language;
}

const ICONS: { [key: string]: React.ElementType } = {
  Home,
  Building,
  Wind,
  Sun,
};

export const Services: FC<ServicesProps> = ({ language }) => {
  const servicesContent = content[language].services;

  return (
    <section id="services" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{servicesContent.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesContent.items.map((service, index) => {
            const Icon = ICONS[service.icon];
            return (
              <Card key={index} className="text-center shadow-md hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl font-semibold">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
