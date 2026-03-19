import { PageSection, SectionBanner, InfoCard } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={5} title="Engagements des parties">
      <p className="text-dark text-sm">
        La reussite de votre formation repose sur l&apos;engagement de chacun des acteurs :
        le tuteur en entreprise, l&apos;apprenti(e) et le CFA. Voici les engagements respectifs.
      </p>

      <SectionBanner title="ENGAGEMENTS DU TUTEUR / MAITRE D'APPRENTISSAGE" color="bg-accent" />
      <InfoCard color="border-accent">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Accueillir l&apos;apprenti(e) et faciliter son integration dans l&apos;entreprise</li>
          <li>Organiser et planifier le parcours professionnel en lien avec le referentiel de formation</li>
          <li>Confier des missions en adequation avec le diplome ou titre prepare</li>
          <li>Assurer un suivi regulier et evaluer la progression des competences</li>
          <li>Participer aux bilans et aux visites en entreprise avec le CFA</li>
          <li>Communiquer avec le formateur referent en cas de difficulte</li>
          <li>Veiller au respect des conditions de travail et de securite</li>
        </ul>
      </InfoCard>

      <SectionBanner title="ENGAGEMENTS DE L'APPRENTI(E)" color="bg-secondary" />
      <InfoCard color="border-secondary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Etre assidu(e) en centre de formation et en entreprise</li>
          <li>Respecter les regles interieures du CFA et de l&apos;entreprise</li>
          <li>Adopter un comportement professionnel et respectueux</li>
          <li>Realiser les travaux et missions demandes dans les delais impartis</li>
          <li>Tenir a jour le livret de suivi et le dossier professionnel</li>
          <li>Se presenter a toutes les evaluations et examens prevus</li>
          <li>Informer le CFA et l&apos;entreprise en cas d&apos;absence ou de difficulte</li>
        </ul>
      </InfoCard>

      <SectionBanner title="ENGAGEMENTS DU CFA" color="bg-primary" />
      <InfoCard color="border-primary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Dispenser une formation conforme au referentiel du diplome ou titre vise</li>
          <li>Assurer un suivi pedagogique personnalise de chaque apprenti(e)</li>
          <li>Organiser des visites en entreprise et des bilans de progression</li>
          <li>Mettre a disposition les moyens materiels et pedagogiques necessaires</li>
          <li>Accompagner l&apos;apprenti(e) dans la preparation a la certification</li>
          <li>Informer l&apos;entreprise et l&apos;apprenti(e) de toute evolution du parcours</li>
          <li>Proposer un accompagnement adapte en cas de difficulte ou de situation de handicap</li>
        </ul>
      </InfoCard>
    </PageSection>
  );
}
