// #IMPORTS
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// #VARIABLES
const inter = Inter({ subsets: ["latin"] });

// #METADATA
export const metadata: Metadata = {
  title: "Nodel",
  description: "Story Node Web App",
};

// #MAIN_COMPONENT
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // #RENDER
  return (
    <html lang="en">
      <head>
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}