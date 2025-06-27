'use client';

import type { FC } from 'react';
import { Sparkles, Mail, Phone, Twitter, Facebook, Instagram } from 'lucide-react';
import { content } from '@/lib/content';
import type { Language } from './landing-page';

interface FooterProps {
  language: Language;
}

export const Footer: FC<FooterProps> = ({ language }) => {
  const footerContent = content[language].footer;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="space-y-4">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">META REINIGUNG</span>
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mx-auto md:mx-0">
              {footerContent.about}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">{footerContent.contact}</h3>
            <ul className="text-muted-foreground text-sm space-y-1">
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="w-4 h-4" />
                <span>contact@blitzblank.de</span>
              </li>
              <li className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="w-4 h-4" />
                <span>+49 123 456 7890</span>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4 text-muted-foreground">
              <a href="#" className="hover:text-primary"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="hover:text-primary"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} META REINIGUNG. {footerContent.rights}</p>
        </div>
      </div>
    </footer>
  );
};
