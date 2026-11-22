'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import MobileBottomBar from './MobileBottomBar';

export default function MobileBottomBarWrapper() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const handleOpenAi = () => {
    window.dispatchEvent(new CustomEvent('open-dia-chatbot'));
  };

  return <MobileBottomBar onOpenAi={handleOpenAi} />;
}


