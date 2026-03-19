import { PageSection, SectionBanner, InfoCard, NumberedStep } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={6} title="Reglement interieur">
      <p className="text-dark text-sm">
        Le present reglement interieur s&apos;applique a l&apos;ensemble des apprenants du CFA.
        Il a pour objet de definir les regles de vie en centre de formation.
      </p>

      <SectionBanner title="ASSIDUITE ET PONCTUALITE" color="bg-primary" />
      <InfoCard color="border-primary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>La presence en cours est obligatoire conformement au calendrier de formation</li>
          <li>Toute absence doit etre justifiee dans les 48 heures par un document officiel</li>
          <li>Les retards repetes sont consideres comme un manquement au reglement</li>
          <li>Les absences injustifiees sont signalees a l&apos;employeur et peuvent entrainer des sanctions</li>
          <li>Le CFA transmet mensuellement les relevés d&apos;absences a l&apos;entreprise</li>
        </ul>
      </InfoCard>

      <SectionBanner title="RESPECT ET SAVOIR-VIVRE" color="bg-secondary" />
      <InfoCard color="border-secondary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Adopter un comportement respectueux envers les formateurs, le personnel et les autres apprenants</li>
          <li>Toute forme de violence, harcelement ou discrimination est strictement interdite</li>
          <li>L&apos;utilisation du telephone portable est interdite pendant les cours sauf autorisation du formateur</li>
          <li>Une tenue correcte et adaptee au contexte professionnel est exigee</li>
          <li>Le respect des horaires et des lieux est imperatif</li>
        </ul>
      </InfoCard>

      <SectionBanner title="MATERIEL ET LOCAUX" color="bg-accent" />
      <InfoCard color="border-accent">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Le materiel pedagogique mis a disposition doit etre utilise avec soin</li>
          <li>Toute degradation volontaire fera l&apos;objet d&apos;une demande de reparation financiere</li>
          <li>Les locaux doivent etre maintenus propres et en ordre</li>
          <li>Il est interdit de consommer de la nourriture dans les salles de cours</li>
          <li>L&apos;acces aux locaux est reserve aux horaires de formation sauf autorisation speciale</li>
        </ul>
      </InfoCard>

      <SectionBanner title="FORMATION A DISTANCE" color="bg-green" />
      <InfoCard color="border-green">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Les sessions de formation a distance sont soumises aux memes regles d&apos;assiduite</li>
          <li>L&apos;apprenant(e) doit se connecter a l&apos;heure prevue avec camera et micro actifs si demande</li>
          <li>La participation active aux cours en ligne est obligatoire</li>
          <li>Les travaux a rendre a distance doivent respecter les delais imposes</li>
        </ul>
      </InfoCard>

      <SectionBanner title="HYGIENE ET SECURITE" color="bg-orange" />
      <InfoCard color="border-orange">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Il est interdit de fumer dans l&apos;enceinte du CFA (y compris cigarettes electroniques)</li>
          <li>La consommation d&apos;alcool et de substances illicites est strictement interdite</li>
          <li>Les consignes de securite affichees dans les locaux doivent etre respectees</li>
          <li>Chaque apprenant(e) doit connaitre les issues de secours et les points de rassemblement</li>
          <li>Tout accident, meme mineur, doit etre signale immediatement</li>
        </ul>
      </InfoCard>

      <SectionBanner title="SANCTIONS DISCIPLINAIRES" color="bg-red" />
      <InfoCard color="border-red">
        <p className="text-sm text-dark mb-3">
          En cas de manquement au reglement interieur, les sanctions suivantes peuvent etre appliquees
          de maniere progressive :
        </p>
        <NumberedStep
          num={1}
          title="Avertissement oral"
          description="Rappel a l'ordre verbal par le formateur ou le responsable pedagogique."
          color="bg-orange"
        />
        <NumberedStep
          num={2}
          title="Avertissement ecrit"
          description="Notification ecrite adressee a l'apprenti(e) et a l'employeur, consignee dans le dossier."
          color="bg-orange"
        />
        <NumberedStep
          num={3}
          title="Exclusion temporaire ou definitive"
          description="Mesure d'exclusion pouvant aller jusqu'a la rupture du contrat, prononcee apres passage en conseil de discipline."
          color="bg-red"
        />
      </InfoCard>
    </PageSection>
  );
}
