"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await getSupabase().auth.signInWithPassword({ email, password });

    if (error) {
      setError("Identifiants incorrects. Veuillez reessayer.");
      setLoading(false);
    } else {
      router.push("/");
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <h2 className="text-xl font-bold text-primary text-center mb-6">Connexion</h2>

      {error && (
        <div className="bg-red-50 text-red border border-red/20 rounded px-4 py-2 mb-4 text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-bold text-primary mb-1">Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
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
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20"
          placeholder="Votre mot de passe"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>
    </form>
  );
}
