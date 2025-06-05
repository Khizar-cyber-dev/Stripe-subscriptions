import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/db';
import stripe from '@/lib/stripe';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user?.customerId) {
      return new NextResponse('No customer ID found', { status: 400 });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Error creating portal session:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
} 