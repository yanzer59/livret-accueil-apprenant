import { PageSection, SectionBanner, InfoCard } from "@/components/ui";
import { SchemaTimeline, SchemaActeurs } from "@/components/schemas";

export default function Page() {
  return (
    <PageSection num={14} title="Charte de l'alternance">
      <p className="text-dark text-sm">
        La charte de l&apos;alternance rappelle l&apos;organisation du parcours de formation
        et le role de chaque acteur implique dans la reussite de l&apos;apprenti(e).
      </p>

      <SectionBanner title="ORGANISATION DU PARCOURS" color="bg-primary" />
      <InfoCard color="border-primary">
        <p className="text-sm text-dark">
          Le parcours en alternance repose sur une articulation entre les periodes en centre
          de formation (CFA) et les periodes en entreprise. Ce rythme permet d&apos;acquerir
          les competences theoriques et pratiques necessaires a l&apos;obtention de la certification.
        </p>
      </InfoCard>

      <SchemaTimeline />

      <SectionBanner title="LES ACTEURS DE VOTRE REUSSITE" color="bg-secondary" />
      <InfoCard color="border-secondary">
        <p className="text-sm text-dark">
          Plusieurs acteurs interviennent dans votre parcours et travaillent ensemble
          pour garantir la qualite de votre formation :
        </p>
        <ul className="list-disc list-inside text-sm text-dark space-y-1 mt-2">
          <li><span className="font-bold">L&apos;apprenti(e) :</span> acteur principal de sa formation, il/elle s&apos;engage a etre assidu(e) et a progresser</li>
          <li><span className="font-bold">Le maitre d&apos;apprentissage / tuteur :</span> accompagne l&apos;apprenti(e) en entreprise et transmet son savoir-faire</li>
          <li><span className="font-bold">Le formateur referent :</span> assure le suivi pedagogique et fait le lien entre le CFA et l&apos;entreprise</li>
          <li><span className="font-bold">Le responsable pedagogique :</span> coordonne l&apos;ensemble du dispositif de formation</li>
          <li><span className="font-bold">La direction du CFA :</span> garantit les moyens et la qualite de la formation</li>
        </ul>
      </InfoCard>

      <SchemaActeurs />

      <InfoCard color="border-accent">
        <p className="text-sm text-dark">
          <span className="font-bold text-accent">Engagement commun :</span> La reussite de l&apos;alternance
          repose sur la collaboration etroite entre l&apos;ensemble de ces acteurs. Chacun s&apos;engage
          a communiquer regulierement et a participer activement au suivi du parcours.
        </p>
      </InfoCard>
    </PageSection>
  );
}
