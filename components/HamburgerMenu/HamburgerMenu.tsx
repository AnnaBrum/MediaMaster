"use client";
import { useState } from "react";

export function HamburgerMenu(): JSX.Element {
  const [nav, setNav] = useState(false);

  const showNav = () => {
    setNav(!nav);
  };

  return (
    <div className="nav-wrapper min-w-full">
      {/* hamburger */}
      {nav ? (
        /* CLOSE ICON */
        <div
          className="min-h-screen"
          aria-hidden="true"
          onClick={showNav}
        >
          <div className="EXIT flex justify-end">
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
            className={`flex flex-col justify-center w-full bg-white z-40 ${
              nav ? "right-[0px]" : "right-[-100vw]"
            } `}
          >
            <a href="#" className="underline">
              Hem
            </a>
            <a href="#" className="underline">
              Mina prenumerationer
            </a>
            <a href="#" className="underline">
              Profil
            </a>
            <a href="#" className="underline">
              Kontakt
            </a>
            <a href="#" className="underline">
              Inställningar
            </a>
            <a href="#" className="underline">
              Logga ut
            </a>
          </nav>
        </div>
      ) : (
        /* HAMBURGER ICON */
        <div
          className="HAMBURGER-ICON fixed top-[0px] z-50 space-y-2 flex justify-end"
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
    </div>
  );
}
