'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect, useState, useRef } from 'react';
import dropdownArrow from '@/public/images/form/dropdownArrow.svg';
import Image from 'next/image';
import DatePicker from 'react-datepicker/dist/react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './change-subscription.module.css';
import Link from 'next/link';

export default function ClientComponent({ params }) {
  const supabase = createClientComponentClient();
  const [userDropdown, setUserDropdown] = useState(false);
  const [users, setUsers] = useState('');
  const [priceDropdown, setPriceDropdown] = useState(false);
  const [pricePlanId, setPricePlanId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [pricePlanLabel, setPricePlanLabel] = useState('');
  const [send, setSend] = useState(false);
  const [personalSubData, setPersonalSubData] = useState();
  const [currentSubData, setCurrentSubData] = useState();
  const [currentServiceData, setCurrentServiceData] = useState();
  const [currentAvaliblePlans, setCurrentAvaliblePlans] = useState();
  const [notis, setNotis] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const { data: mySub } = await supabase
        .from('user_subscriptions')
        .select()
        .eq('id', `${params.endslug}`);

      if (mySub) {
        //has personal data related to current subscription - such as billing date
        setPersonalSubData(mySub[0]);

        const { data: currentSubscriptions } = await supabase
          .from('subscriptions')
          .select()
          .eq('id', `${mySub[0].subscription_id}`);
        if (currentSubscriptions) {
          //has public data to current subscription - such as price and name.
          setCurrentSubData(currentSubscriptions[0]);

          //fetch avalible plans for service
          const { data: avaliblePlans } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('service_id', `${currentSubscriptions[0].service_id}`);

          if (avaliblePlans) {
            //has all avalible plans to choose from for the current service
            setCurrentAvaliblePlans(avaliblePlans);

            const { data: currentService } = await supabase
              .from('services')
              .select()
              .eq('id', `${currentSubscriptions[0].service_id}`);

            if (currentService) {
              setIsLoading(false);
              //has the current service data from the service table - such as service name and logo.
              setCurrentServiceData(currentService[0]);
            }
          }
        }
      }
    };

    getData();
  }, [supabase]);

  console.log(personalSubData);
  console.log(currentSubData);
  console.log(currentServiceData);
  console.log(currentAvaliblePlans);
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

  const handlePriceFieldClick = () => {
    setPriceDropdown(true);
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

  //Update submit
  const handleSparaClick = () => {
    setSend(true);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (send) {
      document.getElementById('myForm').submit();
    }
  };

  //Delete Submit
  const handleDeleteClick = () => {
    setSend(true);
  };

  const deleteSubmit = (e) => {
    e.preventDefault();
    if (send) {
      document.getElementById('deleteForm').submit();
    }
  };

  return (
    <>
      <section className={styles.sectionOne}>
        <div className={styles.backContainer}>
          <Link
            className={styles.back}
            href={`home/my-subscriptions/${params.slug}/${params.endslug}`}
          >
            <Image
              src="/images/navigation/back.svg"
              alt="navigate back"
              height={30}
              width={30}
            ></Image>
          </Link>
        </div>
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
        {currentServiceData && (
          <>
            <Image
              src={currentServiceData.service_logo}
              alt="service logo"
              height={40}
              width={150}
              className={styles.logoImg}
            ></Image>
          </>
        )}
      </section>
      <section className={styles.sectionTwo}>
        <form
          className={styles.serviceForm}
          action="/route-handler/change-sub"
          method="post"
          onSubmit={onSubmit}
          id="myForm"
        >
          <input type="hidden" name="idToUpdate" value={params.endslug} />
          {/* Users section */}
          <label htmlFor="users" className={styles.headingTwo}>
            Antal Användare
          </label>
          <input type="hidden" name="users" value={users} />
          <button
            onClick={handleUserFieldClick}
            onBlur={hadleUserFieldBlur}
            placeholder={personalSubData?.amount_of_users}
            className={styles.usersInputField}
          >
            {users}
            <Image
              src={dropdownArrow}
              height={15}
              width={15}
              alt="arrow for dropdownmenu"
              className={styles.arrowImg}
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
                  {currentAvaliblePlans?.map((item) => (
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

          <label htmlFor="notis" className={styles.headingTwo}>
            Notis
          </label>
          <div className={styles.datefieldContainer}>
            <DatePicker
              name="notis"
              value={notis}
              className={styles.dateInputField}
              selected={notis}
              onChange={(date) => setNotis(date)}
              autoComplete="off"
            />
          </div>
          <div className={styles.saveBtnContainer}>
            <button onClick={handleSparaClick} className={styles.saveBtn}>
              Spara
            </button>
          </div>
        </form>
        <form
          onSubmit={deleteSubmit}
          action="/route-handler/delete-sub
        "
          method="post"
          id="deleteForm"
        >
          <input type="hidden" name="idToDelete" value={params.endslug} />
          <button onClick={handleDeleteClick} className={styles.deleteBtn}>
            Ta bort prenumeration
          </button>
        </form>
      </section>
    </>
  );
}
