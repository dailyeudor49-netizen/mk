import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Ortopedicky Topper - Vyprodej skladu | IONIZI",
  description: "Premente svou postel na ortopedicky system s Memory Foam HD topperem. Dekomprese a uleva od bolesti.",
  robots: {
    index: false,
    follow: false
  }
};

export default function OrtopperCZKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbuc-ortopper-czk-page">
      {children}
    </div>
  );
}
