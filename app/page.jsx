import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Index() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();


  if (!session) {
    // Redirect to /startpage if the user is not authenticated
    return redirect("/startpage");
  }

  // Redirect to /home after 5 seconds
  setTimeout(() => {
    redirect("/home");
  }, 5000);

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
