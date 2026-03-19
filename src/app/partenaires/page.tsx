import { PageSection, SectionBanner, DataTable, InfoCard } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={10} title="Partenaires et organismes utiles">
      <p className="text-dark text-sm">
        Retrouvez ci-dessous les coordonnees des organismes et partenaires susceptibles
        de vous accompagner tout au long de votre parcours en alternance.
      </p>

      <SectionBanner title="ORGANISMES ET SERVICES" color="bg-primary" />

      <DataTable
        headers={["Organisme", "Role / Services", "Contact"]}
        headerBg="bg-primary"
        rows={[
          [
            "OPCO (Operateur de competences)",
            "Financement du contrat d'apprentissage et conseil aux entreprises",
            "Selon la branche professionnelle de l'entreprise",
          ],
          [
            "DREETS (ex-DIRECCTE)",
            "Controle du respect de la reglementation du travail et de l'apprentissage",
            "dreets.gouv.fr",
          ],
          [
            "Mission locale",
            "Accompagnement des jeunes dans l'emploi, le logement, la sante",
            "mission-locale.fr",
          ],
          [
            "CAF (Caisse d'Allocations Familiales)",
            "Aides au logement (APL / ALS) et prestations sociales",
            "caf.fr",
          ],
          [
            "Action Logement",
            "Aides au logement (Mobili-Jeune, VISALE, prets)",
            "actionlogement.fr",
          ],
          [
            "Pole emploi / France Travail",
            "Accompagnement a l'emploi et conseil en evolution professionnelle",
            "francetravail.fr",
          ],
        ]}
      />

      <SectionBanner title="PARTENAIRES HANDICAP" color="bg-secondary" />

      <DataTable
        headers={["Organisme", "Role / Services", "Contact"]}
        headerBg="bg-secondary"
        rows={[
          [
            "AGEFIPH",
            "Aides financieres et accompagnement pour les travailleurs handicapes du secteur prive",
            "agefiph.fr",
          ],
          [
            "MDPH",
            "Reconnaissance du handicap (RQTH), orientation et aides",
            "mdph.fr ou votre maison departementale",
          ],
          [
            "Cap Emploi",
            "Accompagnement vers et dans l'emploi des personnes en situation de handicap",
            "capemploi.net",
          ],
          [
            "Ressource Handicap Formation",
            "Appui aux CFA pour l'accompagnement des apprentis en situation de handicap",
            "agefiph.fr/ressource-handicap-formation",
          ],
        ]}
      />

      <InfoCard color="border-primary">
        <p className="text-sm text-dark">
          <span className="font-bold text-primary">Besoin d&apos;aide ?</span> Votre formateur referent
          et le secretariat du CFA sont a votre disposition pour vous orienter vers le bon interlocuteur.
        </p>
      </InfoCard>
    </PageSection>
  );
}
