// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const firstName = String(formData.get('text'));
  const lastName = String(formData.get('text'));
  const supabase = createRouteHandlerClient({ cookies });

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstname = user?.firstname;
  await supabase.from('users').insert({ firstname: userId, lastname: introtext });

  //   if (error) {
  //     return NextResponse.redirect(
  //       `${requestUrl.origin}/registration?error=Could not authenticate user`,
  //       {
  //         // a 301 status is required to redirect from a POST to a GET route
  //         status: 301,
  //       }
  //     );
  //   }

  return NextResponse.redirect(
    `${requestUrl.origin}/create-account/register-with-email/verify-account`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  );
}