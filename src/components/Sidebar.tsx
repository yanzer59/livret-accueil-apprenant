"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/lib/sections";
import { cn } from "@/lib/cn";
import {
  HandHeart,
  UserRound,
  FileText,
  GraduationCap,
  Handshake,
  Scale,
  Award,
  Accessibility,
  CircleDollarSign,
  Building2,
  ShieldCheck,
  Camera,
  Lock,
  ScrollText,
  FolderOpen,
  Users,
  Link as LinkIcon,
  PenTool,
  Download,
  Settings,
  BookOpen,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  HandHeart, UserRound, FileText, GraduationCap, Handshake, Scale, Award,
  Accessibility, CircleDollarSign, Building2, ShieldCheck, Camera, Lock,
  ScrollText, FolderOpen, Users, Link: LinkIcon, PenTool,
};

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Sidebar({ isAdmin = false }: { isAdmin?: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 shrink-0 border-r border-sidebar-border bg-sidebar md:flex md:flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        <Link href="/" className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <span className="text-lg font-semibold text-sidebar-foreground">Livrivia</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        {/* Sections label */}
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
          Sommaire
        </p>

        {/* Section scroll links */}
        <ul className="space-y-0.5">
          {sections.map((s) => {
            const Icon = iconMap[s.icon] || FileText;
            return (
              <li key={s.id}>
                <button
                  onClick={() => scrollTo(s.id)}
                  className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground text-sidebar-muted text-left"
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span className="truncate">{s.shortTitle}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Separator */}
        <div className="my-4 h-px bg-sidebar-border" />

        {/* PDF export */}
        <ul className="space-y-1">
          <li>
            <Link
              href="/generer-pdf"
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                pathname === "/generer-pdf" ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-muted"
              )}
            >
              <Download className="h-4 w-4" />
              Exporter PDF
            </Link>
          </li>
        </ul>

        {/* Admin section */}
        {isAdmin && (
          <>
            <div className="my-4 h-px bg-sidebar-border" />
            <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
              Administration
            </p>
            <ul className="space-y-1">
              <li>
                <Link
                  href="/admin"
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    pathname.startsWith("/admin") ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-muted"
                  )}
                >
                  <Settings className="h-4 w-4" />
                  Gestion apprenants
                </Link>
              </li>
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}

/* ======= Mobile sidebar ======= */
export function MobileSidebar({ isAdmin = false, onNavigate }: { isAdmin?: boolean; onNavigate?: () => void }) {
  const pathname = usePathname();

  function handleScrollTo(id: string) {
    onNavigate?.();
    setTimeout(() => scrollTo(id), 100);
  }

  return (
    <nav className="flex-1 overflow-y-auto p-3">
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">
        Sommaire
      </p>
      <ul className="space-y-0.5">
        {sections.map((s) => {
          const Icon = iconMap[s.icon] || FileText;
          return (
            <li key={s.id}>
              <button
                onClick={() => handleScrollTo(s.id)}
                className="w-full flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent text-sidebar-muted text-left"
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{s.shortTitle}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="my-4 h-px bg-sidebar-border" />
      <ul className="space-y-1">
        <li>
          <Link href="/generer-pdf" onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent",
              pathname === "/generer-pdf" ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-muted"
            )}>
            <Download className="h-4 w-4" />
            Exporter PDF
          </Link>
        </li>
      </ul>

      {isAdmin && (
        <>
          <div className="my-4 h-px bg-sidebar-border" />
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-muted">Administration</p>
          <ul className="space-y-1">
            <li>
              <Link href="/admin" onClick={onNavigate}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent",
                  pathname.startsWith("/admin") ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-muted"
                )}>
                <Settings className="h-4 w-4" />
                Gestion apprenants
              </Link>
            </li>
          </ul>
        </>
      )}
    </nav>
  );
}
