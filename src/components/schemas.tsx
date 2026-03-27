/* Schemas visuels — style document */

export function SchemaActeurs() {
  const acteurs = [
    { title: "APPRENTI(E)", items: ["Se former et monter en competences", "Respecter le reglement et le contrat", "Preparer sa certification"] },
    { title: "CENTRE DE FORMATION (CFA)", items: ["Former et evaluer", "Accompagner et suivre", "Organiser les examens"] },
    { title: "ENTREPRISE D'ACCUEIL", items: ["Accueillir et encadrer", "Confier des missions professionnelles", "Evaluer la progression"] },
  ];

  return (
    <div className="my-4 grid grid-cols-1 md:grid-cols-3 gap-6">
      {acteurs.map((a) => (
        <div key={a.title}>
          <h4 className="text-xs font-bold text-primary uppercase tracking-wide mb-2 border-b border-primary pb-1">{a.title}</h4>
          <ul className="space-y-1">
            {a.items.map((item, i) => (
              <li key={i} className="text-sm text-muted-foreground pl-3 border-l-2 border-gray-200 py-0.5">
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function SchemaCertification() {
  const steps = [
    { num: 1, title: "Livret ECF", desc: "Evaluations en cours de formation" },
    { num: 2, title: "Dossier Professionnel", desc: "Missions et activites en entreprise" },
    { num: 3, title: "Preparation epreuves", desc: "Examens blancs, simulations" },
    { num: 4, title: "Passage examen", desc: "Ecrit, oral, epreuve pratique" },
    { num: 5, title: "Resultats", desc: "Diplome delivre ou rattrapage" },
  ];

  return (
    <div className="my-4">
      {steps.map((s) => (
        <div key={s.num} className="flex gap-3 py-2 border-b border-gray-100 last:border-0">
          <span className="text-sm font-bold text-primary shrink-0 w-5 text-right">{s.num}.</span>
          <div>
            <span className="font-semibold text-sm text-foreground">{s.title}</span>
            <span className="text-sm text-muted-foreground ml-1.5">— {s.desc}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
