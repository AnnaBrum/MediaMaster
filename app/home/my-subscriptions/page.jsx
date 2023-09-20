
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { BrandBox } from '@/components/BrandBox/BrandBox';
import styles from './my-subscriptions.module.css';
export const dynamic = 'force-dynamic';

export default async function ServerComponent() {
  // Create a Supabase client configured to use cookies
  const supabase = createServerComponentClient({ cookies });

  const { data: subsData } = await supabase.from('user_subscriptions').select(`
    id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_logo, category_id))
  `);

  const { data: serviceCategories } = await supabase
    .from('service_categories')
    .select();

  // console.log(subsData);

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.sectionOne}>
        <h1 className={styles.headingOne}>Mina Prenumerationer</h1>
        <button className={styles.addPlanContainer}>
          <p>Lägg till prenumerationer</p>
        </button>
        <input
          className={styles.searchField}
          type="text"
          placeholder="Sök bland dina prenumerationer"
        />
      </section>
      <section className={styles.sectionTwo}>
        {serviceCategories.map((item) => (
          <button className={styles.categoryButton} key={item.id}>
            {item.category}
          </button>
        ))}
      </section>
      <section className={styles.sectionThree}>
        <h3>
          Totalkostnad/mån
        </h3>
        <h3>
          Antal
        </h3>
      </section>
      <section className={styles.sectionFour}>
        <ul>
          {subsData.map((item) => (
            <li key={item.id}>
              <BrandBox
                logoUrl={item.subscriptions.services.service_logo}
                serviceName={item.subscriptions.services.service_name}
                cost={item.subscriptions.price}
              />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
