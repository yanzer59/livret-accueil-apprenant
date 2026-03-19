"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { Student } from "@/lib/supabase";

export default function AdminDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

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

  async function downloadFiche(student: Student) {
    setDownloading(student.id);
    try {
      const response = await fetch("/api/generate-livret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erreur serveur");
      }

      const blob = await response.blob();
      const nom = (student.nom || "apprenant").toLowerCase().replace(/\s+/g, "-");
      const prenom = (student.prenom || "").toLowerCase().replace(/\s+/g, "-");
      const filename = `livret-${prenom}-${nom}.docx`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erreur : " + (err as Error).message);
    }
    setDownloading(null);
  }

  if (loading || !authenticated) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-text">Chargement...</p>
      </div>
    );
  }

  const fieldGroups = [
    { title: "Apprenant(e)", fields: [
      { key: "nom", label: "Nom" }, { key: "prenom", label: "Prenom" },
      { key: "date_naissance", label: "Date de naissance" }, { key: "adresse", label: "Adresse" },
      { key: "telephone", label: "Telephone" }, { key: "email", label: "E-mail" },
      { key: "formation", label: "Formation" }, { key: "diplome", label: "Diplome" },
    ]},
    { title: "Urgence", fields: [
      { key: "urgence_contact", label: "Contact urgence" }, { key: "urgence_tel1", label: "Telephone 1" },
      { key: "urgence_tel2", label: "Telephone 2" }, { key: "urgence_medical", label: "Infos medicales" },
    ]},
    { title: "Entreprise", fields: [
      { key: "entreprise_nom", label: "Raison sociale" }, { key: "entreprise_adresse", label: "Adresse" },
      { key: "entreprise_tel", label: "Telephone" }, { key: "entreprise_email", label: "E-mail" },
      { key: "entreprise_activite", label: "Activite" },
      { key: "entreprise_debut", label: "Debut contrat" }, { key: "entreprise_fin", label: "Fin contrat" },
    ]},
    { title: "Maitre d'apprentissage", fields: [
      { key: "ma_nom", label: "Nom" }, { key: "ma_prenom", label: "Prenom" },
      { key: "ma_poste", label: "Poste" }, { key: "ma_tel", label: "Telephone" }, { key: "ma_email", label: "E-mail" },
    ]},
  ];

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary">Dashboard Administration</h1>
        <p className="text-sm text-gray-text mt-1">Gestion des fiches apprenants</p>
      </div>

      {/* Info */}
      <div className="bg-light border border-secondary/30 rounded-lg p-4 mb-6">
        <p className="text-sm text-primary">
          Les apprenants remplissent leurs informations directement apres connexion sur le site. Leurs fiches apparaissent ici automatiquement.
        </p>
      </div>

      {/* Liste des etudiants */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-primary text-white px-6 py-3">
          <h2 className="font-bold">Fiches apprenants ({students.length})</h2>
        </div>

        {students.length === 0 ? (
          <div className="p-8 text-center text-gray-text">
            <p>Aucun apprenant pour le moment.</p>
            <p className="text-sm mt-1">Les fiches apparaitront ici lorsque les apprenants auront rempli leurs informations.</p>
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
                  <th className="text-left px-4 py-3 font-bold text-primary">Heure</th>
                  <th className="text-center px-4 py-3 font-bold text-primary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => {
                  const d = new Date(s.created_at);
                  return (
                    <tr key={s.id} className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-light-gray/50"}`}>
                      <td className="px-4 py-3 font-medium">{s.nom || "\u2014"}</td>
                      <td className="px-4 py-3">{s.prenom || "\u2014"}</td>
                      <td className="px-4 py-3">{s.formation || "\u2014"}</td>
                      <td className="px-4 py-3">{s.entreprise_nom || "\u2014"}</td>
                      <td className="px-4 py-3 text-gray-text text-xs">
                        {d.toLocaleDateString("fr-FR")}
                      </td>
                      <td className="px-4 py-3 text-gray-text text-xs">
                        {d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td className="px-4 py-3 text-center space-x-2">
                        <button
                          onClick={() => setSelectedStudent(selectedStudent?.id === s.id ? null : s)}
                          className="text-secondary hover:text-primary font-medium text-xs underline"
                        >
                          {selectedStudent?.id === s.id ? "Fermer" : "Details"}
                        </button>
                        <button
                          onClick={() => downloadFiche(s)}
                          disabled={downloading === s.id}
                          className="bg-green hover:bg-green/80 text-white text-xs font-bold px-3 py-1 rounded transition-colors disabled:opacity-50"
                        >
                          {downloading === s.id ? "..." : "Telecharger DOCX"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Detail fiche etudiant */}
      {selectedStudent && (
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-secondary text-white px-6 py-3 flex items-center justify-between">
            <h2 className="font-bold">Fiche de {selectedStudent.prenom || ""} {selectedStudent.nom || "l\u2019apprenant"}</h2>
            <button onClick={() => setSelectedStudent(null)} className="text-white/80 hover:text-white text-sm">Fermer</button>
          </div>
          <div className="p-6 space-y-4">
            {fieldGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-bold text-primary text-sm bg-light px-3 py-2 rounded mb-2">{group.title}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {group.fields.map((f) => {
                    const val = (selectedStudent as unknown as Record<string, unknown>)[f.key] as string;
                    return (
                      <div key={f.key} className="flex gap-2 py-1 border-b border-dotted border-gray-200">
                        <span className="text-xs font-bold text-primary w-32 shrink-0">{f.label} :</span>
                        <span className="text-xs text-dark">{val || "\u2014"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Droit image */}
            <div>
              <h3 className="font-bold text-primary text-sm bg-light px-3 py-2 rounded mb-2">Droit a l&apos;image</h3>
              <p className="text-xs px-2">
                {selectedStudent.droit_image === "accorde" ? "Accorde" : selectedStudent.droit_image === "refuse" ? "Refuse" : "Non renseigne"}
              </p>
            </div>

            {/* Signatures */}
            <div>
              <h3 className="font-bold text-primary text-sm bg-light px-3 py-2 rounded mb-2">Signatures</h3>
              <div className="grid grid-cols-3 gap-4 px-2">
                <div className="text-center">
                  <p className="text-xs font-bold text-primary mb-1">Apprenti(e)</p>
                  {selectedStudent.signature_apprenti ? (
                    <img src={selectedStudent.signature_apprenti} alt="Signature apprenti" className="max-h-16 mx-auto border rounded" />
                  ) : <p className="text-xs text-gray-400">Non signe</p>}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-primary mb-1">Tuteur</p>
                  {selectedStudent.signature_tuteur ? (
                    <img src={selectedStudent.signature_tuteur} alt="Signature tuteur" className="max-h-16 mx-auto border rounded" />
                  ) : <p className="text-xs text-gray-400">Non signe</p>}
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold text-primary mb-1">CFA</p>
                  {selectedStudent.signature_cfa ? (
                    <img src={selectedStudent.signature_cfa} alt="Signature CFA" className="max-h-16 mx-auto border rounded" />
                  ) : <p className="text-xs text-gray-400">Non signe</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
