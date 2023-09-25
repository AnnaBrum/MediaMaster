"use client";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from "next/navigation";
import Link from "next/link";

// export const dynamic = "force-dynamic";

export default async function StartPage() {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/');
  }

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
