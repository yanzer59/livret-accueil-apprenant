"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { Student } from "@/lib/supabase";

function FormSection({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <div className={`${color} text-white font-bold text-sm px-4 py-2.5 rounded-t`}>{title}</div>
      <div className="border border-gray-200 border-t-0 rounded-b p-5 bg-white space-y-3">
        {children}
      </div>
    </div>
  );
}

function Field({ label, name, value, onChange, type = "text", className = "" }: {
  label: string; name: string; value: string; onChange: (name: string, value: string) => void; type?: string; className?: string;
}) {
  return (
    <div className={className}>
      <label className="block text-xs font-bold text-primary mb-1">{label} :</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
      />
    </div>
  );
}

function DoubleField({ label1, name1, value1, label2, name2, value2, onChange, className = "" }: {
  label1: string; name1: string; value1: string;
  label2: string; name2: string; value2: string;
  onChange: (name: string, value: string) => void; className?: string;
}) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      <Field label={label1} name={name1} value={value1} onChange={onChange} />
      <Field label={label2} name={name2} value={value2} onChange={onChange} />
    </div>
  );
}

export default function StudentForm() {
  const params = useParams();
  const token = params.token as string;
  const [data, setData] = useState<Partial<Student>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const fetchData = useCallback(async () => {
    const { data: student, error } = await getSupabase()
      .from("students")
      .select("*")
      .eq("token", token)
      .single();

    if (error || !student) {
      setNotFound(true);
    } else {
      setData(student);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  function handleChange(name: string, value: string) {
    setData((prev) => ({ ...prev, [name]: value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    const { id, token: _t, created_at, ...updateData } = data as Student;
    void id; void _t; void created_at;

    const { error } = await getSupabase()
      .from("students")
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq("token", token);

    if (error) {
      alert("Erreur lors de la sauvegarde : " + error.message);
    } else {
      setSaved(true);
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-gray-text">Chargement de votre fiche...</p>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red mb-2">Lien invalide</h1>
          <p className="text-gray-text">Ce lien n&apos;existe pas ou a expire.</p>
        </div>
      </div>
    );
  }

  const v = (key: keyof Student) => (data[key] as string) || "";

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-primary">Fiche de renseignements</h1>
        <p className="text-sm text-gray-text mt-1">Completez vos informations ci-dessous puis cliquez sur Enregistrer</p>
      </div>

      <FormSection title="APPRENANT(E)" color="bg-primary">
        <DoubleField label1="Nom" name1="nom" value1={v("nom")} label2="Prenom" name2="prenom" value2={v("prenom")} onChange={handleChange} />
        <Field label="Date de naissance" name="date_naissance" value={v("date_naissance")} onChange={handleChange} />
        <Field label="Adresse complete" name="adresse" value={v("adresse")} onChange={handleChange} />
        <DoubleField label1="Telephone" name1="telephone" value1={v("telephone")} label2="E-mail" name2="email" value2={v("email")} onChange={handleChange} />
        <Field label="Formation preparee" name="formation" value={v("formation")} onChange={handleChange} />
        <Field label="Diplome / Titre vise (RNCP)" name="diplome" value={v("diplome")} onChange={handleChange} />
      </FormSection>

      <FormSection title="EN CAS D'URGENCE" color="bg-red">
        <Field label="Personne a contacter" name="urgence_contact" value={v("urgence_contact")} onChange={handleChange} />
        <DoubleField label1="Telephone 1" name1="urgence_tel1" value1={v("urgence_tel1")} label2="Telephone 2" name2="urgence_tel2" value2={v("urgence_tel2")} onChange={handleChange} />
        <Field label="Informations medicales (allergies, traitements...)" name="urgence_medical" value={v("urgence_medical")} onChange={handleChange} />
      </FormSection>

      <FormSection title="ENTREPRISE D'ACCUEIL" color="bg-secondary">
        <Field label="Raison sociale" name="entreprise_nom" value={v("entreprise_nom")} onChange={handleChange} />
        <Field label="Adresse" name="entreprise_adresse" value={v("entreprise_adresse")} onChange={handleChange} />
        <DoubleField label1="Telephone" name1="entreprise_tel" value1={v("entreprise_tel")} label2="E-mail" name2="entreprise_email" value2={v("entreprise_email")} onChange={handleChange} />
        <Field label="Activite / Secteur" name="entreprise_activite" value={v("entreprise_activite")} onChange={handleChange} />
        <DoubleField label1="Debut du contrat" name1="entreprise_debut" value1={v("entreprise_debut")} label2="Fin du contrat" name2="entreprise_fin" value2={v("entreprise_fin")} onChange={handleChange} />
      </FormSection>

      <FormSection title="MAITRE D'APPRENTISSAGE / TUTEUR" color="bg-accent">
        <DoubleField label1="Nom" name1="ma_nom" value1={v("ma_nom")} label2="Prenom" name2="ma_prenom" value2={v("ma_prenom")} onChange={handleChange} />
        <Field label="Poste occupe" name="ma_poste" value={v("ma_poste")} onChange={handleChange} />
        <DoubleField label1="Telephone" name1="ma_tel" value1={v("ma_tel")} label2="E-mail" name2="ma_email" value2={v("ma_email")} onChange={handleChange} />
      </FormSection>

      <FormSection title="RESPONSABLE(S) LEGAL(AUX) - si mineur(e)" color="bg-primary">
        <p className="text-xs font-bold text-secondary mb-1 bg-light p-2 rounded">Responsable legal 1</p>
        <DoubleField label1="Nom" name1="resp1_nom" value1={v("resp1_nom")} label2="Prenom" name2="resp1_prenom" value2={v("resp1_prenom")} onChange={handleChange} />
        <Field label="Adresse" name="resp1_adresse" value={v("resp1_adresse")} onChange={handleChange} />
        <DoubleField label1="Telephone" name1="resp1_tel" value1={v("resp1_tel")} label2="E-mail" name2="resp1_email" value2={v("resp1_email")} onChange={handleChange} />

        <p className="text-xs font-bold text-secondary mb-1 mt-4 bg-light p-2 rounded">Responsable legal 2</p>
        <DoubleField label1="Nom" name1="resp2_nom" value1={v("resp2_nom")} label2="Prenom" name2="resp2_prenom" value2={v("resp2_prenom")} onChange={handleChange} />
        <Field label="Adresse" name="resp2_adresse" value={v("resp2_adresse")} onChange={handleChange} />
        <DoubleField label1="Telephone" name1="resp2_tel" value1={v("resp2_tel")} label2="E-mail" name2="resp2_email" value2={v("resp2_email")} onChange={handleChange} />
      </FormSection>

      {/* Save button */}
      <div className="sticky bottom-0 bg-light-gray/90 backdrop-blur py-4 border-t border-gray-200 -mx-6 px-6 lg:-mx-10 lg:px-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            {saved && <span className="text-green font-medium text-sm">Fiche enregistree avec succes !</span>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary hover:bg-secondary text-white font-bold px-8 py-3 rounded-lg shadow transition-colors disabled:opacity-50 text-sm"
          >
            {saving ? "Enregistrement..." : "Enregistrer ma fiche"}
          </button>
        </div>
      </div>
    </div>
  );
}
