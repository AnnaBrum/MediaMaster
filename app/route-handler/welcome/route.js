import { NextResponse } from 'next/server';

export async function GET() {
  // Delay the response for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 5000));
  
  // Redirect to the home page
  return NextResponse.redirect('/home', { status: 302 });
}