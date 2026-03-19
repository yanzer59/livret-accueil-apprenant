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

  // Page login : toujours afficher
  if (isLoginPage) {
    return <>{children}</>;
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

  // Connecte → afficher le contenu
  return <>{children}</>;
}
