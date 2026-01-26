import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Automatický Kuchyňský Robot | IONIZI",
  description: "První kuchyňský robot s automatickým dávkovačem ingrediencí. 45 funkcí, 7\" dotyková obrazovka, 1000+ receptů.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefCZLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-cz-page">
      {children}
    </div>
  );
}
