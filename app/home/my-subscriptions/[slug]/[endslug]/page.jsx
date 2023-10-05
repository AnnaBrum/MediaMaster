import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Image from 'next/image';
import styles from './my-subscription.module.css';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ServerComponent({ params }) {
  const supabase = createServerComponentClient({ cookies });

  const { data: mySubData } = await supabase
    .from('user_subscriptions')
    .select()
    .eq('id', `${params.endslug}`);

  const { data: subData } = await supabase
    .from('subscriptions')
    .select()
    .eq('id', `${mySubData[0].subscription_id}`);

  const { data: serviceData } = await supabase
    .from('services')
    .select()
    .eq('id', `${subData[0].service_id}`);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.headerSection}>
        <div className={styles.backContainer}>
          <Link className={styles.back} href={`/home/my-subscriptions`}>
            <Image
              src="/images/navigation/back.svg"
              alt="navigate back"
              height={30}
              width={30}
            ></Image>
          </Link>
        </div>
        <div className={styles.logo}>
          <Image
            src={serviceData[0].service_logo}
            alt="service logo"
            height={40}
            width={150}
          ></Image>
        </div>

        <div className={styles.headingOne}>
          <h1>{subData[0].plan_name}</h1>
        </div>
      </div>

      <div className={styles.infoSection}>
        <div className={styles.infoRow}>
          <h2 className={styles.headingTwo}>{subData[0].price} kr/mån</h2>
        </div>

        <div className={styles.infoRow}>
          <h3 className={styles.headingThree}> Namn </h3>
          <span className={styles.value}>{serviceData[0].service_name}</span>
        </div>

        <div className={styles.infoRow}>
          <h3 className={styles.headingThree}>Antal konton </h3>
          <span className={styles.value}>{mySubData[0].amount_of_users}</span>
        </div>

        <div className={styles.infoRow}>
          <h3 className={styles.headingThree}>Första räkning </h3>
          <span className={styles.value}>
            {mySubData[0].billing_start_date}
          </span>
        </div>

        <div className={styles.buttonWrapper}>
          <Link
            href={`home/my-subscriptions/${params.slug}/${params.endslug}/change-subscription`}
            className={styles.changePlanBtn}
          >
            Hantera Betalningsplan
            <Image
              src="/images/navigation/forward.svg"
              alt="navigate forward"
              height={8}
              width={8}
            ></Image>
          </Link>
        </div>
      </div>
    </div>
  );
}
