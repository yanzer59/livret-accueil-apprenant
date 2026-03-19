"use client";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // La page login est la seule accessible sans etre connecte
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await getSupabase().auth.getSession();
        if (session) {
          setAuthenticated(true);
        } else if (!isLoginPage) {
          router.push("/admin/login");
          return;
        }
      } catch {
        if (!isLoginPage) {
          router.push("/admin/login");
          return;
        }
      }
      setLoading(false);
    }
    checkAuth();

    // Ecouter les changements de session (login/logout)
    const { data: { subscription } } = getSupabase().auth.onAuthStateChange((_event, session) => {
      if (session) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        if (!isLoginPage) {
          router.push("/admin/login");
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [isLoginPage, router]);

  // Page login : afficher SANS sidebar, plein ecran
  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Livret d&apos;accueil</h1>
            <p className="text-blue-200 mt-1">de l&apos;apprenant</p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>
          <div className="bg-white rounded-lg shadow-xl p-8">
            {children}
          </div>
          <p className="text-center text-blue-300 text-xs mt-6">Acces reserve - Veuillez vous identifier</p>
        </div>
      </div>
    );
  }

  // Chargement
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light-gray">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-text text-sm">Verification de la connexion...</p>
        </div>
      </div>
    );
  }

  // Pas connecte → rien afficher (redirect en cours)
  if (!authenticated) {
    return null;
  }

  // Connecte → afficher le site avec sidebar
  return <>{children}</>;
}
