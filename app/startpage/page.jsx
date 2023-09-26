import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

export default async function StartPage() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    setTimeout(() => {
      redirect("/home");
    }, 3000);
    clearTimeout
  } else {
    redirect("/");
  }

  return (
    <>
      <div className="welcomePage">
        <h1>
          Välkommen till <br /> Media Watch!
        </h1>
        <div className="welcomeAnimation"></div>
      </div>
    </>
  );
}
