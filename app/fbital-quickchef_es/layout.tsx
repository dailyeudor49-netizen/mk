import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "QuickChef - Robot de Cocina Automático | IONIZI",
  description: "El primer robot de cocina con dispensador automático de ingredientes. 45 funciones, pantalla táctil 7\", 1000+ recetas.",
  robots: {
    index: false,
    follow: false
  }
};

export default function QuickChefESLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbital-quickchef-es-page">
      {children}
    </div>
  );
}
