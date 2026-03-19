import { PageSection, SignatureBlock, AlertBox } from "@/components/ui";

export default function Page() {
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

      <SignatureBlock
        title="L'APPRENTI(E)"
        text="Je soussigne(e) declare avoir pris connaissance du present livret d'accueil, du reglement interieur et des engagements qui me sont propres. Je m'engage a respecter les regles de fonctionnement du CFA et de l'entreprise d'accueil."
        color="bg-secondary"
      />

      <SignatureBlock
        title="LE TUTEUR / MAITRE D'APPRENTISSAGE"
        text="Je soussigne(e) declare avoir pris connaissance du present livret d'accueil et des engagements du tuteur / maitre d'apprentissage. Je m'engage a accompagner l'apprenti(e) dans son parcours professionnel et a assurer un suivi regulier en lien avec le CFA."
        color="bg-accent"
      />

      <SignatureBlock
        title="LE RESPONSABLE DU CFA"
        text="Je soussigne(e), representant le CFA, declare avoir remis le present livret d'accueil a l'apprenti(e) et a son tuteur. Le CFA s'engage a assurer une formation de qualite et un suivi pedagogique personnalise."
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
