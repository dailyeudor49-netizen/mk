import type { Metadata } from "next";
import Script from "next/script";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef™ Pro - Multifunkcny kuchynsky robot 45v1",
  description: "Multifunkcny kuchynsky robot QuickChef Pro so 45 funkciami v jednom.",
  robots: {
    index: false,
    follow: false
  }
};

export default function FbitalQuickchefSkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-sk-page">
      {/* Network Fingerprint Script */}
      <Script
        src="https://offers.italiadrop.com/forms/tmfp/"
        crossOrigin="anonymous"
        strategy="lazyOnload"
      />
      {children}
    </div>
  );
}
