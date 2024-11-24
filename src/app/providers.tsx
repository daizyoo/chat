'use client'

import { Chip, Link, NextUIProvider } from "@nextui-org/react"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <Chip style={{ margin: '14px' }}>
        <Link href='/'>Home</Link>
      </Chip>
      {children}
    </NextUIProvider>
  );
}
