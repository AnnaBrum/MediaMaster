// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { CostSlider } from '@/components/CostSlider/CostSlider';
import styles from './my-subscriptions.module.css';
export const dynamic = 'force-dynamic';

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.from('user_subscriptions').select(`
  id,
  billing_start_date,
  billing_date,
  subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_logo))
`);

  const subsData = data;

  return (
    <>
      <section className={styles.sectionOne}>
        <h1 className={styles.headingOne}>Mina Prenumerationer</h1>
        <button className={styles.addPlanContainer}>
          <p>Lägg till prenumeration +</p>
        </button>
        <input
          className={styles.searchField}
          type="text"
          placeholder="Sök bland dina prenumerationer"
        />
      </section>
      <section className={styles.sectionTwo}>
        {subsData.map((item) => (
          <li key={item.id}>
            <CostSlider
              logoUrl={item.subscriptions.services.service_logo}
              serviceName={item.subscriptions.services.service_name}
              cost={item.subscriptions.price}
            />
          </li>
        ))}
      </section>
    </>
  );
}
