import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { GTMHead, GTMBody } from "./components/GoogleTagManager";
import LayoutWrapper from "./components/LayoutWrapper";
import FacebookPixel from "./components/FacebookPixel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ionizi - Home, Garden & Everyday Essentials",
  description: "Quality products for your home, garden, and daily needs. Fast delivery across Europe with cash on delivery option.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GTMHead />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GTMBody />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
