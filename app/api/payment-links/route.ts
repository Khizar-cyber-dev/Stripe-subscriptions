import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PLAN_LINK,
    yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PLAN_LINK
  });
} 