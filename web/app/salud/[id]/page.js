"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { profesionales, salitas } from "@/lib/data";

export default function SalitaPage() {
  const { id } = useParams();
  const salita = salitas.find((s) => s.id === id);
  const pros = profesionales.filter((p) => p.salitaId === id);

  if (!salita) {
    return <Screen header="back" active="salud" back="/salud"><p className="note">No encontramos esa salita.</p></Screen>;
  }

  return (
    <Screen header="back" active="salud" back="/salud">
      <div className="stack">
        <div>
          <h1 className="h1">{salita.nombre}</h1>
          <p className="lead">{salita.centro} · {salita.zona}</p>
        </div>
        <section className="panel">
          <p style={{ display: "flex", gap: 8, alignItems: "center" }}><Icon name="pin" size={16} /> {salita.direccion}</p>
          <p className="note" style={{ textAlign: "left", marginTop: 8 }}><Icon name="clock" size={14} /> {salita.horario}</p>
        </section>
        <h2 className="h2" style={{ fontSize: 20 }}>Profesionales</h2>
        {pros.map((p) => (
          <Link key={p.id} href={"/salud/turno/" + p.id} className="g-card">
            <h3 style={{ color: "var(--navy)", fontSize: 18 }}>{p.nombre}</h3>
            <p className="lead" style={{ fontSize: 14, marginTop: 4 }}>{p.especialidad}</p>
            <p className="note" style={{ textAlign: "left", marginTop: 4 }}>Mat. {p.matricula}</p>
          </Link>
        ))}
        {pros.length === 0 && <p className="note">Sin profesionales cargados.</p>}
      </div>
    </Screen>
  );
}
