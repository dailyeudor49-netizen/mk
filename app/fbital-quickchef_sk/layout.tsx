import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Automatický Kuchynský Robot | IONIZI",
  description: "Prvý kuchynský robot s automatickým dávkovačom ingrediencií. 45 funkcií, 7\" dotyková obrazovka, 1000+ receptov.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefSKLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-sk-page">
      {children}
    </div>
  );
}
