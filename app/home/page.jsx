'use client';
import styles from './home.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
// import Image from 'next/image';
import { HamburgerMenu } from '@/components/HamburgerMenu/HamburgerMenu';
import { CostSlider } from '@/components/CostSlider/CostSlider';
import { TotalCostSlider } from '@/components/TotalCostSlider/TotalCostSlider';
import '../styles/globals.css';
import { LogoutButton } from '@/components/LogoutButton/LogoutButton';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [users, setUsers] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [subs, setSubs] = useState(0);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await supabase.from('user_subscriptions').select(`
    id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_logo))
  `);
      if (data) {
        setUsers(data);
        console.log(data);
      }
    };

    getUsers();
  }, [supabase, setUsers]);

  useEffect(() => {
    let amountOfsubs = 0;
    let totalcost = 0;
    users.forEach((item) => {
      totalcost += item.subscriptions.price;
      amountOfsubs += 1;
    });
    setTotalCost(totalcost);
    setSubs(amountOfsubs);
  }, [users]);

  // useEffect(() => {
  //   // This will log the updated totalCost value
  //   console.log(subs);
  // }, [totalCost]);

  return (
    <div className={styles.page}>
      <section className={styles.sectionOne}>
        <div>
          <HamburgerMenu />
        </div>
        <h1 className={styles.headingOne}>Home</h1>
        <TotalCostSlider totalCost={totalCost} />
      </section>
      <section className={styles.sectionTwo}>
        <div className={styles.amountOfSubsWrapper}>
          <h2 className={styles.amountOfSubsHeading}>Prenumerationer</h2>
          <h2 className={styles.subAmount}>{subs}st</h2>
        </div>
        <ul className={styles.costSliderList}>
          {users.map((item) => (
            <li key={item.id}>
              <CostSlider
                logoUrl={item.subscriptions.services.service_logo}
                serviceName={item.subscriptions.services.service_name}
                cost={item.subscriptions.price}
              />
            </li>
          ))}
        </ul>
      </section>
      <div>
        <LogoutButton />
      </div>

      {/* <ul className="flex flex-col gap-8">
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
      </ul> */}

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
    </div>
  );
}
