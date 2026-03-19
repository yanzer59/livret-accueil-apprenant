"use client";
import { useStudent } from "@/lib/StudentContext";
import { useState } from "react";

/* ─── Types for jspdf-autotable ─── */
interface AutoTableColumn {
  header: string;
  dataKey: string;
}

interface AutoTableStyles {
  fillColor?: [number, number, number];
  textColor?: [number, number, number] | number;
  fontStyle?: string;
  fontSize?: number;
  cellPadding?: number;
  halign?: string;
  valign?: string;
}

interface AutoTableOptions {
  startY: number;
  head?: string[][];
  body: string[][];
  columns?: AutoTableColumn[];
  theme?: string;
  headStyles?: AutoTableStyles;
  bodyStyles?: AutoTableStyles;
  alternateRowStyles?: AutoTableStyles;
  columnStyles?: Record<number, Partial<AutoTableStyles>>;
  styles?: Partial<AutoTableStyles>;
  margin?: { left: number; right: number };
  tableWidth?: string | number;
  didDrawPage?: (data: { cursor: { y: number } }) => void;
}

interface JsPDFWithAutoTable {
  autoTable: (options: AutoTableOptions) => void;
  lastAutoTable: { finalY: number };
}

/* ─── Field config for tracking completeness ─── */
const fieldGroups = [
  {
    title: "Apprenant(e)",
    fields: [
      { key: "nom", label: "Nom" },
      { key: "prenom", label: "Prenom" },
      { key: "date_naissance", label: "Date de naissance" },
      { key: "adresse", label: "Adresse" },
      { key: "telephone", label: "Telephone" },
      { key: "email", label: "E-mail" },
      { key: "formation", label: "Formation" },
      { key: "diplome", label: "Diplome" },
    ],
  },
  {
    title: "Urgence",
    fields: [
      { key: "urgence_contact", label: "Contact urgence" },
      { key: "urgence_tel1", label: "Telephone urgence 1" },
    ],
  },
  {
    title: "Entreprise",
    fields: [
      { key: "entreprise_nom", label: "Raison sociale" },
      { key: "entreprise_adresse", label: "Adresse entreprise" },
      { key: "entreprise_tel", label: "Telephone entreprise" },
      { key: "entreprise_email", label: "E-mail entreprise" },
      { key: "entreprise_activite", label: "Activite" },
      { key: "entreprise_debut", label: "Debut contrat" },
      { key: "entreprise_fin", label: "Fin contrat" },
    ],
  },
  {
    title: "Maitre d&apos;apprentissage",
    fields: [
      { key: "ma_nom", label: "Nom tuteur" },
      { key: "ma_prenom", label: "Prenom tuteur" },
      { key: "ma_poste", label: "Poste tuteur" },
      { key: "ma_tel", label: "Telephone tuteur" },
      { key: "ma_email", label: "E-mail tuteur" },
    ],
  },
  {
    title: "Droit a l&apos;image",
    fields: [
      { key: "droit_image", label: "Choix droit image" },
    ],
  },
  {
    title: "Signatures",
    fields: [
      { key: "signature_apprenti", label: "Signature apprenti(e)" },
      { key: "signature_tuteur", label: "Signature tuteur" },
      { key: "signature_cfa", label: "Signature CFA" },
    ],
  },
];

/* ─── Color constants ─── */
const PRIMARY: [number, number, number] = [27, 79, 114];
const SECONDARY: [number, number, number] = [46, 134, 193];
const ACCENT: [number, number, number] = [212, 172, 13];
const GREEN: [number, number, number] = [39, 174, 96];
const RED: [number, number, number] = [231, 76, 60];
const LIGHT_BG: [number, number, number] = [241, 248, 252];

export default function Page() {
  const { data, loading } = useStudent();
  const [generating, setGenerating] = useState(false);

  const v = (key: string): string => (data[key as keyof typeof data] as string) || "";

  /* Compute completion stats */
  const allFields = fieldGroups.flatMap((g) => g.fields);
  const filledFields = allFields.filter((f) => {
    const val = v(f.key);
    return val && val.trim().length > 0;
  });
  const totalFields = allFields.length;
  const filledCount = filledFields.length;
  const percentage = totalFields > 0 ? Math.round((filledCount / totalFields) * 100) : 0;

  async function generatePDF() {
    setGenerating(true);
    try {
      const jsPDF = (await import("jspdf")).default;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" }) as any;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 20;

      // Helper: draw a simple table without autotable
      function drawTable(startY: number, title: string, titleColor: [number,number,number], rows: [string,string][]) {
        let y = startY;
        const colW = (pageWidth - margin * 2);
        const labelW = 55;

        // Header
        doc.setFillColor(...titleColor);
        doc.rect(margin, y, colW, 8, "F");
        doc.setTextColor(255,255,255);
        doc.setFontSize(9);
        doc.setFont("helvetica","bold");
        doc.text(title, margin + 3, y + 5.5);
        y += 8;

        // Rows
        for (let i = 0; i < rows.length; i++) {
          if (y > pageHeight - 20) { doc.addPage(); y = 20; }
          const bg = i % 2 === 0 ? [245,248,252] : [255,255,255];
          doc.setFillColor(bg[0],bg[1],bg[2]);
          doc.rect(margin, y, colW, 7, "F");
          doc.setDrawColor(220,220,220);
          doc.rect(margin, y, colW, 7, "S");

          doc.setTextColor(27,79,114);
          doc.setFontSize(8);
          doc.setFont("helvetica","bold");
          doc.text(rows[i][0], margin + 2, y + 5);

          doc.setTextColor(50,50,50);
          doc.setFont("helvetica","normal");
          doc.text(rows[i][1], margin + labelW, y + 5);
          y += 7;
        }
        return y + 4;
      }

      /* ========================
         PAGE 1 : COVER
         ======================== */
      // Background header block
      doc.setFillColor(...PRIMARY);
      doc.rect(0, 0, pageWidth, 100, "F");

      // Accent line
      doc.setFillColor(...ACCENT);
      doc.rect(0, 100, pageWidth, 4, "F");

      // Title
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(28);
      doc.setFont("helvetica", "bold");
      doc.text("LIVRET D'ACCUEIL", pageWidth / 2, 40, { align: "center" });
      doc.setFontSize(22);
      doc.text("DE L'APPRENANT", pageWidth / 2, 55, { align: "center" });

      // Student info box
      const studentName = `${v("prenom")} ${v("nom")}`.trim() || "Non renseigne";
      const studentFormation = v("formation") || "Non renseignee";

      doc.setFillColor(255, 255, 255);
      doc.roundedRect(margin, 120, pageWidth - margin * 2, 60, 3, 3, "F");
      doc.setDrawColor(...SECONDARY);
      doc.setLineWidth(0.5);
      doc.roundedRect(margin, 120, pageWidth - margin * 2, 60, 3, 3, "S");

      doc.setTextColor(...PRIMARY);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text("Apprenant(e)", pageWidth / 2, 135, { align: "center" });
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(studentName, pageWidth / 2, 150, { align: "center" });
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...SECONDARY);
      doc.text(studentFormation, pageWidth / 2, 165, { align: "center" });

      // Date
      const today = new Date().toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
      doc.setFontSize(10);
      doc.setTextColor(120, 120, 120);
      doc.text(`Document genere le ${today}`, pageWidth / 2, pageHeight - 20, { align: "center" });

      /* ========================
         PAGE 2 : FICHE DE RENSEIGNEMENTS
         ======================== */
      doc.addPage();

      // Page title
      doc.setFillColor(...PRIMARY);
      doc.rect(0, 0, pageWidth, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("FICHE DE RENSEIGNEMENTS", pageWidth / 2, 12, { align: "center" });

      let currentY = 28;

      currentY = drawTable(currentY, "APPRENANT(E)", PRIMARY, [
        ["Nom", v("nom") || "-"],
        ["Prenom", v("prenom") || "-"],
        ["Date de naissance", v("date_naissance") || "-"],
        ["Adresse", v("adresse") || "-"],
        ["Telephone", v("telephone") || "-"],
        ["E-mail", v("email") || "-"],
        ["Formation", v("formation") || "-"],
        ["Diplome / Titre", v("diplome") || "-"],
      ]);

      currentY = drawTable(currentY, "EN CAS D'URGENCE", RED, [
        ["Contact", v("urgence_contact") || "-"],
        ["Telephone 1", v("urgence_tel1") || "-"],
        ["Telephone 2", v("urgence_tel2") || "-"],
        ["Infos medicales", v("urgence_medical") || "-"],
      ]);

      if (currentY > pageHeight - 60) { doc.addPage(); currentY = 20; }

      currentY = drawTable(currentY, "ENTREPRISE D'ACCUEIL", SECONDARY, [
        ["Raison sociale", v("entreprise_nom") || "-"],
        ["Adresse", v("entreprise_adresse") || "-"],
        ["Telephone", v("entreprise_tel") || "-"],
        ["E-mail", v("entreprise_email") || "-"],
        ["Activite", v("entreprise_activite") || "-"],
        ["Debut contrat", v("entreprise_debut") || "-"],
        ["Fin contrat", v("entreprise_fin") || "-"],
      ]);

      if (currentY > pageHeight - 50) { doc.addPage(); currentY = 20; }

      currentY = drawTable(currentY, "MAITRE D'APPRENTISSAGE / TUTEUR", ACCENT, [
        ["Nom", v("ma_nom") || "-"],
        ["Prenom", v("ma_prenom") || "-"],
        ["Poste", v("ma_poste") || "-"],
        ["Telephone", v("ma_tel") || "-"],
        ["E-mail", v("ma_email") || "-"],
      ]);

      // Responsables legaux
      if (v("resp1_nom") || v("resp2_nom")) {
        if (currentY > pageHeight - 50) { doc.addPage(); currentY = 20; }
        const respRows: [string,string][] = [];
        if (v("resp1_nom")) { respRows.push(["Resp. 1 Nom", v("resp1_nom")]); }
        if (v("resp1_prenom")) { respRows.push(["Resp. 1 Prenom", v("resp1_prenom")]); }
        if (v("resp1_tel")) { respRows.push(["Resp. 1 Tel", v("resp1_tel")]); }
        if (v("resp1_email")) { respRows.push(["Resp. 1 Email", v("resp1_email")]); }
        if (v("resp2_nom")) { respRows.push(["Resp. 2 Nom", v("resp2_nom")]); }
        if (v("resp2_prenom")) { respRows.push(["Resp. 2 Prenom", v("resp2_prenom")]); }
        if (v("resp2_tel")) { respRows.push(["Resp. 2 Tel", v("resp2_tel")]); }
        if (v("resp2_email")) { respRows.push(["Resp. 2 Email", v("resp2_email")]); }
        if (respRows.length > 0) {
          currentY = drawTable(currentY, "RESPONSABLE(S) LEGAL(AUX)", PRIMARY, respRows);
        }
      }

      /* ========================
         PAGE 3 : DROIT A L'IMAGE
         ======================== */
      doc.addPage();

      doc.setFillColor(...PRIMARY);
      doc.rect(0, 0, pageWidth, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("DROIT A L'IMAGE", pageWidth / 2, 12, { align: "center" });

      currentY = 30;
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      const droitText = "Conformement aux dispositions du Code civil (articles 9 et 226-1) et au Reglement General sur la Protection des Donnees (RGPD), le CFA recueille l'autorisation de l'apprenant(e) pour l'utilisation de son image.";
      const splitDroit = doc.splitTextToSize(droitText, pageWidth - margin * 2);
      doc.text(splitDroit, margin, currentY);
      currentY += splitDroit.length * 5 + 10;

      // Choice display
      const droitChoice = v("droit_image");
      const choiceColor: [number, number, number] = droitChoice === "accorde" ? GREEN : droitChoice === "refuse" ? RED : [150, 150, 150];
      const choiceText = droitChoice === "accorde"
        ? "J'ACCORDE au CFA le droit d'utiliser mon image"
        : droitChoice === "refuse"
          ? "JE N'ACCORDE PAS au CFA le droit d'utiliser mon image"
          : "Aucun choix effectue";

      doc.setFillColor(...choiceColor);
      doc.roundedRect(margin, currentY, pageWidth - margin * 2, 20, 2, 2, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(choiceText, pageWidth / 2, currentY + 13, { align: "center" });

      /* ========================
         PAGE 4 : SIGNATURES
         ======================== */
      doc.addPage();

      doc.setFillColor(...PRIMARY);
      doc.rect(0, 0, pageWidth, 18, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("SIGNATURES ET ENGAGEMENT", pageWidth / 2, 12, { align: "center" });

      currentY = 30;
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const sigText = "En signant ce livret d'accueil, chaque partie atteste avoir pris connaissance de l'ensemble des informations contenues dans ce document et s'engage a respecter les engagements qui lui incombent.";
      const splitSig = doc.splitTextToSize(sigText, pageWidth - margin * 2);
      doc.text(splitSig, margin, currentY);
      currentY += splitSig.length * 5 + 10;

      // Signature boxes
      const signatureEntries: { label: string; key: string; color: [number, number, number] }[] = [
        { label: "Signature de l'apprenti(e)", key: "signature_apprenti", color: SECONDARY },
        { label: "Signature du tuteur / Maitre d'apprentissage", key: "signature_tuteur", color: ACCENT },
        { label: "Signature du responsable CFA", key: "signature_cfa", color: PRIMARY },
      ];

      for (const entry of signatureEntries) {
        if (currentY > pageHeight - 70) {
          doc.addPage();
          currentY = 20;
        }

        // Label bar
        doc.setFillColor(...entry.color);
        doc.roundedRect(margin, currentY, pageWidth - margin * 2, 10, 1, 1, "F");
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(entry.label.toUpperCase(), margin + 5, currentY + 7);
        currentY += 12;

        // Signature image or placeholder
        const sigValue = v(entry.key);
        if (sigValue && sigValue.startsWith("data:image")) {
          try {
            doc.addImage(sigValue, "PNG", margin, currentY, 80, 35);
          } catch {
            doc.setTextColor(150, 150, 150);
            doc.setFontSize(9);
            doc.setFont("helvetica", "italic");
            doc.text("Signature presente (erreur d'affichage)", margin + 5, currentY + 18);
          }
        } else {
          doc.setDrawColor(200, 200, 200);
          doc.rect(margin, currentY, pageWidth - margin * 2, 35);
          doc.setTextColor(180, 180, 180);
          doc.setFontSize(9);
          doc.setFont("helvetica", "italic");
          doc.text("Non signe", pageWidth / 2, currentY + 18, { align: "center" });
        }
        currentY += 42;
      }

      // Date line
      doc.setTextColor(100, 100, 100);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`Fait le ${today}`, margin, currentY + 5);

      /* ========================
         SAVE PDF
         ======================== */
      const filename = `livret-accueil-${(v("nom") || "apprenant").toLowerCase().replace(/\s+/g, "-")}.pdf`;
      doc.save(filename);
    } catch (err) {
      console.error("Erreur generation PDF:", err);
      alert("Erreur lors de la generation du PDF. Verifiez la console.");
    }
    setGenerating(false);
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto">
        <p className="text-sm text-gray-500 text-center py-8">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-primary border-b-2 border-accent pb-2 mb-6">
        Generer mon livret PDF
      </h1>

      {/* Completion summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
        <h2 className="font-bold text-primary text-lg mb-4">Etat de completion du livret</h2>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-dark">{filledCount} / {totalFields} champs remplis</span>
            <span className={`text-sm font-bold ${percentage === 100 ? "text-green" : percentage >= 50 ? "text-accent" : "text-red"}`}>
              {percentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${
                percentage === 100 ? "bg-green" : percentage >= 50 ? "bg-accent" : "bg-red"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* Per-section status */}
        <div className="space-y-3">
          {fieldGroups.map((group) => {
            const groupFilled = group.fields.filter((f) => {
              const val = v(f.key);
              return val && val.trim().length > 0;
            }).length;
            const groupTotal = group.fields.length;
            const isComplete = groupFilled === groupTotal;

            return (
              <div key={group.title} className="flex items-center justify-between py-2 px-3 rounded bg-light-gray">
                <div className="flex items-center gap-2">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs text-white ${isComplete ? "bg-green" : "bg-gray-400"}`}>
                    {isComplete ? (
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-[10px]">{groupFilled}</span>
                    )}
                  </span>
                  <span className="text-sm font-medium text-dark">{group.title}</span>
                </div>
                <span className={`text-xs font-bold ${isComplete ? "text-green" : "text-gray-500"}`}>
                  {groupFilled}/{groupTotal}
                </span>
              </div>
            );
          })}
        </div>

        {/* Missing fields detail */}
        {filledCount < totalFields && (
          <div className="mt-4 p-3 bg-red/5 border border-red/20 rounded">
            <p className="text-sm font-bold text-red mb-2">Champs manquants :</p>
            <div className="flex flex-wrap gap-1.5">
              {allFields
                .filter((f) => {
                  const val = v(f.key);
                  return !val || val.trim().length === 0;
                })
                .map((f) => (
                  <span key={f.key} className="text-xs bg-red/10 text-red px-2 py-0.5 rounded">
                    {f.label}
                  </span>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Generate button */}
      <div className="text-center">
        <button
          onClick={generatePDF}
          disabled={generating}
          className="inline-flex items-center gap-3 bg-green hover:bg-green/90 text-white font-bold text-lg px-10 py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {generating ? (
            <>
              <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Generation en cours...
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Generer mon livret PDF
            </>
          )}
        </button>
        <p className="text-xs text-gray-text mt-3">
          Le PDF sera telecharge automatiquement sur votre appareil.
        </p>
      </div>
    </div>
  );
}
