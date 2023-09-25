

// import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
// import { cookies } from 'next/headers';
// import { NextResponse } from 'next/server';

// export const dynamic = 'force-dynamic';

// export async function GET(request) {
//   const requestUrl = new URL(request.url);
//   const supabase = createRouteHandlerClient({ cookies });

//   const { data: users } = await supabase.from('users').select();

//   return NextResponse.redirect(`${requestUrl.origin}/dbserv`, {
//     status: 301,
//     headers: {
//       'X-Data': JSON.stringify(users), // Pass the fetched data as a custom header
//     },
//   });
// }
