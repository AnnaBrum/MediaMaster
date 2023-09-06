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
  <div className="flex-col justify-center">
    <h1 className="text-xl">Samla dina betaltjänster på ett ställe</h1>
<Link href="/about">
  Hur fungerar det?
</Link>
<Link href="/conditions">
  Villkor
</Link>
<Link href="/registration">
  Skapa konto
</Link>
  </div>
  </>
  ) ;
}
