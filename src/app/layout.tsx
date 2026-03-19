import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import AuthGuard from "@/components/AuthGuard";

export const metadata: Metadata = {
  title: "Livret d'accueil de l'apprenant",
  description: "Livret d'accueil universel pour les apprenants en alternance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="bg-light-gray min-h-screen">
        <AuthGuard>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
              {children}
            </main>
          </div>
        </AuthGuard>
      </body>
    </html>
  );
}
