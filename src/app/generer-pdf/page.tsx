"use client";
import { useStudent } from "@/lib/StudentContext";
import { useState } from "react";

const fieldGroups = [
  { title: "Apprenant(e)", fields: [
    { key: "nom", label: "Nom" }, { key: "prenom", label: "Prenom" },
    { key: "date_naissance", label: "Date de naissance" }, { key: "adresse", label: "Adresse" },
    { key: "telephone", label: "Telephone" }, { key: "email", label: "E-mail" },
    { key: "formation", label: "Formation" }, { key: "diplome", label: "Diplome" },
  ]},
  { title: "Urgence", fields: [
    { key: "urgence_contact", label: "Contact urgence" }, { key: "urgence_tel1", label: "Telephone urgence" },
  ]},
  { title: "Entreprise", fields: [
    { key: "entreprise_nom", label: "Raison sociale" }, { key: "entreprise_adresse", label: "Adresse entreprise" },
    { key: "entreprise_tel", label: "Telephone entreprise" }, { key: "entreprise_email", label: "E-mail entreprise" },
    { key: "entreprise_activite", label: "Activite" }, { key: "entreprise_debut", label: "Debut contrat" },
    { key: "entreprise_fin", label: "Fin contrat" },
  ]},
  { title: "Maitre d'apprentissage", fields: [
    { key: "ma_nom", label: "Nom tuteur" }, { key: "ma_prenom", label: "Prenom tuteur" },
    { key: "ma_poste", label: "Poste tuteur" }, { key: "ma_tel", label: "Telephone tuteur" },
    { key: "ma_email", label: "E-mail tuteur" },
  ]},
  { title: "Droit a l'image", fields: [
    { key: "droit_image", label: "Choix droit image" },
  ]},
  { title: "Signatures", fields: [
    { key: "signature_apprenti", label: "Signature apprenti(e)" },
    { key: "signature_tuteur", label: "Signature tuteur" },
    { key: "signature_cfa", label: "Signature CFA" },
  ]},
];

export default function Page() {
  const { data, loading } = useStudent();
  const [generating, setGenerating] = useState(false);

  const v = (key: string): string => (data[key as keyof typeof data] as string) || "";

  const allFields = fieldGroups.flatMap((g) => g.fields);
  const filledCount = allFields.filter((f) => { const val = v(f.key); return val && val.trim().length > 0; }).length;
  const totalFields = allFields.length;
  const percentage = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;

  async function generateDocx() {
    setGenerating(true);
    try {
      const response = await fetch("/api/generate-livret", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erreur serveur");
      }

      const blob = await response.blob();
      const filename = `livret-accueil-${(v("nom") || "apprenant").toLowerCase().replace(/\s+/g, "-")}.docx`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Erreur generation:", err);
      alert("Erreur : " + (err as Error).message);
    }
    setGenerating(false);
  }

  if (loading) return <div className="max-w-4xl mx-auto"><p className="text-sm text-gray-500 text-center py-8">Chargement...</p></div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-primary border-b-2 border-accent pb-2 mb-6">Generer mon livret</h1>

      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="font-bold text-primary text-lg mb-4">Etat de completion du livret</h2>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-dark">{filledCount} / {totalFields} champs remplis</span>
            <span className={`text-sm font-bold ${percentage === 100 ? "text-green" : percentage >= 50 ? "text-accent" : "text-red"}`}>{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className={`h-3 rounded-full transition-all ${percentage === 100 ? "bg-green" : percentage >= 50 ? "bg-accent" : "bg-red"}`} style={{ width: `${percentage}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          {fieldGroups.map((group) => {
            const filled = group.fields.filter((f) => { const val = v(f.key); return val && val.trim().length > 0; }).length;
            const total = group.fields.length;
            const ok = filled === total;
            return (
              <div key={group.title} className="flex items-center justify-between py-2 px-3 rounded bg-light-gray">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white ${ok ? "bg-green" : "bg-gray-400"}`}>
                    {ok ? <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> : filled}
                  </span>
                  <span className="text-sm font-medium text-dark">{group.title}</span>
                </div>
                <span className={`text-xs font-bold ${ok ? "text-green" : "text-gray-500"}`}>{filled}/{total}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="text-center">
        <button onClick={generateDocx} disabled={generating}
          className="inline-flex items-center gap-3 bg-green hover:bg-green/90 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-all disabled:opacity-50">
          {generating ? (
            <><svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Generation en cours...</>
          ) : (
            <><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>Generer mon livret</>
          )}
        </button>
        <p className="text-xs text-gray-text mt-3">Le fichier sera telecharge au format Word (.docx)</p>
      </div>
    </div>
  );
}
