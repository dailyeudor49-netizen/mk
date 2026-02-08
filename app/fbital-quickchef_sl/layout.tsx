import type { Metadata } from "next";
import Script from "next/script";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef™ Pro - Vecnamenski kuhinjski robot 45v1",
  description: "Vecnamenski kuhinjski robot QuickChef Pro s 45 funkcijami v enem.",
  robots: {
    index: false,
    follow: false
  }
};

export default function FbitalQuickchefSlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-sl-page">
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
