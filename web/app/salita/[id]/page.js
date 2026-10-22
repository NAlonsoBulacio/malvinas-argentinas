"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { profesionales, salitas } from "@/lib/data";

export default function SalitaPage() {
  const { id } = useParams();
  const salita = salitas.find((s) => s.id === id);
  const pros = profesionales.filter((p) => p.salitaId === id);

  if (!salita) {
    return (
      <main className="page page-narrow">
        <p className="empty">No encontramos esa salita.</p>
      </main>
    );
  }

  return (
    <main className="page page-narrow">
      <Link className="back" href="/">← Salitas</Link>
      <div className="hero">
        <h1>{salita.nombre}</h1>
        <p>{salita.centro} · {salita.zona}</p>
      </div>
      <section className="panel">
        <p className="muted" style={{ marginTop: 0 }}>{salita.direccion}</p>
        <p className="small">{salita.horario}</p>
      </section>
      <h2 className="label" style={{ marginBottom: "0.7rem" }}>Profesionales</h2>
      <div className="cards">
        {pros.map((p) => (
          <Link key={p.id} href={"/turno/" + p.id} className="card">
            <h3>{p.nombre}</h3>
            <p className="muted">{p.especialidad}</p>
            <p className="small">Mat. {p.matricula}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
