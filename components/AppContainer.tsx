'use client'

import { SessionProvider } from 'next-auth/react';
import { usePathname } from "next/navigation"
import Navigation from './Navigation';

export default function AppContainer({children} : {children: React.ReactNode}) {
  const pathname = usePathname();

  return (
    <>
      <SessionProvider>
        {children}
        {pathname !== '/login' && <Navigation/>}
      </SessionProvider>
    </>
  )
};