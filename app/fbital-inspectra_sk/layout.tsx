import type { Metadata } from "next";
import Script from "next/script";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Inspectra™ 360 Ultra - Inšpekčná kamera s otočnou špičkou 360°",
  description: "Profesionálna inšpekčná kamera s otočnou špičkou 360° Flex-Lock, dvojitým objektívom a obrazovkou 5\" IPS HD.",
  robots: {
    index: false,
    follow: false
  }
};

export default function FbitalInspectraSkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-inspectra-sk-page">
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
