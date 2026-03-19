"use client";
import { useStudent } from "@/lib/StudentContext";
import { PageSection, SectionBanner, InfoCard, AlertBox } from "@/components/ui";
import SaveBar from "@/components/SaveBar";

export default function Page() {
  const { data, loading, update } = useStudent();
  const choice = (data.droit_image as string) || "";

  if (loading) {
    return (
      <PageSection num={12} title="Droit a l&apos;image">
        <p className="text-sm text-gray-500 text-center py-8">Chargement...</p>
      </PageSection>
    );
  }

  return (
    <PageSection num={12} title="Droit a l&apos;image">
      <p className="text-dark text-sm">
        Conformement aux dispositions du Code civil (articles 9 et 226-1) et au Reglement
        General sur la Protection des Donnees (RGPD), le CFA recueille votre autorisation
        pour l&apos;utilisation de votre image.
      </p>

      <SectionBanner title="OBJET DE L&apos;AUTORISATION" color="bg-primary" />
      <InfoCard color="border-primary">
        <p className="text-sm text-dark">
          Dans le cadre de la promotion de ses activites et de la valorisation des parcours
          de formation, le CFA est amene a photographier ou filmer les apprenants lors
          d&apos;activites pedagogiques, d&apos;evenements, de ceremonies de remise de diplomes
          ou d&apos;actions de communication.
        </p>
        <p className="text-sm text-dark mt-2">
          Ces images peuvent etre diffusees sur les supports suivants :
        </p>
        <ul className="list-disc list-inside text-sm text-dark space-y-1 mt-2">
          <li>Site internet du CFA et reseaux sociaux</li>
          <li>Plaquettes, brochures et supports de communication imprimes</li>
          <li>Rapports d&apos;activite et presentations institutionnelles</li>
          <li>Affichage dans les locaux du CFA</li>
        </ul>
      </InfoCard>

      <SectionBanner title="VOTRE CHOIX" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-5 space-y-4">
        {/* J'ACCORDE */}
        <button
          type="button"
          onClick={() => update("droit_image", "accorde")}
          className={`w-full flex items-start gap-3 p-4 rounded border-2 text-left transition-all ${
            choice === "accorde"
              ? "bg-green/10 border-green ring-2 ring-green/30"
              : "bg-green/5 border-green/20 hover:border-green/50"
          }`}
        >
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            choice === "accorde" ? "border-green bg-green" : "border-green"
          }`}>
            {choice === "accorde" && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p className="text-sm text-dark">
            <span className="font-bold text-green">J&apos;ACCORDE</span> au CFA le droit d&apos;utiliser
            mon image (photographies, videos) dans le cadre decrit ci-dessus, pour la duree
            de ma formation et les deux annees suivantes.
          </p>
        </button>

        {/* JE N'ACCORDE PAS */}
        <button
          type="button"
          onClick={() => update("droit_image", "refuse")}
          className={`w-full flex items-start gap-3 p-4 rounded border-2 text-left transition-all ${
            choice === "refuse"
              ? "bg-red/10 border-red ring-2 ring-red/30"
              : "bg-red/5 border-red/20 hover:border-red/50"
          }`}
        >
          <div className={`w-6 h-6 border-2 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
            choice === "refuse" ? "border-red bg-red" : "border-red"
          }`}>
            {choice === "refuse" && (
              <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <p className="text-sm text-dark">
            <span className="font-bold text-red">JE N&apos;ACCORDE PAS</span> au CFA le droit d&apos;utiliser
            mon image. Je demande a ne pas apparaitre sur les supports de communication du CFA.
          </p>
        </button>
      </div>

      <AlertBox bg="bg-light" textColor="text-primary">
        Cette autorisation est revocable a tout moment par courrier ou e-mail adresse
        a la direction du CFA. En cas de revocation, les images deja diffusees seront
        retirees dans un delai raisonnable.
      </AlertBox>

      <div className="border border-gray-200 p-4 mt-2">
        <p className="text-xs text-gray-text italic text-center">
          Pour les apprenants mineurs, la signature du representant legal est obligatoire.
        </p>
      </div>

      <div className="pb-20" />
      <SaveBar requiredFields={[
        { name: "droit_image", label: "Choix droit a l'image" },
      ]} />
    </PageSection>
  );
}
