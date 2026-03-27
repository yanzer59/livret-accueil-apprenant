/* Schemas visuels en HTML/CSS pur */

export function SchemaTimeline() {
  const steps = [
    { num: 1, title: "Accueil & positionnement" },
    { num: 2, title: "Integration en entreprise" },
    { num: 3, title: "Formation en centre (CFA)" },
    { num: 4, title: "Mise en pratique entreprise" },
    { num: 5, title: "Suivi & evaluations (ECF)" },
    { num: 6, title: "Visites en entreprise" },
    { num: 7, title: "Preparation certification" },
    { num: 8, title: "Certification & diplome" },
  ];

  return (
    <div className="my-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((s) => (
          <div key={s.num} className="flex flex-col items-center">
            <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold">
              {s.num}
            </div>
            <div className="w-px h-2 bg-border"></div>
            <div className="bg-primary text-primary-foreground text-xs font-medium text-center px-2 py-2 rounded-md w-full min-h-[44px] flex items-center justify-center">
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SchemaActeurs() {
  const acteurs = [
    { title: "APPRENTI(E)", items: ["Se former et monter en competences", "Respecter le reglement et le contrat", "Preparer sa certification"] },
    { title: "CENTRE DE FORMATION (CFA)", items: ["Former et evaluer", "Accompagner et suivre", "Organiser les examens"] },
    { title: "ENTREPRISE D'ACCUEIL", items: ["Accueillir et encadrer", "Confier des missions professionnelles", "Evaluer la progression"] },
  ];

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {acteurs.map((a) => (
          <div key={a.title} className="rounded-md border border-border overflow-hidden">
            <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-2.5 px-2">{a.title}</div>
            <div className="p-3">
              <ul className="space-y-1.5">
                {a.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SchemaCertification() {
  const steps = [
    { title: "Livret ECF", desc: "Evaluations en cours de formation" },
    { title: "Dossier Professionnel", desc: "Missions et activites en entreprise" },
    { title: "Preparation epreuves", desc: "Examens blancs, simulations" },
    { title: "Passage examen", desc: "Ecrit, oral, epreuve pratique" },
    { title: "Resultats", desc: "Diplome delivre ou rattrapage" },
  ];

  return (
    <div className="my-6">
      <div className="flex flex-col sm:flex-row items-stretch gap-0">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center flex-1">
            <div className="bg-primary text-primary-foreground rounded-md p-3 flex-1 min-h-[80px] flex flex-col justify-center">
              <p className="font-semibold text-sm">{s.title}</p>
              <p className="text-xs opacity-80 mt-0.5">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden sm:flex items-center px-0.5">
                <svg className="w-4 h-4 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
