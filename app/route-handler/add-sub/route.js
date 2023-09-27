// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  const requestUrl = new URL(request.url);
  const formData = await request.formData();
  const billingStartDate = formData.get('startDate');
  const subscriptionId = formData.get('pricePlanId');
  const serviceName = formData.get('serviceName');
  const users = formData.get('users');
  // const introtext = String(formData.get('text'));
  const supabase = createRouteHandlerClient({ cookies });

  console.log(subscriptionId);
  console.log(billingStartDate);
  console.log(serviceName);
  console.log(users);

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  await supabase.from('user_subscriptions').insert({
    user_id: userId,
    subscription_id: subscriptionId,
    billing_start_date: billingStartDate,
    billing_date: 27,
  });

  //   if (error) {
  //     return NextResponse.redirect(
  //       `${requestUrl.origin}/registration?error=Could not authenticate user`,
  //       {
  //         // a 301 status is required to redirect from a POST to a GET route
  //         status: 301,
  //       }
  //     );
  //   }

  return NextResponse.redirect(`${requestUrl.origin}/home/add-subscription`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
