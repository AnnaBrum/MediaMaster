"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState, useRef } from "react";
import styles from "./add-subscription.module.css";
import dropdownArrow from "@/public/images/form/dropdownArrow.svg";
import Image from "next/image";
import DatePicker from "react-datepicker/dist/react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Link from "next/link";

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [serviceData, setServiceData] = useState([]);
  const [input, setInput] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [userDropdown, setUserDropdown] = useState(false);
  const [users, setUsers] = useState(1);
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [pricePlanId, setPricePlanId] = useState("");
  const [startDate, setStartDate] = useState();
  const [plans, setPlans] = useState([]);
  const [chosenServiceId, setChosenServiceId] = useState();
  const [pricePlanLabel, setPricePlanLabel] = useState();
  const [serviceName, setServiceName] = useState("");

  const [send, setSend] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { data: services } = await supabase.from("services").select();
      const { data: subscriptions } = await supabase
        .from("subscriptions")
        .select();
      if (services && subscriptions) {
        setServiceData(services);
        setPlans(subscriptions);
      }
    };

    getData();
  }, [supabase, setServiceData]);

  //Service Name field eventHandlers
  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
    setDropdown(true);
  };

  useEffect(() => {
    // Define a function to update the filtered data
    const updateFilteredData = () => {
      const filteredData = serviceData
        .filter((item) =>
          item.service_name.toLowerCase().includes(input.toLowerCase())
        )
        .sort((a, b) => {
          // Sort by whether the item starts with the input letter
          const aStartsWithInput = a.service_name
            .toLowerCase()
            .startsWith(input.toLowerCase()); // returns true/false
          const bStartsWithInput = b.service_name
            .toLowerCase()
            .startsWith(input.toLowerCase());

          if (aStartsWithInput && !bStartsWithInput) {
            // if a starts with input and b doesn't, put a before b in the array.
            return -1;
          }
          if (bStartsWithInput && !aStartsWithInput) {
            // if b starts with input and a doesn't, put b before a in the array.
            return 1;
          }
        });

      setFilteredData(filteredData);
    };

    setTimeout(updateFilteredData, 100);
  }, [input, serviceData]);

  const handleClick = (e) => {
    setInput(e.target.value);
    setServiceName(e.target.value);
  };

  //if user has spelled out an actual existing server in the inputfield, set is as serviceName, else reset.
  const handleBlur = () => {
    if (serviceName.toLowerCase() !== input.toLowerCase()) {
      setServiceName("");
      setInput("");
    } else {
      setServiceName(input);
    }
    setTimeout(() => {
      setDropdown(false);
    }, 150);
  };

  //user field eventHandlers
  const handleUserFieldClick = () => {
    setUserDropdown(true);
  };

  const handleUserOptionCLick = (e) => {
    setUsers(e.target.value);
  };

  const hadleUserFieldBlur = () => {
    setTimeout(() => {
      setUserDropdown(false);
    }, 150);
  };

  //price field event-handlers
  useEffect(() => {
    const getServiceIdByName = (serviceName) => {
      if (serviceName) {
        const service = serviceData.find(
          (item) => item.service_name === serviceName
        );
        if (service) {
          console.log(service.id);
          setChosenServiceId(service.id);
        }
      }
    };

    // Check if serviceName is defined and not an empty string before calling the function
    if (serviceName !== undefined && serviceName.trim() !== "") {
      getServiceIdByName(serviceName);
    }
  }, [serviceName]);

  useEffect(() => {
    const getPlans = async () => {
      if (chosenServiceId !== undefined) {
        // Check if chosenServiceId is defined
        console.log(chosenServiceId);
        const { data: paymentPlans } = await supabase
          .from("subscriptions")
          .select()
          .eq("service_id", `${chosenServiceId}`);

        if (paymentPlans) {
          setPlans(paymentPlans);
        }
      }
    };

    getPlans();
  }, [chosenServiceId]);

  const handlePriceFieldClick = () => {
    if (chosenServiceId) {
      setPriceDropdown(true);
    }
  };

  const handlePriceOptionCLick = (item) => {
    console.log(item.id);
    setPricePlanId(item.id);
    setPricePlanLabel(`${item.plan_name}: ${item.price} KR`);
  };

  const hadlePriceFieldBlur = () => {
    setTimeout(() => {
      setPriceDropdown(false);
    }, 150);
  };

  //submit
  const handleSparaClick = () => {
    setSend(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (send) {
      document.getElementById("myForm").submit();
    }
  };

  return (
    <>
      <section className={styles.sectionOne}>
        <div className={styles.back}>
          <Link className={styles.back} href="/home/my-subscriptions">
            <Image
              src="/images/navigation/back.svg"
              alt="navigate back"
              height={30}
              width={30}
            ></Image>
          </Link>
        </div>
        <h1 className={styles.headingOne}>Lägg till prenumeration</h1>
        <form
          className={styles.serviceForm}
          action="/route-handler/add-sub"
          method="post"
          onSubmit={onSubmit}
          id="myForm"
        >
          <label htmlFor="serviceName" className={styles.headingTwo}>
            Lägg till
          </label>
          <input
            className={styles.inputField}
            name="serviceName"
            type="text"
            required
            placeholder="Skriv in din prenumeration här"
            onChange={handleChange}
            onBlur={handleBlur}
            value={input}
            autoComplete="off"
          />
          <div className={styles.dropdownContainer}>
            {dropdown && (
              <>
                <div className={styles.dropDown}>
                  {filteredData.map((item) => (
                    <ul key={item.id}>
                      <option onClick={handleClick} value={item.service_name}>
                        {item.service_name}
                      </option>
                    </ul>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Users section */}
          <label htmlFor="users" className={styles.headingTwo}>
            Antal Användare
          </label>
          <input type="hidden" name="users" value={users} />
          <button
            onClick={handleUserFieldClick}
            onBlur={hadleUserFieldBlur}
            placeholder="2"
            className={styles.usersInputField}
          >
            {users}
            <Image
              src={dropdownArrow}
              height={15}
              width={15}
              alt="arrow for dropdownmenu"
            />
          </button>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropDown}>
              {userDropdown && (
                <>
                  <div className={styles.dropDown}>
                    <ul>
                      <option onClick={handleUserOptionCLick} value="1">
                        1
                      </option>
                      <option onClick={handleUserOptionCLick} value="2">
                        2
                      </option>
                      <option onClick={handleUserOptionCLick} value="3">
                        3
                      </option>
                      <option onClick={handleUserOptionCLick} value="4">
                        4
                      </option>
                      <option onClick={handleUserOptionCLick} value="5">
                        5
                      </option>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
          {/* price section */}
          <label htmlFor="pricePlanId" className={styles.headingTwo}>
            Prisplan
          </label>
          <input type="hidden" name="pricePlanId" value={pricePlanId} />
          <button
            onClick={handlePriceFieldClick}
            onBlur={hadlePriceFieldBlur}
            placeholder="2"
            className={styles.priceInputField}
          >
            {pricePlanLabel}
            <Image
              className={styles.arrowImg}
              src={dropdownArrow}
              height={15}
              width={15}
              alt="arrow for dropdownmenu"
            />
          </button>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropDown}>
              {priceDropdown && (
                <ul>
                  {plans?.map((item) => (
                    <option
                      key={item.id}
                      onClick={() => handlePriceOptionCLick(item)}
                      value={item.id}
                    >
                      {`${item.plan_name}: ${item.price} KR`}
                    </option>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <label htmlFor="startDate" className={styles.headingTwo}>
            Betaldatum
          </label>
          <div className={styles.datefieldContainer}>
            <DatePicker
              name="startDate"
              value={startDate}
              className={styles.dateInputField}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              autoComplete="off"
            />
          </div>
          <div className={styles.saveBtnContainer}>
            <button onClick={handleSparaClick} className={styles.saveBtn}>
              Spara
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
