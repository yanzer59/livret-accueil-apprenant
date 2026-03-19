import { PageSection, SectionBanner, InfoCard, AlertBox } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={12} title="Droit a l'image">
      <p className="text-dark text-sm">
        Conformement aux dispositions du Code civil (articles 9 et 226-1) et au Reglement
        General sur la Protection des Donnees (RGPD), le CFA recueille votre autorisation
        pour l&apos;utilisation de votre image.
      </p>

      <SectionBanner title="OBJET DE L'AUTORISATION" color="bg-primary" />
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
        <div className="flex items-start gap-3 p-4 bg-green/5 rounded border border-green/20">
          <div className="w-6 h-6 border-2 border-green rounded flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-green text-xs font-bold">&nbsp;</span>
          </div>
          <p className="text-sm text-dark">
            <span className="font-bold text-green">J&apos;ACCORDE</span> au CFA le droit d&apos;utiliser
            mon image (photographies, videos) dans le cadre decrit ci-dessus, pour la duree
            de ma formation et les deux annees suivantes.
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 bg-red/5 rounded border border-red/20">
          <div className="w-6 h-6 border-2 border-red rounded flex items-center justify-center shrink-0 mt-0.5">
            <span className="text-red text-xs font-bold">&nbsp;</span>
          </div>
          <p className="text-sm text-dark">
            <span className="font-bold text-red">JE N&apos;ACCORDE PAS</span> au CFA le droit d&apos;utiliser
            mon image. Je demande a ne pas apparaitre sur les supports de communication du CFA.
          </p>
        </div>
      </div>

      <AlertBox bg="bg-light" textColor="text-primary">
        Cette autorisation est revocable a tout moment par courrier ou e-mail adresse
        a la direction du CFA. En cas de revocation, les images deja diffusees seront
        retirees dans un delai raisonnable.
      </AlertBox>

      <div className="border border-gray-200 p-4 mt-2">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="font-bold text-primary text-sm mb-1">Date :</p>
            <span className="block border-b border-gray-300 h-6 w-full"></span>
          </div>
          <div>
            <p className="font-bold text-primary text-sm mb-1">Signature de l&apos;apprenant(e) :</p>
            <div className="h-20 border border-dashed border-gray-300 rounded"></div>
          </div>
        </div>
        <p className="text-xs text-gray-text mt-4 italic">
          Pour les apprenants mineurs, la signature du representant legal est obligatoire.
        </p>
      </div>
    </PageSection>
  );
}
