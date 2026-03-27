"use client";
import React from "react";

/* ========= SECTION BANNER ========= */
export function SectionBanner({ title }: { title: string; color?: string }) {
  return (
    <div className="bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5 rounded-md">
      {title}
    </div>
  );
}

/* ========= INFO CARD (bordure gauche) ========= */
export function InfoCard({ children }: { color?: string; children: React.ReactNode }) {
  return (
    <div className="border-l-2 border-primary pl-4 py-3 my-2">
      {children}
    </div>
  );
}

/* ========= ALERT BOX ========= */
export function AlertBox({ children, variant = "info" }: { children: React.ReactNode; bg?: string; textColor?: string; variant?: "info" | "warning" | "success" }) {
  const styles = {
    info: "bg-primary/5 text-foreground border border-primary/20",
    warning: "bg-warning/5 text-foreground border border-warning/20",
    success: "bg-success/5 text-foreground border border-success/20",
  };
  return (
    <div className={`${styles[variant]} px-4 py-3 rounded-md my-3 text-sm`}>
      {children}
    </div>
  );
}

/* ========= TIMELINE STEP ========= */
export function TimelineStep({ num, title, description }: { num: number; title: string; description: string; color?: string }) {
  return (
    <div className="flex gap-3 my-2">
      <div className="flex flex-col items-center">
        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">
          {num}
        </div>
        <div className="w-px flex-1 bg-border mt-1" />
      </div>
      <div className="pb-4">
        <h4 className="font-semibold text-sm text-foreground">{title}</h4>
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      </div>
    </div>
  );
}

/* ========= NUMBERED STEP ========= */
export function NumberedStep({ num, title, description }: { num: number; title: string; description: string; color?: string }) {
  return (
    <div className="flex items-start gap-3 my-1.5">
      <div className="h-6 w-6 rounded-full bg-muted text-foreground text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
        {num}
      </div>
      <div>
        <span className="font-semibold text-sm text-foreground">{title}</span>
        <span className="text-sm text-muted-foreground ml-1.5">{description}</span>
      </div>
    </div>
  );
}

/* ========= FIELD ROW (formulaire visuel) ========= */
export function FieldRow({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`flex items-center py-2 border-b border-border ${className}`}>
      <span className="font-medium text-foreground text-sm w-52 shrink-0">{label} :</span>
      <span className="flex-1 border-b border-input h-6"></span>
    </div>
  );
}

export function DoubleFieldRow({ label1, label2, className = "" }: { label1: string; label2: string; className?: string }) {
  return (
    <div className={`grid grid-cols-2 gap-4 py-2 border-b border-border ${className}`}>
      <div className="flex items-center">
        <span className="font-medium text-foreground text-sm w-32 shrink-0">{label1} :</span>
        <span className="flex-1 border-b border-input h-6"></span>
      </div>
      <div className="flex items-center">
        <span className="font-medium text-foreground text-sm w-32 shrink-0">{label2} :</span>
        <span className="flex-1 border-b border-input h-6"></span>
      </div>
    </div>
  );
}

/* ========= DATA TABLE ========= */
export function DataTable({ headers, rows }: { headers: string[]; rows: string[][]; headerBg?: string }) {
  return (
    <div className="overflow-x-auto my-3 rounded-md border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted">
            {headers.map((h, i) => (
              <th key={i} className="font-medium text-foreground px-3 py-2.5 text-left text-xs uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/50">
              {row.map((cell, j) => (
                <td key={j} className={`px-3 py-2 text-sm ${j === 0 ? "font-medium text-foreground" : "text-muted-foreground"}`}>{cell}</td>
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
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {num}. {title}
        </h1>
        <div className="mt-2 h-0.5 w-16 bg-primary rounded-full" />
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

/* ========= SIGNATURE BLOCK ========= */
export function SignatureBlock({ title, text }: { title: string; text: string; color?: string }) {
  return (
    <div className="my-4 rounded-md border border-border overflow-hidden">
      <div className="bg-primary text-primary-foreground font-semibold text-sm px-4 py-2.5">
        {title}
      </div>
      <div className="p-5">
        <p className="text-sm text-muted-foreground italic mb-4">{text}</p>
        <div className="flex items-center mb-3">
          <span className="font-medium text-foreground text-sm w-20">Date :</span>
          <span className="flex-1 border-b border-input h-6 max-w-xs"></span>
        </div>
        <p className="font-medium text-foreground text-sm mb-8">Signature (precedee de la mention &quot;Lu et approuve&quot;) :</p>
      </div>
    </div>
  );
}
