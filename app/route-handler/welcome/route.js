import { NextResponse } from 'next/server';

export async function GET() {
  const requestUrl = new URL(request.url);
  // Delay the response for 5 seconds
  await new Promise((resolve) => setTimeout(resolve, 2500));
  
  // Redirect to the home page
  return NextResponse.redirect(`${requestUrl.origin}/home`, { status: 302 });
}