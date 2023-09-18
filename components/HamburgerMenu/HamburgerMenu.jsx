"use client";
import { useState } from "react";
import MenuItems from "../MenuItems/MenuItems"
import  menuItems  from "../MenuItems/MenuItems.jsx";
// import LogoutButton from "../LogoutButton/LogoutButton";
import styles from "./HamburgerMenu.module.css";


export function HamburgerMenu() {
  const [nav, setNav] = useState(false);

  const showNav = () => {
    setNav(!nav);
  };

  //
  // const Navbar = () => {
  //   return (
  //     <nav>
  //       <ul className="menus">
  //         {menuItems.map((menu, index) => {
  //           return (
  //             <li className="menu-items" key={index}>
  //               <a href={menu.url}>{menu.title}</a>
  //             </li>
  //           );
  //         })}
  //       </ul>
  //     </nav>
  //   );
  // };

  return (
    <header>
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
        
            <ul className="menus">
              {menuItems.map((menu, index) => {
                return <MenuItems items={menu} key={index} />;
              })}
            </ul>
            
            {/* <ul className="menus">
              {menuItems.map((menu, index) => {
                return (
                  <li className="menu-items" key={index}>
                    <a href={menu.url}>{menu.title}</a>
                  </li>
                );
              })}
            </ul> */}
            {/* <a href="/home" className={styles.menuItem}>
              Hem
            </a>
            <a href="/my-subscriptions" className={styles.menuItem}>
              Mina prenumerationer
            </a>
            <a href="/contact" className={styles.menuItem}>
              Kontakt
            </a>
            <a href="/settings" className={styles.menuItem}>
              Inställningar
            </a>
            <form action="/auth/sign-out" method="post">
              <button className={styles.menuItem} name="logout" type="button">
                Logout
              </button>
            </form> */}
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
    </header>
  );
}
