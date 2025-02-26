'use client';

import AOS from 'aos';
import { useEffect } from 'react';

export default function AOSContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({ offset: 50, duration: 800 });
  }, []);
  return <>{children}</>;
}
