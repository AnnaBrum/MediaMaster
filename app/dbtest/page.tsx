'use client';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default async function DBtest() {
  const supabase = createClientComponentClient();

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  //getting the current auth user data.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id;

  //inserting into users
  async function Insert() {
    const { data, error } = await supabase

      .from('users')
      // .insert({ user_id: userId, intro: 'this is 4nd intro for petjak' })
      // .delete()
      // .eq('id', 7);
      .select();
    if (data) {
      console.log(data);
    }
    {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex-col text-center">
        <h1 className="text-xl">DB-test page</h1>
        <button onClick={Insert}>Insert Hardcoded Values</button>
      </div>
    </>
  );
}
