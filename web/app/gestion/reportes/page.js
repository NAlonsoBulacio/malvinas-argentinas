"use client";

import { useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { historial } from "@/lib/talleres";

export default function ReportesPage() {
  const { notify } = useApp();
  const [periodo, setPeriodo] = useState("Este Mes");
  const [taller, setTaller] = useState("Todos los Talleres");

  return (
    <Screen header="profile" nav="gestion" active="reportes" back="/gestion">
      <div className="stack">
        <div className="row-between">
          <h1 className="h1">Reportes</h1>
          <button className="chip" type="button" onClick={() => notify("Reporte exportado")}>
            Exportar <Icon name="file" size={14} />
          </button>
        </div>
        <div className="row-between">
          <button className="chip" type="button" onClick={() => setTaller(taller === "Todos los Talleres" ? "Robótica" : "Todos los Talleres")}>
            {taller} <Icon name="chevron" size={14} />
          </button>
          <button className="chip" type="button" onClick={() => setPeriodo(periodo === "Este Mes" ? "Este año" : "Este Mes")}>
            {periodo} <Icon name="calendar" size={14} />
          </button>
        </div>
        <section className="panel">
          <div className="kicker">Asistencia total</div>
          <div className="row-between">
            <div className="stat-big">{periodo === "Este Mes" ? "84%" : "81%"}</div>
            <span className="ico-bubble info"><Icon name="check" size={18} /></span>
          </div>
          <p style={{ color: "var(--green-ink)", fontWeight: 600 }}>+ 3% que el mes anterior</p>
        </section>
        <div className="kpis">
          <div className="kpi white">
            <span style={{ color: "var(--green-ink)", fontWeight: 700 }}><Icon name="check" size={14} /> Presentes</span>
            <b>1,099</b>
          </div>
          <div className="kpi white">
            <span style={{ color: "var(--danger)", fontWeight: 700 }}><Icon name="x" size={14} /> Ausentes</span>
            <b>185</b>
          </div>
        </div>
        <div className="panel row-between">
          <span><Icon name="info" size={16} /> Justificados</span>
          <b>42</b>
        </div>
        <section className="panel">
          <div className="row-between">
            <strong>Tendencia Mensual</strong>
            <span className="lead">Asistencia %</span>
          </div>
          <svg className="chart" viewBox="0 0 320 120" role="img" aria-label="Tendencia de asistencia de enero a mayo">
            <path d="M10 80 C 50 78, 70 60, 90 62 S 140 70, 170 58 S 230 48, 260 40 S 300 36, 310 32" fill="none" stroke="#1a3372" strokeWidth="3" />
            <path d="M10 80 C 50 78, 70 60, 90 62 S 140 70, 170 58 S 230 48, 260 40 S 300 36, 310 32 V 110 H 10 Z" fill="rgba(26,51,114,0.12)" />
            {[[90, 62], [170, 58], [260, 40], [310, 32]].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="4" fill="#fff" stroke="#1a3372" strokeWidth="2" />
            ))}
            {["ENE", "FEB", "MAR", "ABR", "MAY"].map((m, i) => (
              <text key={m} x={20 + i * 70} y="118" fontSize="11" fill="#444650">{m}</text>
            ))}
          </svg>
        </section>
        <div className="row-between">
          <h2 className="h2" style={{ fontSize: 18 }}>Historial Reciente</h2>
          <span className="kicker">Ver todo</span>
        </div>
        {historial
          .filter((h) => taller === "Todos los Talleres" || h.detalle.toLowerCase().includes("fútbol") || taller === "Robótica")
          .map((h) => (
            <article key={h.nombre} className="person">
              <img src={h.foto} alt="" />
              <div className="grow">
                <strong>{h.nombre}</strong>
                <em>{h.detalle}</em>
              </div>
              <span className={h.estado === "AUSENTE" ? "pill bad" : h.estado === "JUSTIFICADO" ? "pill" : "pill ok"}>{h.estado}</span>
            </article>
          ))}
      </div>
    </Screen>
  );
}
