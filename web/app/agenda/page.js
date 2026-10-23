"use client";

import Link from "next/link";
import { useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { tallerPorId } from "@/lib/talleres";

const DIAS = [
  { id: "13", label: "LUN", n: "13" },
  { id: "14", label: "MAR", n: "14" },
  { id: "15", label: "MIE", n: "15" },
  { id: "16", label: "JUE", n: "16" },
  { id: "17", label: "VIE", n: "17" },
];

export default function AgendaPage() {
  const { inscriptos, asistenciaClase, confirmarAsistencia } = useApp();
  const [dia, setDia] = useState("14");
  const clases = [
    { id: "guitarra", hora: "18:00 hs" },
    { id: "teatro", hora: "20:00 hs" },
  ].filter((c) => inscriptos.includes(c.id) && (dia === "14" || dia === "16"));

  const mios = inscriptos.map(tallerPorId).filter(Boolean);

  return (
    <Screen header="back" active="agenda" back="/talleres">
      <div className="stack">
        <div>
          <h1 className="h1">Mi Agenda</h1>
          <p className="lead">Gestioná tus clases y talleres culturales.</p>
        </div>
        <div className="alert">
          <Icon name="alert" size={22} />
          <p>
            <strong>Alerta de Asistencia</strong><br />
            Estás próximo al límite de faltas en “Teatro Juvenil” (2/3). Evitá perder tu vacante.
          </p>
        </div>
        <div className="row-between">
          <h2 className="h2" style={{ fontSize: 20 }}>Mayo 2024</h2>
          <span style={{ color: "var(--green-ink)" }}><Icon name="chevron" size={18} /></span>
        </div>
        <div className="week">
          {DIAS.map((d) => (
            <button key={d.id} className={"day" + (dia === d.id ? " on" : "")} type="button" onClick={() => setDia(d.id)}>
              <b>{d.label}</b>
              {d.n}
            </button>
          ))}
        </div>
        <div className="row-between">
          <h2 className="h2" style={{ fontSize: 20 }}>Próximas Clases</h2>
          <button className="chip" type="button" onClick={() => setDia("14")}>Hoy</button>
        </div>
        {clases.length === 0 && <p className="note">No tenés clases este día.</p>}
        {clases.map((c) => {
          const t = tallerPorId(c.id);
          const ok = asistenciaClase[c.id] === "confirmada";
          return (
            <article key={c.id} className="class-card">
              <div className="row-between">
                <div className="hora">{c.hora}</div>
                <span className="pill">{t.nivel}</span>
              </div>
              <h3 style={{ color: "var(--navy)", margin: "6px 0" }}>{t.nombre}</h3>
              <div className="meta">
                <span><Icon name="user" size={14} /> Docente: {t.docente}</span>
                <span><Icon name="pin" size={14} /> {t.sede}</span>
              </div>
              {ok ? (
                <span className="pill ok">Asistencia confirmada</span>
              ) : (
                <button className="btn slim" type="button" onClick={() => confirmarAsistencia(c.id)}>Asistiré</button>
              )}
            </article>
          );
        })}
        <h2 className="h2" style={{ fontSize: 20 }}>Mis Talleres</h2>
        {mios.map((t) => (
          <article key={t.id} className="mini">
            <img src={t.imagen} alt="" />
            <div style={{ padding: "8px 10px 10px 0", flex: 1 }}>
              <strong style={{ color: "var(--navy)" }}>{t.nombre}</strong>
              <div className="row-between" style={{ marginTop: 8, fontSize: 12 }}>
                <span style={{ color: t.asistencia < 50 ? "var(--danger)" : "var(--green-ink)" }}>Asistencia: {t.asistencia}%</span>
                <span>Faltas: {t.faltas}</span>
              </div>
              <div className="bar" style={{ marginTop: 6 }}><i className={t.asistencia < 50 ? "low" : ""} style={{ width: t.asistencia + "%" }} /></div>
            </div>
          </article>
        ))}
        <Link className="ghost-link" href="/talleres"><Icon name="plus" size={16} /> Inscribirse a otro taller</Link>
      </div>
    </Screen>
  );
}
