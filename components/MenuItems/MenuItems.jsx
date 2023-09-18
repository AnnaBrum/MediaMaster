import React from "react";
import DropDown from "../DropDown/DropDown";
import styles from "./MenuItems.module.css";
import { useState, useEffect } from "react";
// import { menuItems } from "../HamburgerMenu/HamburgerMenu";
import Link from "next/link";

const MenuItems = ({ items, isOpen, onClick }) => {

  return (
    <>
      {items.submenu ? (
        <>
        <div className={styles.subMenuButton}></div>
          <button
            className={styles.menuItems}
            aria-expanded={isOpen ? "true" : "false"}
            onClick={onClick}
            type="button"
            aria-haspopup="menu"
          >
            {items.title}
          </button>
          {isOpen && <DropDown submenus={items.submenu} />}
        </>
      ) : (
        <li className={styles.menuItems}><Link href={items.url}>{items.title}</Link></li>
      )}
    </>
  );
};

export default MenuItems;
