'use client';
import styles from './home.module.css';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState } from 'react';
import { HamburgerMenu } from '@/components/HamburgerMenu/HamburgerMenu';
import { CostSlider } from '@/components/CostSlider/CostSlider';
import { TotalCostSlider } from '@/components/TotalCostSlider/TotalCostSlider';
import '../styles/globals.css';
import { LogoutButton } from '@/components/LogoutButton/LogoutButton';
import { LoadingSvg } from '@/public/images/loading/loading.svg';
import Image from 'next/image';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [subsData, setSubsData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [subsCount, setSubsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data } = await supabase.from('user_subscriptions').select(`
    id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_logo))
  `);
      if (data) {
        setSubsData(data);
        setIsLoading(false);
      }
    };

    getData();
  }, [supabase, setSubsData]);

  useEffect(() => {
    let amountOfsubs = 0;
    let totalcost = 0;
    subsData.forEach((item) => {
      totalcost += item.subscriptions.price;
      amountOfsubs += 1;
    });
    setTotalCost(totalcost);
    setSubsCount(amountOfsubs);
  }, [subsData]);

  return (
    <div className={styles.page}>
      <HamburgerMenu />
      <section className={styles.sectionOne}>
        <h1 className={styles.headingOne}>Home</h1>
        <TotalCostSlider totalCost={totalCost} />
      </section>
      <section className={styles.sectionTwo}>
        <div className={styles.amountOfSubsWrapper}>
          <h2 className={styles.amountOfSubsHeading}>Prenumerationer</h2>
          <h2 className={styles.subAmount}>{subsCount}st</h2>
        </div>
        <ul className={styles.costSliderList}>
          {isLoading ? (
            <div className={styles.loadingContainer}>
              <Image
                className={styles.loading}
                alt="huhu"
                width={44}
                height={44}
                placeholder="empty"
                priority={false}
                src="/images/loading/loading.svg"
              ></Image>
            </div>
          ) : null}
          {subsData.map((item) => (
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
    </div>
  );
}
