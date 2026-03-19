import Link from "next/link";
import { sections } from "@/lib/sections";

const colorMap: Record<number, string> = {
  1: "bg-primary", 2: "bg-secondary", 3: "bg-primary", 4: "bg-accent",
  5: "bg-secondary", 6: "bg-primary", 7: "bg-secondary", 8: "bg-primary",
  9: "bg-accent", 10: "bg-secondary", 11: "bg-red", 12: "bg-primary",
  13: "bg-secondary", 14: "bg-accent", 15: "bg-primary", 16: "bg-secondary",
  17: "bg-accent", 18: "bg-primary",
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary mb-3">Livret d&apos;accueil de l&apos;apprenant</h1>
        <p className="text-xl text-accent font-medium italic mb-2">Formation en alternance</p>
        <div className="w-40 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-gray-text max-w-2xl mx-auto">
          Ce livret est votre document de reference tout au long de votre parcours en alternance.
          Retrouvez toutes les informations essentielles pour bien comprendre votre formation,
          vos droits et devoirs, et le role de chaque acteur implique dans votre reussite.
        </p>
      </div>

      {/* Cards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((s) => (
          <Link
            key={s.id}
            href={`/${s.id}`}
            className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden"
          >
            <div className={`${colorMap[s.num] || "bg-primary"} h-1.5 group-hover:h-2 transition-all`}></div>
            <div className="p-4 flex items-start gap-3">
              <span className={`${colorMap[s.num] || "bg-primary"} text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0`}>
                {s.num}
              </span>
              <div>
                <h3 className="font-semibold text-dark text-sm group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-10 text-center text-sm text-gray-text">
        <p>Document confidentiel - Usage interne</p>
      </div>
    </div>
  );
}
