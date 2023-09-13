'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await supabase.from('users');

      // const { data } = await supabase.from('services').select();
      if (data) {
        setUsers(data);
        console.log(data);
      }
    };

    getUsers();
  }, [supabase, setUsers]);

  return (
    <>
      <h1>Verifiera dig</h1>
      <ul className="flex flex-col gap-8">
        {users.map((item) => (
          <li
            className="flex flex-row justify-between items-center"
            key={item.id}
          >
            <Image
              src={item.subscriptions.services.service_logo}
              alt="huhu"
              width={44}
              height={44}
              placeholder="empty"
              priority={false}
            ></Image>
            <h1>{item.subscriptions.services.service_name}</h1>
            <h2>{item.subscriptions.plan_name}</h2>
          </li>
        ))}
      </ul>
      <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/route-handler/add-sub"
        method="post"
      >
        <label className="text-md" htmlFor="text">
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
          formAction="/route-handler/add-sub"
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
        >
          Insert Values
        </button>
      </form>
    </>
  );
}
