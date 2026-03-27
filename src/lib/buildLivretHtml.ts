/**
 * buildLivretHtml.ts
 * Generates a premium A4 HTML document for the HEOL GROUP learner booklet.
 * Converted to PDF via Gotenberg (Chromium).
 */

interface StudentData {
  [key: string]: string | null | undefined;
}

/* ─── helpers ─── */
function v(d: StudentData, k: string): string {
  return (d[k] as string) || "";
}
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function val(d: StudentData, k: string): string {
  const r = v(d, k);
  return r ? esc(r) : '<span class="empty">&mdash;</span>';
}
function field(label: string, value: string): string {
  return `<div class="field"><span class="field-label">${esc(label)}</span><span class="field-value">${value}</span></div>`;
}
function field2(l1: string, v1: string, l2: string, v2: string): string {
  return `<div class="field-row">${field(l1, v1)}${field(l2, v2)}</div>`;
}
function sectionHeader(num: number, title: string, icon: string): string {
  return `<div class="section-header"><div class="sh-num">${num}</div><div class="sh-icon">${icon}</div><div class="sh-title">${esc(title)}</div></div>`;
}
function banner(text: string, color?: string): string {
  const bg = color || "var(--navy)";
  return `<div class="banner" style="background:${bg}">${esc(text)}</div>`;
}
function callout(text: string, icon?: string): string {
  return `<div class="callout">${icon ? `<span class="callout-icon">${icon}</span>` : ""}<div>${text}</div></div>`;
}
function sigBlock(label: string, dataUrl: string | undefined | null): string {
  const img = dataUrl
    ? `<img src="${dataUrl}" class="sig-img" />`
    : '<div class="sig-placeholder">(Non signé)</div>';
  return `<div class="sig-box"><div class="sig-label">${esc(label)}</div><div class="sig-mention">« Lu et approuvé »</div>${img}<div class="sig-date">Date : ______________________</div></div>`;
}

/* ─── SVG Icons (inline) ─── */
const ICONS = {
  welcome: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  user: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  scale: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18"/><path d="M3 7l4-4 4 4"/><path d="M13 7l4-4 4 4"/><path d="M1 14h6"/><path d="M17 14h6"/></svg>`,
  users: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
  clipboard: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>`,
  book: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>`,
  award: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  fileText: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>`,
  gift: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 12 20 22 4 22 4 12"/><rect x="2" y="7" width="20" height="5"/><line x1="12" y1="22" x2="12" y2="7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>`,
  link: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>`,
  camera: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  alertTriangle: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
  briefcase: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`,
  edit: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
  checkCircle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
};

/* ─── HEOL Logo SVG ─── */
const HEOL_LOGO = `<svg width="80" height="80" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="22" fill="none" stroke="#C8A951" stroke-width="2.5"/>
  <g transform="translate(50,50)">
    ${Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = Math.cos(angle) * 26;
      const y1 = Math.sin(angle) * 26;
      const x2 = Math.cos(angle) * 38;
      const y2 = Math.sin(angle) * 38;
      const cx1 = Math.cos(angle + 0.3) * 32;
      const cy1 = Math.sin(angle + 0.3) * 32;
      return `<path d="M${x1},${y1} Q${cx1},${cy1} ${x2},${y2}" fill="none" stroke="#C8A951" stroke-width="2" stroke-linecap="round"/>`;
    }).join("")}
  </g>
  <text x="50" y="54" text-anchor="middle" font-family="Georgia,serif" font-size="14" font-weight="700" fill="#1B2A4A">H</text>
</svg>`;

/* ─── Timeline Image (loaded at build time) ─── */
const TIMELINE_IMG_PATH = require("path").join(process.cwd(), "public", "images", "timeline-heol.png");
const TIMELINE_IMG_B64 = (() => {
  try {
    const buf = require("fs").readFileSync(TIMELINE_IMG_PATH);
    return "data:image/png;base64," + buf.toString("base64");
  } catch { return ""; }
})();

/* ─── main builder ─── */
export function buildLivretHtml(data: StudentData): string {
  const d = data;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<style>
/* ══════════════════════════════════════════════════════════════
   HEOL GROUP — Livret d'Accueil Apprenant — Premium Design
   ══════════════════════════════════════════════════════════════ */

:root {
  --navy: #1B2A4A;
  --navy-light: #2C3E6B;
  --gold: #C8A951;
  --gold-light: #E8D5A0;
  --gold-bg: #FBF8F0;
  --blue: #2E86C1;
  --blue-light: #D4E6F1;
  --red: #8B0000;
  --green: #1D7A3E;
  --orange: #D4760A;
  --bg: #FFFFFF;
  --bg-alt: #F7F8FA;
  --text: #1a1a1a;
  --text-light: #555;
  --text-muted: #999;
  --border: #E5E7EB;
  --radius: 6px;
}

/* ─── RESET & BASE ─── */
* { margin: 0; padding: 0; box-sizing: border-box; }
@page { size: A4; margin: 18mm 14mm 22mm 14mm; }
html, body {
  font-family: 'Segoe UI', system-ui, -apple-system, Arial, sans-serif;
  font-size: 9.5pt;
  color: var(--text);
  line-height: 1.55;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
  background: var(--bg);
}
p { margin: 4px 0; text-align: justify; }
a { color: var(--blue); text-decoration: none; }

/* ─── COVER PAGE ─── */
.cover {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 820px;
  text-align: center;
  page-break-after: always;
  position: relative;
  overflow: hidden;
}
.cover::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 8px;
  background: linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%);
}
.cover::after {
  content: '';
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 8px;
  background: linear-gradient(90deg, var(--navy) 0%, var(--gold) 50%, var(--navy) 100%);
}
.cover-logo { margin-bottom: 12px; }
.cover-org {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: 8px;
  color: var(--navy);
  text-transform: uppercase;
  margin-bottom: 2px;
}
.cover-sub {
  font-size: 9pt;
  color: var(--text-muted);
  letter-spacing: 3px;
  margin-bottom: 50px;
}
.cover-line {
  width: 100px;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--gold), transparent);
  margin: 0 auto 20px;
}
.cover h1 {
  font-size: 28pt;
  font-weight: 800;
  color: var(--navy);
  letter-spacing: 1px;
  margin: 0 0 4px;
  line-height: 1.15;
}
.cover .cover-h1-sub {
  font-size: 14pt;
  color: var(--text-light);
  font-weight: 300;
  margin-bottom: 10px;
}
.cover-line2 {
  width: 60px;
  height: 2px;
  background: var(--gold);
  margin: 0 auto 40px;
}
.cover-info {
  text-align: left;
  width: 300px;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 20px;
  background: var(--bg-alt);
}
.cover-info .ci-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px dotted #ddd;
  font-size: 9pt;
}
.cover-info .ci-row:last-child { border-bottom: none; }
.cover-info .ci-label { font-weight: 600; color: var(--navy); }
.cover-info .ci-value { color: var(--text); text-align: right; }
.cover-year {
  margin-top: 30px;
  font-size: 10pt;
  color: var(--gold);
  font-style: italic;
}
.cover-ref {
  position: absolute;
  bottom: 24px; right: 20px;
  font-size: 7pt;
  color: var(--text-muted);
}

/* ─── TABLE OF CONTENTS ─── */
.toc { page-break-after: always; padding-top: 20px; }
.toc h2 {
  font-size: 18pt;
  color: var(--navy);
  text-align: center;
  margin-bottom: 30px;
  font-weight: 700;
}
.toc-line {
  width: 60px;
  height: 3px;
  background: var(--gold);
  margin: -20px auto 30px;
}
.toc-item {
  display: flex;
  align-items: baseline;
  padding: 7px 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 9.5pt;
}
.toc-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--navy);
  color: #fff;
  font-size: 8pt;
  font-weight: 700;
  flex-shrink: 0;
  margin-right: 10px;
}
.toc-title { flex: 1; font-weight: 500; color: var(--text); }
.toc-dots { flex: 1; border-bottom: 1px dotted #ccc; margin: 0 6px; min-width: 20px; }

/* ─── SECTION HEADERS ─── */
.section-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 24px 0 12px;
  padding-bottom: 6px;
  border-bottom: 2.5px solid var(--gold);
  page-break-after: avoid;
}
.sh-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--gold);
  color: var(--navy);
  font-size: 12pt;
  font-weight: 800;
  flex-shrink: 0;
}
.sh-icon {
  color: var(--navy);
  flex-shrink: 0;
  display: flex;
  align-items: center;
}
.sh-title {
  font-size: 14pt;
  font-weight: 700;
  color: var(--navy);
  letter-spacing: 0.3px;
}

/* ─── CONTENT SECTIONS ─── */
.section { margin-bottom: 14px; page-break-inside: avoid; }
.section-break { page-break-before: always; }

h3 {
  font-size: 10pt;
  font-weight: 700;
  color: var(--navy);
  margin: 12px 0 4px;
  padding-left: 8px;
  border-left: 3px solid var(--gold);
}

/* ─── BANNER ─── */
.banner {
  color: #fff;
  font-weight: 600;
  font-size: 9pt;
  padding: 6px 12px;
  margin: 14px 0 6px;
  border-radius: var(--radius);
  letter-spacing: 0.5px;
}

/* ─── CALLOUT / NOTE ─── */
.callout {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  border-left: 4px solid var(--gold);
  background: var(--gold-bg);
  padding: 10px 14px;
  margin: 10px 0;
  font-size: 8.5pt;
  color: var(--text-light);
  border-radius: 0 var(--radius) var(--radius) 0;
}
.callout-icon { font-size: 14pt; flex-shrink: 0; line-height: 1; }
.callout strong { color: var(--navy); }

/* ─── FIELDS (form-style) ─── */
.field {
  display: flex;
  padding: 5px 0;
  border-bottom: 1px dotted #ddd;
  font-size: 9pt;
  flex: 1;
}
.field-label {
  font-weight: 600;
  color: var(--navy);
  min-width: 130px;
  flex-shrink: 0;
}
.field-value { color: var(--text); flex: 1; }
.field-row { display: flex; gap: 20px; }
.empty { color: #ccc; font-style: italic; }

/* ─── TABLES ─── */
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 8px 0;
  font-size: 8.5pt;
  border-radius: var(--radius);
  overflow: hidden;
  border: 1px solid var(--border);
}
th {
  background: var(--navy);
  color: #fff;
  padding: 7px 10px;
  text-align: left;
  font-weight: 600;
  font-size: 8.5pt;
}
td {
  padding: 6px 10px;
  border-bottom: 1px solid #f0f0f0;
  vertical-align: top;
}
tr:nth-child(even) td { background: var(--bg-alt); }
tr:last-child td { border-bottom: none; }

/* ─── DUAL TABLE (droits/devoirs) ─── */
.dual-table th:first-child { background: var(--navy); }
.dual-table th:last-child { background: var(--navy-light); }
.dual-table td { font-size: 8.5pt; }
.dual-table .icon-cell { width: 20px; text-align: center; color: var(--gold); }

/* ─── LISTS ─── */
ul, ol { padding-left: 18px; margin: 5px 0; font-size: 9pt; }
li { margin: 3px 0; }
li::marker { color: var(--gold); }

/* ─── CARDS ─── */
.card {
  border: 1px solid var(--border);
  border-radius: var(--radius);
  overflow: hidden;
  margin: 6px 0;
}
.card-header {
  background: var(--navy);
  color: #fff;
  font-weight: 600;
  font-size: 9pt;
  padding: 6px 12px;
  text-align: center;
}
.card-body { padding: 10px 12px; font-size: 8.5pt; }

/* ─── ACTOR CARDS (3 columns) ─── */
.actors-grid { display: flex; gap: 8px; margin: 12px 0; }
.actors-grid .card { flex: 1; }
.actors-grid .card-header-icon { font-size: 18pt; margin-bottom: 2px; }

/* ─── TIMELINE ─── */
.timeline-container { margin: 16px 0; }
.timeline-row {
  display: flex;
  align-items: flex-start;
  gap: 0;
  position: relative;
  margin-bottom: 6px;
}
.timeline-step {
  flex: 1;
  text-align: center;
  position: relative;
  padding: 0 2px;
}
.timeline-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--navy);
  color: #fff;
  font-size: 11pt;
  font-weight: 700;
  margin-bottom: 4px;
  position: relative;
  z-index: 2;
}
.timeline-num.gold { background: var(--gold); color: var(--navy); }
.timeline-label {
  background: var(--navy);
  color: #fff;
  font-size: 7pt;
  font-weight: 500;
  padding: 4px 3px;
  border-radius: 4px;
  min-height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 1.2;
}
.timeline-label.gold-label {
  background: var(--gold);
  color: var(--navy);
  font-weight: 600;
}
.timeline-connector {
  position: absolute;
  top: 16px;
  left: 50%;
  right: -50%;
  height: 2px;
  background: var(--navy);
  z-index: 1;
}
.timeline-step:last-child .timeline-connector { display: none; }

/* ─── CERTIFICATION FLOW ─── */
.certif-flow {
  display: flex;
  align-items: stretch;
  gap: 0;
  margin: 14px 0;
}
.certif-step {
  flex: 1;
  background: var(--navy);
  color: #fff;
  border-radius: var(--radius);
  padding: 10px 6px;
  text-align: center;
  position: relative;
}
.certif-step strong { font-size: 8.5pt; display: block; margin-bottom: 2px; }
.certif-step span { font-size: 7.5pt; opacity: 0.8; line-height: 1.2; }
.certif-step.gold-step { background: var(--gold); color: var(--navy); }
.certif-arrow {
  display: flex;
  align-items: center;
  color: var(--gold);
  font-size: 16pt;
  padding: 0 2px;
  flex-shrink: 0;
}

/* ─── SANCTION BADGES ─── */
.sanction-grid { display: flex; gap: 8px; margin: 8px 0; }
.sanction-item {
  flex: 1;
  border-radius: var(--radius);
  padding: 8px 10px;
  text-align: center;
  font-size: 8pt;
}
.sanction-item.level-1 { background: #FEF3C7; border: 1px solid #F59E0B; color: #92400E; }
.sanction-item.level-2 { background: #FED7AA; border: 1px solid #EA580C; color: #9A3412; }
.sanction-item.level-3 { background: #FECACA; border: 1px solid #DC2626; color: #991B1B; }
.sanction-item .sanction-num {
  font-size: 14pt;
  font-weight: 800;
  display: block;
  margin-bottom: 2px;
}
.sanction-item strong { display: block; font-size: 8.5pt; margin-bottom: 2px; }

/* ─── IMAGE RIGHTS ─── */
.droit-boxes { display: flex; gap: 20px; justify-content: center; margin: 14px 0; }
.droit-box {
  border: 2px solid var(--border);
  border-radius: var(--radius);
  padding: 14px 24px;
  text-align: center;
  font-size: 9pt;
  min-width: 180px;
}
.droit-box.selected { border-color: var(--gold); background: var(--gold-bg); }
.droit-box .check { font-size: 20pt; margin-bottom: 4px; }

/* ─── SIGNATURES ─── */
.sig-row { display: flex; gap: 14px; margin-top: 16px; }
.sig-box {
  flex: 1;
  border: 2px solid var(--gold-light);
  border-radius: var(--radius);
  padding: 14px;
  text-align: center;
  min-height: 120px;
  background: var(--gold-bg);
}
.sig-label { font-weight: 700; font-size: 8.5pt; color: var(--navy); margin-bottom: 2px; }
.sig-mention { font-size: 7.5pt; color: var(--text-muted); font-style: italic; margin-bottom: 8px; }
.sig-img { max-height: 60px; margin: 8px auto; display: block; }
.sig-placeholder { color: #ccc; font-style: italic; margin: 20px 0; font-size: 8pt; }
.sig-date { margin-top: 10px; font-size: 8pt; color: var(--text-light); }

/* ─── EMERGENCY BOX ─── */
.emergency-box {
  border: 2px solid var(--red);
  border-radius: var(--radius);
  padding: 4px 0;
  margin: 8px 0;
}
.emergency-box .banner { margin: 0 0 4px; border-radius: var(--radius) var(--radius) 0 0; }

/* ─── CONTACT CARDS ─── */
.contact-grid { display: flex; gap: 10px; flex-wrap: wrap; margin: 8px 0; }
.contact-card {
  flex: 1;
  min-width: 45%;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 10px 12px;
  background: var(--bg-alt);
}
.contact-card .cc-title { font-weight: 700; font-size: 8.5pt; color: var(--navy); margin-bottom: 4px; }
.contact-card .cc-detail { font-size: 8pt; color: var(--text-light); line-height: 1.4; }

/* ─── AIDE CARDS ─── */
.aide-grid { display: flex; gap: 8px; flex-wrap: wrap; margin: 8px 0; }
.aide-card {
  flex: 1;
  min-width: 30%;
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 8px 10px;
  text-align: center;
}
.aide-card .aide-icon { font-size: 18pt; margin-bottom: 2px; }
.aide-card .aide-title { font-weight: 700; font-size: 8.5pt; color: var(--navy); margin-bottom: 2px; }
.aide-card .aide-desc { font-size: 7.5pt; color: var(--text-light); }

/* ─── URGENCY BOX ─── */
.urgency-box {
  background: var(--red);
  color: #fff;
  border-radius: var(--radius);
  padding: 10px 14px;
  margin: 10px 0;
  text-align: center;
}
.urgency-box strong { font-size: 10pt; display: block; margin-bottom: 4px; }
.urgency-box .nums { display: flex; gap: 16px; justify-content: center; font-size: 9pt; }
.urgency-box .nums span { background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 4px; }

/* ─── PRINT HELPERS ─── */
.page-break { page-break-before: always; }
.no-break { page-break-inside: avoid; }

/* ─── FOOTER SPACE ─── */
.footer-space { height: 10px; }

/* ─── TWO COLUMNS ─── */
.two-col { display: flex; gap: 12px; }
.two-col > div { flex: 1; }
</style>
</head>
<body>

<!-- ════════════════════ COUVERTURE ════════════════════ -->
<div class="cover">
  <div class="cover-logo">${HEOL_LOGO}</div>
  <p class="cover-org">HEOL GROUPE</p>
  <p class="cover-sub">Centre de Formation en Alternance</p>
  <div class="cover-line"></div>
  <h1>LIVRET D'ACCUEIL</h1>
  <p class="cover-h1-sub">de l'apprenant</p>
  <div class="cover-line2"></div>
  <div class="cover-info">
    <div class="ci-row"><span class="ci-label">Nom</span><span class="ci-value">${val(d, "nom")}</span></div>
    <div class="ci-row"><span class="ci-label">Prénom</span><span class="ci-value">${val(d, "prenom")}</span></div>
    <div class="ci-row"><span class="ci-label">Formation</span><span class="ci-value">${val(d, "formation")}</span></div>
    <div class="ci-row"><span class="ci-label">Entreprise</span><span class="ci-value">${val(d, "entreprise_nom")}</span></div>
  </div>
  <p class="cover-year">Année ${new Date().getFullYear()} — ${new Date().getFullYear() + 1}</p>
  <span class="cover-ref">Réf. HEOL/LA/${new Date().getFullYear()}</span>
</div>

<!-- ════════════════════ SOMMAIRE ════════════════════ -->
<div class="toc">
  <h2>Sommaire</h2>
  <div class="toc-line"></div>
  ${[
    "Bienvenue dans votre formation",
    "Fiche de renseignements",
    "Votre année de formation",
    "Le contrat d'apprentissage",
    "Les acteurs de votre formation",
    "Le suivi de l'apprenant",
    "Règlement intérieur",
    "Certification et examens",
    "Le Dossier Professionnel (DP)",
    "Accessibilité et handicap",
    "Droit à l'image",
    "Protection des données (RGPD)",
    "Consignes de sécurité",
    "Équipe pédagogique et contacts",
    "Signatures et engagement",
  ]
    .map(
      (t, i) =>
        `<div class="toc-item"><span class="toc-num">${i + 1}</span><span class="toc-title">${t}</span></div>`
    )
    .join("")}
</div>

<!-- ════════════════════ 1. BIENVENUE ════════════════════ -->
${sectionHeader(1, "Bienvenue dans votre formation", ICONS.welcome)}
<div class="section">
  <p>Ce livret d'accueil est votre document de référence tout au long de votre parcours en alternance au sein d'<strong>HEOL GROUPE</strong>. Il vous accompagne dans votre formation, tant sur le plan pédagogique que professionnel, et permet d'assurer un lien régulier entre vous, votre entreprise d'accueil et votre centre de formation.</p>
  <p>Vous y trouverez les informations essentielles pour bien comprendre le fonctionnement de votre contrat d'apprentissage, vos droits et devoirs, les règles de vie à respecter, ainsi que le rôle de chaque acteur impliqué dans votre réussite.</p>
  ${callout(
    "<strong>Conservez ce livret</strong> et consultez-le régulièrement. C'est un outil vivant qui favorise une réelle interactivité entre les compétences à acquérir au sein du centre de formation et celles à développer en entreprise.",
    "📘"
  )}
</div>

<!-- ════════════════════ 2. RENSEIGNEMENTS ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(2, "Fiche de renseignements", ICONS.user)}

${banner("APPRENANT(E)")}
<div class="no-break">
  ${field2("Nom", val(d, "nom"), "Prénom", val(d, "prenom"))}
  ${field("Date de naissance", val(d, "date_naissance"))}
  ${field("Adresse", val(d, "adresse"))}
  ${field2("Téléphone", val(d, "telephone"), "E-mail", val(d, "email"))}
  ${field("Formation", val(d, "formation"))}
  ${field("Diplôme / Titre visé (RNCP)", val(d, "diplome"))}
</div>

<div class="emergency-box no-break">
  ${banner("EN CAS D'URGENCE", "var(--red)")}
  <div style="padding:0 10px 6px">
    ${field("Personne à contacter", val(d, "urgence_contact"))}
    ${field2("Téléphone 1", val(d, "urgence_tel1"), "Téléphone 2", val(d, "urgence_tel2"))}
    ${field("Informations médicales", val(d, "urgence_medical"))}
  </div>
</div>

${banner("ENTREPRISE D'ACCUEIL", "var(--blue)")}
<div class="no-break">
  ${field("Raison sociale", val(d, "entreprise_nom"))}
  ${field("Adresse", val(d, "entreprise_adresse"))}
  ${field2("Téléphone", val(d, "entreprise_tel"), "E-mail", val(d, "entreprise_email"))}
  ${field("Activité / Secteur", val(d, "entreprise_activite"))}
  ${field2("Début contrat", val(d, "entreprise_debut"), "Fin contrat", val(d, "entreprise_fin"))}
</div>

${banner("MAÎTRE D'APPRENTISSAGE / TUTEUR", "var(--gold)")}
<div class="no-break">
  ${field2("Nom", val(d, "ma_nom"), "Prénom", val(d, "ma_prenom"))}
  ${field("Poste", val(d, "ma_poste"))}
  ${field2("Téléphone", val(d, "ma_tel"), "E-mail", val(d, "ma_email"))}
</div>

${banner("RESPONSABLE(S) LÉGAL(AUX) — si mineur(e)", "var(--navy-light)")}
<div class="no-break">
  <p style="font-size:8pt;font-weight:600;color:var(--text-light);margin:4px 0 2px">Responsable 1</p>
  ${field2("Nom", val(d, "resp1_nom"), "Prénom", val(d, "resp1_prenom"))}
  ${field("Adresse", val(d, "resp1_adresse"))}
  ${field2("Téléphone", val(d, "resp1_tel"), "E-mail", val(d, "resp1_email"))}
  <p style="font-size:8pt;font-weight:600;color:var(--text-light);margin:6px 0 2px">Responsable 2</p>
  ${field2("Nom", val(d, "resp2_nom"), "Prénom", val(d, "resp2_prenom"))}
  ${field("Adresse", val(d, "resp2_adresse"))}
  ${field2("Téléphone", val(d, "resp2_tel"), "E-mail", val(d, "resp2_email"))}
</div>

<!-- ════════════════════ 3. ANNÉE DE FORMATION ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(3, "Votre année de formation", ICONS.calendar)}
<div class="section">

  <div style="text-align:center;margin:10px 0">
    <img src="${TIMELINE_IMG_B64}" alt="Votre année de formation" style="width:100%;max-width:680px;height:auto" />
  </div>

  <h3>Calendrier des 12 rendez-vous de suivi</h3>
  <table>
    <thead><tr><th style="width:12%">RDV</th><th>Objectif</th><th style="width:18%">Réalisé le</th></tr></thead>
    <tbody>
      <tr><td><strong>1<sup>er</sup></strong></td><td>Suivi coaching — Intégration</td><td></td></tr>
      <tr><td><strong>2<sup>ème</sup></strong></td><td>Suivi coaching</td><td></td></tr>
      <tr><td><strong>3<sup>ème</sup></strong></td><td>Suivi coaching</td><td></td></tr>
      <tr><td><strong>4<sup>ème</sup></strong></td><td>Bilan milieu de formation</td><td></td></tr>
      <tr><td><strong>5<sup>ème</sup></strong></td><td>Suivi + constitution du Dossier Professionnel</td><td></td></tr>
      <tr><td><strong>6<sup>ème</sup></strong></td><td>Suivi + constitution du Dossier Professionnel</td><td></td></tr>
      <tr><td><strong>7<sup>ème</sup></strong></td><td>Suivi + constitution du Dossier Professionnel</td><td></td></tr>
      <tr><td><strong>8<sup>ème</sup></strong></td><td>Suivi + constitution du Dossier Professionnel</td><td></td></tr>
      <tr><td><strong>9<sup>ème</sup></strong></td><td>Suivi + constitution du Dossier Professionnel</td><td></td></tr>
      <tr><td><strong>10<sup>ème</sup></strong></td><td>Suivi + constitution du Dossier Professionnel</td><td></td></tr>
      <tr><td><strong>11<sup>ème</sup></strong></td><td>Suivi + préparation à l'examen</td><td></td></tr>
      <tr><td><strong>12<sup>ème</sup></strong></td><td>Bilan de fin de formation</td><td></td></tr>
    </tbody>
  </table>
  ${callout(
    "<strong>En cas de non-obtention</strong> de votre titre professionnel, pas de panique ! Vous aurez l'occasion d'assister à la session de rattrapage qui aura lieu 3 mois après votre examen.",
    "💡"
  )}
</div>

<!-- ════════════════════ 4. CONTRAT D'APPRENTISSAGE ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(4, "Le contrat d'apprentissage", ICONS.scale)}
<div class="section">
  <p>Devenir apprenti ouvre à des droits et implique des devoirs. Le contrat d'apprentissage est un contrat de travail à durée déterminée qui associe formation théorique en centre et formation pratique en entreprise.</p>
  <table class="dual-table">
    <thead><tr><th>Vos droits</th><th>Vos devoirs</th></tr></thead>
    <tbody>
      <tr><td>Bénéficier d'une formation en lien avec la qualification recherchée</td><td>Exécuter son contrat de travail et réaliser les missions confiées</td></tr>
      <tr><td>Percevoir une rémunération légale (salaire, prime, congés)</td><td>Suivre l'intégralité de sa formation</td></tr>
      <tr><td>Bénéficier d'une protection sociale</td><td>Se soumettre au pouvoir disciplinaire de l'employeur</td></tr>
      <tr><td>Être accompagné(e) par un tuteur et un formateur</td><td>Se présenter aux épreuves validant la formation</td></tr>
      <tr><td>Disposer d'un CPF (Compte Personnel de Formation)</td><td>Respecter le règlement intérieur du CFA et de l'entreprise</td></tr>
      <tr><td>Congé exceptionnel pour préparer ses examens</td><td>Exercer sa demande de congé en respectant les délais</td></tr>
    </tbody>
  </table>
</div>

<!-- ════════════════════ 5. ACTEURS ════════════════════ -->
${sectionHeader(5, "Les acteurs de votre formation", ICONS.users)}
<div class="section">
  <div class="actors-grid">
    <div class="card">
      <div class="card-header">🎓 APPRENTI(E)</div>
      <div class="card-body">
        <ul>
          <li>Être assidu(e) en CFA et en entreprise</li>
          <li>Respecter les règlements intérieurs</li>
          <li>Réaliser les travaux demandés</li>
          <li>Tenir à jour le livret et le DP</li>
          <li>Se présenter aux évaluations</li>
          <li>Informer en cas d'absence</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="card-header">🏫 CENTRE DE FORMATION (CFA)</div>
      <div class="card-body">
        <ul>
          <li>Dispenser une formation conforme au référentiel</li>
          <li>Assurer un suivi pédagogique personnalisé</li>
          <li>Organiser visites en entreprise et bilans</li>
          <li>Accompagner la préparation à la certification</li>
          <li>Proposer un accompagnement adapté si handicap</li>
        </ul>
      </div>
    </div>
    <div class="card">
      <div class="card-header">🏢 ENTREPRISE D'ACCUEIL</div>
      <div class="card-body">
        <ul>
          <li>Accueillir et faciliter l'intégration</li>
          <li>Organiser le parcours professionnel</li>
          <li>Confier des missions en adéquation</li>
          <li>Assurer un suivi régulier</li>
          <li>Participer aux bilans avec le CFA</li>
        </ul>
      </div>
    </div>
  </div>

  <h3>Le maître d'apprentissage</h3>
  <p>Interlocuteur privilégié de l'apprenti en entreprise, il assure l'intégration, l'encadrement, la progression et la liaison avec le CFA.</p>
</div>

<!-- ════════════════════ 6. SUIVI ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(6, "Le suivi de l'apprenant", ICONS.clipboard)}
<div class="section">
  <h3>Les visites en structure</h3>
  <p>Le formateur référent programmera <strong>3 visites en structure</strong> durant la formation :</p>
  <table>
    <thead><tr><th style="width:8%">#</th><th>Visite</th><th>Période</th></tr></thead>
    <tbody>
      <tr><td><strong>1</strong></td><td>Visite d'intégration</td><td>1<sup>er</sup> mois de formation</td></tr>
      <tr><td><strong>2</strong></td><td>Mise en activité accompagnée</td><td>Fin du 1<sup>er</sup> semestre</td></tr>
      <tr><td><strong>3</strong></td><td>Autonomie encadrée</td><td>Fin du 2<sup>nd</sup> semestre</td></tr>
    </tbody>
  </table>

  <h3>Suivi de l'assiduité</h3>
  <p>L'assiduité de l'apprenti est obligatoire, tant en centre de formation qu'en structure. Toute absence doit être justifiée. Un double suivi de la présence est effectué : par le CFA et par l'employeur. Chaque mois, le centre de formation enverra au maître d'apprentissage un récapitulatif des absences.</p>
  ${callout(
    "En cas d'absences injustifiées ou répétées, l'employeur peut effectuer une <strong>retenue sur salaire</strong> et demander un conseil de discipline.",
    "⚠️"
  )}

  <h3>Le carnet de bord</h3>
  <p>Le carnet de bord permet de suivre l'évolution de l'apprenant, de garder une traçabilité des missions confiées et de favoriser l'analyse réflexive.</p>
  <div class="two-col">
    <div class="card">
      <div class="card-header">📱 Formations asynchrones</div>
      <div class="card-body">Carnet de bord <strong>numérique</strong>, complété mensuellement lors des points de suivi avec le formateur référent.</div>
    </div>
    <div class="card">
      <div class="card-header">📝 Formations synchrones</div>
      <div class="card-body">Carnet de bord au <strong>format papier</strong>, renseigné directement par l'apprenant tout au long du parcours.</div>
    </div>
  </div>
</div>

<!-- ════════════════════ 7. RÈGLEMENT ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(7, "Règlement intérieur", ICONS.book)}
<div class="section">
  <h3>Assiduité et ponctualité</h3>
  <ul>
    <li>Présence obligatoire à toutes les sessions de formation</li>
    <li>Toute absence doit être justifiée sous 48 heures</li>
    <li>Les retards répétés sont susceptibles d'être sanctionnés</li>
    <li>Les absences sont systématiquement signalées à l'employeur</li>
  </ul>

  <h3>Respect et comportement</h3>
  <ul>
    <li>Respect mutuel entre apprenants, formateurs et personnel</li>
    <li>Toute forme de violence et de harcèlement est strictement interdite</li>
    <li>Utilisation du téléphone portable interdite pendant les cours</li>
    <li>Tenue correcte et professionnelle exigée</li>
  </ul>

  <h3>Matériel et locaux</h3>
  <ul>
    <li>Le matériel mis à disposition doit être utilisé avec soin</li>
    <li>Toute dégradation volontaire peut entraîner un remboursement</li>
    <li>Les locaux doivent être maintenus propres et rangés</li>
  </ul>

  <h3>Formation à distance</h3>
  <ul>
    <li>Présence en ligne obligatoire aux sessions programmées</li>
    <li>Caméra activée si le formateur le demande</li>
    <li>Travaux et évaluations rendus dans les délais impartis</li>
  </ul>

  <h3>Hygiène et sécurité</h3>
  <ul>
    <li>Interdiction de fumer dans les locaux et aux abords</li>
    <li>Alcool et stupéfiants strictement interdits</li>
    <li>Respect des consignes d'évacuation et de sécurité</li>
  </ul>

  <h3>Échelle des sanctions</h3>
  <div class="sanction-grid">
    <div class="sanction-item level-1">
      <span class="sanction-num">1</span>
      <strong>Avertissement oral</strong>
      Rappel à l'ordre par le formateur
    </div>
    <div class="sanction-item level-2">
      <span class="sanction-num">2</span>
      <strong>Avertissement écrit</strong>
      Notification à l'apprenti(e) et à l'employeur
    </div>
    <div class="sanction-item level-3">
      <span class="sanction-num">3</span>
      <strong>Exclusion</strong>
      Temporaire ou définitive après conseil de discipline
    </div>
  </div>

  <h3>Procédure de réclamation et médiation</h3>
  <p>Tout apprenant peut formuler une réclamation relative à sa formation, son accueil ou tout dysfonctionnement constaté. La procédure est la suivante :</p>
  <ol>
    <li><strong>Échange direct</strong> — Contactez votre formateur référent ou le responsable pédagogique pour tenter de résoudre la situation à l'amiable.</li>
    <li><strong>Réclamation écrite</strong> — Si la situation persiste, adressez un courrier ou un e-mail au responsable qualité du CFA en détaillant votre demande.</li>
    <li><strong>Traitement</strong> — Votre réclamation sera traitée sous 15 jours ouvrés. Une réponse écrite vous sera communiquée.</li>
    <li><strong>Médiation</strong> — En cas de désaccord persistant, un médiateur externe pourra être sollicité.</li>
  </ol>
  ${callout(
    "<strong>Indicateur Qualiopi n°31 :</strong> HEOL GROUPE s'engage à traiter toutes les réclamations et à mettre en place des actions d'amélioration continue.",
    "📨"
  )}
</div>

<!-- ════════════════════ 8. CERTIFICATION ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(8, "Certification et examens", ICONS.award)}
<div class="section">
  <p>Dans le cadre du passage à l'examen de votre Titre Professionnel, vous devrez préparer un certain nombre d'éléments obligatoires que vous présenterez au jury.</p>

  <h3>Parcours vers la certification</h3>
  <div class="certif-flow">
    <div class="certif-step"><strong>Livret ECF</strong><span>Évaluations en cours de formation</span></div>
    <div class="certif-arrow">▸</div>
    <div class="certif-step"><strong>Dossier Pro</strong><span>Missions et activités en entreprise</span></div>
    <div class="certif-arrow">▸</div>
    <div class="certif-step"><strong>Préparation</strong><span>Examens blancs, simulations</span></div>
    <div class="certif-arrow">▸</div>
    <div class="certif-step"><strong>Examen</strong><span>Écrit, oral, mise en situation</span></div>
    <div class="certif-arrow">▸</div>
    <div class="certif-step gold-step"><strong>Résultats</strong><span>Diplôme ou rattrapage</span></div>
  </div>

  <h3>Documents obligatoires</h3>
  <table>
    <thead><tr><th>Document</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>Livret ECF</strong></td><td>Résultats des évaluations menées durant la formation, attestant la maîtrise progressive des compétences. Renseigné par le CFA, copie remise au candidat.</td></tr>
      <tr><td><strong>Dossier Professionnel</strong></td><td>Présente les missions et activités réalisées en entreprise, en lien avec les compétences du titre. À rédiger progressivement tout au long de l'année.</td></tr>
    </tbody>
  </table>

  <h3>Documents complémentaires (selon le titre)</h3>
  <ul>
    <li>🗂 Dossier projet</li>
    <li>📄 Fiches produits / Fiches techniques</li>
    <li>📊 Tableaux de suivi / Tableaux de bord</li>
    <li>🎞 Support de présentation (diaporama, visuel)</li>
    <li>📸 Portfolio / Classeur de preuves</li>
  </ul>
  ${callout(
    "Pour connaître les exigences spécifiques à votre titre, consultez le référentiel sur <strong>France Compétences</strong> ou rapprochez-vous de votre formateur.",
    "ℹ️"
  )}
</div>

<!-- ════════════════════ 9. DOSSIER PROFESSIONNEL ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(9, "Le Dossier Professionnel (DP)", ICONS.fileText)}
<div class="section">
  <h3>Consignes de rédaction</h3>
  <ul>
    <li><strong>Modèle officiel</strong> — Le dossier doit obligatoirement suivre le modèle mis à disposition sur le site du ministère du Travail. Ne pas modifier la structure ni les textes existants.</li>
    <li><strong>Mode de rédaction</strong> — Manuscrit (feuilles blanches, écriture soignée) ou traitement de texte (télécharger le modèle).</li>
    <li><strong>Numérotation</strong> — Toutes les pages doivent être clairement numérotées.</li>
    <li><strong>Finition</strong> — Le dossier doit être agrafé ou relié proprement.</li>
  </ul>

  <h3>Structure du DP</h3>
  <table>
    <thead><tr><th style="width:8%">#</th><th>Rubrique</th><th>Détails</th></tr></thead>
    <tbody>
      <tr><td><strong>1</strong></td><td>Page de garde</td><td>Nom, prénom, adresse, intitulé du titre visé, modalité d'accès</td></tr>
      <tr><td><strong>2</strong></td><td>Sommaire</td><td>À rédiger une fois le DP complet, avec intitulés numérotés</td></tr>
      <tr><td><strong>3</strong></td><td>Activités types</td><td>Max 3 exemples par activité-type (REAC), 3 pages max chacun</td></tr>
      <tr><td><strong>4</strong></td><td>Déclaration sur l'honneur</td><td>Nom, prénom, lieu, date, signature</td></tr>
      <tr><td><strong>5</strong></td><td>Documents illustratifs</td><td>Photos, copies de productions (max 2 par activité-type)</td></tr>
      <tr><td><strong>6</strong></td><td>Annexes</td><td>Si le référentiel de certification le prévoit</td></tr>
    </tbody>
  </table>

  <h3>Pour chaque exemple d'activité-type, décrivez :</h3>
  <ol>
    <li><strong>Les tâches effectuées</strong> — Comment vous avez procédé, pas à pas. Utilisez le « je ».</li>
    <li><strong>Les moyens utilisés</strong> — Outils, logiciels, machines, documents techniques.</li>
    <li><strong>Les personnes</strong> — Avec qui vous avez travaillé et leur rôle.</li>
    <li><strong>Le contexte</strong> — Entreprises, structures, centres.</li>
    <li><strong>Les compléments</strong> — Titres, diplômes, attestations (facultatif).</li>
  </ol>

  ${callout(
    "<strong>Conseil :</strong> Le jury cherche à voir comment vous procédez. Organisez votre travail, décrivez concrètement chaque tâche, mentionnez les règles de sécurité et d'hygiène.",
    "📝"
  )}

  <h3>Documents ressources</h3>
  <ul>
    <li><strong>REAC</strong> — Référentiel Emploi, Activités, Compétences du titre</li>
    <li><strong>RC</strong> — Référentiel de Certification</li>
    <li><strong>Fiche de communication du titre</strong> — Vision d'ensemble des compétences attendues</li>
  </ul>
  <p style="font-size:7.5pt;color:var(--text-muted);margin-top:4px">travail-emploi.gouv.fr · banque.di.afpa.fr · dossierprofessionnel.fr</p>
</div>

<!-- ════════════════════ 10. HANDICAP ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(10, "Accessibilité et handicap", ICONS.heart)}
<div class="section">
  <p>HEOL GROUPE s'engage à garantir l'accessibilité de ses formations à tous les apprenants, y compris ceux en situation de handicap.</p>
  <h3>Aménagements possibles</h3>
  <ul>
    <li>Aménagement des épreuves (tiers-temps, aide technique, secrétaire d'examen)</li>
    <li>Adaptation pédagogique (supports adaptés, rythme personnalisé)</li>
    <li>Accessibilité des locaux</li>
    <li>Accompagnement individualisé par le référent handicap</li>
  </ul>

  ${banner("RÉFÉRENT HANDICAP")}
  <div class="no-break">
    ${field("Nom et prénom", val(d, "handicap_referent_nom"))}
    ${field("Fonction", val(d, "handicap_referent_fonction"))}
    ${field2("Téléphone", val(d, "handicap_referent_tel"), "E-mail", val(d, "handicap_referent_email"))}
    ${field("Disponibilité", val(d, "handicap_referent_dispo"))}
  </div>

  <h3>Missions du référent handicap</h3>
  <ul>
    <li>Accueillir et accompagner les apprenants en situation de handicap</li>
    <li>Évaluer les besoins de compensation et mettre en place les aménagements</li>
    <li>Coordonner les acteurs (AGEFIPH, MDPH, Cap Emploi)</li>
    <li>Sensibiliser l'équipe pédagogique</li>
    <li>Assurer le suivi tout au long de la formation</li>
  </ul>
</div>

<!-- ════════════════════ 11. DROIT IMAGE ════════════════════ -->
${sectionHeader(11, "Droit à l'image", ICONS.camera)}
<div class="section">
  <p>Des photographies ou vidéos peuvent être réalisées dans le cadre de la communication d'HEOL GROUPE. Conformément à l'article 9 du Code civil, votre autorisation est requise.</p>
  <p style="font-size:8pt;color:var(--text-light)">L'utilisation de l'image s'entend pour tous supports de communication (photo, vidéo, live, réseaux internet, mailing...) à des fins publicitaires ou commerciales, à l'exclusion de toute orientation politique, philosophique, sexuelle ou de santé. La cession est sans contrepartie financière, pendant et après la formation.</p>

  <div class="droit-boxes">
    <div class="droit-box${v(d, "droit_image") === "accorde" ? " selected" : ""}">
      <div class="check">${v(d, "droit_image") === "accorde" ? "☑" : "☐"}</div>
      <strong>J'ACCORDE</strong><br/>le droit à l'utilisation de mon image
    </div>
    <div class="droit-box${v(d, "droit_image") === "refuse" ? " selected" : ""}">
      <div class="check">${v(d, "droit_image") === "refuse" ? "☑" : "☐"}</div>
      <strong>JE N'ACCORDE PAS</strong><br/>le droit à l'utilisation de mon image
    </div>
  </div>
</div>

<!-- ════════════════════ 12. RGPD ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(12, "Protection des données (RGPD)", ICONS.shield)}
<div class="section">
  <p>Conformément au Règlement Général sur la Protection des Données (RGPD), HEOL GROUPE s'engage à protéger vos données personnelles.</p>
  <ul>
    <li>Données strictement nécessaires au suivi pédagogique et administratif</li>
    <li>Traitement confidentiel et sécurisé</li>
    <li>Jamais communiquées à des tiers non autorisés</li>
  </ul>

  <h3>Vos droits</h3>
  <table>
    <thead><tr><th>Droit</th><th>Description</th></tr></thead>
    <tbody>
      <tr><td><strong>Accès</strong></td><td>Obtenir une copie de vos données personnelles</td></tr>
      <tr><td><strong>Rectification</strong></td><td>Corriger des données inexactes ou incomplètes</td></tr>
      <tr><td><strong>Opposition</strong></td><td>Refuser le traitement de vos données</td></tr>
      <tr><td><strong>Effacement</strong></td><td>Demander la suppression de vos données</td></tr>
      <tr><td><strong>Portabilité</strong></td><td>Récupérer vos données dans un format exploitable</td></tr>
    </tbody>
  </table>
  ${callout(
    "<strong>Conservation :</strong> durée de la formation + 5 ans. Pour exercer vos droits, contactez le responsable RGPD du CFA.",
    "🔒"
  )}
</div>

<!-- ════════════════════ 13. SÉCURITÉ ════════════════════ -->
${sectionHeader(13, "Consignes de sécurité", ICONS.alertTriangle)}
<div class="section">
  <h3>En cas de découverte d'un risque majeur</h3>
  <ol>
    <li><strong>PROTÉGER</strong> les personnes en danger immédiat</li>
    <li><strong>DÉCLENCHER</strong> l'alarme lors de la découverte du risque</li>
    <li><strong>ALERTER</strong> ou faire alerter les secours (18 ou 112)</li>
    <li><strong>SUIVRE</strong> les instructions spécifiques à chaque risque</li>
  </ol>

  <h3>Procédure d'évacuation</h3>
  <ol>
    <li><strong>SORTIR</strong> de la pièce en fermant fenêtres et porte (sans verrouiller)</li>
    <li><strong>ÉVACUER</strong> par l'issue de secours la plus proche</li>
    <li><strong>UTILISER</strong> les escaliers — ne jamais prendre l'ascenseur</li>
    <li><strong>SE RENDRE</strong> au point de rassemblement</li>
    <li><strong>SE REGROUPER</strong> avec son groupe et suivre les instructions</li>
  </ol>

  <h3>Alarme intrusion (personne malveillante)</h3>
  <ol>
    <li><strong>S'ÉCHAPPER</strong> si possible, sinon se barricader</li>
    <li><strong>VERROUILLER</strong> les portes, barricader avec le mobilier</li>
    <li><strong>ÉTEINDRE</strong> les lumières, couper le son des appareils</li>
    <li><strong>S'ÉLOIGNER</strong> des portes, murs et fenêtres</li>
    <li><strong>SILENCE</strong> absolu — téléphones en silencieux</li>
    <li><strong>ATTENDRE</strong> les consignes des forces d'intervention</li>
  </ol>

  <div class="urgency-box">
    <strong>Numéros d'urgence</strong>
    <div class="nums">
      <span>🚑 SAMU : 15</span>
      <span>🚒 Pompiers : 18</span>
      <span>🚔 Police : 17</span>
      <span>🆘 Européen : 112</span>
    </div>
  </div>
</div>

<!-- ════════════════════ 14. ÉQUIPE ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(14, "Équipe pédagogique et contacts", ICONS.briefcase)}
<div class="section">

  <div class="contact-grid">
    <div class="contact-card">
      <div class="cc-title">👤 Direction</div>
      <div class="cc-detail">
        ${val(d, "equipe_dir_nom")} ${val(d, "equipe_dir_prenom")}<br/>
        ${val(d, "equipe_dir_fonction")}<br/>
        📞 ${val(d, "equipe_dir_tel")} · ✉ ${val(d, "equipe_dir_email")}
      </div>
    </div>
    <div class="contact-card">
      <div class="cc-title">📚 Responsable pédagogique</div>
      <div class="cc-detail">
        ${val(d, "equipe_resp_nom")} ${val(d, "equipe_resp_prenom")}<br/>
        ${val(d, "equipe_resp_fonction")}<br/>
        📞 ${val(d, "equipe_resp_tel")} · ✉ ${val(d, "equipe_resp_email")}
      </div>
    </div>
    <div class="contact-card">
      <div class="cc-title">✅ Qualité et certification</div>
      <div class="cc-detail">
        ${val(d, "equipe_qualite_nom")} ${val(d, "equipe_qualite_prenom")}<br/>
        📞 ${val(d, "equipe_qualite_tel")} · ✉ ${val(d, "equipe_qualite_email")}
      </div>
    </div>
    <div class="contact-card">
      <div class="cc-title">🎓 Formateur référent</div>
      <div class="cc-detail">
        ${val(d, "equipe_formateur_nom")} ${val(d, "equipe_formateur_prenom")}<br/>
        ${val(d, "equipe_formateur_matiere")}<br/>
        📞 ${val(d, "equipe_formateur_tel")} · ✉ ${val(d, "equipe_formateur_email")}
      </div>
    </div>
  </div>

  ${banner("CONTACTS GÉNÉRAUX DU CFA")}
  <div class="no-break">
    ${field("Accueil", val(d, "equipe_accueil"))}
    ${field2("Téléphone standard", val(d, "equipe_tel_standard"), "E-mail général", val(d, "equipe_email_general"))}
    ${field("Adresse", val(d, "equipe_adresse"))}
    ${field("Horaires", val(d, "equipe_horaires"))}
  </div>
</div>

<!-- ════════════════════ 15. SIGNATURES ════════════════════ -->
<div class="page-break"></div>
${sectionHeader(15, "Signatures et engagement", ICONS.checkCircle)}
<div class="section">
  <p>En signant ce livret, les parties attestent avoir pris connaissance de l'ensemble de son contenu et s'engagent à respecter les dispositions qui y sont énoncées.</p>

  ${callout(
    "L'apprenti(e) reconnaît avoir été informé(e) de la clause relative au droit à l'image, des engagements définis dans le cadre de sa formation et du règlement intérieur.",
    "📋"
  )}

  <div class="sig-row">
    ${sigBlock("SIGNATURE APPRENTI(E)", v(d, "signature_apprenti") || null)}
    ${sigBlock("SIGNATURE MAÎTRE D'APPRENTISSAGE", v(d, "signature_tuteur") || null)}
    ${sigBlock("SIGNATURE CFA", v(d, "signature_cfa") || null)}
  </div>
</div>

<div class="footer-space"></div>
</body>
</html>`;
}
