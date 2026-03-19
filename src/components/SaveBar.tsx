"use client";
import { useStudent } from "@/lib/StudentContext";
import { useState } from "react";

export interface RequiredField {
  name: string;
  label: string;
}

export default function SaveBar({ requiredFields = [] }: { requiredFields?: RequiredField[] }) {
  const { data, save, saving, saved } = useStudent();
  const [validationError, setValidationError] = useState<string | null>(null);

  async function handleSave() {
    // Check required fields
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
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-gray-200 py-3 px-4 z-50 lg:pl-76">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div>
          {validationError && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
              <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-red-700 font-medium text-xs">{validationError}</span>
            </div>
          )}
          {saved && !validationError && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
              <svg className="w-5 h-5 text-green-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span className="text-green-700 font-medium text-sm">Vos informations ont ete enregistrees avec succes !</span>
            </div>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-[#1B4F72] hover:bg-[#2E86C1] text-white font-bold px-6 py-2.5 rounded-lg shadow transition-colors disabled:opacity-50 text-sm flex items-center gap-2"
        >
          {saving ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Enregistrement...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Enregistrer mes informations
            </>
          )}
        </button>
      </div>
    </div>
  );
}
