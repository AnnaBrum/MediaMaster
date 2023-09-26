import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function StartPage() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/startpage');
  }

  // if (session) {
  //   setTimeout(() => {
  //     redirect('/home');
  //   }, 3000);

  // }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <h1 className="text-xl font-bold">Välkommen till Media Watch!</h1>
        <h2 className="text-xl">Samla dina betaltjänster på ett ställe</h2>
        <nav className="flex flex-col">
          <Link
            className="border border-gray-700 rounded-full px-4 py-1 text-black mb-2"
            href="/about"
          >
            Hur fungerar det?
          </Link>
          <Link
            className="border border-gray-700 rounded-full px-4 py-1 text-black mb-2"
            href="/conditions"
          >
            Villkor
          </Link>
          <Link
            className="border border-gray-700 rounded-full px-4 py-1 text-black mb-2"
            href="/create-account"
          >
            Skapa konto
          </Link>
          <p className="text-sm">
            Har du redan ett konto?
            <Link className="text-sm" href="/login">
              &#8205; Logga in här
            </Link>
          </p>
        </nav>
      </div>
    </>
  );
}
