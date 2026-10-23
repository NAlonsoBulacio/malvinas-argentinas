"use client";

import { useMemo, useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";

export default function AlumnosPage() {
  const { alumnos, setAlumno } = useApp();
  const [q, setQ] = useState("");
  const [todos, setTodos] = useState(false);
  const visibles = useMemo(() => {
    const list = alumnos.filter((a) => `${a.nombre} ${a.apellido}`.toLowerCase().includes(q.toLowerCase()));
    return todos ? list : list.slice(0, 5);
  }, [alumnos, q, todos]);
  const presentes = alumnos.filter((a) => a.estado === "presente").length;
  const total = 25;
  const marca = 13 + presentes;
  const pct = Math.round((marca / total) * 100);

  return (
    <Screen header="profile" nav="gestion" active="alumnos" back="/gestion">
      <div className="stack">
        <section className="class-banner">
          <span className="pill ok">CLASE EN CURSO</span>
          <h1 className="h1" style={{ fontSize: 26, marginTop: 8 }}>Taller de Robótica</h1>
          <p className="lead"><Icon name="pin" size={14} /> Casa de la Cultura · Salón 4</p>
          <div className="row-between" style={{ marginTop: 12, background: "var(--navy)", color: "#fff", borderRadius: 12, padding: 14 }}>
            <div>
              <div style={{ fontSize: 12, letterSpacing: 1 }}>ASISTENCIA</div>
              <b style={{ fontSize: 28 }}>{marca}/{total}</b>
            </div>
            <div style={{ width: 54, height: 54, borderRadius: 99, border: "4px solid var(--lime)", display: "grid", placeItems: "center", fontWeight: 700 }}>{pct}%</div>
          </div>
        </section>
        <button className="scan" type="button">
          <Icon name="qr" size={28} />
          <strong style={{ display: "block" }}>Escanear QR de Alumno</strong>
          <span className="lead">Escaneo rápido para marcar ingreso</span>
        </button>
        <h2 className="h2" style={{ fontSize: 20 }}><Icon name="users" size={18} /> Lista de Alumnos</h2>
        <div className="search">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar por nombre..." />
        </div>
        {visibles.map((a) => (
          <article key={a.id} className="person">
            <img src={a.foto} alt="" />
            <div className="grow">
              <strong>{a.nombre}<br />{a.apellido}</strong>
              <em>DNI: ··· {a.dni}</em>
            </div>
            <button className={"att" + (a.estado === "presente" ? " yes" : "")} type="button" aria-label="Presente" onClick={() => setAlumno(a.id, "presente")}>
              <Icon name="check" size={16} />
            </button>
            <button className={"att" + (a.estado === "ausente" ? " no" : "")} type="button" aria-label="Ausente" onClick={() => setAlumno(a.id, "ausente")}>
              <Icon name="x" size={16} />
            </button>
          </article>
        ))}
        {!todos && (
          <button className="btn ghost" type="button" onClick={() => setTodos(true)}>Ver todos</button>
        )}
      </div>
    </Screen>
  );
}
