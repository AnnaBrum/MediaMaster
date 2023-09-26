'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState, useRef } from 'react';
import styles from './add-subscription.module.css';
import dropdownArrow from '@/public/images/form/dropdownArrow.svg';
import Image from 'next/image';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function ClientComponent() {
  const supabase = createClientComponentClient();
  const [serviceData, setServiceData] = useState([]);
  const [input, setInput] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [userDropdown, setUserDropdown] = useState(false);
  const [users, setUsers] = useState(1);
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [pricePlanId, setPricePlanId] = useState(1);
  const [period, setPeriod] = useState('monthly');
  const [periodDropdown, setPeriodDropdown] = useState(false);
  const [startDate, setStartDate] = useState();
  const [plans, setPlans] = useState([]);
  // const [payDate, setPaydate] = useState(27);
  const [chosenServiceId, setChosenServiceId] = useState();
  const [pricePlanLabel, setPricePlanLabel] = useState();
  const [serviceName, setServiceName] = useState('');

  useEffect(() => {
    const getData = async () => {
      const { data: services } = await supabase.from('services').select();
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select();
      if (services && subscriptions) {
        setServiceData(services);
        setPlans(subscriptions);
      }
    };

    getData();
  }, [supabase, setServiceData]);

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

  const handleBlur = () => {
    if (serviceName.toLowerCase() !== input.toLowerCase()) {
      setServiceName('');
      setInput('');
    } else {
      setServiceName(input);
    }
    setTimeout(() => {
      setDropdown(false);
    }, 100);
  };

  //user field
  const handleUserFieldClick = () => {
    setUserDropdown(true);
  };

  const handleUserOptionCLick = (e) => {
    setUsers(e.target.value);
  };

  const hadleUserFieldBlur = () => {
    setTimeout(() => {
      setUserDropdown(false);
    }, 100);
  };

  //price field

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

    // Check if serviceName is defined and not an empty string before calling the function.
    if (serviceName !== undefined && serviceName.trim() !== '') {
      getServiceIdByName(serviceName);
    }
  }, [serviceName]);

  useEffect(() => {
    const getPlans = async () => {
      if (chosenServiceId !== undefined) {
        // Check if chosenServiceId is defined
        console.log(chosenServiceId);
        const { data: paymentPlans } = await supabase
          .from('subscriptions')
          .select()
          .eq('service_id', `${chosenServiceId}`);

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
    setPricePlanId(item.id);
    setPricePlanLabel(`${item.plan_name}: ${item.price} KR`);
  };

  const hadlePriceFieldBlur = () => {
    setTimeout(() => {
      setPriceDropdown(false);
    }, 100);
  };

  //period

  const handlePeriodFieldClick = () => {
    setPeriodDropdown(true);
  };

  const handlePeriodOptionCLick = (e) => {
    setPeriod(e.target.value);
  };

  const hadlePeriodFieldBlur = () => {
    setTimeout(() => {
      setPeriodDropdown(false);
    }, 100);
  };

  return (
    <>
      <section className={styles.sectionOne}>
        <h1 className={styles.headingOne}>Lägg till prenumeration</h1>
        <form className={styles.serviceForm} action="" method="post">
          <label htmlFor="serviceName" className={styles.headingTwo}>
            Lägg till
          </label>
          <input
            className={styles.inputField}
            name="serviceName"
            type="text"
            required
            placeholder="Service Name"
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
          <button
            onClick={handleUserFieldClick}
            onBlur={hadleUserFieldBlur}
            placeholder="2"
            className={styles.usersInputField}
            name="users"
            type="text"
            htmlFor="users"
            id="users"
            value={users}
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
          <label htmlFor="price" className={styles.headingTwo}>
            Prisplan
          </label>
          <button
            onClick={handlePriceFieldClick}
            onBlur={hadlePriceFieldBlur}
            placeholder="2"
            className={styles.priceInputField}
            name="price"
            type="text"
            htmlFor="price"
            id="price"
            value={pricePlanId}
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

          <label htmlFor="period" className={styles.headingTwo}>
            Period
          </label>
          <button
            onClick={handlePeriodFieldClick}
            onBlur={hadlePeriodFieldBlur}
            placeholder="2"
            className={styles.usersInputField}
            name="period"
            type="text"
            htmlFor="period"
            id="period"
            value={period}
          >
            {period}
            <Image
              src={dropdownArrow}
              height={15}
              width={15}
              alt="arrow for dropdownmenu"
            />
          </button>
          <div className={styles.dropdownContainer}>
            <div className={styles.dropDown}>
              {periodDropdown && (
                <>
                  <div className={styles.dropDown}>
                    <ul>
                      <option onClick={handlePeriodOptionCLick} value="monthly">
                        Monthly
                      </option>
                      <option onClick={handlePeriodOptionCLick} value="yearly">
                        Yearly
                      </option>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>

          <label htmlFor="period" className={styles.headingTwo}>
            Betaldatum
          </label>
          <div className={styles.datefieldContainer}>
            <DatePicker
              className={styles.dateInputField}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholder="27/08/2023"
            />
          </div>
        </form>
      </section>
      {/* <form
        className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action="/route-handler/add-sub"
        method="post"
      >
        <label className="text-md" htmlFor="text">
          Intro Text
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="text"
          name="text"
          placeholder="intro text"
          required
        />
        <button
          formAction="/route-handler/add-sub"
          className="border border-gray-700 rounded px-4 py-2 text-black mb-2"
        >
          Insert Values
        </button>
      </form> */}
    </>
  );
}
