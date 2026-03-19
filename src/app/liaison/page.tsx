"use client";
import { useStudent } from "@/lib/StudentContext";
import { PageSection, SectionBanner } from "@/components/ui";
import SaveBar from "@/components/SaveBar";

function Field({ label, name, data, update, multiline }: { label: string; name: string; data: Record<string, unknown>; update: (n: string, v: string) => void; multiline?: boolean }) {
  if (multiline) {
    return (
      <div className="py-1.5">
        <label className="block text-xs font-bold text-primary mb-1">{label} :</label>
        <textarea value={(data[name] as string) || ""} onChange={(e) => update(name, e.target.value)} rows={3}
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary resize-y" />
      </div>
    );
  }
  return (
    <div className="py-1.5">
      <label className="block text-xs font-bold text-primary mb-1">{label} :</label>
      <input type="text" value={(data[name] as string) || ""} onChange={(e) => update(name, e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
    </div>
  );
}

export default function Page() {
  const { data, loading, update } = useStudent();

  if (loading) return <PageSection num={17} title="Fiche de liaison entreprise - CFA"><p className="text-sm text-gray-500 text-center py-8">Chargement...</p></PageSection>;

  return (
    <PageSection num={17} title="Fiche de liaison entreprise - CFA">
      <p className="text-dark text-sm">
        Cette fiche de liaison permet d&apos;assurer le suivi entre le CFA et l&apos;entreprise.
        Elle est completee lors des visites en entreprise et des bilans de progression.
      </p>

      <SectionBanner title="IDENTIFICATION" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <Field label="Date de la visite" name="liaison_date_visite" data={data} update={update} />
      </div>

      <SectionBanner title="MISSIONS CONFIEES EN ENTREPRISE" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <Field label="Mission principale" name="liaison_mission" data={data} update={update} />
        <Field label="Activites realisees" name="liaison_activites" data={data} update={update} multiline />
        <Field label="Outils / logiciels utilises" name="liaison_outils" data={data} update={update} />
        <Field label="Niveau d'autonomie" name="liaison_autonomie" data={data} update={update} />
        <Field label="Difficultes rencontrees" name="liaison_difficultes" data={data} update={update} multiline />
      </div>

      <SectionBanner title="COMPETENCES EVALUEES" color="bg-accent" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <Field label="Competences techniques" name="liaison_comp_techniques" data={data} update={update} multiline />
        <Field label="Competences relationnelles" name="liaison_comp_relationnelles" data={data} update={update} multiline />
        <Field label="Competences organisationnelles" name="liaison_comp_organisationnelles" data={data} update={update} multiline />
        <Field label="Points forts observes" name="liaison_points_forts" data={data} update={update} multiline />
        <Field label="Axes d'amelioration" name="liaison_axes_amelioration" data={data} update={update} multiline />
      </div>

      <SectionBanner title="OBSERVATIONS ET OBJECTIFS" color="bg-green" />
      <div className="border border-gray-200 border-t-0 p-4">
        <Field label="Observations du tuteur" name="liaison_obs_tuteur" data={data} update={update} multiline />
        <Field label="Observations du formateur" name="liaison_obs_formateur" data={data} update={update} multiline />
        <Field label="Observations de l'apprenti(e)" name="liaison_obs_apprenti" data={data} update={update} multiline />
        <Field label="Objectifs pour la prochaine periode" name="liaison_objectifs" data={data} update={update} multiline />
        <Field label="Actions correctives envisagees" name="liaison_actions_correctives" data={data} update={update} multiline />
      </div>

      <div className="pb-20" />
      <SaveBar />
    </PageSection>
  );
}
