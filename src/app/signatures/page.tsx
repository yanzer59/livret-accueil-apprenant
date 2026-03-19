"use client";
import { useStudent } from "@/lib/StudentContext";
import { PageSection, AlertBox } from "@/components/ui";
import SignatureCanvas from "@/components/SignatureCanvas";
import SaveBar from "@/components/SaveBar";

export default function Page() {
  const { data, loading, update } = useStudent();

  if (loading) {
    return (
      <PageSection num={18} title="Signatures et engagement">
        <p className="text-sm text-gray-500 text-center py-8">Chargement...</p>
      </PageSection>
    );
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

      <SignatureCanvas
        label="SIGNATURE DE L&apos;APPRENTI(E)"
        value={data.signature_apprenti}
        onSave={(dataUrl) => update("signature_apprenti", dataUrl)}
        color="bg-secondary"
      />

      <SignatureCanvas
        label="SIGNATURE DU TUTEUR / MAITRE D&apos;APPRENTISSAGE"
        value={data.signature_tuteur}
        onSave={(dataUrl) => update("signature_tuteur", dataUrl)}
        color="bg-accent"
      />

      <SignatureCanvas
        label="SIGNATURE DU RESPONSABLE DU CFA"
        value={data.signature_cfa}
        onSave={(dataUrl) => update("signature_cfa", dataUrl)}
        color="bg-primary"
      />

      <div className="mt-4 p-4 bg-light-gray rounded">
        <p className="text-xs text-gray-text italic text-center">
          Ce livret d&apos;accueil a ete remis a l&apos;apprenti(e) le jour de son integration au CFA.
          Un exemplaire signe est conserve dans le dossier de l&apos;apprenant(e).
        </p>
      </div>

      <div className="pb-20" />
      <SaveBar />
    </PageSection>
  );
}
