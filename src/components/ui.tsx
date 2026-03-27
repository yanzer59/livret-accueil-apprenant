"use client";
import React from "react";

/* ========= SECTION BANNER (sous-titre de section) ========= */
export function SectionBanner({ title }: { title: string; color?: string }) {
  return (
    <div className="flex items-center gap-3 mt-7 mb-3">
      <div className="w-1 h-4 bg-accent shrink-0" />
      <h3 className="text-[11px] font-bold text-gray-900 uppercase tracking-[0.08em]">{title}</h3>
    </div>
  );
}

/* ========= INFO CARD ========= */
export function InfoCard({ children }: { color?: string; children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 px-5 py-4 my-2">
      {children}
    </div>
  );
}

/* ========= ALERT BOX ========= */
export function AlertBox({ children, variant = "info" }: { children: React.ReactNode; bg?: string; textColor?: string; variant?: "info" | "warning" | "success" }) {
  const accents = {
    info: "border-l-primary bg-primary/[0.03]",
    warning: "border-l-amber-500 bg-amber-50/50",
    success: "border-l-emerald-600 bg-emerald-50/50",
  };
  return (
    <div className={`border-l-[3px] ${accents[variant]} px-4 py-3 my-4 text-[13px] text-gray-600 leading-relaxed`}>
      {children}
    </div>
  );
}

/* ========= TIMELINE STEP ========= */
export function TimelineStep({ num, title, description }: { num: number; title: string; description: string; color?: string }) {
  return (
    <div className="group flex items-start gap-4 py-3 border-b border-gray-100 last:border-0">
      <span className="text-[11px] font-bold text-accent bg-accent/10 w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">{num}</span>
      <div>
        <p className="text-[13px] font-semibold text-gray-900">{title}</p>
        <p className="text-[12px] text-gray-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ========= NUMBERED STEP ========= */
export function NumberedStep({ num, title, description }: { num: number; title: string; description: string; color?: string }) {
  return (
    <div className="flex items-start gap-3 py-2">
      <span className="text-[11px] font-bold text-primary bg-primary/5 w-5 h-5 flex items-center justify-center shrink-0 mt-0.5">{num}</span>
      <div>
        <span className="text-[13px] font-semibold text-gray-900">{title}</span>
        <span className="text-[13px] text-gray-500 ml-1">— {description}</span>
      </div>
    </div>
  );
}

/* ========= FIELD ROW ========= */
export function FieldRow({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center py-2 border-b border-gray-100 ${className}`}>
      <span className="text-[13px] font-medium text-gray-700 w-48 shrink-0">{label}</span>
      <span className="flex-1 border-b border-gray-300 h-5"></span>
    </div>
  );
}

export function DoubleFieldRow({ label1, label2, className = "" }: { label1: string; label2: string; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-4 py-2 border-b border-gray-100 ${className}`}>
      <div className="flex items-center">
        <span className="text-[13px] font-medium text-gray-700 w-28 shrink-0">{label1}</span>
        <span className="flex-1 border-b border-gray-300 h-5"></span>
      </div>
      <div className="flex items-center">
        <span className="text-[13px] font-medium text-gray-700 w-28 shrink-0">{label2}</span>
        <span className="flex-1 border-b border-gray-300 h-5"></span>
      </div>
    </div>
  );
}

/* ========= DATA TABLE ========= */
export function DataTable({ headers, rows }: { headers: string[]; rows: string[][]; headerBg?: string }) {
  return (
    <div className="overflow-x-auto my-3">
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b-2 border-primary">
            {headers.map((h, i) => (
              <th key={i} className="font-semibold text-primary px-3 py-2 text-left text-[11px] uppercase tracking-[0.06em]">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-100 last:border-0">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2.5 ${j === 0 ? "font-medium text-gray-900" : "text-gray-600"}`}>{cell}</td>
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
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-gray-900">
          {num}. {title}
        </h1>
        <div className="mt-2 h-0.5 w-12 bg-accent" />
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* ========= SIGNATURE BLOCK ========= */
export function SignatureBlock({ title, text }: { title: string; text: string; color?: string }) {
  return (
    <div className="my-4 border border-gray-200">
      <div className="bg-primary text-white text-[11px] font-bold uppercase tracking-[0.06em] px-4 py-2">
        {title}
      </div>
      <div className="p-5">
        <p className="text-[13px] text-gray-500 italic mb-4">{text}</p>
        <div className="flex items-center mb-3">
          <span className="text-[13px] font-medium text-gray-700 w-16">Date :</span>
          <span className="flex-1 border-b border-gray-300 h-5 max-w-xs"></span>
        </div>
        <p className="text-[13px] font-medium text-gray-700 mb-8">Signature :</p>
      </div>
    </div>
  );
}
