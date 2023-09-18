import React from 'react';
import Dropdown from '../DropDown';

export const menuItems = [
    {
      title: "Hem",
      url: "/home",
    },
    {
      title: "Mina Prenumerationer",
      url: "/my-subscriptions",
    },
    {
      title: "Kontakt",
      url: "/about",
      submenu: [
        { title: "Support", url: "support" },
        { title: "Om Media Watch", url: "about" },
      ],
    },
    {
      title: "Inställningar",
      url: "/settings",
      submenu: [
        { title: "Kontoinställningar", url: "settings" },
        { title: "Villkor och sekretess", url: "conditions" },
      ],
    },
    {
      title: "Logga ut",
      url: "/auth/sign-out",
    },
  ];
  

const MenuItems({ items }) => {
  return (
    <li className="menu-items">
      {items.submenu ? (
        <>
          <button type="button" aria-haspopup="menu">
            {items.title}{' '}
          </button>
          <Dropdown submenus={items.submenu} />
        </>
      ) : (
        <a href={items.url}>{items.title}</a>
      )}
    </li>
  );
};

export default MenuItems;