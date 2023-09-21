'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState, useRef } from 'react';
import styles from './add-subscription.module.css';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [serviceData, setServiceData] = useState([]);
  const [input, setInput] = useState('');
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('services').select();
      if (data) {
        setServiceData(data);
      }
    };

    getData();
  }, [supabase, setServiceData]);

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setDropdown(true);
  };

  //filtering the array as value of inputfield changes.
  const filteredData = serviceData
    .filter((item) =>
      item.service_name.toLowerCase().includes(input.toLowerCase())
    )
    .sort((a, b) => {
      // Sort by whether the item starts with the input letter
      const aStartsWithInput = a.service_name
        .toLowerCase()
        .startsWith(input.toLowerCase()); // returns true/false
      const bStartsWithInput = b.service_name
        .toLowerCase()
        .startsWith(input.toLowerCase());

      if (aStartsWithInput && !bStartsWithInput) {
        //if a starts with input and b doesnt, put a before b in the array.
        return -1;
      }
      if (bStartsWithInput && !aStartsWithInput) {
        //if b starts with innput and a doesnt, put b before a in the array
        return 1;
      }

      // If both start with the input letter, sort by asc(default=)
      return 0;
    });

  const handleClick = (e) => {
    setInput(e.target.value);
  };

  const handleFocus = () => {
    console.log('focused');
  };

  const handleBlur = () => {
    setTimeout(() => {
      setDropdown(false);
    }, 30);
  };

  return (
    <>
      <section className={styles.sectionOne}>
        <h1 className={styles.headingOne}>Lägg till prenumeration</h1>
        <form className={styles.serviceForm} action="" method="post">
          <label htmlFor="serviceName" className={styles.headingTwo}>
            Lägg till
          </label>
          <input
            className={styles.inputField}
            name="serviceName"
            type="text"
            required
            placeholder="Service Name"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={input}
            autoComplete="off"
          />

          {dropdown && (
            <>
              <div className={styles.dropDown}>
                {filteredData.map((item) => (
                  <ul key={item.id}>
                    <option onClick={handleClick} value={item.service_name}>
                      {item.service_name}
                    </option>
                  </ul>
                ))}
              </div>
            </>
          )}
        </form>
      </section>
      {/* <form
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
      </form> */}
    </>
  );
}
