"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "./icons";
import { useApp } from "./app-state";

const VECINO = [
  { id: "talleres", href: "/talleres", label: "Talleres", icon: "cap" },
  { id: "salud", href: "/salud", label: "Salud", icon: "health" },
  { id: "agenda", href: "/agenda", label: "Agenda", icon: "calendar" },
  { id: "carnet", href: "/carnet", label: "Carnet", icon: "card" },
  { id: "perfil", href: "/perfil", label: "Perfil", icon: "user" },
];

const GESTION = [
  { id: "dashboard", href: "/gestion", label: "Dashboard", icon: "grid" },
  { id: "talleres", href: "/gestion/talleres", label: "Talleres", icon: "cap" },
  { id: "alumnos", href: "/gestion/alumnos", label: "Alumnos", icon: "users" },
  { id: "reportes", href: "/gestion/reportes", label: "Reportes", icon: "chart" },
];

export function StatusBar() {
  return (
    <div className="status">
      <strong>9:30</strong>
      <span>
        <Icon name="signal" size={16} />
        <strong>80 %</strong>
        <Icon name="battery" size={22} />
      </span>
    </div>
  );
}

function Logo() {
  return (
    <span className="logo-badge">
      <img src="/figma/logo.png" alt="" />
    </span>
  );
}

export function Header({ variant = "back", back = "/talleres" }) {
  const router = useRouter();
  const { perfil } = useApp();
  const go = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push(back);
  };

  return (
    <header className={"topbar " + variant}>
      {variant === "brand" || variant === "gestion" ? (
        <div className="brand-row">
          <Logo />
          <div>
            <strong>MALVINAS ARGENTINAS</strong>
            {variant === "gestion" && <em>Gestión</em>}
          </div>
        </div>
      ) : (
        <button type="button" className="back" onClick={go}>
          <Icon name="back" size={16} /> VOLVER
        </button>
      )}
      {variant !== "brand" && variant !== "gestion" && <Logo />}
      <div className="top-actions">
        {variant === "help" ? (
          <Link href="/notificaciones" aria-label="Ayuda" className="icon-btn">
            <Icon name="help" size={20} />
          </Link>
        ) : (
          <Link href="/notificaciones" aria-label="Notificaciones" className="icon-btn">
            <Icon name="bell" size={20} />
          </Link>
        )}
        {(variant === "brand" || variant === "gestion" || variant === "profile") && (
          <Link href="/perfil" className="avatar">
            <img src={perfil.foto || "/figma/perfil.png"} alt="" />
          </Link>
        )}
      </div>
    </header>
  );
}

function Nav({ items, active }) {
  return (
    <nav className="bottom">
      {items.map((item) => (
        <Link key={item.id} href={item.href} className={active === item.id ? "on" : ""}>
          <Icon name={item.icon} size={18} />
          <span>{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

export function Screen({ children, header = "back", active, back, nav = "vecino", flush = false }) {
  const { user, ready, toast, clearToast } = useApp();
  const router = useRouter();
  const path = usePathname();
  const publico = path === "/" || path.startsWith("/registro");

  useEffect(() => {
    if (!ready || user || publico) return;
    try {
      const raw = sessionStorage.getItem("ma-talleres");
      if (raw && JSON.parse(raw).user) return;
    } catch {
      /* seguir al login */
    }
    router.replace("/");
  }, [ready, user, publico, router]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(clearToast, 2200);
    return () => clearTimeout(t);
  }, [toast, clearToast]);

  return (
    <div className="phone">
      <div className="sticky-top">
        <StatusBar />
        {header !== "none" && <Header variant={header} back={back} />}
      </div>
      <main className={flush ? "main flush" : "main"}>{children}</main>
      {nav && <Nav items={nav === "gestion" ? GESTION : VECINO} active={active} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
