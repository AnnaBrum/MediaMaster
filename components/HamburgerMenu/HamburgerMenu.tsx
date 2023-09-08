"use client";
import { useState } from "react";

export function HamburgerMenu(): JSX.Element {
  const [nav, setNav] = useState(false);

  const showNav = () => {
    setNav(!nav);
  };

  return (
    <>
      {/* hamburger */}
      {nav ? (
        <div
          className="Hamburger-icon fixed right-[30px] z-50 md:hidden space-y-2"
          aria-hidden="true"
          onClick={showNav}
        >
          <span className="block h-0.5 w-8  bg-gray-600"></span>
          <span className="block h-0.5 w-8  bg-gray-600"></span>
          <span className="block h-0.5 w-8  bg-gray-600"></span>
        </div>
      ) : (
        <div
          className="absolute top-0 right-0 px-8 py-8"
          aria-hidden="true"
          onClick={showNav}
        >
          <svg
            className="h-8 w-8 text-gray-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </div>
      )}

      {/* mobile nav */}
      <nav
        className={`h-[100vh] fixed top-[0px] flex flex-col justify-around items-center w-full md:hidden bg-white z-40 duration-1000 ${
          nav ? "right-[0px]" : "right-[-100vw]"
        } `}
      >
        <a href="#" className="underline">
          Home
        </a>
        <a href="#" className="underline">
          About
        </a>
        <a href="#" className="underline">
          Contact
        </a>
        <a href="#" className="underline">
          Address
        </a>
        <a href="#" className="underline">
          Policy
        </a>
      </nav>
    </>
  );
}
