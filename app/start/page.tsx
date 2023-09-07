
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";




export default async function Start() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/"); //if logged in - redirect to dashboard
  }

  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">

        <h1 className="text-xl font-bold">Välkommen till Media Watch!</h1>
        <h2 className="text-xl">Samla dina betaltjänster på ett ställe</h2>
        <nav className="flex flex-col">
          <Link
            className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
            href="/about"
          >
            Hur fungerar det?
          </Link>
          <Link
            className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
            href="/conditions"
          >
            Villkor
          </Link>
          <Link
            className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
            href="/registration"
          >
            Skapa konto
          </Link>
          <p className="text-sm">
            Har du redan ett konto?
            <Link className="font-bold" href="/login">
              Logga in här
            </Link>
          </p>
        </nav>
      </div>
    </>
  );
}
