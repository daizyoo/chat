import './global.css';
import type { Metadata } from "next";
import { Providers } from "./providers";
import { Link } from '@nextui-org/react';

export const metadata: Metadata = {
  title: "chat application",
  description: "practice of react"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
