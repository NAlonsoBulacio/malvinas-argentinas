"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { avisosVacunacion, vacunasDisponibles, vacunasIniciales } from "@/lib/data";
import { estadoVacuna, etiquetaVacuna, fmtDia, textoProxima } from "@/lib/salud";

const ORDEN = { vencida: 0, proxima: 1, "al-dia": 2 };

function claseEstado(estado) {
  if (estado === "vencida") return "bad";
  if (estado === "proxima") return "warn";
  return "ok";
}

function VacunasInner() {
  const { vacunas = vacunasIniciales, registrarVacuna } = useApp();
  const params = useSearchParams();
  const router = useRouter();
  const vista = params.get("vista") === "avisos" ? "avisos" : "carnet";
  const [open, setOpen] = useState(false);
  const [nombre, setNombre] = useState(vacunasDisponibles[0]);
  const [dosis, setDosis] = useState("1ª dosis");
  const [fecha, setFecha] = useState("2026-11-02");
  const [proxima, setProxima] = useState("");
  const [centro, setCentro] = useState("CAPS Grand Bourg");

  const lista = [...vacunas].sort((a, b) => ORDEN[estadoVacuna(a)] - ORDEN[estadoVacuna(b)]);
  const counts = lista.reduce(
    (acc, v) => {
      acc[estadoVacuna(v)] += 1;
      return acc;
    },
    { vencida: 0, proxima: 0, "al-dia": 0 }
  );

  function setVista(next) {
    router.replace(next === "avisos" ? "/salud/vacunas?vista=avisos" : "/salud/vacunas");
  }

  function guardar() {
    if (!nombre || !dosis || !fecha || !centro) return;
    registrarVacuna({ nombre, dosis, fechaAplicada: fecha, proximaDosis: proxima || null, centro });
    setOpen(false);
    setProxima("");
  }

  return (
    <Screen header="back" active="salud" back="/salud">
      <div className="stack">
        <div>
          <h1 className="h1">Vacunación</h1>
          <p className="lead">Carnet del municipio, próximas dosis y avisos de las campañas.</p>
        </div>
        <div className="chip-row">
          <button type="button" className={"chip" + (vista === "carnet" ? " on" : "")} onClick={() => setVista("carnet")}>Mi carnet</button>
          <button type="button" className={"chip" + (vista === "avisos" ? " on" : "")} onClick={() => setVista("avisos")}>Avisos</button>
        </div>

        {vista === "carnet" ? (
          <>
            <p className="note" style={{ textAlign: "left" }}>
              {counts["al-dia"]} al día · {counts.proxima} próxima{counts.proxima === 1 ? "" : "s"} · {counts.vencida} vencida{counts.vencida === 1 ? "" : "s"}
            </p>
            <button type="button" className="btn" onClick={() => setOpen(true)}>Registrar vacuna</button>
            {lista.map((v) => {
              const estado = estadoVacuna(v);
              return (
                <article key={v.id} className="g-card">
                  <div className="row-between">
                    <h3 style={{ color: "var(--navy)", fontSize: 18 }}>{v.nombre}</h3>
                    <span className={"pill " + claseEstado(estado)}>{etiquetaVacuna(estado)}</span>
                  </div>
                  <p className="lead" style={{ fontSize: 14, marginTop: 4 }}>{v.dosis}</p>
                  <p className="note" style={{ textAlign: "left", marginTop: 6 }}>
                    Aplicada: {fmtDia(v.fechaAplicada)}
                  </p>
                  {v.proximaDosis && (
                    <p style={{ marginTop: 6, fontWeight: 700, color: estado === "vencida" ? "var(--danger)" : "var(--navy)" }}>
                      {textoProxima(v.proximaDosis)} · {fmtDia(v.proximaDosis)}
                    </p>
                  )}
                  <p className="note" style={{ textAlign: "left" }}>{v.centro}</p>
                  {estado !== "al-dia" && (
                    <Link href="/salud/salitas" className="btn slim" style={{ marginTop: 12 }}>Ver vacunatorios</Link>
                  )}
                </article>
              );
            })}
          </>
        ) : (
          <>
            <p className="lead">Campañas y recordatorios que también llegan a tus anuncios.</p>
            {avisosVacunacion.map((a) => (
              <article key={a.id} className="notice plain">
                <div className="ico-bubble info"><Icon name="bell" size={18} /></div>
                <div>
                  <div className="head">
                    <h3>{a.titulo}</h3>
                    <time>{fmtDia(a.fecha)}</time>
                  </div>
                  <p style={{ marginTop: 6 }}>{a.texto}</p>
                  <p className="note" style={{ textAlign: "left", marginTop: 8 }}>{a.audiencia}</p>
                  <p className="note" style={{ textAlign: "left" }}>{a.lugar} · {a.vigencia}</p>
                  <Link href="/salud/salitas" className="btn slim" style={{ marginTop: 12 }}>Ver vacunatorios</Link>
                </div>
              </article>
            ))}
          </>
        )}
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
              <span>Próxima dosis (opcional)</span>
              <input className="select" type="date" value={proxima} onChange={(e) => setProxima(e.target.value)} />
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

export default function VacunasPage() {
  return (
    <Suspense fallback={<Screen header="back" active="salud" back="/salud"><p className="note">Cargando vacunación…</p></Screen>}>
      <VacunasInner />
    </Suspense>
  );
}
