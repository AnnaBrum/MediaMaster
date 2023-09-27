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
  const supabase = createRouteHandlerClient({ cookies });

  //split up date to take out just the day of the month.
  const dateString = billingStartDate;

  const dateParts = dateString.split('/');
  const day = parseInt(dateParts[1], 10);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;
  await supabase.from('user_subscriptions').insert({
    user_id: userId,
    subscription_id: subscriptionId,
    billing_start_date: billingStartDate,
    billing_date: day,
  });

  return NextResponse.redirect(`${requestUrl.origin}/home/add-subscription`, {
    status: 301,
  });
}
