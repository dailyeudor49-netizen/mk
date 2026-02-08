import type { Metadata } from "next";
import Script from "next/script";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Inspectra™ 360 Ultra - Inspekcin\u0117 kamera su 360° sukama galiuku",
  description: "Profesionali inspekcin\u0117 kamera su 360° Flex-Lock galiuku, dvigubu objektyvu ir 5\" IPS HD ekranu.",
  robots: {
    index: false,
    follow: false
  }
};

export default function FbitalInspectraLtLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-inspectra-lt-page">
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
