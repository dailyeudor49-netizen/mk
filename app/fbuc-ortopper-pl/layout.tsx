import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Topper Ortopedyczny - Ulga dla Kręgosłupa | Oferta -50%",
  description: "Topper Ortopedyczny z Memory Foam HD i falami masującymi. Dekompresuje kręgosłup i łagodzi ból podczas snu. Darmowa wysyłka i płatność przy odbiorze.",
  keywords: [
    "topper ortopedyczny",
    "memory foam",
    "ból pleców",
    "materac ortopedyczny",
    "zdrowy kręgosłup",
  ],
  robots: {
    index: false,
    follow: false,
  },
};

export default function OrtopperPLLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="fbuc-ortopper-pl-page">
      {children}
    </div>
  );
}
