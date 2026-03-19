"use client";
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { getSupabase } from "@/lib/supabase";
import type { Student } from "@/lib/supabase";

interface StudentContextType {
  data: Partial<Student>;
  loading: boolean;
  update: (field: string, value: string) => void;
  save: () => Promise<void>;
  saving: boolean;
  saved: boolean;
}

const StudentContext = createContext<StudentContextType | null>(null);

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error("useStudent must be used inside StudentProvider");
  return ctx;
}

export function StudentProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Partial<Student>>({});
  const [studentId, setStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Au chargement : trouver ou creer la fiche etudiant liee au user connecte
  const loadStudent = useCallback(async () => {
    try {
      const { data: { user } } = await getSupabase().auth.getUser();
      if (!user) return;

      // Chercher une fiche existante pour ce user
      const { data: existing } = await getSupabase()
        .from("students")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (existing) {
        setData(existing);
        setStudentId(existing.id);
      } else {
        // Creer une fiche vide pour ce user
        const { data: created } = await getSupabase()
          .from("students")
          .insert({ user_id: user.id, email: user.email })
          .select("*")
          .single();

        if (created) {
          setData(created);
          setStudentId(created.id);
        }
      }
    } catch {
      // Pas connecte ou erreur
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  function update(field: string, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  async function save() {
    if (!studentId) return;
    setSaving(true);
    const { id, token, created_at, user_id, ...updateData } = data as Student & { user_id?: string };
    void id; void token; void created_at; void user_id;

    await getSupabase()
      .from("students")
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq("id", studentId);

    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <StudentContext.Provider value={{ data, loading, update, save, saving, saved }}>
      {children}
    </StudentContext.Provider>
  );
}
