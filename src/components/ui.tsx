"use client";
import React from "react";

/* ========= BANNER ========= */
export function SectionBanner({ title, color = "bg-primary" }: { title: string; color?: string }) {
  return (
    <div className={`${color} text-white font-bold text-lg px-5 py-3 rounded-sm`}>
      {title}
    </div>
  );
}

/* ========= INFO CARD (bordure gauche) ========= */
export function InfoCard({ color = "border-secondary", children }: { color?: string; children: React.ReactNode }) {
  return (
    <div className={`border-l-4 ${color} pl-5 py-4 my-2`}>
      {children}
    </div>
  );
}

/* ========= ALERT BOX ========= */
export function AlertBox({ children, bg = "bg-light", textColor = "text-primary" }: { children: React.ReactNode; bg?: string; textColor?: string }) {
  return (
    <div className={`${bg} ${textColor} px-5 py-3 rounded-sm my-3 text-sm`}>
      {children}
    </div>
  );
}

/* ========= TIMELINE STEP ========= */
export function TimelineStep({ num, title, description, color = "bg-primary" }: { num: number; title: string; description: string; color?: string }) {
  return (
    <div className="flex gap-0 my-1">
      <div className={`${color} text-white font-bold text-2xl flex items-center justify-center w-16 min-h-[80px] rounded-l-lg`}>
        {num}
      </div>
      <div className={`flex-1 border-l-2 border-current bg-light-gray p-4 rounded-r-lg`} style={{ borderColor: "inherit" }}>
        <h4 className="font-bold text-sm uppercase" style={{ color: "var(--color-primary)" }}>{title}</h4>
        <p className="text-sm text-dark mt-1">{description}</p>
      </div>
    </div>
  );
}

/* ========= NUMBERED STEP ========= */
export function NumberedStep({ num, title, description, color = "bg-primary" }: { num: number; title: string; description: string; color?: string }) {
  return (
    <div className="flex gap-0 my-1">
      <div className={`${color} text-white font-bold text-lg flex items-center justify-center w-10 rounded-l`}>
        {num}
      </div>
      <div className="flex-1 border-l-2 pl-4 py-2" style={{ borderColor: "var(--color-secondary)" }}>
        <span className="font-bold text-sm" style={{ color: "var(--color-primary)" }}>{title}</span>
        <span className="text-sm text-dark ml-2">{description}</span>
      </div>
    </div>
  );
}

/* ========= FIELD ROW (formulaire visuel) ========= */
export function FieldRow({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center py-2 border-b border-dotted border-gray-300 ${className}`}>
      <span className="font-bold text-primary text-sm w-52 shrink-0">{label} :</span>
      <span className="flex-1 border-b border-gray-300 h-6"></span>
    </div>
  );
}

export function DoubleFieldRow({ label1, label2, className = "" }: { label1: string; label2: string; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-4 py-2 border-b border-dotted border-gray-300 ${className}`}>
      <div className="flex items-center">
        <span className="font-bold text-primary text-sm w-32 shrink-0">{label1} :</span>
        <span className="flex-1 border-b border-gray-300 h-6"></span>
      </div>
      <div className="flex items-center">
        <span className="font-bold text-primary text-sm w-32 shrink-0">{label2} :</span>
        <span className="flex-1 border-b border-gray-300 h-6"></span>
      </div>
    </div>
  );
}

/* ========= DATA TABLE ========= */
export function DataTable({ headers, rows, headerBg = "bg-primary" }: { headers: string[]; rows: string[][]; headerBg?: string }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className={`${headerBg} text-white font-bold px-3 py-2 text-left`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? "bg-light" : "bg-white"}>
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2 border-b border-gray-200 ${j === 0 ? "font-semibold" : ""}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ========= PAGE WRAPPER ========= */
export function PageSection({ title, num, children }: { title: string; num: number; children: React.ReactNode }) {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-primary border-b-2 border-accent pb-2 mb-6">
        {num}. {title}
      </h1>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

/* ========= SIGNATURE BLOCK ========= */
export function SignatureBlock({ title, text, color = "bg-primary" }: { title: string; text: string; color?: string }) {
  return (
    <div className="my-4">
      <SectionBanner title={title} color={color} />
      <div className="border border-gray-300 border-t-0 p-5">
        <p className="text-sm text-gray-text italic mb-4">{text}</p>
        <div className="flex items-center mb-3">
          <span className="font-bold text-primary text-sm w-20">Date :</span>
          <span className="flex-1 border-b border-gray-300 h-6 max-w-xs"></span>
        </div>
        <p className="font-bold text-primary text-sm mb-8">Signature (precedee de la mention &quot;Lu et approuve&quot;) :</p>
      </div>
    </div>
  );
}
