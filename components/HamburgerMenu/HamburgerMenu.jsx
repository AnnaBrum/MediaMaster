"use client";
import { useState } from "react";
import MenuItems from "../MenuItems/MenuItems";
import styles from "./HamburgerMenu.module.css";
import { LogoutButton } from "../LogoutButton/LogoutButton";
import { ExitButton } from "../ExitButton/ExitButton";

export const menuItems = [
  {
    title: "Hem",
    url: "/home",
  },
  {
    title: "Mina Prenumerationer",
    url: "/home/my-subscriptions",
  },
  {
    title: "Kontakt",
    submenu: [
      { title: "Support", url: "/home/support" },
      { title: "Om Media Watch", url: "/home/about" },
    ],
  },
  {
    title: "Inställningar",
    submenu: [
      { title: "Kontoinställningar", url: "/home/account-settings" },
      { title: "Villkor och sekretess", url: "/home/conditions" },
    ],
  },
];

export function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const openMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleMenuClick = (index, hasSubMenu) => {
    if (hasSubMenu) {
    setOpenSubMenu((prev) => (prev === index ? null : index)); // Toggle submenu state
    } else {
      setTimeout(closeMenu, 500); // Delay the closing of the menu so that the redirect happens under the hood
    }
  };

  const handleSubMenuClick = () => {
    closeMenu(); // Close the menu when a submenu item is clicked
  };

  return (
    <header>
      {menuOpen ? (
        /* CLOSE ICON */
        <div className={styles.menu} aria-hidden="true">
          <div className={styles.hamburgerIcon} onClick={closeMenu}>
            <ExitButton />
          </div>
          {/* mobile nav */}
          <nav
            className={`flex flex-col  ${
              menuOpen ? "right-[0px]" : "right-[-100vw]"
            } `}
          >
            <ul>
              {menuItems.map((menu, index) => {
                return (
                  <MenuItems
                    items={menu}
                    key={index}
                    isOpen={openSubMenu === index}
                    onClick={() =>handleMenuClick(index, !!menu.submenu)}
                    onSubMenuClick={handleSubMenuClick}
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
          onClick={openMenu}
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
