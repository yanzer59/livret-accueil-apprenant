export interface Section {
  id: string;
  num: number;
  title: string;
  shortTitle: string;
}

export const sections: Section[] = [
  { id: "bienvenue", num: 1, title: "Bienvenue dans votre formation", shortTitle: "Bienvenue" },
  { id: "renseignements", num: 2, title: "Fiche de renseignements", shortTitle: "Renseignements" },
  { id: "contrat", num: 3, title: "Le contrat d'apprentissage en bref", shortTitle: "Contrat" },
  { id: "parcours", num: 4, title: "Votre annee de formation", shortTitle: "Parcours" },
  { id: "engagements", num: 5, title: "Engagements des parties", shortTitle: "Engagements" },
  { id: "reglement", num: 6, title: "Reglement interieur", shortTitle: "Reglement" },
  { id: "certification", num: 7, title: "Certification et examens", shortTitle: "Certification" },
  { id: "handicap", num: 8, title: "Accessibilite et handicap", shortTitle: "Handicap" },
  { id: "aides", num: 9, title: "Aides aux apprentis", shortTitle: "Aides" },
  { id: "partenaires", num: 10, title: "Partenaires et ressources utiles", shortTitle: "Partenaires" },
  { id: "securite", num: 11, title: "Consignes de securite", shortTitle: "Securite" },
  { id: "droit-image", num: 12, title: "Droit a l'image", shortTitle: "Droit image" },
  { id: "rgpd", num: 13, title: "Protection des donnees personnelles", shortTitle: "RGPD" },
  { id: "charte", num: 14, title: "Charte de la formation", shortTitle: "Charte" },
  { id: "dossier-pro", num: 15, title: "Dossier Professionnel et certification", shortTitle: "Dossier Pro" },
  { id: "equipe", num: 16, title: "Equipe pedagogique", shortTitle: "Equipe" },
  { id: "liaison", num: 17, title: "Fiche de liaison Entreprise-CFA", shortTitle: "Liaison" },
  { id: "signatures", num: 18, title: "Signatures", shortTitle: "Signatures" },
];
