"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, useRef } from "react";
import styles from "./get-started.module.css";
import { NavDots } from "../../../components/NavDots/NavDots";
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
      <NavDots
        imageUrl1="/images/navigation/nav_dot_active.svg"
        imageUrl2="/images/navigation/nav_dot_active.svg"
        imageUrl3="/images/navigation/nav_dot_active.svg"
        imageUrl4="/images/navigation/nav_dot_active.svg"
      />
      <section className={styles.sectionOne}>
        <h1 className={styles.headingOne}>Kom igång!</h1>
        <h2 className={styles.headingTwo}>Skriv in prenumeration</h2>

        <input
          className={styles.searchField}
          type="text"
          placeholder="Skriv in prenumeration"
          onChange={handleChange}
          value={input}
        />
      </section>

      <section className={styles.sectionTwo}>
        <h3 className={styles.headingThree}>Mest populära</h3>
      </section>
    </div>
  );
}
