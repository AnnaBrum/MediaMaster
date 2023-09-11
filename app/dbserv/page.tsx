// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });

  // This assumes you have a `todos` table in Supabase. Check out
  // the `Create Table and seed with data` section of the README 👇
  // https://github.com/vercel/next.js/blob/canary/examples/with-supabase/README.md
  const { data: users } = await supabase.from('users').select();

  // console.log(JSON.stringify(users));

  // const ParsedUsers = JSON.stringify(users);

  return (
    <div>
      <h1>Intro and ID</h1>
      <ol>
        {users?.map((item) => (
          <li key={item.id}>{item.intro}</li>
        ))}
      </ol>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/route-handler"
        method="post"
      >
        <label className="text-md" htmlFor="password">
          Intro Text
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          name="text"
          placeholder="intro text"
          required
        />
        <button
          formAction="/route-handler"
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
        >
          Insert Values
        </button>
      </form>
    </div>
  );
}
