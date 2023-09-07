import React, { useState } from 'react';


const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="lg:hidden">
      <button
        className="text-white p-2 focus:outline-none focus:bg-gray-700"
        onClick={toggleMenu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="bg-white absolute top-14 right-0 w-48 mt-2 rounded-lg shadow-lg">
          {/* Add your menu items here */}
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;