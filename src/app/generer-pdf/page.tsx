"use client";
import { useStudent } from "@/lib/StudentContext";
import { useState } from "react";
import { Download, Loader2, CheckCircle2, FileText } from "lucide-react";

const fieldGroups = [
  { title: "Apprenant(e)", icon: "user", fields: [
    { key: "nom", label: "Nom" }, { key: "prenom", label: "Prenom" },
    { key: "date_naissance", label: "Date de naissance" }, { key: "adresse", label: "Adresse" },
    { key: "telephone", label: "Telephone" }, { key: "email", label: "E-mail" },
    { key: "formation", label: "Formation" }, { key: "diplome", label: "Diplome" },
  ]},
  { title: "Urgence", icon: "alert", fields: [
    { key: "urgence_contact", label: "Contact urgence" }, { key: "urgence_tel1", label: "Telephone urgence" },
  ]},
  { title: "Entreprise", icon: "building", fields: [
    { key: "entreprise_nom", label: "Raison sociale" }, { key: "entreprise_adresse", label: "Adresse entreprise" },
    { key: "entreprise_tel", label: "Telephone entreprise" }, { key: "entreprise_email", label: "E-mail entreprise" },
    { key: "entreprise_activite", label: "Activite" }, { key: "entreprise_debut", label: "Debut contrat" },
    { key: "entreprise_fin", label: "Fin contrat" },
  ]},
  { title: "Maitre d'apprentissage", icon: "tutor", fields: [
    { key: "ma_nom", label: "Nom tuteur" }, { key: "ma_prenom", label: "Prenom tuteur" },
    { key: "ma_poste", label: "Poste tuteur" }, { key: "ma_tel", label: "Telephone tuteur" },
    { key: "ma_email", label: "E-mail tuteur" },
  ]},
  { title: "Equipe pedagogique", icon: "team", fields: [
    { key: "equipe_dir_nom", label: "Directeur" }, { key: "equipe_resp_nom", label: "Resp. pedagogique" },
    { key: "equipe_formateur_nom", label: "Formateur" }, { key: "equipe_tel_standard", label: "Tel. standard" },
  ]},
  { title: "Liaison entreprise", icon: "link", fields: [
    { key: "liaison_mission", label: "Mission" }, { key: "liaison_activites", label: "Activites" },
    { key: "liaison_comp_techniques", label: "Comp. techniques" }, { key: "liaison_points_forts", label: "Points forts" },
  ]},
  { title: "Handicap", icon: "accessibility", fields: [
    { key: "handicap_referent_nom", label: "Referent handicap" },
  ]},
  { title: "Droit a l'image", icon: "camera", fields: [
    { key: "droit_image", label: "Choix droit image" },
  ]},
  { title: "Signatures", icon: "pen", fields: [
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

  async function generatePdf() {
    setGenerating(true);
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erreur serveur");
      }

      const blob = await response.blob();
      const filename = `livret-accueil-${(v("nom") || "apprenant").toLowerCase().replace(/\s+/g, "-")}.pdf`;
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

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-foreground">Exporter le livret</h1>
          <p className="text-sm text-muted-foreground">Generez votre livret d'accueil au format PDF</p>
        </div>
      </div>

      {/* Completion card */}
      <div className="rounded-lg border border-border bg-card p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">Etat de completion</h2>
          <span className={`text-sm font-bold ${percentage === 100 ? "text-success" : percentage >= 50 ? "text-accent" : "text-destructive"}`}>
            {percentage}%
          </span>
        </div>

        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm text-muted-foreground">{filledCount} / {totalFields} champs remplis</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all ${percentage === 100 ? "bg-success" : percentage >= 50 ? "bg-accent" : "bg-destructive"}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        <div className="space-y-1.5">
          {fieldGroups.map((group) => {
            const filled = group.fields.filter((f) => { const val = v(f.key); return val && val.trim().length > 0; }).length;
            const total = group.fields.length;
            const ok = filled === total;
            return (
              <div key={group.title} className="flex items-center justify-between py-2 px-3 rounded-md bg-muted/50">
                <div className="flex items-center gap-2.5">
                  {ok ? (
                    <CheckCircle2 className="h-4 w-4 text-success" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-border flex items-center justify-center">
                      <span className="text-[9px] font-bold text-muted-foreground">{filled}</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-foreground">{group.title}</span>
                </div>
                <span className={`text-xs font-semibold ${ok ? "text-success" : "text-muted-foreground"}`}>
                  {filled}/{total}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Generate button */}
      <div className="rounded-lg border border-border bg-card p-6 text-center">
        <button
          onClick={generatePdf}
          disabled={generating}
          className="inline-flex items-center gap-2.5 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-base px-8 py-3 rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {generating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Generation en cours...
            </>
          ) : (
            <>
              <Download className="h-5 w-5" />
              Generer mon livret
            </>
          )}
        </button>
        <p className="text-xs text-muted-foreground mt-3">Le fichier sera telecharge au format PDF</p>
      </div>
    </div>
  );
}
