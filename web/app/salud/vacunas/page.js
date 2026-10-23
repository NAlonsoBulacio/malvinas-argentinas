"use client";

import { useState } from "react";
import { Screen } from "@/components/chrome";
import { useApp } from "@/components/app-state";
import { vacunasDisponibles, vacunasIniciales } from "@/lib/data";
import { fmtDia } from "@/lib/salud";

export default function VacunasPage() {
  const { vacunas = vacunasIniciales, registrarVacuna } = useApp();
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(vacunasDisponibles[0]);
  const [dosis, setDosis] = useState("1ª dosis");
  const [fecha, setFecha] = useState("2026-10-23");
  const [centro, setCentro] = useState("CAPS Grand Bourg");

  function guardar() {
    if (!nombre || !dosis || !fecha || !centro) return;
    registrarVacuna({ nombre, dosis, fechaAplicada: fecha, centro });
    setOpen(false);
  }

  return (
    <Screen header="back" active="salud" back="/salud">
      <div className="stack">
        <div>
          <h1 className="h1">Vacunación</h1>
          <p className="lead">Esquema registrado en los centros de salud del municipio.</p>
        </div>
        <button type="button" className="btn" onClick={() => setOpen(true)}>Registrar vacuna</button>
        {vacunas.map((v) => (
          <article key={v.id} className="g-card">
            <h3 style={{ color: "var(--navy)", fontSize: 18 }}>{v.nombre}</h3>
            <p className="lead" style={{ fontSize: 14, marginTop: 4 }}>{v.dosis}</p>
            <p className="note" style={{ textAlign: "left", marginTop: 6 }}>
              Aplicada: {fmtDia(v.fechaAplicada)}
              {v.proximaDosis ? ` · Próxima: ${fmtDia(v.proximaDosis)}` : ""}
            </p>
            <p className="note" style={{ textAlign: "left" }}>{v.centro}</p>
          </article>
        ))}
      </div>
      {open && (
        <div className="sheet" onClick={() => setOpen(false)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <h2 className="h2" style={{ fontSize: 22 }}>Registrar vacuna</h2>
            <label className="field" style={{ marginTop: 12 }}>
              <span>Vacuna</span>
              <select className="select" value={nombre} onChange={(e) => setNombre(e.target.value)}>
                {vacunasDisponibles.map((v) => <option key={v}>{v}</option>)}
              </select>
            </label>
            <label className="field" style={{ marginTop: 12 }}>
              <span>Dosis</span>
              <input className="select" value={dosis} onChange={(e) => setDosis(e.target.value)} />
            </label>
            <label className="field" style={{ marginTop: 12 }}>
              <span>Fecha aplicada</span>
              <input className="select" type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
            </label>
            <label className="field" style={{ marginTop: 12 }}>
              <span>Centro</span>
              <input className="select" value={centro} onChange={(e) => setCentro(e.target.value)} />
            </label>
            <button type="button" className="btn" style={{ marginTop: 16 }} onClick={guardar}>Guardar</button>
          </div>
        </div>
      )}
    </Screen>
  );
}
