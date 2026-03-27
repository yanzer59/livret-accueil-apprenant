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
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border py-3 px-4 z-50 md:pl-68">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
        <div className="min-w-0">
          {validationError && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span className="truncate">{validationError}</span>
            </div>
          )}
          {saved && !validationError && (
            <div className="flex items-center gap-2 text-success text-sm">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              <span>Informations enregistrees avec succes</span>
            </div>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-md bg-primary text-primary-foreground text-sm font-medium h-9 px-4 hover:bg-primary/90 transition-colors disabled:opacity-50 shrink-0"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Enregistrement...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Enregistrer
            </>
          )}
        </button>
      </div>
    </div>
  );
}
