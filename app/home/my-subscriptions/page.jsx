'use client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState, useRef } from 'react';
import { BrandBox } from '@/components/BrandBox/BrandBox';
import { AddPlanContainer } from '@/components/AddPlanContainer/AddPlanContainer';
import { CategoryButton } from '@/components/CategoryButton/CategoryButton';
import styles from './my-subscriptions.module.css';
export const dynamic = 'force-dynamic';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [subsData, setSubsData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [category, setCategory] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const [subsCount, setSubsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data: userSubsData } = await supabase.from('user_subscriptions')
        .select(`
    id,
    billing_start_date,
    billing_date,
    subscriptions:subscription_id (plan_name, price, services:service_id (service_name, service_icon,
    service_categories:category_id(category, id))
    )
  `);
      const { data: categoryData } = await supabase
        .from('service_categories')
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
    setCategory(e.target.value);
    setFilter(true);
  };

  // Read changes in searchfield
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setFilter(true);
  };

  // Filter subscription data on service category
  const filteredCategory = subsData
    .filter(
      (item) => item.subscriptions.services.service_categories.id == category
    )
    .filter((item) =>
      item.subscriptions.services.service_name
        .toLowerCase()
        .includes(input.toLowerCase())
    );
  // .sort((a, b) => {
  //   // Sort by whether the item starts with the input letter
  //   const aStartsWithInput = a.service_name
  //     .toLowerCase()
  //     .startsWith(input.toLowerCase()); // returns true/false
  //   const bStartsWithInput = b.service_name
  //     .toLowerCase()
  //     .startsWith(input.toLowerCase());

  //   if (aStartsWithInput && !bStartsWithInput) {
  //     //if a starts with input and b doesnt, put a before b in the array.
  //     return -1;
  //   }
  //   if (bStartsWithInput && !aStartsWithInput) {
  //     //if b starts with innput and a doesnt, put b before a in the array
  //     return 1;
  //   }

  //   // If both start with the input letter, sort by asc(default=)
  //   return 0;
  // });

  console.log(filteredCategory);
  // Count totalcost and number of subscriptions for every filtering
  useEffect(() => {
    let amountOfsubs = 0;
    let totalcost = 0;

    if (!filter) {
      subsData.forEach((item) => {
        totalcost += item.subscriptions.price;
        amountOfsubs += 1;
      });
    } else {
      filteredCategory.forEach((item) => {
        totalcost += item.subscriptions.price;
        amountOfsubs += 1;
      });
    }
    setTotalCost(totalcost);
    setSubsCount(amountOfsubs);
  }, [subsData, filter, filteredCategory]);
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
        {!filter && (
          <ul>
            {subsData.map((item) => (
              <li key={item.id}>
                <BrandBox
                  logoUrl={item.subscriptions.services.service_icon}
                  serviceName={item.subscriptions.services.service_name}
                  cost={item.subscriptions.price}
                />
              </li>
            ))}
          </ul>
        )}
        {filter && (
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
        )}
      </section>
    </div>
  );
}
