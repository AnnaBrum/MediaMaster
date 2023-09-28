// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';

export const dynamic = 'force-dynamic';

export default async function ServerComponent({ params }) {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  const { data: mySubData } = await supabase
    .from('user_subscriptions')
    .select()
    .eq('id', `${params.endslug}`);

  const { data: subData } = await supabase
    .from('subscriptions')
    .select()
    .eq('id', `${mySubData[0].subscription_id}`);

  const { data: serviceData } = await supabase
    .from('services')
    .select()
    .eq('id', `${subData[0].service_id}`);

  console.log(serviceData);

  return (
    <div>
      <Image
        src={serviceData[0].service_logo}
        alt="service logo"
        height={44}
        width={44}
      ></Image>
      <h1>{subData[0].plan_name}</h1>
      <h1>{serviceData[0].service_name}</h1>
      <h1>{subData[0].price}</h1>
      <h1>{mySubData[0].billing_start_date}</h1>
    </div>
  );
}
