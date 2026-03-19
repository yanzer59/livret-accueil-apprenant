import Image from "next/image";
import { PageSection, SectionBanner, TimelineStep, DataTable, InfoCard } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={4} title="Parcours de formation">
      <p className="text-dark text-sm">
        Votre formation en alternance suit un parcours structure, articule entre periodes en centre
        de formation et periodes en entreprise. Voici les grandes etapes de votre parcours.
      </p>

      <SectionBanner title="LES ETAPES DE VOTRE PARCOURS" color="bg-primary" />

      <TimelineStep
        num={1}
        title="Accueil et positionnement"
        description="Entretien individuel, evaluation des acquis, definition des objectifs personnalises et signature du contrat pedagogique."
        color="bg-primary"
      />
      <TimelineStep
        num={2}
        title="Integration en entreprise"
        description="Decouverte de l'entreprise, presentation au tuteur / maitre d'apprentissage, prise de poste et premiers objectifs."
        color="bg-secondary"
      />
      <TimelineStep
        num={3}
        title="Formation en centre (CFA)"
        description="Acquisition des competences theoriques et pratiques conformement au referentiel du diplome ou titre vise."
        color="bg-primary"
      />
      <TimelineStep
        num={4}
        title="Mise en pratique en entreprise"
        description="Application des connaissances acquises en centre, realisation de missions professionnelles et developpement de l'autonomie."
        color="bg-secondary"
      />
      <TimelineStep
        num={5}
        title="Suivi et evaluations continues"
        description="Evaluations en cours de formation (ECF), bilans reguliers avec le tuteur et le formateur referent."
        color="bg-primary"
      />
      <TimelineStep
        num={6}
        title="Visites en entreprise"
        description="Rencontres entre le formateur referent et le tuteur pour evaluer la progression et ajuster le parcours si necessaire."
        color="bg-secondary"
      />
      <TimelineStep
        num={7}
        title="Preparation a la certification"
        description="Revisions, entrainements aux epreuves, constitution du dossier professionnel et preparation a l'examen final."
        color="bg-primary"
      />
      <TimelineStep
        num={8}
        title="Certification et bilan final"
        description="Passage de l'examen, obtention du diplome ou titre professionnel, bilan de fin de parcours et perspectives."
        color="bg-green"
      />

      <SectionBanner title="CALENDRIER DES VISITES EN ENTREPRISE" color="bg-secondary" />

      <DataTable
        headers={["Visite", "Periode prevue", "Objectif", "Realise le"]}
        headerBg="bg-secondary"
        rows={[
          ["Visite 1", "1er trimestre", "Integration et adaptation au poste", ""],
          ["Visite 2", "2e trimestre", "Suivi de progression et ajustements", ""],
          ["Visite 3", "3e trimestre", "Bilan intermediaire des competences", ""],
          ["Visite 4", "4e trimestre", "Preparation a la certification", ""],
        ]}
      />

      <InfoCard color="border-primary">
        <p className="text-sm text-dark">
          <span className="font-bold text-primary">Schema du parcours de formation :</span>
        </p>
      </InfoCard>

      <div className="flex justify-center my-4">
        <Image
          src="/images/schema_timeline.png"
          alt="Schema du parcours de formation en alternance"
          width={800}
          height={400}
          className="rounded shadow-md"
        />
      </div>
    </PageSection>
  );
}
