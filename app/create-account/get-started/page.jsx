"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import styles from "./get-started.module.css";
import { NavDots } from "../../../components/NavDots/NavDots";
import { GetStartedButton } from "../../../components/GetStartedButton/GetStartedButton";
import Image from "next/image";

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [serviceData, setServiceData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [filteredService, setFilteredService] = useState(serviceData)

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const { data: services, error } = await supabase
        .from("services")
        .select();
      if (services) {
        setServiceData(services);
        setIsLoading(false);
        console.log("Subscriptions:", services);
      }
    };
    getData();
  }, [supabase, setServiceData]);

  // // Read changes in searchfield
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  // // Function to filter subscription data based on category + input, sorts order based on firstletter match.

  function filterAndSortSubs(subscriptionsArray, input) {
    return subscriptionsArray
      .filter((item) =>
        item.services.service_name
          .toLowerCase()
          .includes(input.toLowerCase())
      )
      .sort((a, b) => {
        // Sort by whether the item starts with the input letter
        const aStartsWithInput = a.services.service_name
          .toLowerCase()
          .startsWith(input.toLowerCase());
        const bStartsWithInput = b.services.service_name
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

  // useEffect(() => {
  //   if (input !== 0) {
  //     setFilteredService(
  //       filterAndSortSubs(
  //         serviceData.filter(
  //           (item) =>
  //             item.services.id == input
  //         ),
  //         input
  //       )
  //     );
  //   } else {
  //     setFilteredCategory(filterAndSortSubs(serviceData, input));
  //   }
  // }, [serviceData, input]);

  // // Count totalcost and number of subscriptions for every filtering
  // useEffect(() => {
  //   let amountOfsubs = 0;
  //   let totalcost = 0;

  //   filteredCategory.forEach((item) => {
  //     totalcost += item.subscriptions.price;
  //     amountOfsubs += 1;
  //   });

  //   setTotalCost(totalcost);
  //   setSubsCount(amountOfsubs);
  // }, [subsData, filteredCategory]);

  return (
    <div className={styles.pageWrapper}>
      <NavDots
        redirectBack="/create-account"
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
          {serviceData.map((item) => (
            <li key={item.id}>
              <GetStartedButton
                logoUrl={item.service_icon}
                serviceName={item.service_name}
              />
            </li>
          ))}
        </ul>
      </section>
      <button formAction="/route-handler/welcome" className={styles.ready}>
        Klar!
      </button>
    </div>
  );
}
