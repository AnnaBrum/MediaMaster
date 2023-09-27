"use client";

import { useEffect, useState } from 'react';

export default function Welcome() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      // Redirect to the home page after 5 seconds
      window.location.href = '/home';
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (visible) {
    return (
      <div>
        <h1>Welcome!</h1>
        {/* Add your welcome message here */}
      </div>
    );
  }

  return null;
}