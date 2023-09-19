'use client';
import { useState } from 'react';
import MenuItems from '../MenuItems/MenuItems';
// import LogoutButton from "../LogoutButton/LogoutButton";
import styles from './HamburgerMenu.module.css';
import { LogoutButton } from '../LogoutButton/LogoutButton';
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
      { title: 'Support', url: 'support' },
      { title: 'Om Media Watch', url: 'about' },
    ],
  },
  {
    title: 'Inställningar',
    submenu: [
      { title: 'Kontoinställningar', url: 'settings' },
      { title: 'Villkor och sekretess', url: 'conditions' },
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
  };

  return (
    <header>
      {nav ? (
        /* CLOSE ICON */
        <div className={styles.menu} aria-hidden="true">
          <div className={styles.hamburgerIcon} onClick={closeMenu}>
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
