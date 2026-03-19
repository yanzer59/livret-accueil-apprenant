/* Schemas visuels en HTML/CSS pur - remplacement des images PNG floues */

export function SchemaTimeline() {
  const steps = [
    { num: 1, title: "Accueil & positionnement", color: "bg-[#1B4F72]" },
    { num: 2, title: "Integration en entreprise", color: "bg-[#2E86C1]" },
    { num: 3, title: "Formation en centre (CFA)", color: "bg-[#1B4F72]" },
    { num: 4, title: "Mise en pratique entreprise", color: "bg-[#2E86C1]" },
    { num: 5, title: "Suivi & evaluations (ECF)", color: "bg-[#D4AC0D]" },
    { num: 6, title: "Visites en entreprise", color: "bg-[#1B4F72]" },
    { num: 7, title: "Preparation certification", color: "bg-[#2E86C1]" },
    { num: 8, title: "Certification & diplome", color: "bg-[#27AE60]" },
  ];

  return (
    <div className="my-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {steps.map((s) => (
          <div key={s.num} className="flex flex-col items-center">
            <div className={`${s.color} text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold shadow-md`}>
              {s.num}
            </div>
            <div className="w-0.5 h-3 bg-gray-300"></div>
            <div className={`${s.color} text-white text-xs font-semibold text-center px-3 py-2.5 rounded-lg shadow-sm w-full min-h-[52px] flex items-center justify-center`}>
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
    { title: "APPRENTI(E)", color: "border-[#D4AC0D]", bg: "bg-[#FEF9E7]", headerBg: "bg-[#D4AC0D]",
      items: ["Se former et monter en competences", "Respecter le reglement et le contrat", "Preparer sa certification"] },
    { title: "CENTRE DE FORMATION (CFA)", color: "border-[#1B4F72]", bg: "bg-[#EBF5FB]", headerBg: "bg-[#1B4F72]",
      items: ["Former et evaluer", "Accompagner et suivre", "Organiser les examens"] },
    { title: "ENTREPRISE D'ACCUEIL", color: "border-[#2E86C1]", bg: "bg-[#EBF5FB]", headerBg: "bg-[#2E86C1]",
      items: ["Accueillir et encadrer", "Confier des missions professionnelles", "Evaluer la progression"] },
  ];

  return (
    <div className="my-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {acteurs.map((a) => (
          <div key={a.title} className={`border-2 ${a.color} rounded-lg overflow-hidden shadow-sm`}>
            <div className={`${a.headerBg} text-white text-xs font-bold text-center py-2.5 px-2`}>{a.title}</div>
            <div className={`${a.bg} p-3`}>
              <ul className="space-y-1.5">
                {a.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-700">
                    <span className={`w-1.5 h-1.5 rounded-full ${a.headerBg} mt-1.5 shrink-0`}></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      {/* Relations */}
      <div className="grid grid-cols-3 gap-4 mt-3">
        <p className="text-center text-[11px] text-gray-400 italic">Suivi & bilan</p>
        <p className="text-center text-[11px] text-gray-400 italic">Coordination & liaison</p>
        <p className="text-center text-[11px] text-gray-400 italic">Visites & evaluation</p>
      </div>
    </div>
  );
}

export function SchemaCertification() {
  const steps = [
    { title: "Livret ECF", desc: "Evaluations en cours de formation", color: "bg-[#1B4F72]" },
    { title: "Dossier Professionnel", desc: "Missions et activites en entreprise", color: "bg-[#2E86C1]" },
    { title: "Preparation epreuves", desc: "Examens blancs, simulations, relectures", color: "bg-[#D4AC0D]" },
    { title: "Passage de l'examen", desc: "Ecrit, oral, epreuve pratique, jury", color: "bg-[#1B4F72]" },
    { title: "Resultats", desc: "Diplome delivre ou rattrapage possible", color: "bg-[#27AE60]" },
  ];

  return (
    <div className="my-6">
      <div className="flex flex-col sm:flex-row items-stretch gap-0">
        {steps.map((s, i) => (
          <div key={s.title} className="flex items-center flex-1">
            <div className={`${s.color} text-white rounded-lg shadow-sm p-3 flex-1 min-h-[90px] flex flex-col justify-center`}>
              <p className="font-bold text-sm">{s.title}</p>
              <p className="text-xs opacity-80 mt-1">{s.desc}</p>
            </div>
            {i < steps.length - 1 && (
              <div className="hidden sm:flex items-center px-1">
                <svg className="w-5 h-5 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 bg-[#EBF5FB] border border-[#1B4F72]/20 rounded-lg p-3 text-center">
        <p className="text-xs text-[#1B4F72] font-medium">Documents complementaires possibles selon le titre professionnel :</p>
        <p className="text-[10px] text-gray-500 mt-1">Dossier projet &middot; Fiches produits/techniques &middot; Tableaux de suivi &middot; Support de presentation &middot; Portfolio</p>
      </div>
    </div>
  );
}
