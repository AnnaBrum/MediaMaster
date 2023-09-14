import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { redirect } from "next/navigation";
import { HamburgerMenu } from "@/components/HamburgerMenu/HamburgerMenu";


export const dynamic = "force-dynamic";

// interface User {
//   id: number;
//   user_id: UUID;
//   firstname: string;
//   lastname: string;
// }

export default async function Account() {
  const supabase = createServerComponentClient({ cookies });
  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   // this is a protected route - only users who are signed in can view this route
  //   redirect("/start");
  // }

//   const userInfoResponse = await supabase.from("users").select();
//   let userInfo: User[] = [];

//   if (userInfoResponse && userInfoResponse.data) {
//     userInfo = userInfoResponse.data.map((user: any) => ({
//       id: user.id,
//       user_id: user.user_id,
//       firstname: user.firstname,
//       lastname: user.lastname,
//     }));
//   } else {
//     redirect("/login");
  

const { data: users } = await supabase.from("users").select()

  console.log(users);

  return (
    <div className="profile py-8">
      <HamburgerMenu />
      <div className="py-20">
        <h1 className="text-xl font-bold">Välkommen till Media Watch!</h1>
        {users?.map((user) => (
          <div>
            <p>Hey, {user.firstname}!</p>
            <LogoutButton />
          </div>
        ))}
      </div>
    </div>
  );
}
