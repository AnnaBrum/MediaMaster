"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import styles from "./get-started.module.css";
import { NavDots } from "../../../components/NavDots/NavDots";
// import { CostSlider } from "../../../components/CostSlider/CostSlider";
// import Image from "next/image";

export default function ClientComponent() {
   const supabase = createClientComponentClient();

  const [subsData, setSubsData] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
   const [input, setInput] = useState("");


  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data: subsData } = await supabase.from("services").select();


    getData();
  }, [supabase, setSubsData];

  // Get the value from category-button to filter on
  const handleClick = (e) => {
    setCategory(parseInt(e.target.value));
  };

  // Read changes in searchfield
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  console.log(subsData);
  // Function to filter subscription data based on category + input, sorts order based on firstletter match.

  // function filterAndSortSubs(subscriptionsArray, input) {
  //   return subscriptionsArray
  //     .filter((item) =>
  //       item.services.service_name
  //         .toLowerCase()
  //         .includes(input.toLowerCase())
  //     )
  //     .sort((a, b) => {
  //       // Sort by whether the item starts with the input letter
  //       const aStartsWithInput = a.services.service_name
  //         .toLowerCase()
  //         .startsWith(input.toLowerCase());
  //       const bStartsWithInput = b.services.service_name
  //         .toLowerCase()
  //         .startsWith(input.toLowerCase());

  //       if (aStartsWithInput && !bStartsWithInput) {
  //         return -1;
  //       }
  //       if (bStartsWithInput && !aStartsWithInput) {
  //         return 1;
  //       }

  //       return 0;
  //     });
  // }

  // useEffect(() => {
  //   if (category !== 0) {
  //     setFilteredCategory(
  //       filterAndSortSubs(
  //         subsData.filter(
  //           (item) =>
  //             item.subscriptions.services.service_categories.id == category
  //         ),
  //         input
  //       )
  //     );
  //   } else {
  //     setFilteredCategory(filterAndSortSubs(subsData, input));
  //   }
  // }, [subsData, category, input]);


  return (
    <>
      <NavDots
        redirectBack="/create-account"
        imageUrl1="/images/navigation/nav_dot_active.svg"
        imageUrl2="/images/navigation/nav_dot_active.svg"
        imageUrl3="/images/navigation/nav_dot_active.svg"
        imageUrl4="/images/navigation/nav_dot_active.svg"
      />
      <div className={styles.pageWrapper}>
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
          <ul className={styles.costSliderList}>
            {/* {isLoading ? (
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
            ))} */}
          </ul>
        </section>
        <button formAction="/route-handler/add-sub" className={styles.button}>
          Klar!
        </button>
      </div>
    </>
  );
}
