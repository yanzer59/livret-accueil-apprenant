"use client";
import { useStudent } from "@/lib/StudentContext";
import { useState } from "react";
import { Save, Loader2, AlertTriangle, CheckCircle2 } from "lucide-react";

export interface RequiredField {
  name: string;
  label: string;
}

export default function SaveBar({ requiredFields = [] }: { requiredFields?: RequiredField[] }) {
  const { data, save, saving, saved } = useStudent();
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSave() {
    const missing = requiredFields.filter((f) => {
      const val = (data as Record<string, unknown>)[f.name];
      return !val || (typeof val === "string" && !val.trim());
    });

    if (missing.length > 0) {
      const names = missing.map((f) => f.label).join(", ");
      setValidationError(`Champs obligatoires manquants : ${names}`);
      setTimeout(() => setValidationError(null), 5000);
      return;
    }

    setValidationError(null);
    await save();
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {validationError && (
        <div className="bg-white border border-red-200 shadow-lg px-4 py-2 text-[12px] text-red-600 flex items-center gap-2 max-w-xs">
          <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">{validationError}</span>
        </div>
      )}
      {saved && !validationError && (
        <div className="bg-white border border-emerald-200 shadow-lg px-4 py-2 text-[12px] text-emerald-600 flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
          Enregistre
        </div>
      )}
      <button
        onClick={handleSave}
        disabled={saving}
        className="inline-flex items-center gap-2 bg-primary text-white text-[12px] font-semibold uppercase tracking-wide h-10 px-5 hover:bg-primary/90 transition-colors disabled:opacity-50 shadow-lg"
      >
        {saving ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Save className="h-4 w-4" />
        )}
        {saving ? "..." : "Enregistrer"}
      </button>
    </div>
  );
}
