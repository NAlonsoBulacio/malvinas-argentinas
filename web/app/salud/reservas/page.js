"use client";

import Link from "next/link";
import { Screen } from "@/components/chrome";
import { useApp } from "@/components/app-state";
import { reservasIniciales } from "@/lib/data";
import { fmtDia } from "@/lib/salud";

export default function ReservasPage() {
  const { reservas = reservasIniciales } = useApp();

  return (
    <Screen header="back" active="salud" back="/salud">
      <div className="stack">
        <div>
          <h1 className="h1">Mis reservas</h1>
          <p className="lead">Turnos de salud municipal asociados a tu cuenta.</p>
        </div>
        {reservas.map((r) => (
          <article key={r.id} className="g-card">
            <div className="row-between">
              <h3 style={{ color: "var(--navy)", fontSize: 18 }}>{r.salitaNombre}</h3>
              <span className={"pill " + (r.estado === "Confirmada" ? "ok" : "")}>{r.estado}</span>
            </div>
            <p className="lead" style={{ fontSize: 14, marginTop: 6 }}>{r.centro}</p>
            <p style={{ marginTop: 6 }}>{r.profesional} · {r.especialidad}</p>
            <p style={{ marginTop: 8, color: "var(--navy)", fontWeight: 700 }}>{fmtDia(r.fecha)} · {r.hora} hs</p>
          </article>
        ))}
        {reservas.length === 0 && <p className="note">Todavía no tenés reservas.</p>}
        <Link href="/salud" className="btn">Buscar un turno</Link>
      </div>
    </Screen>
  );
}
