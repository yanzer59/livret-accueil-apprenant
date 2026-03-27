"use client";
import { useStudent } from "@/lib/StudentContext";
import { SectionBanner, InfoCard, AlertBox, TimelineStep, NumberedStep, DataTable, SignatureBlock } from "@/components/ui";
import { SchemaActeurs, SchemaCertification } from "@/components/schemas";
import SignatureCanvas from "@/components/SignatureCanvas";
import SaveBar from "@/components/SaveBar";

/* ======= Form helpers ======= */
function Field({ label, name, type = "text", data, update, required }: {
  label: string; name: string; type?: string;
  data: Record<string, unknown>; update: (n: string, v: string) => void;
  required?: boolean;
}) {
  const v = (data[name] as string) || "";
  const empty = required && !v.trim();
  return (
    <div className="py-1.5">
      <label htmlFor={name} className="block text-xs font-medium text-foreground mb-1">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <input id={name} type={type} value={v} onChange={(e) => update(name, e.target.value)}
        placeholder={required ? "Obligatoire" : ""}
        className={`w-full h-9 rounded-md border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${empty ? "border-destructive/50 bg-destructive/5" : "border-input"}`} />
    </div>
  );
}

function DField({ l1, n1, l2, n2, type1 = "text", type2 = "text", data, update, req1, req2 }: {
  l1: string; n1: string; l2: string; n2: string;
  type1?: string; type2?: string;
  data: Record<string, unknown>; update: (n: string, v: string) => void;
  req1?: boolean; req2?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <Field label={l1} name={n1} type={type1} data={data} update={update} required={req1} />
      <Field label={l2} name={n2} type={type2} data={data} update={update} required={req2} />
    </div>
  );
}

function TextArea({ label, name, data, update, required }: {
  label: string; name: string;
  data: Record<string, unknown>; update: (n: string, v: string) => void;
  required?: boolean;
}) {
  const v = (data[name] as string) || "";
  const empty = required && !v.trim();
  return (
    <div className="py-1.5">
      <label className="block text-xs font-medium text-foreground mb-1">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <textarea value={v} onChange={(e) => update(name, e.target.value)} rows={3}
        placeholder={required ? "Obligatoire" : ""}
        className={`w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-y ${empty ? "border-destructive/50 bg-destructive/5" : "border-input"}`} />
    </div>
  );
}

function SelectField({ label, name, options, data, update, required }: {
  label: string; name: string; options: { value: string; label: string }[];
  data: Record<string, unknown>; update: (n: string, v: string) => void;
  required?: boolean;
}) {
  const v = (data[name] as string) || "";
  return (
    <div className="py-1.5">
      <label className="block text-xs font-medium text-foreground mb-1">
        {label}{required && <span className="text-destructive ml-0.5">*</span>}
      </label>
      <select value={v} onChange={(e) => update(name, e.target.value)}
        className={`w-full h-9 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${!v && required ? "border-destructive/50 bg-destructive/5" : "border-input"}`}>
        <option value="">-- Selectionnez --</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

/* ======= Section wrapper ======= */
function Section({ id, num, title, children }: { id: string; num: number; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-20">
      <div className="border-b border-border pb-8">
        <div className="mb-5 flex items-center gap-3">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0">{num}</span>
          <h2 className="text-lg font-bold tracking-tight text-foreground">
            {title}
          </h2>
        </div>
        <div className="space-y-4 pl-11">
          {children}
        </div>
      </div>
    </section>
  );
}

/* ======= Form block wrapper ======= */
function FormBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground font-medium text-sm px-4 py-2.5">{title}</div>
      <div className="p-4 space-y-1">{children}</div>
    </div>
  );
}

/* ====================================================== */
/* ================== MAIN PAGE ========================= */
/* ====================================================== */

export default function Home() {
  const { data, loading, update } = useStudent();

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const choice = (data.droit_image as string) || "";

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 bg-card p-6 md:p-10">

      {/* ═══════════════════ 1. BIENVENUE ═══════════════════ */}
      <Section id="bienvenue" num={1} title="Bienvenue dans votre formation">
        <p className="text-sm text-muted-foreground">
          Ce livret d&apos;accueil est votre document de reference tout au long de votre parcours en alternance.
          Il vous accompagne dans votre formation, tant sur le plan pedagogique que professionnel, et assure
          un lien regulier entre vous, votre entreprise d&apos;accueil et votre centre de formation.
        </p>
        <p className="text-sm text-muted-foreground">
          Vous y trouverez toutes les informations essentielles pour bien comprendre le fonctionnement de votre
          contrat d&apos;apprentissage, vos droits et devoirs, les regles de vie a respecter, ainsi que le role
          de chaque acteur implique dans votre reussite.
        </p>
        <AlertBox variant="warning">
          Conservez ce livret precieusement et consultez-le regulierement. C&apos;est un outil vivant qui favorise
          l&apos;interaction entre les competences a acquerir en centre de formation et celles a developper en entreprise.
        </AlertBox>
      </Section>

      {/* ═══════════════════ 2. RENSEIGNEMENTS ═══════════════════ */}
      <Section id="renseignements" num={2} title="Fiche de renseignements">
        <p className="text-sm text-muted-foreground mb-2">
          Merci de completer soigneusement toutes les informations ci-dessous.
        </p>
        <p className="text-xs text-destructive mb-4">
          <span className="font-bold">*</span> Champs obligatoires
        </p>

        <FormBlock title="APPRENANT(E)">
          <DField l1="Nom" n1="nom" l2="Prenom" n2="prenom" data={data} update={update} req1 req2 />
          <Field label="Date de naissance" name="date_naissance" type="date" data={data} update={update} required />
          <Field label="Adresse complete" name="adresse" data={data} update={update} required />
          <DField l1="Telephone" n1="telephone" l2="E-mail" n2="email" type2="email" data={data} update={update} req1 req2 />
          <SelectField label="Formation preparee" name="formation" data={data} update={update} required options={[
            { value: "CAP", label: "CAP (Certificat d'Aptitude Professionnelle)" },
            { value: "BEP", label: "BEP (Brevet d'Etudes Professionnelles)" },
            { value: "Bac Pro", label: "Bac Pro (Baccalaureat Professionnel)" },
            { value: "BTS", label: "BTS (Brevet de Technicien Superieur)" },
            { value: "Licence Pro", label: "Licence Professionnelle" },
            { value: "Titre Professionnel", label: "Titre Professionnel (TP)" },
          ]} />
          <SelectField label="Diplome / Titre vise (RNCP)" name="diplome" data={data} update={update} required options={[
            { value: "Employe polyvalent en restauration", label: "Employe polyvalent en restauration (EPR)" },
            { value: "Agent de Mediation, Information et Services", label: "Agent de Mediation, Information et Services (AMIS)" },
            { value: "Assistant Manager d'Unite Marchande", label: "Assistant Manager d'Unite Marchande (AMUM)" },
            { value: "Responsable de Petite et Moyenne Structure", label: "Responsable de Petite et Moyenne Structure (RPMS)" },
            { value: "Conseiller Commercial", label: "Conseiller Commercial (CC)" },
            { value: "Conseiller de Vente", label: "Conseiller de Vente (CV)" },
            { value: "Formateur Professionnel d'Adultes", label: "Formateur Professionnel d'Adultes (FPA)" },
            { value: "Charge d'Accueil et de Gestion Administrative", label: "Charge d'Accueil et de Gestion Administrative (CADGA)" },
          ]} />
        </FormBlock>

        <FormBlock title="EN CAS D'URGENCE">
          <Field label="Personne a contacter" name="urgence_contact" data={data} update={update} required />
          <DField l1="Telephone 1" n1="urgence_tel1" l2="Telephone 2" n2="urgence_tel2" data={data} update={update} req1 />
          <Field label="Informations medicales" name="urgence_medical" data={data} update={update} />
        </FormBlock>

        <FormBlock title="ENTREPRISE D'ACCUEIL">
          <Field label="Raison sociale" name="entreprise_nom" data={data} update={update} required />
          <Field label="Adresse" name="entreprise_adresse" data={data} update={update} required />
          <DField l1="Telephone" n1="entreprise_tel" l2="E-mail" n2="entreprise_email" type2="email" data={data} update={update} req1 req2 />
          <Field label="Activite / Secteur" name="entreprise_activite" data={data} update={update} required />
          <DField l1="Debut du contrat" n1="entreprise_debut" l2="Fin du contrat" n2="entreprise_fin" type1="date" type2="date" data={data} update={update} req1 req2 />
        </FormBlock>

        <FormBlock title="MAITRE D'APPRENTISSAGE / TUTEUR">
          <DField l1="Nom" n1="ma_nom" l2="Prenom" n2="ma_prenom" data={data} update={update} req1 req2 />
          <Field label="Poste occupe" name="ma_poste" data={data} update={update} required />
          <DField l1="Telephone" n1="ma_tel" l2="E-mail" n2="ma_email" type2="email" data={data} update={update} req1 req2 />
        </FormBlock>

        <FormBlock title="RESPONSABLE(S) LEGAL(AUX) - si mineur(e)">
          <p className="text-xs font-medium text-muted-foreground mb-2 bg-muted rounded px-2 py-1.5">Responsable legal 1</p>
          <DField l1="Nom" n1="resp1_nom" l2="Prenom" n2="resp1_prenom" data={data} update={update} />
          <Field label="Adresse" name="resp1_adresse" data={data} update={update} />
          <DField l1="Telephone" n1="resp1_tel" l2="E-mail" n2="resp1_email" type2="email" data={data} update={update} />
          <p className="text-xs font-medium text-muted-foreground mb-2 mt-3 bg-muted rounded px-2 py-1.5">Responsable legal 2</p>
          <DField l1="Nom" n1="resp2_nom" l2="Prenom" n2="resp2_prenom" data={data} update={update} />
          <Field label="Adresse" name="resp2_adresse" data={data} update={update} />
          <DField l1="Telephone" n1="resp2_tel" l2="E-mail" n2="resp2_email" type2="email" data={data} update={update} />
        </FormBlock>
      </Section>

      {/* ═══════════════════ 3. CONTRAT ═══════════════════ */}
      <Section id="contrat" num={3} title="Droits et devoirs de l'apprenti(e)">
        <p className="text-sm text-muted-foreground">
          Le contrat d&apos;apprentissage est un contrat de travail a part entiere.
          Il implique des droits et des devoirs pour l&apos;apprenti(e), tant en centre de formation qu&apos;en entreprise.
        </p>
        <DataTable
          headers={["Vos droits", "Vos devoirs"]}
          rows={[
            ["Beneficier d\u2019une formation theorique et pratique conforme au referentiel du diplome", "Respecter les regles de fonctionnement du CFA et de l\u2019entreprise"],
            ["Percevoir une remuneration selon les dispositions legales en vigueur", "Etre assidu(e) en cours et en entreprise et justifier toute absence"],
            ["Beneficier des memes droits que les autres salaries (conges payes, protection sociale)", "Adopter un comportement professionnel et respectueux envers tous les acteurs"],
            ["Etre accompagne(e) par un maitre d\u2019apprentissage et un formateur referent", "Effectuer les travaux et missions confies par l\u2019entreprise et le CFA"],
            ["Acceder aux dispositifs d\u2019aide (logement, transport, restauration)", "Se presenter aux examens et evaluations prevus dans le parcours de formation"],
          ]}
        />
        <InfoCard>
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Rappel :</span> Le non-respect de ces obligations peut
            entrainer des sanctions disciplinaires pouvant aller jusqu&apos;a la rupture du contrat d&apos;apprentissage.
          </p>
        </InfoCard>
      </Section>

      {/* ═══════════════════ 4. PARCOURS ═══════════════════ */}
      <Section id="parcours" num={4} title="Parcours de formation">
        <p className="text-sm text-muted-foreground">
          Votre formation en alternance suit un parcours structure, articule entre periodes en centre de formation et periodes en entreprise.
        </p>
        <SectionBanner title="LES 7 ETAPES DE VOTRE PARCOURS" />
        <TimelineStep num={1} title="Attribution code d'acces plateforme e-learning" description="Vous recevez vos identifiants pour acceder a la plateforme de formation en ligne." />
        <TimelineStep num={2} title="Prise de contact coach" description="Votre coach pedagogique vous contacte pour planifier votre accompagnement." />
        <TimelineStep num={3} title="Attribution PC" description="Un ordinateur vous est fourni pour suivre votre formation dans les meilleures conditions." />
        <TimelineStep num={4} title="Bilan milieu de formation" description="Point d'etape a mi-parcours pour evaluer votre progression et ajuster si necessaire." />
        <TimelineStep num={5} title="Bilan de fin de formation" description="Bilan complet de vos acquis et preparation finale avant l'examen." />
        <TimelineStep num={6} title="Passage de votre examen" description="Apres un an de preparation, vous etes pret, il est temps de passer votre examen !" />
        <TimelineStep num={7} title="Resultats" description="Obtention de votre titre professionnel. En cas de non-obtention, session de rattrapage 3 mois apres." />

        <SectionBanner title="CALENDRIER DES 12 RENDEZ-VOUS DE SUIVI" />
        <DataTable
          headers={["RDV", "Objectif", "Realise le"]}
          rows={[
            ["1er", "Suivi coaching — Integration", ""],
            ["2eme", "Suivi coaching", ""],
            ["3eme", "Suivi coaching", ""],
            ["4eme", "Bilan milieu de formation", ""],
            ["5eme", "Suivi + constitution du Dossier Professionnel", ""],
            ["6eme", "Suivi + constitution du Dossier Professionnel", ""],
            ["7eme", "Suivi + constitution du Dossier Professionnel", ""],
            ["8eme", "Suivi + constitution du Dossier Professionnel", ""],
            ["9eme", "Suivi + constitution du Dossier Professionnel", ""],
            ["10eme", "Suivi + constitution du Dossier Professionnel", ""],
            ["11eme", "Suivi + preparation a l'examen", ""],
            ["12eme", "Bilan de fin de formation", ""],
          ]}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/timeline-heol.png" alt="Votre annee de formation" className="w-full mt-4 rounded" />
      </Section>

      {/* ═══════════════════ 5. ENGAGEMENTS ═══════════════════ */}
      <Section id="engagements" num={5} title="Engagements des parties">
        <p className="text-sm text-muted-foreground">
          La reussite de votre formation repose sur l&apos;engagement de chacun des acteurs.
        </p>
        <SectionBanner title="ENGAGEMENTS DU TUTEUR" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Accueillir l&apos;apprenti(e) et faciliter son integration dans l&apos;entreprise</li>
            <li>Organiser et planifier le parcours professionnel en lien avec le referentiel</li>
            <li>Confier des missions en adequation avec le diplome ou titre prepare</li>
            <li>Assurer un suivi regulier et evaluer la progression des competences</li>
            <li>Participer aux bilans et aux visites en entreprise avec le CFA</li>
            <li>Communiquer avec le formateur referent en cas de difficulte</li>
            <li>Veiller au respect des conditions de travail et de securite</li>
          </ul>
        </InfoCard>
        <SectionBanner title="ENGAGEMENTS DE L'APPRENTI(E)" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Etre assidu(e) en centre de formation et en entreprise</li>
            <li>Respecter les regles interieures du CFA et de l&apos;entreprise</li>
            <li>Adopter un comportement professionnel et respectueux</li>
            <li>Realiser les travaux et missions demandes dans les delais impartis</li>
            <li>Tenir a jour le livret de suivi et le dossier professionnel</li>
            <li>Se presenter a toutes les evaluations et examens prevus</li>
            <li>Informer le CFA et l&apos;entreprise en cas d&apos;absence ou de difficulte</li>
          </ul>
        </InfoCard>
        <SectionBanner title="ENGAGEMENTS DU CFA" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Dispenser une formation conforme au referentiel du diplome ou titre vise</li>
            <li>Assurer un suivi pedagogique personnalise de chaque apprenti(e)</li>
            <li>Organiser des visites en entreprise et des bilans de progression</li>
            <li>Mettre a disposition les moyens materiels et pedagogiques necessaires</li>
            <li>Accompagner l&apos;apprenti(e) dans la preparation a la certification</li>
            <li>Informer l&apos;entreprise et l&apos;apprenti(e) de toute evolution du parcours</li>
            <li>Proposer un accompagnement adapte en cas de difficulte ou de handicap</li>
          </ul>
        </InfoCard>
      </Section>

      {/* ═══════════════════ 6. REGLEMENT ═══════════════════ */}
      <Section id="reglement" num={6} title="Reglement interieur">
        <p className="text-sm text-muted-foreground">
          Le present reglement interieur s&apos;applique a l&apos;ensemble des apprenants du CFA.
        </p>
        <SectionBanner title="ASSIDUITE ET PONCTUALITE" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>La presence en cours est obligatoire conformement au calendrier de formation</li>
            <li>Toute absence doit etre justifiee dans les 48 heures par un document officiel</li>
            <li>Les retards repetes sont consideres comme un manquement au reglement</li>
            <li>Les absences injustifiees sont signalees a l&apos;employeur et peuvent entrainer des sanctions</li>
          </ul>
        </InfoCard>
        <SectionBanner title="RESPECT ET SAVOIR-VIVRE" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Adopter un comportement respectueux envers les formateurs, le personnel et les autres apprenants</li>
            <li>Toute forme de violence, harcelement ou discrimination est strictement interdite</li>
            <li>L&apos;utilisation du telephone portable est interdite pendant les cours sauf autorisation</li>
            <li>Une tenue correcte et adaptee au contexte professionnel est exigee</li>
          </ul>
        </InfoCard>
        <SectionBanner title="MATERIEL ET LOCAUX" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Le materiel pedagogique mis a disposition doit etre utilise avec soin</li>
            <li>Toute degradation volontaire fera l&apos;objet d&apos;une demande de reparation financiere</li>
            <li>Les locaux doivent etre maintenus propres et en ordre</li>
            <li>Il est interdit de consommer de la nourriture dans les salles de cours</li>
          </ul>
        </InfoCard>
        <SectionBanner title="SANCTIONS DISCIPLINAIRES" />
        <InfoCard>
          <p className="text-sm text-muted-foreground mb-3">
            En cas de manquement, les sanctions suivantes peuvent etre appliquees de maniere progressive :
          </p>
          <NumberedStep num={1} title="Avertissement oral" description="Rappel a l'ordre verbal par le formateur ou le responsable pedagogique." />
          <NumberedStep num={2} title="Avertissement ecrit" description="Notification ecrite adressee a l'apprenti(e) et a l'employeur." />
          <NumberedStep num={3} title="Exclusion" description="Mesure d'exclusion temporaire ou definitive, prononcee apres passage en conseil de discipline." />
        </InfoCard>
      </Section>

      {/* ═══════════════════ 7. CERTIFICATION ═══════════════════ */}
      <Section id="certification" num={7} title="Certification et examen">
        <p className="text-sm text-muted-foreground">
          Votre formation vise l&apos;obtention d&apos;un diplome ou titre professionnel inscrit au RNCP.
        </p>
        <SectionBanner title="MODALITES D'EVALUATION" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Evaluations en cours de formation (ECF) tout au long du parcours</li>
            <li>Mises en situation professionnelle evaluees en centre et en entreprise</li>
            <li>Constitution et presentation du dossier professionnel (DP)</li>
            <li>Controle continu des connaissances et des competences</li>
            <li>Evaluation des periodes en entreprise par le tuteur</li>
          </ul>
        </InfoCard>
        <SectionBanner title="EXAMEN FINAL" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>L&apos;examen final est organise conformement au referentiel de certification</li>
            <li>Il se compose d&apos;epreuves ecrites, orales et/ou pratiques selon le titre vise</li>
            <li>Le jury est compose de professionnels du secteur et de formateurs habilites</li>
            <li>La presence a toutes les epreuves est obligatoire sous peine d&apos;elimination</li>
          </ul>
        </InfoCard>
        <AlertBox variant="success">
          <p className="font-semibold mb-1">En cas de reussite</p>
          <p>Le diplome ou titre professionnel vous est delivre par l&apos;organisme certificateur.</p>
        </AlertBox>
        <AlertBox variant="warning">
          <p className="font-semibold mb-1">En cas d&apos;echec</p>
          <p>Vous conservez le benefice des blocs de competences valides pendant 5 ans. Vous pouvez vous representer a une session ulterieure.</p>
        </AlertBox>
        <SchemaCertification />
      </Section>

      {/* ═══════════════════ 8. HANDICAP ═══════════════════ */}
      <Section id="handicap" num={8} title="Accessibilite et handicap">
        <p className="text-sm text-muted-foreground">
          Le CFA s&apos;engage a accueillir et accompagner les personnes en situation de handicap
          tout au long de leur parcours de formation.
        </p>
        <SectionBanner title="DISPOSITIFS D'ACCOMPAGNEMENT" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Entretien individuel pour identifier les besoins specifiques</li>
            <li>Amenagement des conditions d&apos;examen (tiers-temps, secretaire, materiel adapte)</li>
            <li>Adaptation des supports pedagogiques et des modalites d&apos;evaluation</li>
            <li>Accessibilite des locaux et des equipements de formation</li>
            <li>Accompagnement personnalise par le referent handicap du CFA</li>
            <li>Orientation vers les organismes specialises (AGEFIPH, MDPH, Cap Emploi)</li>
          </ul>
        </InfoCard>
        <AlertBox variant="info">
          N&apos;hesitez pas a vous signaler aupres du referent handicap des le debut de votre formation.
          Toutes les informations communiquees restent strictement confidentielles.
        </AlertBox>
        <FormBlock title="REFERENT HANDICAP DU CFA">
          <Field label="Nom et prenom" name="handicap_referent_nom" data={data} update={update} required />
          <Field label="Fonction" name="handicap_referent_fonction" data={data} update={update} required />
          <DField l1="Telephone" n1="handicap_referent_tel" l2="E-mail" n2="handicap_referent_email" data={data} update={update} req1 req2 />
          <Field label="Jours et horaires de disponibilite" name="handicap_referent_dispo" data={data} update={update} />
        </FormBlock>
      </Section>

      {/* ═══════════════════ 9. SECURITE ═══════════════════ */}
      <Section id="securite" num={9} title="Securite et prevention des risques">
        <SectionBanner title="PREVENTION DES RISQUES" />
        <InfoCard>
          <p className="text-sm text-muted-foreground mb-3">En cas de risque ou de danger :</p>
          <NumberedStep num={1} title="Alerter" description="Prevenir immediatement le formateur ou tout membre du personnel." />
          <NumberedStep num={2} title="Proteger" description="Mettre en securite les personnes sans se mettre en danger." />
          <NumberedStep num={3} title="Secourir" description="Si forme(e) aux premiers secours, portez assistance." />
          <NumberedStep num={4} title="Evacuer" description="Suivre les consignes d'evacuation et rejoindre le point de rassemblement." />
          <NumberedStep num={5} title="Signaler" description="Remplir une fiche d'incident et la remettre a la direction." />
        </InfoCard>
        <AlertBox variant="warning">
          Numeros d&apos;urgence : SAMU (15) - Pompiers (18) - Police (17) - Numero europeen (112)
        </AlertBox>
        <SectionBanner title="EN CAS D'INTRUSION OU DE MENACE" />
        <InfoCard>
          <NumberedStep num={1} title="S'echapper" description="Si la voie est libre et sure, quittez immediatement le batiment." />
          <NumberedStep num={2} title="Se cacher" description="Confinement : verrouillez, barricadez, eteignez les lumieres." />
          <NumberedStep num={3} title="Alerter" description="Appelez le 17 ou le 112 des que possible." />
          <NumberedStep num={4} title="Se taire" description="Telephone en silencieux, aucun bruit, attendez les consignes." />
          <NumberedStep num={5} title="Cooperer" description="Suivez les instructions des forces de l'ordre, mains visibles." />
        </InfoCard>
      </Section>

      {/* ═══════════════════ 12. DROIT IMAGE ═══════════════════ */}
      <Section id="droit-image" num={10} title="Droit a l'image">
        <p className="text-sm text-muted-foreground">
          Conformement au Code civil et au RGPD, le CFA recueille votre autorisation pour l&apos;utilisation de votre image.
        </p>
        <InfoCard>
          <p className="text-sm text-muted-foreground mb-2">Ces images peuvent etre diffusees sur :</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Site internet du CFA et reseaux sociaux</li>
            <li>Plaquettes, brochures et supports de communication</li>
            <li>Rapports d&apos;activite et presentations institutionnelles</li>
            <li>Affichage dans les locaux du CFA</li>
          </ul>
        </InfoCard>
        <div className="space-y-3 mt-4">
          <button type="button" onClick={() => update("droit_image", "accorde")}
            className={`w-full flex items-start gap-3 p-4 rounded-md border-2 text-left transition-all ${
              choice === "accorde" ? "bg-success/10 border-success ring-2 ring-success/30" : "border-border hover:border-success/50"
            }`}>
            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              choice === "accorde" ? "border-success bg-success" : "border-muted-foreground"
            }`}>
              {choice === "accorde" && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <p className="text-sm text-foreground">
              <span className="font-semibold text-success">J&apos;ACCORDE</span> au CFA le droit d&apos;utiliser mon image dans le cadre decrit ci-dessus.
            </p>
          </button>
          <button type="button" onClick={() => update("droit_image", "refuse")}
            className={`w-full flex items-start gap-3 p-4 rounded-md border-2 text-left transition-all ${
              choice === "refuse" ? "bg-destructive/10 border-destructive ring-2 ring-destructive/30" : "border-border hover:border-destructive/50"
            }`}>
            <div className={`w-5 h-5 border-2 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              choice === "refuse" ? "border-destructive bg-destructive" : "border-muted-foreground"
            }`}>
              {choice === "refuse" && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>}
            </div>
            <p className="text-sm text-foreground">
              <span className="font-semibold text-destructive">JE N&apos;ACCORDE PAS</span> au CFA le droit d&apos;utiliser mon image.
            </p>
          </button>
        </div>
      </Section>

      {/* ═══════════════════ 13. RGPD ═══════════════════ */}
      <Section id="rgpd" num={11} title="Protection des donnees personnelles (RGPD)">
        <p className="text-sm text-muted-foreground">
          Conformement au RGPD et a la loi Informatique et Libertes, le CFA s&apos;engage a proteger vos donnees personnelles.
        </p>
        <SectionBanner title="COLLECTE ET TRAITEMENT" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Gestion administrative de votre dossier de formation</li>
            <li>Suivi pedagogique de votre parcours</li>
            <li>Communication avec votre entreprise d&apos;accueil</li>
            <li>Transmission obligatoire aux organismes publics (OPCO, DREETS)</li>
            <li>Statistiques anonymisees sur les parcours de formation</li>
          </ul>
        </InfoCard>
        <SectionBanner title="VOS DROITS" />
        <InfoCard>
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Droit d&apos;acces :</span> Consulter vos donnees personnelles (reponse sous 30 jours).</p>
        </InfoCard>
        <InfoCard>
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Droit de rectification :</span> Demander la correction de donnees inexactes.</p>
        </InfoCard>
        <InfoCard>
          <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Droit d&apos;opposition :</span> S&apos;opposer au traitement pour motifs legitimes.</p>
        </InfoCard>
        <AlertBox variant="info">
          Pour exercer vos droits, contactez le responsable du traitement des donnees du CFA.
          En cas de difficulte, vous pouvez saisir la CNIL sur cnil.fr.
        </AlertBox>
      </Section>

      {/* ═══════════════════ 14. CHARTE ═══════════════════ */}
      <Section id="charte" num={12} title="Charte de l'alternance">
        <p className="text-sm text-muted-foreground">
          La charte de l&apos;alternance rappelle l&apos;organisation du parcours et le role de chaque acteur.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/timeline-heol.png" alt="Votre annee de formation" className="w-full mb-4 rounded" />
        <SectionBanner title="LES ACTEURS DE VOTRE REUSSITE" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li><span className="font-semibold text-foreground">L&apos;apprenti(e) :</span> acteur principal de sa formation</li>
            <li><span className="font-semibold text-foreground">Le maitre d&apos;apprentissage :</span> accompagne en entreprise et transmet son savoir-faire</li>
            <li><span className="font-semibold text-foreground">Le formateur referent :</span> assure le suivi pedagogique</li>
            <li><span className="font-semibold text-foreground">Le responsable pedagogique :</span> coordonne le dispositif de formation</li>
            <li><span className="font-semibold text-foreground">La direction du CFA :</span> garantit les moyens et la qualite</li>
          </ul>
        </InfoCard>
        <SchemaActeurs />
      </Section>

      {/* ═══════════════════ 15. DOSSIER PRO ═══════════════════ */}
      <Section id="dossier-pro" num={13} title="Dossier professionnel">
        <p className="text-sm text-muted-foreground">
          Le dossier professionnel (DP) est un element essentiel de votre parcours de certification.
        </p>
        <SectionBanner title="LE DOSSIER PROFESSIONNEL (DP)" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Redige tout au long de la formation, en centre et en entreprise</li>
            <li>Reprend les activites-types du referentiel de certification</li>
            <li>Chaque activite illustree par des exemples concrets</li>
            <li>Doit etre complet, soigne et conforme au modele officiel</li>
          </ul>
        </InfoCard>
        <AlertBox variant="warning">
          Commencez la redaction de votre dossier professionnel des le debut de votre formation.
        </AlertBox>
        <SectionBanner title="EVALUATIONS EN COURS DE FORMATION (ECF)" />
        <InfoCard>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
            <li>Portent sur les competences definies dans le referentiel</li>
            <li>Epreuves ecrites, orales ou mises en situation</li>
            <li>Resultats consignes et transmis au jury de certification</li>
            <li>ECF non validees peuvent compromettre l&apos;obtention du diplome</li>
          </ul>
        </InfoCard>
        <SchemaCertification />
      </Section>

      {/* ═══════════════════ 16. EQUIPE ═══════════════════ */}
      <Section id="equipe" num={14} title="Equipe pedagogique et contacts">
        <p className="text-sm text-muted-foreground">Retrouvez ci-dessous les coordonnees de l&apos;equipe du CFA.</p>
        <p className="text-xs text-destructive mb-2 mt-2"><span className="font-bold">*</span> Champs obligatoires</p>

        <FormBlock title="DIRECTION">
          <DField l1="Nom" n1="equipe_dir_nom" l2="Prenom" n2="equipe_dir_prenom" data={data} update={update} req1 req2 />
          <Field label="Fonction" name="equipe_dir_fonction" data={data} update={update} />
          <DField l1="Telephone" n1="equipe_dir_tel" l2="E-mail" n2="equipe_dir_email" data={data} update={update} req1 req2 />
        </FormBlock>

        <FormBlock title="RESPONSABLE PEDAGOGIQUE">
          <DField l1="Nom" n1="equipe_resp_nom" l2="Prenom" n2="equipe_resp_prenom" data={data} update={update} req1 req2 />
          <Field label="Fonction" name="equipe_resp_fonction" data={data} update={update} />
          <DField l1="Telephone" n1="equipe_resp_tel" l2="E-mail" n2="equipe_resp_email" data={data} update={update} req1 req2 />
        </FormBlock>

        <FormBlock title="RESPONSABLE QUALITE">
          <DField l1="Nom" n1="equipe_qualite_nom" l2="Prenom" n2="equipe_qualite_prenom" data={data} update={update} />
          <DField l1="Telephone" n1="equipe_qualite_tel" l2="E-mail" n2="equipe_qualite_email" data={data} update={update} />
        </FormBlock>

        <FormBlock title="FORMATEUR REFERENT">
          <DField l1="Nom" n1="equipe_formateur_nom" l2="Prenom" n2="equipe_formateur_prenom" data={data} update={update} req1 req2 />
          <Field label="Matiere / Domaine" name="equipe_formateur_matiere" data={data} update={update} />
          <DField l1="Telephone" n1="equipe_formateur_tel" l2="E-mail" n2="equipe_formateur_email" data={data} update={update} req1 req2 />
        </FormBlock>

        <FormBlock title="CONTACTS UTILES DU CFA">
          <Field label="Accueil / Secretariat" name="equipe_accueil" data={data} update={update} />
          <Field label="Telephone standard" name="equipe_tel_standard" data={data} update={update} required />
          <Field label="E-mail general" name="equipe_email_general" data={data} update={update} required />
          <Field label="Adresse du CFA" name="equipe_adresse" data={data} update={update} required />
          <Field label="Horaires d'ouverture" name="equipe_horaires" data={data} update={update} />
        </FormBlock>
      </Section>

      {/* ═══════════════════ 15. SIGNATURES ═══════════════════ */}
      <Section id="signatures" num={15} title="Signatures et engagement">
        <p className="text-sm text-muted-foreground">
          En signant ce livret, chaque partie atteste avoir pris connaissance de l&apos;ensemble des informations
          et s&apos;engage a respecter les engagements qui lui incombent.
        </p>
        <AlertBox variant="info">
          La signature de ce livret conditionne la validation de l&apos;inscription definitive de l&apos;apprenti(e) au sein du CFA.
        </AlertBox>
        <SignatureCanvas
          label="SIGNATURE DE L'APPRENTI(E)"
          value={data.signature_apprenti}
          onSave={(dataUrl) => update("signature_apprenti", dataUrl)}
          color="bg-primary"
        />
        <SignatureCanvas
          label="SIGNATURE DU TUTEUR / MAITRE D'APPRENTISSAGE"
          value={data.signature_tuteur}
          onSave={(dataUrl) => update("signature_tuteur", dataUrl)}
          color="bg-primary"
        />
        <SignatureCanvas
          label="SIGNATURE DU RESPONSABLE DU CFA"
          value={data.signature_cfa}
          onSave={(dataUrl) => update("signature_cfa", dataUrl)}
          color="bg-primary"
        />
        <div className="mt-4 p-4 bg-muted rounded-md">
          <p className="text-xs text-muted-foreground italic text-center">
            Ce livret d&apos;accueil a ete remis a l&apos;apprenti(e) le jour de son integration au CFA.
            Un exemplaire signe est conserve dans le dossier de l&apos;apprenant(e).
          </p>
        </div>
      </Section>

      {/* Save bar */}
      <SaveBar requiredFields={[
        { name: "nom", label: "Nom" }, { name: "prenom", label: "Prenom" },
        { name: "date_naissance", label: "Date de naissance" }, { name: "email", label: "E-mail" },
        { name: "telephone", label: "Telephone" }, { name: "formation", label: "Formation" },
        { name: "signature_apprenti", label: "Signature apprenti(e)" },
      ]} />
    </div>
  );
}
