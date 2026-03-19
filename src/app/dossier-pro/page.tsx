import Image from "next/image";
import { PageSection, SectionBanner, InfoCard, AlertBox } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={15} title="Dossier professionnel et documents complementaires">
      <p className="text-dark text-sm">
        Le dossier professionnel (DP) est un element essentiel de votre parcours de certification.
        Il constitue une preuve de vos competences acquises en formation et en entreprise.
      </p>

      <SectionBanner title="LE DOSSIER PROFESSIONNEL (DP)" color="bg-primary" />
      <InfoCard color="border-primary">
        <p className="text-sm text-dark mb-2">
          Le dossier professionnel est un document officiel dans lequel vous decrivez
          les activites et competences professionnelles acquises tout au long de votre parcours.
          Il sera presente au jury lors de l&apos;examen final.
        </p>
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Il est redige tout au long de la formation, en centre et en entreprise</li>
          <li>Il reprend les activites-types du referentiel de certification</li>
          <li>Chaque activite doit etre illustree par des exemples concrets issus de votre experience</li>
          <li>Il doit etre complet, soigne et conforme au modele officiel</li>
          <li>Votre formateur referent vous accompagne dans sa redaction</li>
        </ul>
      </InfoCard>

      <AlertBox bg="bg-light-gold" textColor="text-accent">
        Commencez la redaction de votre dossier professionnel des le debut de votre formation.
        N&apos;attendez pas les dernieres semaines avant l&apos;examen pour le completer.
      </AlertBox>

      <SectionBanner title="EVALUATIONS EN COURS DE FORMATION (ECF)" color="bg-secondary" />
      <InfoCard color="border-secondary">
        <p className="text-sm text-dark mb-2">
          Les ECF sont des evaluations realisees tout au long de votre parcours qui contribuent
          a la validation de vos competences.
        </p>
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Elles portent sur les competences definies dans le referentiel</li>
          <li>Elles peuvent prendre la forme d&apos;epreuves ecrites, orales ou de mises en situation</li>
          <li>Les resultats sont consignes et transmis au jury de certification</li>
          <li>Les ECF non realisees ou non validees peuvent compromettre l&apos;obtention du diplome</li>
        </ul>
      </InfoCard>

      <SectionBanner title="SCHEMA DU PROCESSUS DE CERTIFICATION" color="bg-primary" />
      <div className="flex justify-center my-4">
        <Image
          src="/images/schema_certification.png"
          alt="Schema du processus de certification"
          width={800}
          height={400}
          className="rounded shadow-md"
        />
      </div>

      <SectionBanner title="DOCUMENTS COMPLEMENTAIRES" color="bg-accent" />
      <InfoCard color="border-accent">
        <p className="text-sm text-dark mb-2">
          En plus du dossier professionnel, les documents suivants peuvent etre requis
          selon votre formation :
        </p>
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Attestations de formation et certificats de competences</li>
          <li>Fiches d&apos;evaluation des periodes en entreprise</li>
          <li>Comptes rendus de visites en entreprise</li>
          <li>Attestation de secourisme (SST) si requise par le referentiel</li>
          <li>Rapport de stage ou memoire professionnel selon la certification</li>
          <li>Livret de suivi en entreprise complete et signe</li>
          <li>Photocopie de la piece d&apos;identite et du contrat d&apos;apprentissage</li>
        </ul>
      </InfoCard>

      <AlertBox bg="bg-light" textColor="text-primary">
        Conservez tous ces documents dans un classeur dedie. Ils seront indispensables
        le jour de l&apos;examen. Votre formateur referent vous indiquera la liste exacte
        des pieces a fournir selon votre certification.
      </AlertBox>
    </PageSection>
  );
}
