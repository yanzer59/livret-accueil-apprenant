import { PageSection, SectionBanner, FieldRow, DoubleFieldRow } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={16} title="Equipe pedagogique et contacts">
      <p className="text-dark text-sm">
        Retrouvez ci-dessous les coordonnees des membres de l&apos;equipe du CFA.
        N&apos;hesitez pas a les contacter en cas de besoin.
      </p>

      <SectionBanner title="DIRECTION" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleFieldRow label1="Nom" label2="Prenom" className="bg-light px-2" />
        <FieldRow label="Fonction" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" className="bg-light px-2" />
      </div>

      <SectionBanner title="RESPONSABLE PEDAGOGIQUE" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleFieldRow label1="Nom" label2="Prenom" className="bg-light px-2" />
        <FieldRow label="Fonction" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" className="bg-light px-2" />
      </div>

      <SectionBanner title="RESPONSABLE QUALITE" color="bg-accent" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleFieldRow label1="Nom" label2="Prenom" className="bg-light-gold px-2" />
        <FieldRow label="Fonction" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" className="bg-light-gold px-2" />
      </div>

      <SectionBanner title="FORMATEUR REFERENT" color="bg-green" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleFieldRow label1="Nom" label2="Prenom" className="bg-green/5 px-2" />
        <FieldRow label="Matiere / Domaine" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" className="bg-green/5 px-2" />
        <FieldRow label="Jours de disponibilite" />
      </div>

      <SectionBanner title="CONTACTS UTILES DU CFA" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4">
        <FieldRow label="Accueil / Secretariat" className="bg-light px-2" />
        <FieldRow label="Telephone standard" />
        <FieldRow label="E-mail general" className="bg-light px-2" />
        <FieldRow label="Adresse du CFA" />
        <FieldRow label="Horaires d'ouverture" className="bg-light px-2" />
        <FieldRow label="Referent handicap" />
        <FieldRow label="Referent mobilite" className="bg-light px-2" />
        <FieldRow label="Mediateur" />
      </div>
    </PageSection>
  );
}
