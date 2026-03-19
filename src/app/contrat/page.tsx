import { PageSection, SectionBanner, DataTable, InfoCard } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={3} title="Droits et devoirs de l'apprenti(e)">
      <p className="text-dark text-sm">
        Le contrat d&apos;apprentissage est un contrat de travail a part entiere.
        Il implique des droits et des devoirs pour l&apos;apprenti(e), tant en centre
        de formation qu&apos;en entreprise.
      </p>

      <SectionBanner title="VOS DROITS ET DEVOIRS" color="bg-primary" />

      <DataTable
        headers={["Vos droits", "Vos devoirs"]}
        headerBg="bg-primary"
        rows={[
          [
            "Beneficier d\u2019une formation theorique et pratique conforme au referentiel du diplome",
            "Respecter les regles de fonctionnement du CFA et de l\u2019entreprise",
          ],
          [
            "Percevoir une remuneration selon les dispositions legales en vigueur",
            "Etre assidu(e) en cours et en entreprise et justifier toute absence",
          ],
          [
            "Beneficier des memes droits que les autres salaries (conges payes, protection sociale)",
            "Adopter un comportement professionnel et respectueux envers tous les acteurs",
          ],
          [
            "Etre accompagne(e) par un maitre d\u2019apprentissage et un formateur referent",
            "Effectuer les travaux et missions confies par l\u2019entreprise et le CFA",
          ],
          [
            "Acceder aux dispositifs d\u2019aide (logement, transport, restauration)",
            "Se presenter aux examens et evaluations prevus dans le parcours de formation",
          ],
        ]}
      />

      <InfoCard color="border-accent">
        <p className="text-sm text-dark">
          <span className="font-bold text-accent">Rappel :</span> Le non-respect de ces obligations peut
          entrainer des sanctions disciplinaires pouvant aller jusqu&apos;a la rupture du contrat
          d&apos;apprentissage.
        </p>
      </InfoCard>
    </PageSection>
  );
}
