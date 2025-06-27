'use client';

import type { FC } from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { content } from '@/lib/content';
import type { Language } from './landing-page';

interface TestimonialsProps {
  language: Language;
}

export const Testimonials: FC<TestimonialsProps> = ({ language }) => {
  const testimonialsContent = content[language].testimonials;

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">{testimonialsContent.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonialsContent.items.map((testimonial, index) => (
            <Card key={index} className="flex flex-col shadow-md">
              <CardHeader className="pb-4">
                <Quote className="w-8 h-8 text-primary" />
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="italic">"{testimonial.quote}"</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="flex items-center mb-2">
                  {Array(5).fill(0).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
