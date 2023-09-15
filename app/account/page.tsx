import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { HamburgerMenu } from "@/components/HamburgerMenu/HamburgerMenu";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function Account() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/');
  }

  const { data: users } = await supabase.from("users").select();
  return (
    <div className="profile flex justify-center">
      <HamburgerMenu />
      <div className="py-20">
        <h1 className="text-xl font-bold text-center">Välkommen till Media Watch!</h1>
        <div>
          {users?.map((user) => (
            <p className="text-center">Hey, {user.firstname}!</p>
          ))}
          {/* < LogoutButton />  */}
        </div>
      </div>
    </div>
  );
}
