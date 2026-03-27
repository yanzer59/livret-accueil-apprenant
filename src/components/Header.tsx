"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Download, Settings, FileText } from "lucide-react";
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

  const navLink = (href: string, label: string, icon?: React.ReactNode, matchFn?: (p: string) => boolean) => {
    const active = matchFn ? matchFn(pathname) : pathname === href;
    return (
      <Link href={href} className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium transition-all duration-200",
        active
          ? "text-primary border-b-2 border-primary -mb-[1px]"
          : "text-gray-500 hover:text-primary"
      )}>
        {icon}
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200">
      <div className="mx-auto max-w-3xl flex h-14 items-center px-6 md:px-8">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 mr-8 group">
          <div className="w-7 h-7 bg-primary flex items-center justify-center">
            <span className="text-white text-xs font-bold tracking-tight">H</span>
          </div>
          <div className="leading-none">
            <span className="text-[15px] font-bold text-gray-900 tracking-tight">Livrivia</span>
            <span className="hidden sm:block text-[10px] text-gray-400 font-medium tracking-wide uppercase">HEOL Groupe</span>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-1 h-full">
          {navLink("/", "Livret", <FileText className="h-3.5 w-3.5" />)}
          {navLink("/generer-pdf", "Export PDF", <Download className="h-3.5 w-3.5" />)}
          {isAdmin && navLink("/admin", "Admin", <Settings className="h-3.5 w-3.5" />, (p) => p.startsWith("/admin"))}
        </nav>

        <div className="flex-1" />

        {/* User */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex items-center gap-2 text-[13px] text-gray-500">
            <div className="w-6 h-6 bg-gray-100 text-gray-600 flex items-center justify-center text-[10px] font-semibold rounded-sm">
              {initials}
            </div>
            {userEmail}
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-1 px-2 py-1 text-[12px] text-gray-400 hover:text-red-600 transition-colors duration-200"
            title="Se deconnecter"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}
