import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Automatyczny Robot Kuchenny | IONIZI",
  description: "Pierwszy robot kuchenny z automatycznym dozownikiem składników. 45 funkcji, ekran dotykowy 7\", 1000+ przepisów.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefPLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-pl-page">
      {children}
    </div>
  );
}
