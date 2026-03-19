"use client";
import { useStudent } from "@/lib/StudentContext";

export default function SaveBar() {
  const { save, saving, saved } = useStudent();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 py-3 px-4 z-50 lg:pl-76">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          {saved && <span className="text-green-600 font-medium text-sm">Enregistre !</span>}
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="bg-[#1B4F72] hover:bg-[#2E86C1] text-white font-bold px-6 py-2.5 rounded-lg shadow transition-colors disabled:opacity-50 text-sm"
        >
          {saving ? "Enregistrement..." : "Enregistrer mes informations"}
        </button>
      </div>
    </div>
  );
}
