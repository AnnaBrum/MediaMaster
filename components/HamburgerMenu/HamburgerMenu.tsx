"use client";
import { useState } from "react";
// import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./HamburgerMenu.module.css";

export function HamburgerMenu(): JSX.Element {
  const [nav, setNav] = useState(false);

  const showNav = () => {
    setNav(!nav);
  };

  // const handleSubmit = (event: { preventDefault: () => void; }) => {
  //   event.preventDefault(); 
  // };

  return (
    <>
      {nav ? (
        /* CLOSE ICON */
        <div className={styles.toggleNav} aria-hidden="true" onClick={showNav}>
          <div className={styles.hamburgerIcon}>
            <svg
              width="23"
              height="23"
              viewBox="0 0 23 23"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.9145 23L11.5074 13.5842L2.10032 23L0 20.901L9.42186 11.5L0 2.09897L2.10032 0L11.5074 9.41581L20.9145 0.0147818L23 2.09897L13.5929 11.5L23 20.901L20.9145 23Z"
                fill="black"
              />
            </svg>
          </div>
          {/* mobile nav */}
          <nav
            className={`flex flex-col  ${
              nav ? "right-[0px]" : "right-[-100vw]"
            } `}
          >
            <a href="#" className={styles.menuItem}>
              Hem
            </a>
            <a href="#" className={styles.menuItem}>
              Mina prenumerationer
            </a>
            <a href="#" className={styles.menuItem}>
              Profil
            </a>
            <a href="#" className={styles.menuItem}>
              Kontakt
            </a>
            <a href="#" className={styles.menuItem}>
              Inställningar
            </a>
            <form action="/auth/sign-out" method="post">
              <button className={styles.menuItem} name="sign-out" type="button">
                Logout
              </button>
            </form>
          </nav>
        </div>
      ) : (
        /* HAMBURGER ICON */
        <div
          className={styles.hamburgerIcon}
          aria-hidden="true"
          onClick={showNav}
        >
          <svg
            width="27"
            height="18"
            viewBox="0 0 27 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0H27V3H0V0ZM0 7.5H27V10.5H0V7.5ZM0 15H27V18H0V15Z"
              fill="black"
            />
          </svg>
        </div>
      )}
    </>
  );
}
