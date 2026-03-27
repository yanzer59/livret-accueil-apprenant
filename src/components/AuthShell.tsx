"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { StudentProvider } from "@/lib/StudentContext";
import { BookOpen, Loader2 } from "lucide-react";

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

  // Loading
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">Chargement...</p>
        </div>
      </div>
    );
  }

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-full max-w-sm mx-4">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground mb-4">
              <BookOpen className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Livrivia</h1>
            <p className="text-muted-foreground text-sm mt-1">Livret d&apos;accueil de l&apos;apprenant</p>
          </div>

          {/* Login card */}
          <div className="bg-card rounded-lg border border-border shadow-sm p-6">
            <h2 className="text-lg font-semibold text-foreground text-center mb-6">Connexion</h2>

            {loginError && (
              <div className="bg-destructive/10 text-destructive border border-destructive/20 rounded-md px-4 py-2.5 mb-4 text-sm">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="admin@livret.local"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Mot de passe</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  placeholder="Votre mot de passe"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full h-10 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {loginLoading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          </div>

          <p className="text-center text-muted-foreground text-xs mt-6">
            Acces reserve — Veuillez vous identifier
          </p>
        </div>
      </div>
    );
  }

  // Authenticated layout — single scrolling page, no sidebar
  return (
    <StudentProvider>
      <div className="min-h-screen bg-white">
        <Header userEmail={userEmail} isAdmin={isAdmin} onLogout={handleLogout} />
        <main className="mx-auto max-w-3xl px-6 py-8 md:px-8 md:py-10">
          {children}
        </main>
      </div>
    </StudentProvider>
  );
}
