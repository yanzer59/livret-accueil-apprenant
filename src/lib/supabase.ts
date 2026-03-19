import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (_supabase) return _supabase;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
  if (!url || !key) {
    throw new Error("Supabase non configure. Ajoutez NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY dans .env.local");
  }
  _supabase = createClient(url, key);
  return _supabase;
}

export interface Student {
  id: string;
  user_id: string | null;
  token: string;
  created_at: string;
  updated_at: string;
  nom: string | null;
  prenom: string | null;
  date_naissance: string | null;
  adresse: string | null;
  telephone: string | null;
  email: string | null;
  formation: string | null;
  diplome: string | null;
  urgence_contact: string | null;
  urgence_tel1: string | null;
  urgence_tel2: string | null;
  urgence_medical: string | null;
  entreprise_nom: string | null;
  entreprise_adresse: string | null;
  entreprise_tel: string | null;
  entreprise_email: string | null;
  entreprise_activite: string | null;
  entreprise_debut: string | null;
  entreprise_fin: string | null;
  ma_nom: string | null;
  ma_prenom: string | null;
  ma_poste: string | null;
  ma_tel: string | null;
  ma_email: string | null;
  resp1_nom: string | null;
  resp1_prenom: string | null;
  resp1_adresse: string | null;
  resp1_tel: string | null;
  resp1_email: string | null;
  resp2_nom: string | null;
  resp2_prenom: string | null;
  resp2_adresse: string | null;
  resp2_tel: string | null;
  resp2_email: string | null;
  // Droit a l'image
  droit_image: string | null; // "accorde" | "refuse" | null
  // Signatures (base64 PNG)
  signature_apprenti: string | null;
  signature_tuteur: string | null;
  signature_cfa: string | null;
}
