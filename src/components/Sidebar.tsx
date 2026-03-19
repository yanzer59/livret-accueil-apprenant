"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/lib/sections";
import { useState } from "react";

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setOpen(!open)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-primary text-white p-2 rounded-md shadow-lg"
        aria-label="Menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {open && <div className="lg:hidden fixed inset-0 bg-black/40 z-30" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-200 z-40 overflow-y-auto
        transform transition-transform duration-200
        ${open ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:shrink-0
      `}>
        {/* Header */}
        <Link href="/" onClick={() => setOpen(false)}>
          <div className="bg-primary text-white p-5">
            <h2 className="font-bold text-lg leading-tight">Livret d&apos;accueil</h2>
            <p className="text-sm text-blue-200 mt-1">de l&apos;apprenant</p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="p-3">
          {/* Accueil */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-1 transition-colors
              ${pathname === "/"
                ? "bg-accent text-dark font-semibold"
                : "text-dark hover:bg-light-gold hover:text-accent"
              }
            `}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
              ${pathname === "/" ? "bg-dark text-accent" : "bg-light-gold text-accent"}`}>
              ~
            </span>
            <span className="truncate font-medium">Accueil</span>
          </Link>

          <div className="border-b border-gray-200 my-2"></div>

          {sections.map((s) => {
            const href = `/${s.id}`;
            const isActive = pathname === href;
            return (
              <Link
                key={s.id}
                href={href}
                onClick={() => setOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm mb-0.5 transition-colors
                  ${isActive
                    ? "bg-primary text-white font-semibold"
                    : "text-dark hover:bg-light hover:text-primary"
                  }
                `}
              >
                <span className={`
                  w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                  ${isActive ? "bg-accent text-dark" : "bg-light-gray text-gray-text"}
                `}>
                  {s.num}
                </span>
                <span className="truncate">{s.shortTitle}</span>
              </Link>
            );
          })}

          <div className="border-b border-gray-200 my-2"></div>

          {/* Generer PDF */}
          <Link
            href="/generer-pdf"
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-md text-sm mb-1 transition-colors
              ${pathname === "/generer-pdf"
                ? "bg-green text-white font-semibold"
                : "bg-green/10 text-green hover:bg-green/20 font-semibold"
              }
            `}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
              ${pathname === "/generer-pdf" ? "bg-white text-green" : "bg-green text-white"}`}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </span>
            <span className="truncate">Generer mon livret</span>
          </Link>

          <div className="border-b border-gray-200 my-2"></div>

          {/* Admin */}
          <Link
            href="/admin"
            onClick={() => setOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors
              ${pathname.startsWith("/admin")
                ? "bg-secondary text-white font-semibold"
                : "text-gray-text hover:bg-light hover:text-secondary"
              }
            `}
          >
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0
              ${pathname.startsWith("/admin") ? "bg-white text-secondary" : "bg-light-gray text-gray-text"}`}>
              A
            </span>
            <span className="truncate">Administration</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
