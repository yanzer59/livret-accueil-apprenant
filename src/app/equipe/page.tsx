"use client";
import { useStudent } from "@/lib/StudentContext";
import { PageSection, SectionBanner } from "@/components/ui";
import SaveBar from "@/components/SaveBar";

function Field({ label, name, data, update }: { label: string; name: string; data: Record<string, unknown>; update: (n: string, v: string) => void }) {
  return (
    <div className="py-1.5">
      <label className="block text-xs font-bold text-primary mb-1">{label} :</label>
      <input type="text" value={(data[name] as string) || ""} onChange={(e) => update(name, e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
    </div>
  );
}

function DField({ l1, n1, l2, n2, data, update }: { l1: string; n1: string; l2: string; n2: string; data: Record<string, unknown>; update: (n: string, v: string) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label={l1} name={n1} data={data} update={update} />
      <Field label={l2} name={n2} data={data} update={update} />
    </div>
  );
}

export default function Page() {
  const { data, loading, update } = useStudent();

  if (loading) return <PageSection num={16} title="Equipe pedagogique et contacts"><p className="text-sm text-gray-500 text-center py-8">Chargement...</p></PageSection>;

  return (
    <PageSection num={16} title="Equipe pedagogique et contacts">
      <p className="text-dark text-sm">Retrouvez ci-dessous les coordonnees de l&apos;equipe du CFA.</p>

      <SectionBanner title="DIRECTION" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DField l1="Nom" n1="equipe_dir_nom" l2="Prenom" n2="equipe_dir_prenom" data={data} update={update} />
        <Field label="Fonction" name="equipe_dir_fonction" data={data} update={update} />
        <DField l1="Telephone" n1="equipe_dir_tel" l2="E-mail" n2="equipe_dir_email" data={data} update={update} />
      </div>

      <SectionBanner title="RESPONSABLE PEDAGOGIQUE" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DField l1="Nom" n1="equipe_resp_nom" l2="Prenom" n2="equipe_resp_prenom" data={data} update={update} />
        <Field label="Fonction" name="equipe_resp_fonction" data={data} update={update} />
        <DField l1="Telephone" n1="equipe_resp_tel" l2="E-mail" n2="equipe_resp_email" data={data} update={update} />
      </div>

      <SectionBanner title="RESPONSABLE QUALITE" color="bg-accent" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DField l1="Nom" n1="equipe_qualite_nom" l2="Prenom" n2="equipe_qualite_prenom" data={data} update={update} />
        <DField l1="Telephone" n1="equipe_qualite_tel" l2="E-mail" n2="equipe_qualite_email" data={data} update={update} />
      </div>

      <SectionBanner title="FORMATEUR REFERENT" color="bg-green" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DField l1="Nom" n1="equipe_formateur_nom" l2="Prenom" n2="equipe_formateur_prenom" data={data} update={update} />
        <Field label="Matiere / Domaine" name="equipe_formateur_matiere" data={data} update={update} />
        <DField l1="Telephone" n1="equipe_formateur_tel" l2="E-mail" n2="equipe_formateur_email" data={data} update={update} />
      </div>

      <SectionBanner title="CONTACTS UTILES DU CFA" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4">
        <Field label="Accueil / Secretariat" name="equipe_accueil" data={data} update={update} />
        <Field label="Telephone standard" name="equipe_tel_standard" data={data} update={update} />
        <Field label="E-mail general" name="equipe_email_general" data={data} update={update} />
        <Field label="Adresse du CFA" name="equipe_adresse" data={data} update={update} />
        <Field label="Horaires d'ouverture" name="equipe_horaires" data={data} update={update} />
      </div>

      <div className="pb-20" />
      <SaveBar />
    </PageSection>
  );
}
