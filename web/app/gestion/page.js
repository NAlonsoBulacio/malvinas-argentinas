"use client";

import Link from "next/link";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { riesgo } from "@/lib/talleres";

const OCUPACION = [
  { label: "MÚSICA", valor: 80, icon: "music", color: "navy" },
  { label: "ARTES PLÁSTICAS", valor: 20, icon: "palette", color: "low" },
  { label: "TECNOLOGÍA", valor: 100, icon: "laptop", color: "" },
];

export default function DashboardPage() {
  return (
    <Screen header="gestion" nav="gestion" active="dashboard">
      <div className="stack">
        <div>
          <div className="kicker">Gestión municipal</div>
          <h1 className="h1">Estado del Programa</h1>
        </div>
        <div className="kpis">
          <div className="kpi navy">
            <div className="row-between"><Icon name="users" size={18} /><span className="tag-mini">TOTAL</span></div>
            <div><b>1,284</b><br /><small>Inscriptos</small></div>
          </div>
          <div className="kpi green">
            <Icon name="cap" size={18} />
            <div><b>32</b><br /><small>Talleres Activos</small></div>
          </div>
          <div className="kpi white">
            <div className="row-between"><Icon name="user" size={18} /><span className="pill ok">HOY</span></div>
            <div><b>87.5%</b><br /><small>Asistencia</small></div>
          </div>
          <div className="kpi white">
            <Icon name="calendar" size={18} />
            <div><b>42</b><br /><small>Cupos Libres</small></div>
          </div>
        </div>
        <h2 className="h2" style={{ fontSize: 20 }}>Ocupación por Categoría</h2>
        <div className="panel">
          {OCUPACION.map((o) => (
            <div className="occ" key={o.label}>
              <Icon name={o.icon} size={16} />
              <span style={{ width: 92 }}>{o.label}</span>
              <div className="bar"><i className={o.color} style={{ width: o.valor + "%" }} /></div>
              <span>{o.valor} %</span>
            </div>
          ))}
        </div>
        <div className="row-between">
          <h2 className="h2" style={{ fontSize: 20 }}>Alumnos en Riesgo</h2>
          <Link href="/gestion/alumnos" className="link">Ver todos</Link>
        </div>
        {riesgo.map((p) => (
          <article key={p.nombre} className="person">
            <img src={p.foto} alt="" />
            <div className="grow">
              <strong>{p.nombre}</strong>
              <em>{p.taller}</em>
            </div>
            <span className={p.tono === "alert" ? "pill bad" : "pill"} style={p.tono === "warn" ? { background: "#ffe8e4", color: "var(--danger)" } : undefined}>{p.tag}</span>
            <Icon name="phone" size={16} />
          </article>
        ))}
      </div>
    </Screen>
  );
}
