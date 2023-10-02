"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function ClientComponent({ insert }) {
  const [users, setUsers] = useState([]);

  // Create a Supabase client configured to use cookies
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await supabase.from("users").select();
      if (data) {
        setUsers(data);
      }
    };

    getUsers();
  }, [supabase, setUsers]);

  return (
    <div>
      <button onClick={insert}>Insert</button>
      <h4>{JSON.stringify(users, null, 2)}</h4>
    </div>
  );
}
