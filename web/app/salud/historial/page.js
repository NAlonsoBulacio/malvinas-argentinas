"use client";

import { Screen } from "@/components/chrome";
import { historialClinico } from "@/lib/data";
import { fmtDia } from "@/lib/salud";

export default function HistorialPage() {
  return (
    <Screen header="back" active="salud" back="/salud">
      <div className="stack">
        <div>
          <h1 className="h1">Historial clínico</h1>
          <p className="lead">Atenciones registradas en el sistema municipal.</p>
        </div>
        {historialClinico.map((h) => (
          <article key={h.fecha + h.tipo} className="g-card">
            <p className="kicker">{fmtDia(h.fecha)}</p>
            <h3 style={{ color: "var(--navy)", fontSize: 18, marginTop: 6 }}>{h.tipo}</h3>
            <p className="lead" style={{ fontSize: 14, marginTop: 4 }}>{h.profesional}</p>
            <p style={{ marginTop: 8 }}>{h.resumen}</p>
          </article>
        ))}
      </div>
    </Screen>
  );
}
