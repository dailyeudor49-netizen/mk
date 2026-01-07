import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Orthopädischer Topper - Lagerräumung | IONIZI",
  description: "Verwandeln Sie Ihr Bett in ein orthopädisches System mit Memory Foam HD Topper. Dekompression und Schmerzlinderung.",
  robots: {
    index: false,
    follow: false
  }
};

export default function OrtopperDELayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbuc-ortopper-de-page">
      {children}
    </div>
  );
}
