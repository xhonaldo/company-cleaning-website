import React from 'react';
import { content } from '@/lib/content';

interface ContactSectionProps {
  language: 'en' | 'de'; // Assuming 'en' and 'de' are the possible languages
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const contactContent = content[language].contact;

  return (
    <section style={{ padding: '40px 20px', backgroundColor: '#f4f4f4' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>{contactContent.title}</h2>
        <div style={{ marginBottom: '30px' }}>
          <p style={{ fontSize: '1.2em', marginBottom: '10px' }}>
            <strong>{contactContent.emailLabel}:</strong> <a href={`mailto:${contactContent.email}`} style={{ color: '#007bff', textDecoration: 'none' }}>{contactContent.email}</a>
          </p>
          <p style={{ fontSize: '1.2em' }}>
            <strong>{contactContent.phoneLabel}:</strong> <a href={`tel:${contactContent.phone}`} style={{ color: '#007bff', textDecoration: 'none' }}>{contactContent.phone}</a>
          </p>
        </div>

        {/* Google Maps iframe */}
        <div style={{ marginTop: '20px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3045.613526260557!2d8.682753912150513!3d47.695005881748074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479a81a10f0d2991%3A0x46029d0536affca!2sGriesstra%C3%9Fe%207%2C%2078266%20B%C3%BCsingen%20am%20Hochrhein%2C%20Germany!5e1!3m2!1sen!2s!4v1751125760619!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade">
          </iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;