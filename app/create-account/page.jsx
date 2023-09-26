'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Messages from './messages';
import Link from 'next/link';

// export const dynamic = "force-dynamic";

export default async function CreateAccount() {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // if (session) {
  //  //this is a protected route - only users who are signed in can view this route
  //   redirect('/');
  // }
  return (
    <div className="flex min-h-screen flex-col py-12">
      <h1 className="text-xl">Skapa konto</h1>
      <h2>Registrera dig med</h2>
      <Link
        href="/register-with-google"
        className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
      >
        Google
      </Link>
      <Link
        href="/create-account/register-with-email"
        className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
      >
        Email
      </Link>
      <Messages />
    </div>
  );
}
