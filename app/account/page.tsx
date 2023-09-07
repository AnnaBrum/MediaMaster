import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LogoutButton from "../../components/LogoutButton";
import { redirect } from "next/navigation";
// import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function Account() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect("/start");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1 className="text-xl font-bold">Välkommen till Media Watch!</h1>
      <div className="">
        <div>
          {user ? (
            <div>
              Hey, {user.email}!
              <LogoutButton />
            </div>
          ) : (
            redirect("/login")
          )}
        </div>
      </div>
    </div>
  );
}
