
'use server';

import { generateCleaningTip } from '@/ai/flows/cleaning-tip-generator';
import { z } from 'zod';

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

export async function getCleaningTipAction(prevState: AiTipState, formData: FormData): Promise<AiTipState> {
  const validatedFields = cleanTipSchema.safeParse({
    location: formData.get('location'),
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
    console.error(error);
    return { message: 'An error occurred while generating the tip.' };
  }
}


// Booking Form Action
const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Name is required.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  service: z.string().min(1, { message: 'Please select a service.' }),
  message: z.string().optional(),
});

interface BookingState {
  message?: string;
  errors?: {
    name?: string[];
    email?: string[];
    service?: string[];
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
    };
  }
  
  // In a real app, you would process the booking here (e.g., send email, save to DB)
  console.log('New Booking Request:', validatedFields.data);

  return {
    message: 'Booking request sent! We will contact you shortly.',
    success: true,
  };
}
