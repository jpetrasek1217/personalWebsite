'use client';

import { useState, useEffect } from 'react';

const ROLES = [
  'ML Engineer',
  'Roboticist',
  'Software Developer',
  'Mechanical Engineer',
  'Mechatronics Engineer',
  'Product Developer',
  'UI/UX Engineer',
];

export default function RoleCarousel({ className = '' }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const fadeOut = setTimeout(() => setVisible(false), 2500);
    const switchRole = setTimeout(() => {
      setIndex(i => (i + 1) % ROLES.length);
      setVisible(true);
    }, 3000);
    return () => {
      clearTimeout(fadeOut);
      clearTimeout(switchRole);
    };
  }, [index]);

  return (
    <span
      className={`transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        visible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {ROLES[index]}
    </span>
  );
}
