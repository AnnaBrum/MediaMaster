// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const introtext = String(formData.get('text'));
  const supabase = createRouteHandlerClient({ cookies });

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  await supabase
    .from('users')
    .insert({ user_id: userId, firstname: introtext });

  //   if (error) {
  //     return NextResponse.redirect(
  //       `${requestUrl.origin}/registration?error=Could not authenticate user`,
  //       {
  //         // a 301 status is required to redirect from a POST to a GET route
  //         status: 301,
  //       }
  //     );
  //   }

  return NextResponse.redirect(`${requestUrl.origin}/dbserv`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
