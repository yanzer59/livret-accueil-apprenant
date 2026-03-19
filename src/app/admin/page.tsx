"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { Student } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [newLink, setNewLink] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchStudents = useCallback(async () => {
    const { data } = await getSupabase()
      .from("students")
      .select("*")
      .order("created_at", { ascending: false });
    setStudents(data || []);
  }, []);

  useEffect(() => {
    async function checkAuth() {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setAuthenticated(true);
      setLoading(false);
      fetchStudents();
    }
    checkAuth();
  }, [router, fetchStudents]);

  async function handleLogout() {
    await getSupabase().auth.signOut();
    router.push("/admin/login");
  }

  async function createStudentLink() {
    setCreating(true);
    setNewLink("");
    const { data, error } = await getSupabase()
      .from("students")
      .insert({})
      .select("token")
      .single();

    if (error) {
      alert("Erreur lors de la creation : " + error.message);
    } else if (data) {
      const url = `${window.location.origin}/formulaire/${data.token}`;
      setNewLink(url);
      fetchStudents();
    }
    setCreating(false);
  }

  function copyLink() {
    navigator.clipboard.writeText(newLink);
    alert("Lien copie dans le presse-papier !");
  }

  if (loading || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-text">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-primary">Dashboard Administration</h1>
          <p className="text-sm text-gray-text mt-1">Gestion des fiches apprenants</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red hover:bg-red/80 text-white px-4 py-2 rounded text-sm font-medium transition-colors"
        >
          Deconnexion
        </button>
      </div>

      {/* Creer un lien */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="font-bold text-primary text-lg mb-3">Generer un lien etudiant</h2>
        <p className="text-sm text-gray-text mb-4">
          Creez un lien unique que vous enverrez a l&apos;etudiant. Il pourra remplir sa fiche de renseignements directement en ligne.
        </p>
        <button
          onClick={createStudentLink}
          disabled={creating}
          className="bg-accent hover:bg-accent/80 text-dark font-bold px-5 py-2.5 rounded transition-colors disabled:opacity-50"
        >
          {creating ? "Creation..." : "Nouveau lien etudiant"}
        </button>

        {newLink && (
          <div className="mt-4 bg-light border border-secondary/30 rounded p-4">
            <p className="text-sm font-bold text-primary mb-2">Lien genere avec succes :</p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={newLink}
                className="flex-1 bg-white border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <button
                onClick={copyLink}
                className="bg-secondary hover:bg-secondary/80 text-white px-4 py-2 rounded text-sm font-medium transition-colors shrink-0"
              >
                Copier
              </button>
            </div>
            <p className="text-xs text-gray-text mt-2">Envoyez ce lien a l&apos;etudiant pour qu&apos;il remplisse sa fiche.</p>
          </div>
        )}
      </div>

      {/* Liste des etudiants */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-primary text-white px-6 py-3">
          <h2 className="font-bold">Fiches apprenants ({students.length})</h2>
        </div>

        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-text">
            <p>Aucun apprenant pour le moment.</p>
            <p className="text-sm mt-1">Generez un lien ci-dessus pour commencer.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-light-gray border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-bold text-primary">Nom</th>
                  <th className="text-left px-4 py-3 font-bold text-primary">Prenom</th>
                  <th className="text-left px-4 py-3 font-bold text-primary">Formation</th>
                  <th className="text-left px-4 py-3 font-bold text-primary">Entreprise</th>
                  <th className="text-left px-4 py-3 font-bold text-primary">Date</th>
                  <th className="text-center px-4 py-3 font-bold text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <tr key={s.id} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-light-gray/50"}`}>
                    <td className="px-4 py-3 font-medium">{s.nom || "—"}</td>
                    <td className="px-4 py-3">{s.prenom || "—"}</td>
                    <td className="px-4 py-3">{s.formation || "—"}</td>
                    <td className="px-4 py-3">{s.entreprise_nom || "—"}</td>
                    <td className="px-4 py-3 text-gray-text text-xs">
                      {new Date(s.created_at).toLocaleDateString("fr-FR")}
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Link
                        href={`/formulaire/${s.token}`}
                        className="text-secondary hover:text-primary font-medium text-xs underline"
                      >
                        Voir la fiche
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
