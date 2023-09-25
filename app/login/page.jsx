"use client";
import { redirect } from 'next/navigation';
import Messages from './messages';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Login() {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/');
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        <form
          className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
          action="/auth/sign-in"
          method="post"
        >
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Lösenord
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            id="password"
            autoComplete="current-password"
            placeholder="••••••••"
            required
          />
          <button
            formAction="/auth/sign-in"
            className="border border-gray-700 rounded-full px-4 py-1 text-black mb-2"
          >
            Logga in
          </button>
        <Link className="underline " href="/reset-password">Återställ lösenord</Link>
          <Messages />
        </form>
      </div>
    </div>
  );
}
