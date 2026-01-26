import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Automatinis Virtuvės Robotas | IONIZI",
  description: "Pirmasis virtuvės robotas su automatiniu ingredientų dozatoriumi. 45 funkcijos, 7\" jutiklinis ekranas, 1000+ receptų.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefLTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-lt-page">
      {children}
    </div>
  );
}
