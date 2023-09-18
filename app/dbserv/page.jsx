'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { HamburgerMenu } from '@/components/HamburgerMenu/HamburgerMenu';
import { CostSlider } from '@/components/CostSlider/CostSlider';
import { TotalCostSlider } from '@/components/TotalCostSlider/TotalCostSlider';

interface SubscriptionItem {
  billing_start_date: string;
  billing_date: number;
  id: number;
  subscriptions: {
    plan_name: string;
    price: number;
    services: {
      service_logo: string;
      service_name: string;
    };
  };
}

export default function ClientComponent({}) {
  const supabase = createClientComponentClient();

  const [users, setUsers] = useState<any[]>([]);
  const [totalCost, setTotalCost] = useState<number>(0);

  useEffect(() => {
    const getUsers = async () => {
      const { data } = await supabase.from('user_subscriptions').select(`
    id,
    user_id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_logo))
  `);

      // const { data } = await supabase.from('services').select();
      if (data) {
        setUsers(data);
        console.log(data);

        // data.forEach((iteration) => {
        //   console.log(iteration);
        //   iteration.subscriptions.forEach((subscription) => {
        //     console.log(subscription.price);
        //   });
        // });

        // users.map((item) => console.log(item));
      }
    };

    getUsers();
  }, [supabase, setUsers]);

  useEffect(() => {
    let totalcost = 0;
    users.forEach((item) => {
      totalcost += item.subscriptions.price;
    });
    setTotalCost(totalcost);
  }, [users]);

  useEffect(() => {
    // This will log the updated totalCost value
    console.log(totalCost);
  }, [totalCost]);

  return (
    <div className="py-8">
      <section className="px-8">
        <HamburgerMenu />
        <h1 className="text-left mt-8 mb-8 text-3xl">Home</h1>
        <TotalCostSlider totalCost={totalCost} />
      </section>
      <section className="border-t-2 rounded-2xl border-black mt-8 px-8">
        <h2 className="text-left mt-8 mb-8 text-3xl">Prenumerationer</h2>
        <ul className="flex flex-col gap-8">
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