import type { Metadata } from "next";
import "./globals.css";
import AuthShell from "@/components/AuthShell";

export const metadata: Metadata = {
  title: "Livret d'accueil de l'apprenant",
  description: "Livret d'accueil universel pour les apprenants en alternance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-light-gray min-h-screen">
        <AuthShell>{children}</AuthShell>
      </body>
    </html>
  );
}
