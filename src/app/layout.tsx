import type { Metadata } from "next";

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
        {children}
      </body>
    </html>
  );
}
