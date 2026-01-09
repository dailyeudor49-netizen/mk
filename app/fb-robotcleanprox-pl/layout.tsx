import type { Metadata } from "next";
import "./hide-main-layout.css";

export const metadata: Metadata = {
  title: "Robot Clean Pro X - Robot Aspirapolvere Lavapavimenti | Offerta -50%",
  description: "Robot Clean Pro X: aspira, lava e asciuga in una sola passata. Base autosvuotante inclusa. Spedizione gratuita e pagamento alla consegna. Offerta limitata -50%.",
  keywords: [
    "robot aspirapolvere",
    "robot lavapavimenti",
    "aspirapolvere automatico",
    "robot pulizia casa",
    "aspirapolvere robot",
  ],
  robots: {
    index: true,
    follow: true,
  },
};

export default function RobotCleanProXLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="robotcleanprox-page">
      {children}
    </div>
  );
}
