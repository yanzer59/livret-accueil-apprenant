"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import { StudentProvider } from "@/lib/StudentContext";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const { data: { session } } = await getSupabase().auth.getSession();
        setAuthenticated(!!session);
        setIsAdmin(session?.user?.email === "admin@livret.local");
      } catch {
        setAuthenticated(false);
        setIsAdmin(false);
      }
      setLoading(false);
    }
    checkAuth();

    const { data: { subscription } } = getSupabase().auth.onAuthStateChange((_event, session) => {
      setAuthenticated(!!session);
      setIsAdmin(session?.user?.email === "admin@livret.local");
    });

    return () => subscription.unsubscribe();
  }, []);

  // Recuperer l'email du user connecte
  useEffect(() => {
    async function getEmail() {
      const { data: { user } } = await getSupabase().auth.getUser();
      if (user?.email) setUserEmail(user.email);
    }
    if (authenticated) getEmail();
  }, [authenticated]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const { error } = await getSupabase().auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError("Identifiants incorrects. Veuillez reessayer.");
      setLoginLoading(false);
    } else {
      setAuthenticated(true);
      router.push("/");
    }
  }

  async function handleLogout() {
    await getSupabase().auth.signOut();
    setAuthenticated(false);
    setIsAdmin(false);
    router.push("/");
  }

  // Chargement initial
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-light-gray">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-text text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  // PAS CONNECTE → Page de login plein ecran, RIEN d'autre
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Livret d&apos;accueil</h1>
            <p className="text-blue-200 mt-1">de l&apos;apprenant</p>
            <div className="w-20 h-1 bg-accent mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-lg shadow-xl p-8">
            <h2 className="text-xl font-bold text-primary text-center mb-6">Connexion</h2>

            {loginError && (
              <div className="bg-red-50 text-red-600 border border-red-200 rounded px-4 py-2 mb-4 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-bold text-primary mb-1">Email :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="admin@livret.local"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-bold text-primary mb-1">Mot de passe :</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Votre mot de passe"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loginLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>

          <p className="text-center text-blue-300 text-xs mt-6">Acces reserve - Veuillez vous identifier</p>
        </div>
      </div>
    );
  }

  // CONNECTE → Site complet avec sidebar + donnees etudiant
  return (
    <StudentProvider>
      <div className="flex min-h-screen">
        <Sidebar isAdmin={isAdmin} />
        <div className="flex-1 flex flex-col">
          {/* Barre du haut avec deconnexion */}
          <div className="bg-white border-b border-gray-200 px-6 py-2.5 flex items-center justify-end gap-3 shrink-0">
            <span className="text-xs text-gray-text">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="bg-red hover:bg-red/80 text-white text-xs font-medium px-3 py-1.5 rounded transition-colors"
            >
              Deconnexion
            </button>
          </div>
          <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-20">
            {children}
          </main>
        </div>
      </div>
    </StudentProvider>
  );
}
