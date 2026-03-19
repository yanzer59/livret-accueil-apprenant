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
  // Handicap (onglet 8)
  handicap_referent_nom: string | null;
  handicap_referent_fonction: string | null;
  handicap_referent_tel: string | null;
  handicap_referent_email: string | null;
  handicap_referent_dispo: string | null;
  // Equipe (onglet 16)
  equipe_dir_nom: string | null;
  equipe_dir_prenom: string | null;
  equipe_dir_fonction: string | null;
  equipe_dir_tel: string | null;
  equipe_dir_email: string | null;
  equipe_resp_nom: string | null;
  equipe_resp_prenom: string | null;
  equipe_resp_fonction: string | null;
  equipe_resp_tel: string | null;
  equipe_resp_email: string | null;
  equipe_qualite_nom: string | null;
  equipe_qualite_prenom: string | null;
  equipe_qualite_tel: string | null;
  equipe_qualite_email: string | null;
  equipe_formateur_nom: string | null;
  equipe_formateur_prenom: string | null;
  equipe_formateur_matiere: string | null;
  equipe_formateur_tel: string | null;
  equipe_formateur_email: string | null;
  equipe_accueil: string | null;
  equipe_tel_standard: string | null;
  equipe_email_general: string | null;
  equipe_adresse: string | null;
  equipe_horaires: string | null;
  // Liaison (onglet 17)
  liaison_date_visite: string | null;
  liaison_mission: string | null;
  liaison_activites: string | null;
  liaison_outils: string | null;
  liaison_autonomie: string | null;
  liaison_difficultes: string | null;
  liaison_comp_techniques: string | null;
  liaison_comp_relationnelles: string | null;
  liaison_comp_organisationnelles: string | null;
  liaison_points_forts: string | null;
  liaison_axes_amelioration: string | null;
  liaison_obs_tuteur: string | null;
  liaison_obs_formateur: string | null;
  liaison_obs_apprenti: string | null;
  liaison_objectifs: string | null;
  liaison_actions_correctives: string | null;
}
