"use client";
import { useStudent } from "@/lib/StudentContext";
import { PageSection, SectionBanner, InfoCard, AlertBox } from "@/components/ui";
import SaveBar from "@/components/SaveBar";

function Field({ label, name, data, update, required }: { label: string; name: string; data: Record<string, unknown>; update: (n: string, v: string) => void; required?: boolean }) {
  const v = (data[name] as string) || "";
  const empty = required && !v.trim();
  return (
    <div className="py-1.5">
      <label className="block text-xs font-bold text-primary mb-1">
        {label} :{required && <span className="text-red ml-0.5">*</span>}
      </label>
      <input type="text" value={v} onChange={(e) => update(name, e.target.value)}
        placeholder={required ? "Obligatoire" : ""}
        className={`w-full border rounded px-3 py-2 text-sm focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary ${empty ? "border-red/50 bg-red/5" : "border-gray-300"}`} />
    </div>
  );
}

export default function Page() {
  const { data, loading, update } = useStudent();

  if (loading) return <PageSection num={8} title="Accessibilite et handicap"><p className="text-sm text-gray-500 text-center py-8">Chargement...</p></PageSection>;

  return (
    <PageSection num={8} title="Accessibilite et handicap">
      <p className="text-dark text-sm">
        Le CFA s&apos;engage a accueillir et accompagner les personnes en situation de handicap
        tout au long de leur parcours de formation, conformement a la loi du 11 fevrier 2005.
      </p>

      <p className="text-xs text-red mb-2 mt-4">
        <span className="font-bold">*</span> Champs obligatoires
      </p>

      <SectionBanner title="DISPOSITIFS D'ACCOMPAGNEMENT" color="bg-primary" />
      <InfoCard color="border-primary">
        <ul className="list-disc list-inside text-sm text-dark space-y-1">
          <li>Entretien individuel pour identifier les besoins specifiques</li>
          <li>Amenagement des conditions d&apos;examen (tiers-temps, secretaire, materiel adapte)</li>
          <li>Adaptation des supports pedagogiques et des modalites d&apos;evaluation</li>
          <li>Accessibilite des locaux et des equipements de formation</li>
          <li>Accompagnement personnalise par le referent handicap du CFA</li>
          <li>Orientation vers les organismes specialises (AGEFIPH, MDPH, Cap Emploi)</li>
          <li>Suivi regulier et ajustement des amenagements tout au long du parcours</li>
          <li>Sensibilisation des equipes pedagogiques aux besoins specifiques</li>
        </ul>
      </InfoCard>

      <AlertBox bg="bg-light" textColor="text-primary">
        N&apos;hesitez pas a vous signaler aupres du referent handicap des le debut de votre formation.
        Toutes les informations communiquees restent strictement confidentielles.
      </AlertBox>

      <SectionBanner title="REFERENT HANDICAP DU CFA" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4">
        <Field label="Nom et prenom" name="handicap_referent_nom" data={data} update={update} required />
        <Field label="Fonction" name="handicap_referent_fonction" data={data} update={update} required />
        <Field label="Telephone" name="handicap_referent_tel" data={data} update={update} required />
        <Field label="E-mail" name="handicap_referent_email" data={data} update={update} required />
        <Field label="Jours et horaires de disponibilite" name="handicap_referent_dispo" data={data} update={update} />
      </div>

      <div className="pb-20" />
      <SaveBar requiredFields={[
        { name: "handicap_referent_nom", label: "Nom referent handicap" },
        { name: "handicap_referent_fonction", label: "Fonction referent" },
        { name: "handicap_referent_tel", label: "Telephone referent" },
        { name: "handicap_referent_email", label: "E-mail referent" },
      ]} />
    </PageSection>
  );
}
