"use client";
import { useState } from "react";
import MenuItems from "../MenuItems/MenuItems";
import styles from "./HamburgerMenu.module.css";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { ExitButton } from "../ExitButton/ExitButton";

export const menuItems = [
  {
    title: 'Hem',
    url: '/home',
  },
  {
    title: 'Mina Prenumerationer',
    url: '/home/my-subscriptions',
  },
  {
    title: 'Kontakt',
    submenu: [
      { title: "Support", url: "contact/support" },
      { title: "Om Media Watch", url: "contact/about" },
    ],
  },
  {
    title: 'Inställningar',
    submenu: [
      { title: "Kontoinställningar", url: "settings/account-settings" },
      { title: "Villkor och sekretess", url: "settings/conditions" },
    ],
  },
];

export function HamburgerMenu() {
  const [nav, setNav] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const showNav = () => {
    setNav(!nav);
  };

  const closeMenu = () => {
    setNav(false);
  };

  const handleMenuClick = (index) => {
    setOpenSubMenu((prev) => (prev === index ? null : index)); // Toggle submenu state
    setNav(false);
  };

  return (
    <header>
      {nav ? (
        /* CLOSE ICON */
        <div className={styles.menu} aria-hidden="true">
          <div className={styles.hamburgerIcon} onClick={closeMenu}>
            < ExitButton />
          </div>
          {/* mobile nav */}
          <nav
            className={`flex flex-col  ${
              nav ? 'right-[0px]' : 'right-[-100vw]'
            } `}
          >
            <ul>
              {menuItems.map((menu, index) => {
                return (
                  <MenuItems
                    items={menu}
                    key={index}
                    isOpen={openSubMenu === index}
                    onClick={() => handleMenuClick(index)}
                  />
                );
              })}
            </ul>
            <LogoutButton />
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
