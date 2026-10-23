"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";

const LINKS = [
  { href: "/notificaciones", label: "Preferencias de notificación" },
  { href: "/notificaciones", label: "Ayuda y soporte" },
  { href: "/registro/terminos", label: "Política de privacidad" },
];

const SALUD = [
  { href: "/salud/reservas", label: "Mis reservas de salud" },
  { href: "/salud/historial", label: "Historial clínico" },
  { href: "/salud/vacunas", label: "Vacunación" },
];

export default function PerfilPage() {
  const { perfil, logout } = useApp();
  const router = useRouter();

  return (
    <Screen header="back" active="perfil" back="/talleres">
      <div className="stack">
        <div>
          <h1 className="h1">Mi Perfil</h1>
          <p className="lead">Gestioná tus datos y mantenete al día con tus talleres.</p>
        </div>
        <section className="profile-card">
          <div className="profile-top">
            <img src={perfil.foto || "/figma/perfil.png"} alt="" style={{ width: 48, height: 48, borderRadius: 999, objectFit: "cover" }} />
            <span className="pill ok">ACTIVO</span>
          </div>
          <div className="stack" style={{ gap: 12, marginTop: 14 }}>
            <div>
              <div className="kicker">Nombre completo</div>
              <strong style={{ color: "var(--navy)" }}>{perfil.nombre.toUpperCase()}</strong>
            </div>
            <div>
              <div className="kicker">DNI</div>
              <strong style={{ color: "var(--navy)" }}>{perfil.dni}</strong>
            </div>
            <div>
              <div className="kicker">Correo electrónico</div>
              <span>{perfil.emailPerfil || perfil.email}</span>
            </div>
          </div>
          <Link href="/perfil/editar" className="btn" style={{ marginTop: 16 }}>
            <Icon name="pencil" size={16} /> Editar Perfil
          </Link>
        </section>
        <section className="settings">
          <h3>Salud</h3>
          {SALUD.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label} <Icon name="chevron" size={16} />
            </Link>
          ))}
        </section>
        <section className="settings">
          <h3>Configuración</h3>
          {LINKS.map((l) => (
            <Link key={l.label} href={l.href}>
              {l.label} <Icon name="chevron" size={16} />
            </Link>
          ))}
        </section>
        <button
          className="btn danger"
          type="button"
          onClick={() => {
            logout();
            router.push("/");
          }}
        >
          CERRAR SESIÓN
        </button>
      </div>
    </Screen>
  );
}
