"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LogOut, Download, Settings } from "lucide-react";
import { cn } from "@/lib/cn";

interface HeaderProps {
  userEmail: string;
  isAdmin: boolean;
  onLogout: () => void;
}

export default function Header({ userEmail, isAdmin, onLogout }: HeaderProps) {
  const pathname = usePathname();

  const initials = userEmail
    ? userEmail.split("@")[0].slice(0, 2).toUpperCase()
    : "U";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-4xl flex h-14 items-center gap-4 px-4 md:px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="font-semibold text-foreground">Livrivia</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 ml-4">
          <Link
            href="/"
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              pathname === "/" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            Livret
          </Link>
          <Link
            href="/generer-pdf"
            className={cn(
              "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              pathname === "/generer-pdf" ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Exporter PDF</span>
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              className={cn(
                "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                pathname.startsWith("/admin") ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              <Settings className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Admin</span>
            </Link>
          )}
        </nav>

        <div className="flex-1" />

        {/* User info */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
            {initials}
          </div>
          <span className="hidden text-sm font-medium md:inline-block text-foreground">
            {userEmail}
          </span>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:text-destructive hover:bg-muted transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden md:inline-block">Deconnexion</span>
          </button>
        </div>
      </div>
    </header>
  );
}
