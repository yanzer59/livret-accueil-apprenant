"use client";
import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { getSupabase } from "@/lib/supabase";
import type { Student } from "@/lib/supabase";
import SignatureCanvas from "@/components/SignatureCanvas";

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

function Field({ label, name, value, onChange, type = "text" }: {
  label: string; name: string; value: string; onChange: (name: string, value: string) => void; type?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-bold text-[#1B4F72] mb-1">{label} :</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-[#2E86C1] focus:ring-1 focus:ring-[#2E86C1]"
      />
    </div>
  );
}

function DoubleField({ label1, name1, value1, label2, name2, value2, onChange }: {
  label1: string; name1: string; value1: string;
  label2: string; name2: string; value2: string;
  onChange: (name: string, value: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label={label1} name={name1} value={value1} onChange={onChange} />
      <Field label={label2} name={name2} value={value2} onChange={onChange} />
    </div>
  );
}

const TABS = [
  { id: "renseignements", label: "Mes renseignements" },
  { id: "droit-image", label: "Droit a l'image" },
  { id: "signatures", label: "Signatures" },
];

export default function StudentForm() {
  const params = useParams();
  const token = params.token as string;
  const [data, setData] = useState<Partial<Student>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [tab, setTab] = useState("renseignements");

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
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  function handleSignature(field: string, dataUrl: string) {
    setData((prev) => ({ ...prev, [field]: dataUrl }));
    setSaved(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-[#1B4F72] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Chargement de votre fiche...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-2">Lien invalide</h1>
          <p className="text-gray-500">Ce lien n&apos;existe pas ou a expire.</p>
        </div>
      </div>
    );
  }

  const v = (key: keyof Student) => (data[key] as string) || "";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B4F72] text-white py-6 px-4 text-center">
        <h1 className="text-2xl font-bold">Livret d&apos;accueil de l&apos;apprenant</h1>
        <p className="text-blue-200 text-sm mt-1">Completez vos informations puis cliquez sur Enregistrer</p>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-[#D4AC0D] text-[#1B4F72] bg-[#FEF9E7]"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto py-6 px-4">

        {/* TAB 1 : RENSEIGNEMENTS */}
        {tab === "renseignements" && (
          <>
            <FormSection title="APPRENANT(E)" color="bg-[#1B4F72]">
              <DoubleField label1="Nom" name1="nom" value1={v("nom")} label2="Prenom" name2="prenom" value2={v("prenom")} onChange={handleChange} />
              <Field label="Date de naissance" name="date_naissance" value={v("date_naissance")} onChange={handleChange} />
              <Field label="Adresse complete" name="adresse" value={v("adresse")} onChange={handleChange} />
              <DoubleField label1="Telephone" name1="telephone" value1={v("telephone")} label2="E-mail" name2="email" value2={v("email")} onChange={handleChange} />
              <Field label="Formation preparee" name="formation" value={v("formation")} onChange={handleChange} />
              <Field label="Diplome / Titre vise (RNCP)" name="diplome" value={v("diplome")} onChange={handleChange} />
            </FormSection>

            <FormSection title="EN CAS D'URGENCE" color="bg-[#E74C3C]">
              <Field label="Personne a contacter" name="urgence_contact" value={v("urgence_contact")} onChange={handleChange} />
              <DoubleField label1="Telephone 1" name1="urgence_tel1" value1={v("urgence_tel1")} label2="Telephone 2" name2="urgence_tel2" value2={v("urgence_tel2")} onChange={handleChange} />
              <Field label="Informations medicales (allergies, traitements...)" name="urgence_medical" value={v("urgence_medical")} onChange={handleChange} />
            </FormSection>

            <FormSection title="ENTREPRISE D'ACCUEIL" color="bg-[#2E86C1]">
              <Field label="Raison sociale" name="entreprise_nom" value={v("entreprise_nom")} onChange={handleChange} />
              <Field label="Adresse" name="entreprise_adresse" value={v("entreprise_adresse")} onChange={handleChange} />
              <DoubleField label1="Telephone" name1="entreprise_tel" value1={v("entreprise_tel")} label2="E-mail" name2="entreprise_email" value2={v("entreprise_email")} onChange={handleChange} />
              <Field label="Activite / Secteur" name="entreprise_activite" value={v("entreprise_activite")} onChange={handleChange} />
              <DoubleField label1="Debut du contrat" name1="entreprise_debut" value1={v("entreprise_debut")} label2="Fin du contrat" name2="entreprise_fin" value2={v("entreprise_fin")} onChange={handleChange} />
            </FormSection>

            <FormSection title="MAITRE D'APPRENTISSAGE / TUTEUR" color="bg-[#D4AC0D]">
              <DoubleField label1="Nom" name1="ma_nom" value1={v("ma_nom")} label2="Prenom" name2="ma_prenom" value2={v("ma_prenom")} onChange={handleChange} />
              <Field label="Poste occupe" name="ma_poste" value={v("ma_poste")} onChange={handleChange} />
              <DoubleField label1="Telephone" name1="ma_tel" value1={v("ma_tel")} label2="E-mail" name2="ma_email" value2={v("ma_email")} onChange={handleChange} />
            </FormSection>

            <FormSection title="RESPONSABLE(S) LEGAL(AUX) - si mineur(e)" color="bg-[#1B4F72]">
              <p className="text-xs font-bold text-[#2E86C1] mb-1 bg-[#EBF5FB] p-2 rounded">Responsable legal 1</p>
              <DoubleField label1="Nom" name1="resp1_nom" value1={v("resp1_nom")} label2="Prenom" name2="resp1_prenom" value2={v("resp1_prenom")} onChange={handleChange} />
              <Field label="Adresse" name="resp1_adresse" value={v("resp1_adresse")} onChange={handleChange} />
              <DoubleField label1="Telephone" name1="resp1_tel" value1={v("resp1_tel")} label2="E-mail" name2="resp1_email" value2={v("resp1_email")} onChange={handleChange} />

              <p className="text-xs font-bold text-[#2E86C1] mb-1 mt-4 bg-[#EBF5FB] p-2 rounded">Responsable legal 2</p>
              <DoubleField label1="Nom" name1="resp2_nom" value1={v("resp2_nom")} label2="Prenom" name2="resp2_prenom" value2={v("resp2_prenom")} onChange={handleChange} />
              <Field label="Adresse" name="resp2_adresse" value={v("resp2_adresse")} onChange={handleChange} />
              <DoubleField label1="Telephone" name1="resp2_tel" value1={v("resp2_tel")} label2="E-mail" name2="resp2_email" value2={v("resp2_email")} onChange={handleChange} />
            </FormSection>
          </>
        )}

        {/* TAB 2 : DROIT A L'IMAGE */}
        {tab === "droit-image" && (
          <FormSection title="AUTORISATION DE DROIT A L'IMAGE" color="bg-[#1B4F72]">
            <p className="text-sm text-gray-700">
              Dans le cadre de la communication du centre de formation, des photographies et videos
              peuvent etre realisees lors des sessions de formation, evenements et activites.
            </p>
            <p className="text-sm text-gray-700 mt-2">
              L&apos;utilisation de votre image s&apos;entend pour tous supports de communication
              (site web, reseaux sociaux, plaquettes), a l&apos;exclusion de toute orientation politique,
              philosophique, sexuelle ou de sante.
            </p>

            <div className="mt-6 space-y-3">
              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-green-50"
                style={{ borderColor: v("droit_image") === "accorde" ? "#27AE60" : "#E5E7EB" }}>
                <input
                  type="radio"
                  name="droit_image"
                  value="accorde"
                  checked={v("droit_image") === "accorde"}
                  onChange={() => handleChange("droit_image", "accorde")}
                  className="w-5 h-5 accent-green-600"
                />
                <div>
                  <span className="font-bold text-green-700">J&apos;ACCORDE</span>
                  <p className="text-xs text-gray-500 mt-0.5">J&apos;autorise le centre de formation a utiliser mon image</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-red-50"
                style={{ borderColor: v("droit_image") === "refuse" ? "#E74C3C" : "#E5E7EB" }}>
                <input
                  type="radio"
                  name="droit_image"
                  value="refuse"
                  checked={v("droit_image") === "refuse"}
                  onChange={() => handleChange("droit_image", "refuse")}
                  className="w-5 h-5 accent-red-600"
                />
                <div>
                  <span className="font-bold text-red-700">JE N&apos;ACCORDE PAS</span>
                  <p className="text-xs text-gray-500 mt-0.5">Je refuse l&apos;utilisation de mon image</p>
                </div>
              </label>
            </div>

            <p className="text-xs text-gray-400 mt-4 italic">
              Cette autorisation est revocable a tout moment sur demande ecrite aupres de l&apos;administration.
            </p>
          </FormSection>
        )}

        {/* TAB 3 : SIGNATURES */}
        {tab === "signatures" && (
          <>
            <div className="mb-6 p-4 bg-[#EBF5FB] rounded-lg border border-[#2E86C1]/20">
              <p className="text-sm text-[#1B4F72]">
                En signant ci-dessous, chaque partie atteste avoir pris connaissance de l&apos;ensemble
                du livret d&apos;accueil et s&apos;engage a respecter les engagements definis.
              </p>
            </div>

            <SignatureCanvas
              label="SIGNATURE DE L'APPRENTI(E)"
              value={data.signature_apprenti}
              onSave={(dataUrl) => handleSignature("signature_apprenti", dataUrl)}
              color="bg-[#2E86C1]"
            />

            <SignatureCanvas
              label="SIGNATURE DU TUTEUR / MAITRE D'APPRENTISSAGE"
              value={data.signature_tuteur}
              onSave={(dataUrl) => handleSignature("signature_tuteur", dataUrl)}
              color="bg-[#D4AC0D]"
            />

            <SignatureCanvas
              label="SIGNATURE DU RESPONSABLE DU CFA"
              value={data.signature_cfa}
              onSave={(dataUrl) => handleSignature("signature_cfa", dataUrl)}
              color="bg-[#1B4F72]"
            />
          </>
        )}
      </div>

      {/* Save bar sticky */}
      <div className="sticky bottom-0 bg-white/95 backdrop-blur border-t border-gray-200 py-4 px-4 z-10">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            {saved && <span className="text-green-600 font-medium text-sm">Enregistre avec succes !</span>}
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-[#1B4F72] hover:bg-[#2E86C1] text-white font-bold px-8 py-3 rounded-lg shadow transition-colors disabled:opacity-50 text-sm"
          >
            {saving ? "Enregistrement..." : "Enregistrer"}
          </button>
        </div>
      </div>
    </div>
  );
}
