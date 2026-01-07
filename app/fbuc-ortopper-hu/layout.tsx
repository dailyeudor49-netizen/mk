import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Ortopéd Fedőmatrac - Raktárkiárusítás | IONIZI",
  description: "Alakítsa ágyát ortopéd rendszerré Memory Foam HD fedőmatraccal. Dekompresszió és fájdalomcsillapítás.",
  robots: {
    index: false,
    follow: false
  }
};

export default function OrtopperHULayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbuc-ortopper-hu-page">
      {children}
    </div>
  );
}
