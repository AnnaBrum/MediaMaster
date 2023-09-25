'use client';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";


export default async function RegisterWithGoogle() {
  const supabase = createClientComponentClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
   //this is a protected route - only users who are signed in can view this route
    redirect('/');
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2"></div>
  );
}
