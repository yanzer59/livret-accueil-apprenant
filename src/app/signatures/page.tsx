"use client";
import { useState, useEffect, useCallback } from "react";
import { PageSection, AlertBox } from "@/components/ui";
import SignatureCanvas from "@/components/SignatureCanvas";
import { getSupabase } from "@/lib/supabase";

export default function Page() {
  const [signatures, setSignatures] = useState<{
    signature_apprenti: string | null;
    signature_tuteur: string | null;
    signature_cfa: string | null;
  }>({
    signature_apprenti: null,
    signature_tuteur: null,
    signature_cfa: null,
  });
  const [studentId, setStudentId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // Charger les signatures existantes (du premier etudiant pour l'instant)
  const loadSignatures = useCallback(async () => {
    try {
      const { data } = await getSupabase()
        .from("students")
        .select("id, signature_apprenti, signature_tuteur, signature_cfa")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (data) {
        setStudentId(data.id);
        setSignatures({
          signature_apprenti: data.signature_apprenti,
          signature_tuteur: data.signature_tuteur,
          signature_cfa: data.signature_cfa,
        });
      }
    } catch {
      // Pas de donnees encore
    }
  }, []);

  useEffect(() => {
    loadSignatures();
  }, [loadSignatures]);

  async function saveSignature(field: string, dataUrl: string) {
    setSaving(true);
    setSavedMsg("");

    if (studentId) {
      const { error } = await getSupabase()
        .from("students")
        .update({ [field]: dataUrl, updated_at: new Date().toISOString() })
        .eq("id", studentId);

      if (error) {
        setSavedMsg("Erreur : " + error.message);
      } else {
        setSavedMsg("Signature enregistree !");
        setSignatures((prev) => ({ ...prev, [field]: dataUrl }));
      }
    } else {
      setSavedMsg("Aucune fiche etudiant trouvee. Creez d'abord un lien etudiant dans l'administration.");
    }
    setSaving(false);
    setTimeout(() => setSavedMsg(""), 3000);
  }

  return (
    <PageSection num={18} title="Signatures et engagement">
      <p className="text-dark text-sm">
        En signant ce livret d&apos;accueil, chaque partie atteste avoir pris connaissance
        de l&apos;ensemble des informations contenues dans ce document et s&apos;engage a respecter
        les engagements qui lui incombent.
      </p>

      <AlertBox bg="bg-light" textColor="text-primary">
        La signature de ce livret conditionne la validation de l&apos;inscription definitive
        de l&apos;apprenti(e) au sein du CFA. Chaque signataire conserve un exemplaire
        de ce document.
      </AlertBox>

      {saving && <p className="text-sm text-gray-500 text-center">Enregistrement...</p>}
      {savedMsg && <p className="text-sm text-green-600 text-center font-medium">{savedMsg}</p>}

      <SignatureCanvas
        label="SIGNATURE DE L'APPRENTI(E)"
        value={signatures.signature_apprenti}
        onSave={(dataUrl) => saveSignature("signature_apprenti", dataUrl)}
        color="bg-secondary"
      />

      <SignatureCanvas
        label="SIGNATURE DU TUTEUR / MAITRE D'APPRENTISSAGE"
        value={signatures.signature_tuteur}
        onSave={(dataUrl) => saveSignature("signature_tuteur", dataUrl)}
        color="bg-accent"
      />

      <SignatureCanvas
        label="SIGNATURE DU RESPONSABLE DU CFA"
        value={signatures.signature_cfa}
        onSave={(dataUrl) => saveSignature("signature_cfa", dataUrl)}
        color="bg-primary"
      />

      <div className="mt-4 p-4 bg-light-gray rounded">
        <p className="text-xs text-gray-text italic text-center">
          Ce livret d&apos;accueil a ete remis a l&apos;apprenti(e) le jour de son integration au CFA.
          Un exemplaire signe est conserve dans le dossier de l&apos;apprenant(e).
        </p>
      </div>
    </PageSection>
  );
}
