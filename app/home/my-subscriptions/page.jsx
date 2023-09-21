"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, useRef } from "react";
import { BrandBox } from "@/components/BrandBox/BrandBox";
import { AddPlanContainer } from "@/components/AddPlanContainer/AddPlanContainer";
import { CategoryButton } from "@/components/CategoryButton/CategoryButton";
import styles from "./my-subscriptions.module.css";
export const dynamic = "force-dynamic";

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [subsData, setSubsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [subsCount, setSubsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data : userSubsData } = await supabase.from("user_subscriptions").select(`
    id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_logo,
    service_categories:category_id(category, id))
    )
  `)
      const { data : categoryData } = await supabase.from("service_categories").select();

      if (userSubsData && categoryData) {
        setSubsData(userSubsData);
        setCategoryData(categoryData);
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

  const filteredByCategory = subsData
  .filter((item) =>
  item.subscriptions.services.service_categories.id === filteredCategory) 

  const handleClick = (e) => {
    setFilteredCategory(e.target.value);
  };


  console.log(categoryData);

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.sectionOne}>
        < CategoryButton />
        <h1 className={styles.headingOne}>Mina Prenumerationer</h1>
        <AddPlanContainer />
        <input
          className={styles.searchField}
          type="text"
          placeholder="Sök bland dina prenumerationer"
        />
      </section>
      <section className={styles.sectionTwo}>
        {categoryData.map((item) => (          
          <button className={styles.categoryButton} key={item.id} onClick={handleClick} value={item.id}>
            {item.category}
          </button>
        ))}
        <button className={styles.categoryButton}>Alla kategorier</button>
      </section>
      <section className={styles.sectionThree}>
        <div className={styles.total}>
          <h3 className={styles.sectionThreeInfo}>Totalkostnad/mån</h3>
          <span className={styles.result}>{totalCost} kr</span>
        </div>
        <div className={styles.amount}>
          <h3 className={styles.sectionThreeInfo}>Antal</h3> 
          <span className={styles.result}>{subsCount} st</span>
        </div>
      </section>
      <section className={styles.sectionFour}>
        <ul>
          {subsData.map((item) => (
            <li key={item.id}>
              <BrandBox
                logoUrl={item.subscriptions.services.service_logo}
                serviceName={item.subscriptions.services.service_name}
                cost={item.subscriptions.price}
              /><p>{item.subscriptions.services.service_categories.id}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
