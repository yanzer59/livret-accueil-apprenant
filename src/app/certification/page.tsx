import Image from "next/image";
import { PageSection, SectionBanner, InfoCard, AlertBox } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={7} title="Certification et examen">
      <p className="text-dark text-sm">
        Votre formation vise l&apos;obtention d&apos;un diplome ou titre professionnel inscrit au RNCP.
        Voici les modalites d&apos;evaluation et de certification.
      </p>

      <SectionBanner title="MODALITES D'EVALUATION" color="bg-primary" />
      <InfoCard color="border-primary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Evaluations en cours de formation (ECF) tout au long du parcours</li>
          <li>Mises en situation professionnelle evaluees en centre et en entreprise</li>
          <li>Constitution et presentation du dossier professionnel (DP)</li>
          <li>Controle continu des connaissances et des competences</li>
          <li>Evaluation des periodes en entreprise par le tuteur</li>
        </ul>
      </InfoCard>

      <SectionBanner title="EXAMEN FINAL" color="bg-secondary" />
      <InfoCard color="border-secondary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>L&apos;examen final est organise conformement au referentiel de certification</li>
          <li>Il se compose d&apos;epreuves ecrites, orales et/ou pratiques selon le titre vise</li>
          <li>Le jury est compose de professionnels du secteur et de formateurs habilites</li>
          <li>La convocation a l&apos;examen est transmise par le CFA ou l&apos;organisme certificateur</li>
          <li>La presence a toutes les epreuves est obligatoire sous peine d&apos;elimination</li>
        </ul>
      </InfoCard>

      <AlertBox bg="bg-green/10" textColor="text-green">
        <p className="font-bold mb-1">En cas de reussite</p>
        <p>
          Le diplome ou titre professionnel vous est delivre par l&apos;organisme certificateur.
          Vous recevez une attestation de reussite puis le parchemin officiel dans un delai
          de plusieurs mois. Le CFA vous accompagne dans les demarches post-certification.
        </p>
      </AlertBox>

      <AlertBox bg="bg-orange/10" textColor="text-orange">
        <p className="font-bold mb-1">En cas d&apos;echec</p>
        <p>
          Vous conservez le benefice des blocs de competences valides pendant 5 ans.
          Vous pouvez vous representer a une session ulterieure pour valider les blocs
          manquants. Le CFA vous conseille sur les possibilites de rattrapage ou de
          prolongation du contrat.
        </p>
      </AlertBox>

      <AlertBox bg="bg-red/10" textColor="text-red">
        <p className="font-bold mb-1">En cas de fraude</p>
        <p>
          Toute tentative de fraude ou de plagiat lors des evaluations ou de l&apos;examen
          final entraine l&apos;annulation de l&apos;epreuve concernee. Des sanctions complementaires
          peuvent etre prononcees pouvant aller jusqu&apos;a l&apos;interdiction de se presenter
          a l&apos;examen pendant plusieurs annees.
        </p>
      </AlertBox>

      <SectionBanner title="SCHEMA DE LA CERTIFICATION" color="bg-primary" />
      <div className="flex justify-center my-4">
        <Image
          src="/images/schema_certification.png"
          alt="Schema du processus de certification"
          width={800}
          height={400}
          className="rounded shadow-md"
        />
      </div>
    </PageSection>
  );
}
