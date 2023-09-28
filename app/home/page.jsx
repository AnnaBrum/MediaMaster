"use client";
import { HamburgerMenu } from '@/components/HamburgerMenu/HamburgerMenu';
import styles from "./home.module.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import { CostSlider } from "@/components/CostSlider/CostSlider";
import { TotalCostSlider } from "@/components/TotalCostSlider/TotalCostSlider";
import "../globals.css";
// import { LoadingSvg } from '@/public/images/loading/loading.svg';
import Image from "next/image";
import { redirect } from "next/navigation";
import  PushNotice  from "@/components/PushNotice/PushNotice";

// export const dynamic = 'force-dynamic';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [subsData, setSubsData] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [subsCount, setSubsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This code will only be executed on the client side.
    // const supabase = createClientComponentClient();
    async function fetchData() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        // this is a protected route - only users who are signed in can view this route
        console.log("we have session");
      }
      if (!session) {
        // this is a protected route - only users who are signed in can view this route
        redirect("/");
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data } = await supabase.from("user_subscriptions").select(`
    id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_icon))
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
    <>
    <HamburgerMenu />
      <div className={styles.homeWrapper}>
        <section className={styles.sectionOne}>
          <h1 className={styles.headingOne}>Hem</h1>
          <TotalCostSlider totalCost={totalCost} />
        </section>
        <section className={styles.sectionTwo}>
          <div className={styles.amountOfSubsWrapper}>
            <h2 className={styles.amountOfSubsHeading}>Prenumerationer</h2>
            <h2 className={styles.subAmount}>{subsCount} st</h2>
          </div>
          <ul className={styles.costSliderList}>
            {isLoading ? (
              <div className={styles.loadingContainer}>
                <Image
                  className={styles.loading}
                  alt="huhu"
                  width={44}
                  height={44}
                  style={{ width: 44, height: 44 }}
                  placeholder="empty"
                  priority={false}
                  src="/images/loading/loading.svg"
                ></Image>
              </div>
            ) : null}
            {subsData.map((item) => (
              <li key={item.id}>
                <CostSlider
                  iconUrl={item.subscriptions.services.service_icon}
                  serviceName={item.subscriptions.services.service_name}
                  cost={item.subscriptions.price}
                />
              </li>
            ))}
          </ul>
          <div className={styles.pushWrapper}>
        < PushNotice />
        </div>
        </section>
      </div>
    </>
  );
}
