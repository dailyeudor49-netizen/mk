import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Robot de Bucătărie Automat | IONIZI",
  description: "Primul robot de bucătărie cu dozator automat de ingrediente. 45 funcții, ecran tactil 7\", 1000+ rețete.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefROLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-ro-page">
      {children}
    </div>
  );
}
