import { PageSection, SectionBanner, FieldRow, DoubleFieldRow } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={2} title="Fiche de renseignements">
      <p className="text-sm text-gray-text mb-4">Merci de completer soigneusement toutes les informations ci-dessous.</p>

      <SectionBanner title="APPRENANT(E)" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleFieldRow label1="Nom" label2="Prenom" className="bg-light px-2" />
        <FieldRow label="Date de naissance" />
        <FieldRow label="Adresse complete" className="bg-light px-2" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" />
        <FieldRow label="Formation preparee" className="bg-light px-2" />
        <FieldRow label="Diplome / Titre vise (RNCP)" />
      </div>

      <SectionBanner title="EN CAS D'URGENCE" color="bg-red" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <FieldRow label="Personne a contacter" className="bg-red/5 px-2" />
        <DoubleFieldRow label1="Telephone 1" label2="Telephone 2" />
        <FieldRow label="Informations medicales" className="bg-red/5 px-2" />
        <FieldRow label="(allergies, traitements en cours...)" />
      </div>

      <SectionBanner title="ENTREPRISE D'ACCUEIL" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <FieldRow label="Raison sociale" className="bg-light px-2" />
        <FieldRow label="Adresse" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" className="bg-light px-2" />
        <FieldRow label="Activite / Secteur" />
        <DoubleFieldRow label1="Debut du contrat" label2="Fin du contrat" className="bg-light px-2" />
      </div>

      <SectionBanner title="MAITRE D'APPRENTISSAGE / TUTEUR" color="bg-accent" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleFieldRow label1="Nom" label2="Prenom" className="bg-light-gold px-2" />
        <FieldRow label="Poste occupe" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" className="bg-light-gold px-2" />
      </div>

      <SectionBanner title="RESPONSABLE(S) LEGAL(AUX) - si apprenant(e) mineur(e)" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4">
        <p className="font-bold text-secondary text-sm mb-2 bg-light p-2 rounded">Responsable legal 1</p>
        <DoubleFieldRow label1="Nom" label2="Prenom" />
        <FieldRow label="Adresse" className="bg-light px-2" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" />

        <p className="font-bold text-secondary text-sm mb-2 mt-4 bg-light p-2 rounded">Responsable legal 2</p>
        <DoubleFieldRow label1="Nom" label2="Prenom" className="bg-light-gold px-2" />
        <FieldRow label="Adresse" />
        <DoubleFieldRow label1="Telephone" label2="E-mail" className="bg-light-gold px-2" />
      </div>
    </PageSection>
  );
}
