"use client";
import { useStudent } from "@/lib/StudentContext";
import { PageSection, SectionBanner } from "@/components/ui";
import SaveBar from "@/components/SaveBar";

function Field({ label, name, type = "text", data, update, bg, required }: {
  label: string;
  name: string;
  type?: string;
  data: Record<string, unknown>;
  update: (field: string, value: string) => void;
  bg?: string;
  required?: boolean;
}) {
  const v = (data[name] as string) || "";
  const empty = required && !v.trim();
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center py-2 border-b border-dotted border-gray-300 ${bg || ""}`}>
      <label htmlFor={name} className="font-bold text-primary text-sm w-52 shrink-0">
        {label} :{required && <span className="text-red ml-0.5">*</span>}
      </label>
      <input
        id={name}
        type={type}
        value={v}
        onChange={(e) => update(name, e.target.value)}
        className={`flex-1 border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary ${empty ? "border-red/50 bg-red/5" : "border-gray-300"}`}
        placeholder={required ? "Obligatoire" : ""}
      />
    </div>
  );
}

function DoubleField({ label1, name1, label2, name2, type1 = "text", type2 = "text", data, update, bg, req1, req2 }: {
  label1: string;
  name1: string;
  label2: string;
  name2: string;
  type1?: string;
  type2?: string;
  data: Record<string, unknown>;
  update: (field: string, value: string) => void;
  bg?: string;
  req1?: boolean;
  req2?: boolean;
}) {
  const v1 = (data[name1] as string) || "";
  const v2 = (data[name2] as string) || "";
  const e1 = req1 && !v1.trim();
  const e2 = req2 && !v2.trim();
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 py-2 border-b border-dotted border-gray-300 ${bg || ""}`}>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor={name1} className="font-bold text-primary text-sm w-32 shrink-0">
          {label1} :{req1 && <span className="text-red ml-0.5">*</span>}
        </label>
        <input
          id={name1}
          type={type1}
          value={v1}
          onChange={(e) => update(name1, e.target.value)}
          className={`flex-1 border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary ${e1 ? "border-red/50 bg-red/5" : "border-gray-300"}`}
          placeholder={req1 ? "Obligatoire" : ""}
        />
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center">
        <label htmlFor={name2} className="font-bold text-primary text-sm w-32 shrink-0">
          {label2} :{req2 && <span className="text-red ml-0.5">*</span>}
        </label>
        <input
          id={name2}
          type={type2}
          value={v2}
          onChange={(e) => update(name2, e.target.value)}
          className={`flex-1 border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary ${e2 ? "border-red/50 bg-red/5" : "border-gray-300"}`}
          placeholder={req2 ? "Obligatoire" : ""}
        />
      </div>
    </div>
  );
}

export default function Page() {
  const { data, loading, update } = useStudent();

  if (loading) {
    return (
      <PageSection num={2} title="Fiche de renseignements">
        <p className="text-sm text-gray-500 text-center py-8">Chargement...</p>
      </PageSection>
    );
  }

  return (
    <PageSection num={2} title="Fiche de renseignements">
      <p className="text-sm text-gray-text mb-2">
        Merci de completer soigneusement toutes les informations ci-dessous.
      </p>
      <p className="text-xs text-red mb-4">
        <span className="font-bold">*</span> Champs obligatoires
      </p>

      {/* APPRENANT(E) */}
      <SectionBanner title="APPRENANT(E)" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleField label1="Nom" name1="nom" label2="Prenom" name2="prenom" data={data} update={update} bg="bg-light px-2" req1 req2 />
        <Field label="Date de naissance" name="date_naissance" type="date" data={data} update={update} required />
        <Field label="Adresse complete" name="adresse" data={data} update={update} bg="bg-light px-2" required />
        <DoubleField label1="Telephone" name1="telephone" label2="E-mail" name2="email" type2="email" data={data} update={update} req1 req2 />
        <Field label="Formation preparee" name="formation" data={data} update={update} bg="bg-light px-2" required />
        {/* Menu deroulant RNCP */}
        <div className="flex flex-col sm:flex-row sm:items-center py-2 border-b border-dotted border-gray-300">
          <label htmlFor="diplome" className="font-bold text-primary text-sm w-52 shrink-0">
            Diplome / Titre vise (RNCP) :<span className="text-red ml-0.5">*</span>
          </label>
          <select
            id="diplome"
            value={(data.diplome as string) || ""}
            onChange={(e) => update("diplome", e.target.value)}
            className={`flex-1 border rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary ${!data.diplome ? "border-red/50 bg-red/5" : "border-gray-300"}`}
          >
            <option value="">-- Selectionnez un titre RNCP --</option>
            <option value="Employe polyvalent en restauration">Employe polyvalent en restauration</option>
            <option value="AMIS">AMIS</option>
            <option value="AMUM">AMUM</option>
            <option value="RPMS">RPMS</option>
            <option value="CC">CC</option>
            <option value="CV">CV</option>
            <option value="FPA">FPA</option>
            <option value="CADGA">CADGA</option>
          </select>
        </div>
      </div>

      {/* EN CAS D'URGENCE */}
      <SectionBanner title="EN CAS D&apos;URGENCE" color="bg-red" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <Field label="Personne a contacter" name="urgence_contact" data={data} update={update} bg="bg-red/5 px-2" required />
        <DoubleField label1="Telephone 1" name1="urgence_tel1" label2="Telephone 2" name2="urgence_tel2" data={data} update={update} req1 />
        <Field label="Informations medicales" name="urgence_medical" data={data} update={update} bg="bg-red/5 px-2" />
      </div>

      {/* ENTREPRISE D'ACCUEIL */}
      <SectionBanner title="ENTREPRISE D&apos;ACCUEIL" color="bg-secondary" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <Field label="Raison sociale" name="entreprise_nom" data={data} update={update} bg="bg-light px-2" required />
        <Field label="Adresse" name="entreprise_adresse" data={data} update={update} required />
        <DoubleField label1="Telephone" name1="entreprise_tel" label2="E-mail" name2="entreprise_email" type2="email" data={data} update={update} bg="bg-light px-2" req1 req2 />
        <Field label="Activite / Secteur" name="entreprise_activite" data={data} update={update} required />
        <DoubleField label1="Debut du contrat" name1="entreprise_debut" label2="Fin du contrat" name2="entreprise_fin" type1="date" type2="date" data={data} update={update} bg="bg-light px-2" req1 req2 />
      </div>

      {/* MAITRE D'APPRENTISSAGE / TUTEUR */}
      <SectionBanner title="MAITRE D&apos;APPRENTISSAGE / TUTEUR" color="bg-accent" />
      <div className="border border-gray-200 border-t-0 p-4 mb-4">
        <DoubleField label1="Nom" name1="ma_nom" label2="Prenom" name2="ma_prenom" data={data} update={update} bg="bg-light-gold px-2" req1 req2 />
        <Field label="Poste occupe" name="ma_poste" data={data} update={update} required />
        <DoubleField label1="Telephone" name1="ma_tel" label2="E-mail" name2="ma_email" type2="email" data={data} update={update} bg="bg-light-gold px-2" req1 req2 />
      </div>

      {/* RESPONSABLE(S) LEGAL(AUX) */}
      <SectionBanner title="RESPONSABLE(S) LEGAL(AUX) - si apprenant(e) mineur(e)" color="bg-primary" />
      <div className="border border-gray-200 border-t-0 p-4">
        <p className="font-bold text-secondary text-sm mb-2 bg-light p-2 rounded">Responsable legal 1</p>
        <DoubleField label1="Nom" name1="resp1_nom" label2="Prenom" name2="resp1_prenom" data={data} update={update} />
        <Field label="Adresse" name="resp1_adresse" data={data} update={update} bg="bg-light px-2" />
        <DoubleField label1="Telephone" name1="resp1_tel" label2="E-mail" name2="resp1_email" type2="email" data={data} update={update} />

        <p className="font-bold text-secondary text-sm mb-2 mt-4 bg-light p-2 rounded">Responsable legal 2</p>
        <DoubleField label1="Nom" name1="resp2_nom" label2="Prenom" name2="resp2_prenom" data={data} update={update} bg="bg-light-gold px-2" />
        <Field label="Adresse" name="resp2_adresse" data={data} update={update} />
        <DoubleField label1="Telephone" name1="resp2_tel" label2="E-mail" name2="resp2_email" type2="email" data={data} update={update} bg="bg-light-gold px-2" />
      </div>

      <div className="pb-20" />
      <SaveBar requiredFields={[
        { name: "nom", label: "Nom" }, { name: "prenom", label: "Prenom" },
        { name: "date_naissance", label: "Date de naissance" }, { name: "adresse", label: "Adresse" },
        { name: "telephone", label: "Telephone" }, { name: "email", label: "E-mail" },
        { name: "formation", label: "Formation" }, { name: "diplome", label: "Diplome" },
        { name: "urgence_contact", label: "Contact urgence" }, { name: "urgence_tel1", label: "Tel. urgence" },
        { name: "entreprise_nom", label: "Raison sociale" }, { name: "entreprise_adresse", label: "Adresse entreprise" },
        { name: "entreprise_tel", label: "Tel. entreprise" }, { name: "entreprise_email", label: "E-mail entreprise" },
        { name: "entreprise_activite", label: "Activite entreprise" },
        { name: "entreprise_debut", label: "Debut contrat" }, { name: "entreprise_fin", label: "Fin contrat" },
        { name: "ma_nom", label: "Nom tuteur" }, { name: "ma_prenom", label: "Prenom tuteur" },
        { name: "ma_poste", label: "Poste tuteur" }, { name: "ma_tel", label: "Tel. tuteur" }, { name: "ma_email", label: "E-mail tuteur" },
      ]} />
    </PageSection>
  );
}
