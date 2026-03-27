export interface Section {
  id: string;
  num: number;
  title: string;
  shortTitle: string;
  icon: string; // lucide icon name
}

export const sections: Section[] = [
  { id: "bienvenue", num: 1, title: "Bienvenue dans votre formation", shortTitle: "Bienvenue", icon: "HandHeart" },
  { id: "renseignements", num: 2, title: "Fiche de renseignements", shortTitle: "Renseignements", icon: "UserRound" },
  { id: "contrat", num: 3, title: "Le contrat d'apprentissage en bref", shortTitle: "Contrat", icon: "FileText" },
  { id: "parcours", num: 4, title: "Votre annee de formation", shortTitle: "Parcours", icon: "GraduationCap" },
  { id: "engagements", num: 5, title: "Engagements des parties", shortTitle: "Engagements", icon: "Handshake" },
  { id: "reglement", num: 6, title: "Reglement interieur", shortTitle: "Reglement", icon: "Scale" },
  { id: "certification", num: 7, title: "Certification et examens", shortTitle: "Certification", icon: "Award" },
  { id: "handicap", num: 8, title: "Accessibilite et handicap", shortTitle: "Handicap", icon: "Accessibility" },
  { id: "securite", num: 9, title: "Consignes de securite", shortTitle: "Securite", icon: "ShieldCheck" },
  { id: "droit-image", num: 10, title: "Droit a l'image", shortTitle: "Droit image", icon: "Camera" },
  { id: "rgpd", num: 11, title: "Protection des donnees personnelles", shortTitle: "RGPD", icon: "Lock" },
  { id: "charte", num: 12, title: "Charte de la formation", shortTitle: "Charte", icon: "ScrollText" },
  { id: "dossier-pro", num: 13, title: "Dossier Professionnel et certification", shortTitle: "Dossier Pro", icon: "FolderOpen" },
  { id: "equipe", num: 14, title: "Equipe pedagogique", shortTitle: "Equipe", icon: "Users" },
  { id: "signatures", num: 15, title: "Signatures", shortTitle: "Signatures", icon: "PenTool" },
];
