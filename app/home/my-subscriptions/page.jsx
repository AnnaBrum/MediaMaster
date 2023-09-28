"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, useRef } from "react";
import { BrandBox } from "@/components/BrandBox/BrandBox";
import { AddPlanContainer } from "@/components/AddPlanContainer/AddPlanContainer";
import { CategoryButton } from "@/components/CategoryButton/CategoryButton";
import styles from "./my-subscriptions.module.css";

// export const dynamic = 'force-dynamic';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [subsData, setSubsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [subsCount, setSubsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [filteredCategory, setFilteredCategory] = useState(subsData);

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data: userSubsData } = await supabase.from("user_subscriptions")
        .select(`
    id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_icon,
    service_categories:category_id(category, id))
    )
  `);
      const { data: categoryData } = await supabase
        .from("service_categories")
        .select();

      if (userSubsData && categoryData) {
        setSubsData(userSubsData);
        setCategoryData(categoryData);
        setIsLoading(false);
      }
    };
    getData();
  }, [supabase, setSubsData]);

  // Get the value from category-button to filter on
  const handleClick = (e) => {
    setCategory(parseInt(e.target.value));
  };

  // Read changes in searchfield
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  // Function to filter subscription data based on category + input, sorts order based on firstletter match.

  function filterAndSortSubs(subscriptionsArray, input) {
    return subscriptionsArray
      .filter((item) =>
        item.subscriptions.services.service_name
          .toLowerCase()
          .includes(input.toLowerCase())
      )
      .sort((a, b) => {
        // Sort by whether the item starts with the input letter
        const aStartsWithInput = a.subscriptions.services.service_name
          .toLowerCase()
          .startsWith(input.toLowerCase());
        const bStartsWithInput = b.subscriptions.services.service_name
          .toLowerCase()
          .startsWith(input.toLowerCase());

        if (aStartsWithInput && !bStartsWithInput) {
          return -1;
        }
        if (bStartsWithInput && !aStartsWithInput) {
          return 1;
        }

        return 0;
      });
  }

  useEffect(() => {
    if (category !== 0) {
      setFilteredCategory(
        filterAndSortSubs(
          subsData.filter(
            (item) =>
              item.subscriptions.services.service_categories.id == category
          ),
          input
        )
      );
    } else {
      setFilteredCategory(filterAndSortSubs(subsData, input));
    }
  }, [subsData, category, input]);

  // Count totalcost and number of subscriptions for every filtering
  useEffect(() => {
    let amountOfsubs = 0;
    let totalcost = 0;

    filteredCategory.forEach((item) => {
      totalcost += item.subscriptions.price;
      amountOfsubs += 1;
    });

    setTotalCost(totalcost);
    setSubsCount(amountOfsubs);
  }, [subsData, filteredCategory]);

  return (
    <div className={styles.pageWrapper}>
      <section className={styles.sectionOne}>
        {/* <CategoryButton /> */}
        <h1 className={styles.headingOne}>Mina Prenumerationer</h1>
        <AddPlanContainer />
        <input
          className={styles.searchField}
          type="text"
          placeholder="Sök bland dina prenumerationer"
          onChange={handleChange}
          value={input}
        />
      </section>
      <section className={styles.sectionTwo}>
        {categoryData.map((item) => (
          <button
            className={styles.categoryButton}
            key={item.id}
            onClick={handleClick}
            value={item.id}
          >
            {item.category}
          </button>
        ))}
        <button
          className={styles.categoryButton}
          value={0}
          onClick={handleClick}
        >
          Alla kategorier
        </button>
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
          {filteredCategory.map((item) => (
            <li key={item.id}>
              <BrandBox
                logoUrl={item.subscriptions.services.service_icon}
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
