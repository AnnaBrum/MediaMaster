import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="border border-gray-700 rounded-full px-4 py-1 text-black mb-2">
      {children}
    </button>
  );
}