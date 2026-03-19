import { PageSection, SectionBanner, DataTable, AlertBox } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={9} title="Aides financieres et sociales">
      <p className="text-dark text-sm">
        En tant qu&apos;apprenti(e), vous pouvez beneficier de nombreuses aides financieres
        et sociales pour faciliter votre quotidien pendant votre formation.
      </p>

      <SectionBanner title="AIDES AU LOGEMENT" color="bg-primary" />

      <DataTable
        headers={["Dispositif", "Description", "Conditions / Demarches"]}
        headerBg="bg-primary"
        rows={[
          [
            "APL / ALS (CAF)",
            "Aide au logement versee mensuellement pour reduire le montant du loyer",
            "Faire une demande sur caf.fr des l'entree dans le logement",
          ],
          [
            "Mobili-Jeune",
            "Aide d'Action Logement pour les moins de 30 ans en alternance (jusqu'a 100\u20AC/mois)",
            "Demande sur actionlogement.fr dans les 6 mois suivant le debut du bail",
          ],
          [
            "Garantie VISALE",
            "Caution locative gratuite proposee par Action Logement",
            "Demande sur visale.fr avant la signature du bail",
          ],
          [
            "Aide au 1er equipement",
            "Aide pour l'achat du premier equipement professionnel",
            "Se renseigner aupres du CFA",
          ],
        ]}
      />

      <SectionBanner title="AUTRES AIDES" color="bg-secondary" />

      <DataTable
        headers={["Dispositif", "Description", "Conditions / Demarches"]}
        headerBg="bg-secondary"
        rows={[
          [
            "Aide au permis de conduire",
            "Aide de 500\u20AC pour le passage du permis B (apprentis de 18 ans et plus)",
            "Demande a effectuer aupres du CFA avec devis ou facture",
          ],
          [
            "Carte etudiant des metiers",
            "Avantages lies au statut etudiant (transports, restauration, culture)",
            "Delivree automatiquement par le CFA",
          ],
          [
            "Aide regionale au transport",
            "Prise en charge partielle des frais de transport domicile-CFA",
            "Consulter le site de votre region pour les modalites",
          ],
          [
            "Aide a la restauration",
            "Acces a la restauration collective a tarif reduit",
            "Se renseigner aupres du CFA",
          ],
          [
            "Fonds social d'aide aux apprentis",
            "Aide ponctuelle en cas de difficulte financiere",
            "Demande confidentielle aupres du CFA",
          ],
        ]}
      />

      <AlertBox bg="bg-light-gold" textColor="text-accent">
        Pour toute question relative aux aides, n&apos;hesitez pas a contacter le secretariat
        du CFA ou votre formateur referent qui pourra vous orienter dans vos demarches.
      </AlertBox>
    </PageSection>
  );
}
