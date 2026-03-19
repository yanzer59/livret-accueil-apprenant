import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat, HeadingLevel,
  BorderStyle, WidthType, ShadingType, PageNumber, PageBreak,
  VerticalAlign, ImageRun,
} from "docx";
import type { Student } from "./supabase";

// ============ COLORS ============
const C = {
  primary: "1B4F72", secondary: "2E86C1", accent: "D4AC0D",
  green: "27AE60", red: "E74C3C", light: "EBF5FB",
  lightGold: "FEF9E7", dark: "1C2833", gray: "5D6D7E",
  white: "FFFFFF", lightGray: "F2F3F4", border: "BDC3C7",
};

const noBorder = { style: BorderStyle.NONE, size: 0, color: C.white };
const thinBorder = { style: BorderStyle.SINGLE, size: 1, color: C.border };
const cellM = { top: 60, bottom: 60, left: 100, right: 100 };

// ============ HELPERS ============
function banner(title: string, color: string) {
  return new Paragraph({
    spacing: { before: 240, after: 0 },
    shading: { fill: color, type: ShadingType.CLEAR },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color }, bottom: { style: BorderStyle.SINGLE, size: 1, color }, left: { style: BorderStyle.SINGLE, size: 1, color }, right: { style: BorderStyle.SINGLE, size: 1, color } },
    children: [new TextRun({ text: "   " + title, bold: true, size: 22, font: "Calibri", color: C.white })],
  });
}

function fieldRow(label: string, value: string, shading?: string) {
  return new TableRow({
    children: [
      new TableCell({
        borders: { top: noBorder, bottom: { style: BorderStyle.DOTTED, size: 1, color: C.border }, left: noBorder, right: noBorder },
        width: { size: 3200, type: WidthType.DXA },
        margins: { top: 50, bottom: 50, left: 100, right: 40 },
        shading: shading ? { fill: shading, type: ShadingType.CLEAR } : undefined,
        children: [new Paragraph({ children: [new TextRun({ text: label + " :", bold: true, size: 18, font: "Calibri", color: C.primary })] })],
      }),
      new TableCell({
        borders: { top: noBorder, bottom: { style: BorderStyle.DOTTED, size: 1, color: C.border }, left: noBorder, right: noBorder },
        width: { size: 6306, type: WidthType.DXA },
        margins: { top: 50, bottom: 50, left: 40, right: 100 },
        shading: shading ? { fill: shading, type: ShadingType.CLEAR } : undefined,
        children: [new Paragraph({ children: [new TextRun({ text: value || "", size: 18, font: "Calibri", color: C.dark })] })],
      }),
    ],
  });
}

function fieldTable(rows: TableRow[]) {
  return new Table({
    width: { size: 9506, type: WidthType.DXA },
    columnWidths: [3200, 6306],
    rows,
  });
}

function h1(text: string) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 300, after: 180 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 3, color: C.accent, space: 4 } },
    children: [new TextRun({ text, bold: true, size: 30, font: "Calibri", color: C.primary })],
  });
}

function para(text: string, opts?: { bold?: boolean; italic?: boolean; color?: string; size?: number }) {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    alignment: AlignmentType.JUSTIFIED,
    children: [new TextRun({ text, size: opts?.size || 20, font: "Calibri", color: opts?.color || C.dark, bold: opts?.bold, italics: opts?.italic })],
  });
}

function empty() { return new Paragraph({ spacing: { before: 40, after: 40 }, children: [] }); }
function pb() { return new Paragraph({ children: [new PageBreak()] }); }

function bullet(text: string) {
  return new Paragraph({
    numbering: { reference: "bullets", level: 0 },
    spacing: { before: 30, after: 30 },
    children: [new TextRun({ text, size: 18, font: "Calibri", color: C.dark })],
  });
}

function infoBox(text: string) {
  return new Paragraph({
    spacing: { before: 100, after: 100 },
    shading: { fill: C.light, type: ShadingType.CLEAR },
    border: { top: { style: BorderStyle.SINGLE, size: 1, color: C.light }, bottom: { style: BorderStyle.SINGLE, size: 1, color: C.light }, left: { style: BorderStyle.SINGLE, size: 1, color: C.light }, right: { style: BorderStyle.SINGLE, size: 1, color: C.light } },
    children: [new TextRun({ text: "   " + text, size: 18, font: "Calibri", color: C.primary })],
  });
}

// ============ MAIN EXPORT ============
export async function generateLivretDocx(data: Partial<Student>): Promise<Blob> {
  const v = (k: string) => (data[k as keyof Student] as string) || "";

  const doc = new Document({
    styles: {
      default: { document: { run: { font: "Calibri", size: 20 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
          run: { size: 30, bold: true, font: "Calibri", color: C.primary },
          paragraph: { spacing: { before: 300, after: 180 }, outlineLevel: 0 } },
      ],
    },
    numbering: {
      config: [{
        reference: "bullets",
        levels: [{ level: 0, format: LevelFormat.BULLET, text: "\u2022", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }],
      }],
    },
    sections: [
      // ======= COUVERTURE =======
      {
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 } } },
        children: [
          new Paragraph({ spacing: { before: 2400 }, children: [] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
            children: [new TextRun({ text: "LIVRET D'ACCUEIL", size: 56, bold: true, font: "Calibri", color: C.primary })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 100 },
            children: [new TextRun({ text: "DE L'APPRENANT", size: 48, bold: true, font: "Calibri", color: C.secondary })] }),
          new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: C.accent, space: 8 } },
            children: [new TextRun({ text: "Formation en alternance", size: 28, font: "Calibri", color: C.accent, italics: true })] }),
          new Paragraph({ spacing: { before: 600 }, children: [] }),
          // Student info
          new Table({
            width: { size: 5400, type: WidthType.DXA }, columnWidths: [2000, 3400], alignment: AlignmentType.CENTER,
            rows: [
              ["Nom", v("nom")], ["Prenom", v("prenom")], ["Formation", v("formation")],
              ["Diplome", v("diplome")], ["Entreprise", v("entreprise_nom")],
            ].map(([label, val]) => new TableRow({
              children: [
                new TableCell({ borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 1, color: C.lightGray }, left: noBorder, right: noBorder },
                  width: { size: 2000, type: WidthType.DXA }, margins: { top: 50, bottom: 50, left: 80, right: 80 },
                  children: [new Paragraph({ children: [new TextRun({ text: label, bold: true, size: 22, font: "Calibri", color: C.primary })] })] }),
                new TableCell({ borders: { top: noBorder, bottom: { style: BorderStyle.SINGLE, size: 1, color: C.border }, left: noBorder, right: noBorder },
                  width: { size: 3400, type: WidthType.DXA }, margins: { top: 50, bottom: 50, left: 80, right: 80 },
                  children: [new Paragraph({ children: [new TextRun({ text: val, size: 22, font: "Calibri", color: C.dark })] })] }),
              ],
            })),
          }),
          new Paragraph({ spacing: { before: 800 }, children: [] }),
          new Paragraph({ alignment: AlignmentType.CENTER,
            children: [new TextRun({ text: `Document genere le ${new Date().toLocaleDateString("fr-FR")}`, size: 18, font: "Calibri", color: C.gray, italics: true })] }),
        ],
      },
      // ======= CONTENU =======
      {
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1200, right: 1200, bottom: 1200, left: 1200 } } },
        headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT,
          border: { bottom: { style: BorderStyle.SINGLE, size: 2, color: C.accent, space: 4 } },
          children: [new TextRun({ text: `Livret d'accueil - ${v("prenom")} ${v("nom")}`, size: 16, font: "Calibri", color: C.gray, italics: true })] })] }) },
        footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
          border: { top: { style: BorderStyle.SINGLE, size: 1, color: C.border, space: 4 } },
          children: [new TextRun({ text: "Page ", size: 16, font: "Calibri", color: C.gray }), new TextRun({ children: [PageNumber.CURRENT], size: 16, font: "Calibri", color: C.gray })] })] }) },
        children: [
          // --- FICHE DE RENSEIGNEMENTS ---
          h1("1. Fiche de renseignements"),

          banner("APPRENANT(E)", C.primary),
          fieldTable([
            fieldRow("Nom", v("nom"), C.light), fieldRow("Prenom", v("prenom")),
            fieldRow("Date de naissance", v("date_naissance"), C.light), fieldRow("Adresse", v("adresse")),
            fieldRow("Telephone", v("telephone"), C.light), fieldRow("E-mail", v("email")),
            fieldRow("Formation", v("formation"), C.light), fieldRow("Diplome / Titre", v("diplome")),
          ]),
          empty(),

          banner("EN CAS D'URGENCE", C.red),
          fieldTable([
            fieldRow("Personne a contacter", v("urgence_contact"), "FDEDEC"),
            fieldRow("Telephone 1", v("urgence_tel1")), fieldRow("Telephone 2", v("urgence_tel2"), "FDEDEC"),
            fieldRow("Infos medicales", v("urgence_medical")),
          ]),
          empty(),

          banner("ENTREPRISE D'ACCUEIL", C.secondary),
          fieldTable([
            fieldRow("Raison sociale", v("entreprise_nom"), C.light), fieldRow("Adresse", v("entreprise_adresse")),
            fieldRow("Telephone", v("entreprise_tel"), C.light), fieldRow("E-mail", v("entreprise_email")),
            fieldRow("Activite", v("entreprise_activite"), C.light),
            fieldRow("Debut contrat", v("entreprise_debut")), fieldRow("Fin contrat", v("entreprise_fin"), C.light),
          ]),
          empty(),

          banner("MAITRE D'APPRENTISSAGE / TUTEUR", C.accent),
          fieldTable([
            fieldRow("Nom", v("ma_nom"), C.lightGold), fieldRow("Prenom", v("ma_prenom")),
            fieldRow("Poste", v("ma_poste"), C.lightGold),
            fieldRow("Telephone", v("ma_tel")), fieldRow("E-mail", v("ma_email"), C.lightGold),
          ]),

          pb(),

          // --- DROIT A L'IMAGE ---
          h1("2. Droit a l'image"),
          banner("AUTORISATION DE DROIT A L'IMAGE", C.primary),
          para("Dans le cadre de la communication du centre de formation, des photographies et videos peuvent etre realisees lors des sessions de formation, evenements et activites."),
          empty(),
          para(v("droit_image") === "accorde"
            ? "L'apprenant(e) ACCORDE au centre de formation la permission d'utiliser son image."
            : v("droit_image") === "refuse"
              ? "L'apprenant(e) N'ACCORDE PAS au centre de formation la permission d'utiliser son image."
              : "Aucun choix n'a ete effectue.",
            { bold: true, color: v("droit_image") === "accorde" ? C.green : v("droit_image") === "refuse" ? C.red : C.gray }),
          empty(),

          // --- ENGAGEMENTS ---
          pb(),
          h1("3. Engagements"),
          banner("ENGAGEMENTS DE L'APPRENTI", C.primary),
          para("En signant ce livret, l'apprenti s'engage a :"),
          bullet("S'impliquer dans les missions confiees"),
          bullet("Suivre assidument les cours et formations"),
          bullet("Prevenir immediatement en cas d'absence, avec justificatif"),
          bullet("Tenir a jour le livret d'apprentissage et le carnet de bord"),
          bullet("Respecter les reglements interieurs (entreprise et CFA)"),
          bullet("S'inscrire et se presenter a toutes les epreuves de certification"),
          empty(),

          banner("ENGAGEMENTS DU TUTEUR", C.accent),
          para("Le maitre d'apprentissage s'engage a :"),
          bullet("Accueillir l'apprenti et presenter l'entreprise"),
          bullet("Organiser le poste et decrire les taches confiees"),
          bullet("Contribuer a l'acquisition des competences requises"),
          bullet("Assurer la liaison avec le CFA"),
          empty(),

          banner("ENGAGEMENTS DU CFA", C.secondary),
          para("Le centre de formation s'engage a :"),
          bullet("Dispenser un enseignement conforme au referentiel"),
          bullet("Nommer un formateur referent pour chaque apprenti"),
          bullet("Organiser des bilans reguliers"),
          bullet("Veiller a la passation des examens"),

          // --- REGLEMENT ---
          pb(),
          h1("4. Reglement interieur (synthese)"),
          infoBox("Le reglement interieur complet est etabli conformement aux articles L.6352-3 et suivants du Code du travail."),
          empty(),
          banner("ASSIDUITE ET PONCTUALITE", C.primary),
          bullet("Presence obligatoire a toutes les sessions de formation"),
          bullet("Emargement obligatoire (papier ou numerique)"),
          bullet("Absence justifiee sous 48h (certificat medical, convocation...)"),
          bullet("Absences communiquees systematiquement a l'employeur"),
          empty(),
          banner("RESPECT ET COMPORTEMENT", C.secondary),
          bullet("Attitude respectueuse envers tous les membres de la communaute educative"),
          bullet("Toute forme de violence, harcelement ou discrimination est strictement interdite"),
          bullet("Tenue correcte et adaptee au cadre professionnel exigee"),
          empty(),
          banner("SANCTIONS DISCIPLINAIRES", C.red),
          bullet("1. Avertissement oral : prononce par le formateur referent"),
          bullet("2. Lettre d'avertissement : envoyee apres entretien disciplinaire"),
          bullet("3. Exclusion temporaire ou definitive : en cas de faute grave"),

          // --- CERTIFICATION ---
          pb(),
          h1("5. Certification et examens"),
          banner("MODALITES D'EVALUATION", C.secondary),
          bullet("Evaluations en cours de formation (ECF) tout au long du parcours"),
          bullet("Mises en situation professionnelle evaluees"),
          bullet("Constitution et presentation du dossier professionnel (DP)"),
          bullet("Controle continu des connaissances et competences"),
          empty(),
          banner("EXAMEN FINAL", C.primary),
          bullet("Convocation officielle envoyee au minimum 1 mois avant"),
          bullet("Epreuves ecrites, orales et/ou pratiques selon le titre vise"),
          bullet("Jury compose de professionnels et formateurs habilites"),
          empty(),
          infoBox("En cas de reussite, le diplome est delivre par l'autorite competente. En cas d'echec, des sessions de rattrapage sont possibles."),

          // --- SECURITE ---
          pb(),
          h1("6. Consignes de securite"),
          banner("EN CAS DE RISQUE MAJEUR", C.red),
          bullet("1. PROTEGER les personnes en danger immediat"),
          bullet("2. ALERTER les secours (18 ou 112)"),
          bullet("3. EVACUER par l'issue de secours la plus proche"),
          bullet("4. SE RASSEMBLER au point de rassemblement"),
          bullet("5. ATTENDRE les instructions"),
          empty(),
          banner("EN CAS D'INTRUSION", C.primary),
          bullet("1. S'ENFUIR si possible, sinon se barricader"),
          bullet("2. SE CACHER dans un local sur"),
          bullet("3. SILENCE - eteindre lumieres et appareils"),
          bullet("4. S'ABRITER derriere un obstacle solide"),
          bullet("5. ATTENDRE les forces d'intervention"),

          // --- RGPD ---
          pb(),
          h1("7. Protection des donnees personnelles"),
          para("Conformement au RGPD, le centre de formation collecte et traite des donnees personnelles dans le cadre de la gestion administrative et pedagogique."),
          empty(),
          para("Vous disposez des droits suivants :", { bold: true }),
          bullet("Droit d'acces : obtenir une copie de vos donnees"),
          bullet("Droit de rectification : demander la modification de vos informations"),
          bullet("Droit d'opposition : vous opposer au traitement de vos donnees"),
          empty(),
          infoBox("Pour exercer vos droits, contactez l'administration du centre. En cas de litige, saisir la CNIL (www.cnil.fr)."),

          // --- SIGNATURES ---
          pb(),
          h1("8. Signatures"),
          para("En signant ce livret, chaque partie reconnait avoir pris connaissance de l'ensemble de son contenu et s'engage a respecter les regles et engagements definis."),
          empty(),

          // Signature apprenti
          banner("SIGNATURE DE L'APPRENTI(E)", C.secondary),
          ...(v("signature_apprenti") ? [
            new Paragraph({ spacing: { before: 100, after: 100 }, children: [
              new ImageRun({ type: "png", data: Buffer.from(v("signature_apprenti").split(",")[1], "base64"),
                transformation: { width: 250, height: 100 },
                altText: { title: "Signature", description: "Signature apprenti", name: "sig" } }),
            ] }),
          ] : [para("(Non signe)", { italic: true, color: C.gray })]),
          empty(),

          // Signature tuteur
          banner("SIGNATURE DU TUTEUR", C.accent),
          ...(v("signature_tuteur") ? [
            new Paragraph({ spacing: { before: 100, after: 100 }, children: [
              new ImageRun({ type: "png", data: Buffer.from(v("signature_tuteur").split(",")[1], "base64"),
                transformation: { width: 250, height: 100 },
                altText: { title: "Signature", description: "Signature tuteur", name: "sig2" } }),
            ] }),
          ] : [para("(Non signe)", { italic: true, color: C.gray })]),
          empty(),

          // Signature CFA
          banner("SIGNATURE DU RESPONSABLE CFA", C.primary),
          ...(v("signature_cfa") ? [
            new Paragraph({ spacing: { before: 100, after: 100 }, children: [
              new ImageRun({ type: "png", data: Buffer.from(v("signature_cfa").split(",")[1], "base64"),
                transformation: { width: 250, height: 100 },
                altText: { title: "Signature", description: "Signature CFA", name: "sig3" } }),
            ] }),
          ] : [para("(Non signe)", { italic: true, color: C.gray })]),
          empty(),

          para(`Fait le ${new Date().toLocaleDateString("fr-FR")}`, { italic: true, color: C.gray }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBlob(doc);
  return buffer;
}
