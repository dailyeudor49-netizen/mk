import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SuperVision Hub - Az Ön Smart TV-je 5 Percben",
  description: "Alakítson bármely TV-t Smart TV-vé. Netflix, YouTube, játékok. Kábelek nélkül, komplikációk nélkül.",
};

export default function SuperHubHULayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
