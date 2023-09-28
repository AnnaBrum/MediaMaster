
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function POST(request) {
  // const requestUrl = new URL(request.url);
  // const formData = await request.formData();
  // // const subscriptionId = formData.get('pricePlanId');
  // const serviceName = formData.get('serviceName');
  // const users = formData.get('users');
  // const supabase = createRouteHandlerClient({ cookies });

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // const userId = user?.id;
  // await supabase.from('user_subscriptions').insert({
  //   user_id: userId,
  //   subscription_id: subscriptionId,
  // });

    const requestUrl = new URL(request.url);
    // Delay the response for 2.5 seconds
    await new Promise((resolve) => setTimeout(resolve, 2500));
    


  return NextResponse.redirect(`${requestUrl.origin}/welcome`, {
    // a 301 status is required to redirect from a POST to a GET route
    status: 301,
  });
}
