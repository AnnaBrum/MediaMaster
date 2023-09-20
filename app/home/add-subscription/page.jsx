'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [subsData, setSubsData] = useState([]);
  const [input, setInput] = useState('');
  const [inputLength, setInputLength] = useState();

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('services').select();
      if (data) {
        setSubsData(data);
      }
    };

    getData();
  }, [supabase, setSubsData]);

  useEffect(() => {
    console.log(subsData);
  }, [subsData]);
  const handleChange = (e) => {
    setInput(e.target.value);
    setInputLength(input.length);
    console.log(inputLength);
  };

  const filteredData = subsData.filter((item) => {
    const str = input.charAt(0).toUpperCase() + input.slice(1);

    return item.service_name.includes(str);
  });

  return (
    <>
      <input
        type="text"
        placeholder="service-name"
        onChange={handleChange}
        value={input}
      />
      {filteredData.map((item) => {
        return (
          <ul key={item.id}>
            <li>{item.service_name}</li>
          </ul>
        );
      })}
      <h1>
        This is the add subscription page, the from below is not finished.{' '}
      </h1>
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
