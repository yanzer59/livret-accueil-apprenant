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
        <div className="w-full max-w-[360px] mx-4">
          {/* Brand */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-primary mb-4">
              <span className="text-white text-sm font-bold">H</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight">Livrivia</h1>
            <p className="text-gray-400 text-[12px] mt-1 tracking-wide uppercase">HEOL Groupe</p>
          </div>

          {loginError && (
            <div className="border-l-[3px] border-red-400 bg-red-50/50 px-4 py-2.5 mb-6 text-[13px] text-red-600">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.04em] mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-10 border-b border-gray-200 bg-transparent px-0 text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-b-2 focus:border-primary transition-all"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-gray-500 uppercase tracking-[0.04em] mb-1.5">Mot de passe</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-10 border-b border-gray-200 bg-transparent px-0 text-[14px] text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-b-2 focus:border-primary transition-all"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full h-10 bg-primary text-white text-[13px] font-semibold tracking-wide uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
            >
              {loginLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loginLoading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          <p className="text-center text-gray-300 text-[11px] mt-8 tracking-wide">
            Acces reserve
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
