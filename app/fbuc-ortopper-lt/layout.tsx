import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Ortopedinis Antčiužinis - Sandėlio išpardavimas | IONIZI",
  description: "Paverskite savo lovą ortopedine sistema su Memory Foam HD antčiužiniu. Dekompresija ir skausmo mažinimas.",
  robots: {
    index: false,
    follow: false
  }
};

export default function OrtopperLTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbuc-ortopper-lt-page">
      {children}
    </div>
  );
}
