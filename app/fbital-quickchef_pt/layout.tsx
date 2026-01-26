import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Robot de Cozinha Automático | IONIZI",
  description: "O primeiro robot de cozinha com dispensador automático de ingredientes. 45 funções, ecrã táctil 7\", 1000+ receitas.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefPTLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-pt-page">
      {children}
    </div>
  );
}
