import { PageSection, SectionBanner, FieldRow, DoubleFieldRow, SignatureBlock } from "@/components/ui";

export default function Page() {
  return (
    <PageSection num={17} title="Fiche de liaison entreprise - CFA">
      <p className="text-dark text-sm">
        Cette fiche de liaison permet d&apos;assurer le suivi de l&apos;apprenti(e) entre le CFA
        et l&apos;entreprise d&apos;accueil. Elle est completee lors des visites en entreprise
        et des bilans de progression.
      </p>

      <SectionBanner title="IDENTIFICATION" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleFieldRow label1="Apprenti(e)" label2="Formation" className="bg-light px-2" />
        <DoubleFieldRow label1="Entreprise" label2="Tuteur" />
        <DoubleFieldRow label1="Formateur referent" label2="Date de la visite" className="bg-light px-2" />
      </div>

      <SectionBanner title="MISSIONS CONFIEES EN ENTREPRISE" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <FieldRow label="Mission principale" className="bg-light px-2" />
        <FieldRow label="Activites realisees" />
        <FieldRow label="Outils / logiciels utilises" className="bg-light px-2" />
        <FieldRow label="Niveau d'autonomie" />
        <FieldRow label="Difficultes rencontrees" className="bg-light px-2" />
      </div>

      <SectionBanner title="COMPETENCES EVALUEES" color="bg-accent" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <FieldRow label="Competences techniques" className="bg-light-gold px-2" />
        <FieldRow label="Competences relationnelles" />
        <FieldRow label="Competences organisationnelles" className="bg-light-gold px-2" />
        <FieldRow label="Points forts observes" />
        <FieldRow label="Axes d'amelioration" className="bg-light-gold px-2" />
      </div>

      <SectionBanner title="OBSERVATIONS ET OBJECTIFS" color="bg-green" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <FieldRow label="Observations du tuteur" className="bg-green/5 px-2" />
        <FieldRow label="Observations du formateur" />
        <FieldRow label="Observations de l'apprenti(e)" className="bg-green/5 px-2" />
        <FieldRow label="Objectifs pour la prochaine periode" />
        <FieldRow label="Actions correctives envisagees" className="bg-green/5 px-2" />
      </div>

      <SectionBanner title="SIGNATURES" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-5">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="font-bold text-primary text-sm mb-2">L&apos;apprenti(e)</p>
            <p className="text-xs text-gray-text mb-1">Date :</p>
            <span className="block border-b border-gray-300 h-5 w-full mb-3"></span>
            <p className="text-xs text-gray-text mb-1">Signature :</p>
            <div className="h-16 border border-dashed border-gray-300 rounded"></div>
          </div>
          <div>
            <p className="font-bold text-primary text-sm mb-2">Le tuteur</p>
            <p className="text-xs text-gray-text mb-1">Date :</p>
            <span className="block border-b border-gray-300 h-5 w-full mb-3"></span>
            <p className="text-xs text-gray-text mb-1">Signature :</p>
            <div className="h-16 border border-dashed border-gray-300 rounded"></div>
          </div>
          <div>
            <p className="font-bold text-primary text-sm mb-2">Le formateur</p>
            <p className="text-xs text-gray-text mb-1">Date :</p>
            <span className="block border-b border-gray-300 h-5 w-full mb-3"></span>
            <p className="text-xs text-gray-text mb-1">Signature :</p>
            <div className="h-16 border border-dashed border-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </PageSection>
  );
}
