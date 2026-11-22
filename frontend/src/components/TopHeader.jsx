'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import HeaderNav from './HeaderNav';
import DiaBanner from './DiaBanner';

export default function TopHeader() {
  const pathname = usePathname();

  // Hide the public consumer header/banner on the admin panel
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <div className="relative w-full z-40 arc-grain-red">
      <HeaderNav />
      <DiaBanner />
    </div>
  );
}


