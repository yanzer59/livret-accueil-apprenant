import { PageSection, SectionBanner, InfoCard, AlertBox } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={13} title="Protection des donnees personnelles (RGPD)">
      <p className="text-dark text-sm">
        Conformement au Reglement General sur la Protection des Donnees (RGPD - Reglement UE 2016/679)
        et a la loi Informatique et Libertes, le CFA s&apos;engage a proteger vos donnees personnelles.
      </p>

      <SectionBanner title="COLLECTE ET TRAITEMENT DES DONNEES" color="bg-primary" />
      <InfoCard color="border-primary">
        <p className="text-sm text-dark">
          Dans le cadre de votre formation, le CFA collecte et traite des donnees personnelles
          vous concernant (identite, coordonnees, parcours scolaire, informations professionnelles).
          Ces donnees sont necessaires a :
        </p>
        <ul className="list-disc list-inside text-sm text-dark space-y-1 mt-2">
          <li>La gestion administrative de votre dossier de formation</li>
          <li>Le suivi pedagogique de votre parcours</li>
          <li>La communication avec votre entreprise d&apos;accueil</li>
          <li>La transmission obligatoire aux organismes publics (OPCO, DREETS, organisme certificateur)</li>
          <li>L&apos;etablissement de statistiques anonymisees sur les parcours de formation</li>
        </ul>
      </InfoCard>

      <SectionBanner title="VOS DROITS" color="bg-secondary" />

      <InfoCard color="border-secondary">
        <p className="font-bold text-secondary text-sm mb-2">Droit d&apos;acces</p>
        <p className="text-sm text-dark">
          Vous pouvez a tout moment demander a consulter l&apos;ensemble des donnees personnelles
          vous concernant detenues par le CFA. Une reponse vous sera apportee dans un delai
          maximum de 30 jours.
        </p>
      </InfoCard>

      <InfoCard color="border-secondary">
        <p className="font-bold text-secondary text-sm mb-2">Droit de rectification</p>
        <p className="text-sm text-dark">
          Si vous constatez que des informations vous concernant sont inexactes ou incompletes,
          vous pouvez demander leur correction. Le CFA procedera a la mise a jour dans les
          meilleurs delais.
        </p>
      </InfoCard>

      <InfoCard color="border-secondary">
        <p className="font-bold text-secondary text-sm mb-2">Droit d&apos;opposition</p>
        <p className="text-sm text-dark">
          Vous disposez d&apos;un droit d&apos;opposition au traitement de vos donnees pour des motifs
          legitimes, sauf lorsque le traitement repond a une obligation legale. Vous pouvez
          egalement vous opposer a l&apos;utilisation de vos donnees a des fins de prospection.
        </p>
      </InfoCard>

      <AlertBox bg="bg-light-gold" textColor="text-accent">
        Pour exercer vos droits, adressez votre demande par courrier ou par e-mail au
        responsable du traitement des donnees du CFA. En cas de difficulte, vous pouvez
        saisir la CNIL (Commission Nationale de l&apos;Informatique et des Libertes) sur cnil.fr.
      </AlertBox>

      <InfoCard color="border-primary">
        <p className="text-sm text-dark">
          <span className="font-bold text-primary">Duree de conservation :</span> Vos donnees personnelles
          sont conservees pendant la duree de votre formation, puis archivees conformement
          aux obligations legales (5 ans apres la fin du contrat pour les documents administratifs).
        </p>
      </InfoCard>
    </PageSection>
  );
}
