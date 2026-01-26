import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Az Automatikus Konyhai Robot | IONIZI",
  description: "Az első konyhai robot automatikus hozzávaló-adagolóval. 45 funkció, 7\" érintőképernyő, 1000+ recept.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefHULayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-hu-page">
      {children}
    </div>
  );
}
