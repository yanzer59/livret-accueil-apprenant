import { PageSection, SectionBanner, InfoCard, FieldRow, AlertBox } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={8} title="Accompagnement handicap">
      <p className="text-dark text-sm">
        Le CFA s&apos;engage a accueillir et accompagner les personnes en situation de handicap
        tout au long de leur parcours de formation, conformement a la loi du 11 fevrier 2005.
      </p>

      <SectionBanner title="DISPOSITIFS D'ACCOMPAGNEMENT" color="bg-primary" />
      <InfoCard color="border-primary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Entretien individuel pour identifier les besoins specifiques de l&apos;apprenant(e)</li>
          <li>Amenagement des conditions d&apos;examen (tiers-temps, secretaire, materiel adapte)</li>
          <li>Adaptation des supports pedagogiques et des modalites d&apos;evaluation</li>
          <li>Accessibilite des locaux et des equipements de formation</li>
          <li>Accompagnement personnalise par le referent handicap du CFA</li>
          <li>Orientation vers les organismes specialises (AGEFIPH, MDPH, Cap Emploi)</li>
          <li>Suivi regulier et ajustement des amenagements tout au long du parcours</li>
          <li>Sensibilisation des equipes pedagogiques aux besoins specifiques</li>
        </ul>
      </InfoCard>

      <AlertBox bg="bg-light" textColor="text-primary">
        N&apos;hesitez pas a vous signaler aupres du referent handicap des le debut de votre formation.
        Toutes les informations communiquees restent strictement confidentielles et ne sont utilisees
        que dans le but de faciliter votre parcours.
      </AlertBox>

      <SectionBanner title="REFERENT HANDICAP DU CFA" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4">
        <FieldRow label="Nom et prenom" className="bg-light px-2" />
        <FieldRow label="Fonction" />
        <FieldRow label="Telephone" className="bg-light px-2" />
        <FieldRow label="E-mail" />
        <FieldRow label="Jours et horaires de disponibilite" className="bg-light px-2" />
      </div>
    </PageSection>
  );
}
