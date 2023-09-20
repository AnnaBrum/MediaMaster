import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Account from './home/page';


import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/startpage');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="startpage h-full">
      <div>
        <Link href="/home/my-subscriptions">Go to account</Link>
        <form action="/route-handler/see-sub">
          {/* <button
            formAction="/route-handler/see-sub"
            className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
          >
            See Subs
          </button> */}
        </form>
      </div>
      {user ? <Account /> : redirect('/login')}
    </div>
  );
}
