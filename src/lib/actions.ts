'use server';

import { Resend } from 'resend';
import { z } from 'zod';
import { BookingEmailTemplate } from './emailTemplates';
import { generateCleaningTip } from '@/ai/flows/cleaning-tip-generator'; // Assuming this exists & is correct

// AI Cleaning Tip Action
const cleanTipSchema = z.object({
  location: z.string().min(2, { message: 'Location must be at least 2 characters.' }),
});

interface AiTipState {
  tip?: string | null;
  message?: string;
  errors?: {
    location?: string[];
  };
}

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function getCleaningTipAction(prevState: AiTipState, formData: FormData): Promise<AiTipState> {
  const locationValue = formData.get('location');

  const validatedFields = cleanTipSchema.safeParse({
    location: typeof locationValue === 'string' ? locationValue : '',
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const { cleaningTip } = await generateCleaningTip({ location: validatedFields.data.location });
    return { tip: cleaningTip, message: 'Success' };
  } catch (error) {
    console.error('Error generating cleaning tip:', error);
    return { message: 'An error occurred while generating the tip.' };
  }
}

// Chatbot Action
export async function generateChatResponse(message: string): Promise<string> {
  try {
    const { cleaningTip } = await generateCleaningTip({
      location: `Respond to this as a helpful chatbot: ${message}`,
    });
    return cleaningTip;
  } catch (error) {
    console.error('Error generating chatbot response:', error);
    return 'Error generating response.';
  }
}

// Booking Form Action
const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().optional(),
  phone: z.string().min(10, { message: 'Please enter a valid phone number.' }),
});

interface BookingState {
  whatsappLink: string;
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    service?: string[];
    phone?: string[];
    message?: string[];
  };
  success?: boolean;
}

export async function bookCleaningAction(prevState: BookingState, formData: FormData): Promise<BookingState> {
  const validatedFields = bookingSchema.safeParse(Object.fromEntries(formData.entries()));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please correct the errors below.',
      whatsappLink: '',
    };
  }

  const { name, email, service, message, phone } = validatedFields.data;

  try {
    const bookingEmail = new BookingEmailTemplate();

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'metareinigung2020@gmail.com',
      subject: 'New Booking Received',
      html: bookingEmail.generateHtml({ name, email, service, message: message || '', phone }),
    });

    return {
      message: 'Booking request sent! We will contact you shortly.',
      success: true,
      whatsappLink: '',
    };

  } catch (error) {
    console.error('Error sending email:', error);

    const whatsappMessage = `New Service Request:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${service}\nMessage: ${message || 'N/A'}`;
    const whatsappLink = `https://wa.me/491723025501?text=${encodeURIComponent(whatsappMessage)}`;

    return {
      message: 'Failed to send service request email. You can contact me via WhatsApp.',
      success: false,
      whatsappLink,
    };
  }
}
