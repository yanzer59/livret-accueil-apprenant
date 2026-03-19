import { PageSection, AlertBox } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={1} title="Bienvenue dans votre formation">
      <p className="text-dark">
        Ce livret d&apos;accueil est votre document de reference tout au long de votre parcours en alternance.
        Il vous accompagne dans votre formation, tant sur le plan pedagogique que professionnel, et assure
        un lien regulier entre vous, votre entreprise d&apos;accueil et votre centre de formation.
      </p>
      <p className="text-dark">
        Vous y trouverez toutes les informations essentielles pour bien comprendre le fonctionnement de votre
        contrat d&apos;apprentissage, vos droits et devoirs, les regles de vie a respecter, ainsi que le role
        de chaque acteur implique dans votre reussite.
      </p>
      <AlertBox bg="bg-light-gold" textColor="text-accent">
        Conservez ce livret precieusement et consultez-le regulierement. C&apos;est un outil vivant qui favorise
        l&apos;interaction entre les competences a acquerir en centre de formation et celles a developper en entreprise.
      </AlertBox>
    </PageSection>
  );
}
