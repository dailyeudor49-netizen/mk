import type { Metadata } from "next";
import Script from "next/script";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef™ Pro - 45az1-ben multifunkcios konyhai robot",
  description: "QuickChef Pro multifunkcios konyhai robot 45 funkcioval egyben.",
  robots: {
    index: false,
    follow: false
  }
};

export default function FbitalQuickchefHuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-hu-page">
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
