import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuperVision Hub - Twój Smart TV w 5 Minut",
  description: "Zamień każdy telewizor w Smart TV. Netflix, YouTube, gry. Bez kabli, bez komplikacji.",
};

export default function SuperHubPLLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
