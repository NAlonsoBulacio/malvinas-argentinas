"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Salud" },
  { href: "/perfil", label: "Perfil" },
];

export function Shell({ children }) {
  const path = usePathname();
  const current = (href) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="mark" aria-hidden="true">M</div>
          <div>
            <strong>Malvinas Argentinas</strong>
            <span>Salud municipal</span>
          </div>
        </div>
        <nav className="top-links" aria-label="Secciones">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined}>
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      {children}
      <nav className="bottom-nav" aria-label="Secciones">
        {links.map((l) => (
          <Link key={l.href} href={l.href} aria-current={current(l.href) ? "page" : undefined}>
            {l.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
