"use client";

import { useState } from "react";
import { historialClinico, user, vacunasDisponibles } from "@/lib/data";
import { fmtDia } from "@/lib/salud";
import { useStore } from "@/components/store";

const TABS = [
  { id: "datos", label: "Datos" },
  { id: "historial", label: "Historial" },
  { id: "vacunas", label: "Vacunación" },
  { id: "reservas", label: "Reservas" },
];

export default function PerfilPage() {
  const { vacunas, reservas, registrarVacuna } = useStore();
  const [tab, setTab] = useState("datos");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    nombre: vacunasDisponibles[0],
    dosis: "1ª dosis",
    fechaAplicada: "2026-10-22",
    centro: "CAPS Grand Bourg",
  });

  function guardar(e) {
    e.preventDefault();
    registrarVacuna(form);
    setOpen(false);
    setTab("vacunas");
  }

  return (
    <main className="page page-narrow">
      <div className="hero">
        <h1>Mi perfil</h1>
        <p>Historial clínico, vacunas y turnos de las salitas.</p>
      </div>

      <section className="panel person">
        <div className="avatar" aria-hidden="true">{user.nombre.charAt(0)}</div>
        <div>
          <strong>{user.nombre}</strong>
          <p className="muted">DNI {user.dni}</p>
        </div>
      </section>

      <div className="tabs" role="tablist">
        {TABS.map((t) => (
          <button key={t.id} type="button" className={tab === t.id ? "on" : ""} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {tab === "datos" && (
        <section className="panel">
          <dl>
            <dt>Nombre</dt><dd>{user.nombre}</dd>
            <dt>DNI</dt><dd>{user.dni}</dd>
            <dt>Email</dt><dd>{user.email}</dd>
            <dt>Teléfono</dt><dd>{user.telefono}</dd>
          </dl>
        </section>
      )}

      {tab === "historial" && (
        <section className="panel timeline">
          {historialClinico.map((h) => (
            <article key={h.fecha + h.tipo}>
              <time>{fmtDia(h.fecha)}</time>
              <h3 style={{ margin: "0.15rem 0", color: "var(--navy)" }}>{h.tipo}</h3>
              <p className="muted">{h.profesional}</p>
              <p>{h.resumen}</p>
            </article>
          ))}
        </section>
      )}

      {tab === "vacunas" && (
        <section>
          <button type="button" className="btn" onClick={() => setOpen(true)}>Registrar vacuna</button>
          <div className="cards" style={{ marginTop: "0.9rem" }}>
            {vacunas.map((v) => (
              <article key={v.id} className="card" style={{ cursor: "default" }}>
                <h3>{v.nombre}</h3>
                <p className="muted">{v.dosis}</p>
                <p className="small">
                  Aplicada: {fmtDia(v.fechaAplicada)}
                  {v.proximaDosis ? ` · Próxima: ${fmtDia(v.proximaDosis)}` : ""}
                </p>
                <p className="small">{v.centro}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {tab === "reservas" && (
        <div className="cards">
          {reservas.map((r) => (
            <article key={r.id} className="card" style={{ cursor: "default" }}>
              <div className="card-top">
                <h3>{r.salitaNombre}</h3>
                <span className="pill soft">{r.estado}</span>
              </div>
              <p className="muted">{r.centro}</p>
              <p className="small">{r.profesional} · {r.especialidad}</p>
              <p className="next">{fmtDia(r.fecha)} · {r.hora} hs</p>
            </article>
          ))}
        </div>
      )}

      {open && (
        <div className="modal-back" onClick={() => setOpen(false)}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={guardar}>
            <h3>Registrar vacuna</h3>
            <label className="field">
              <span>Vacuna</span>
              <select value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}>
                {vacunasDisponibles.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </label>
            <label className="field">
              <span>Dosis</span>
              <input value={form.dosis} onChange={(e) => setForm({ ...form, dosis: e.target.value })} />
            </label>
            <label className="field">
              <span>Fecha aplicada</span>
              <input type="date" value={form.fechaAplicada} onChange={(e) => setForm({ ...form, fechaAplicada: e.target.value })} />
            </label>
            <label className="field">
              <span>Centro</span>
              <input value={form.centro} onChange={(e) => setForm({ ...form, centro: e.target.value })} />
            </label>
            <div className="actions">
              <button type="button" className="btn ghost" onClick={() => setOpen(false)}>Cancelar</button>
              <button type="submit" className="btn">Guardar</button>
            </div>
          </form>
        </div>
      )}
      <p className="foot">Demo municipal · datos ficticios</p>
    </main>
  );
}
