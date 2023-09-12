// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic';

// export async function GET(request: Request) {
//   // Create a Supabase client configured to use cookies
//   const requestUrl = new URL(request.url);
//   const supabase = createRouteHandlerClient({ cookies });

//   // This assumes you have a `todos` table in Supabase. Check out
//   // the `Create Table and seed with data` section of the README 👇
//   // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
//   const { data: users } = await supabase.from('users').select();

//   // Create a query string with the data as a parameter
//   //   const dataQueryString = `data=${JSON.stringify(users)}`;

//   // Construct the redirect URL with the data query string
//   //   const redirectUrl = `${requestUrl.origin}/dbserv`;

//   return NextResponse.redirect(`${requestUrl.origin}/dbserv`, {
//     // a 301 status is required to redirect from a POST to a GET route
//     status: 301,
//   });
// }

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = createRouteHandlerClient({ cookies });

  const { data: users } = await supabase.from('users').select();

  return NextResponse.redirect(`${requestUrl.origin}/dbserv`, {
    status: 301,
    headers: {
      'X-Data': JSON.stringify(users), // Pass the fetched data as a custom header
    },
  });
}
