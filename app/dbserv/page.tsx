import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DbClient from '@/components/DbClient/DbClient';
import { useEffect, useState } from 'react';
// import Link from "next/link";

// export const dynamic = 'force-dynamic';
interface Props {
  // Define the type for the insert function
  insertData: () => Promise<void>;
}

export default async function DbServ() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    // this is a protected route - only users who are signed in can view this route
    redirect('/start');
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  //inserting into users
  async function myInsertFunction() {
    // Your insert logic here
  }

  return (
    <>
      <DbClient insert={myInsertFunction}></DbClient>
    </>
  );
}
