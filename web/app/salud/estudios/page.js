"use client";

import Link from "next/link";
import { useState } from "react";
import { Screen } from "@/components/chrome";
import { useApp } from "@/components/app-state";
import { estudiosIniciales } from "@/lib/data";
import { etiquetaEstudio, fmtDia } from "@/lib/salud";

const FILTROS = [
  { id: "todos", label: "Todos" },
  { id: "abiertos", label: "Por hacer" },
  { id: "resultado", label: "Resultados" },
];

function claseEstado(estado) {
  if (estado === "resultado") return "ok";
  if (estado === "pedido") return "warn";
  return "";
}

export default function EstudiosPage() {
  const { estudios = estudiosIniciales } = useApp();
  const [filtro, setFiltro] = useState("todos");
  const lista = estudios.filter((e) => {
    if (filtro === "abiertos") return e.estado !== "resultado";
    if (filtro === "resultado") return e.estado === "resultado";
    return true;
  });

  return (
    <Screen header="back" active="salud" back="/salud">
      <div className="stack">
        <div>
          <h1 className="h1">Estudios</h1>
          <p className="lead">Seguimiento de los estudios que te pidieron en el centro de salud.</p>
        </div>
        <div className="chip-row">
          {FILTROS.map((f) => (
            <button key={f.id} type="button" className={"chip" + (filtro === f.id ? " on" : "")} onClick={() => setFiltro(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        {lista.map((e) => (
          <Link key={e.id} href={"/salud/estudios/" + e.id} className="g-card">
            <div className="row-between">
              <h3 style={{ color: "var(--navy)", fontSize: 18 }}>{e.nombre}</h3>
              <span className={"pill " + claseEstado(e.estado)}>{etiquetaEstudio(e.estado)}</span>
            </div>
            <p className="lead" style={{ fontSize: 14, marginTop: 4 }}>{e.detalle}</p>
            <p className="note" style={{ textAlign: "left", marginTop: 6 }}>
              Pedido el {fmtDia(e.fechaPedido)} · {e.pedidoPor}
            </p>
            <p style={{ marginTop: 8, color: "var(--navy)", fontWeight: 700 }}>
              {e.estado === "con-turno" && e.turno ? `Turno ${fmtDia(e.turno.fecha)} · ${e.turno.hora} hs` : e.centro}
            </p>
          </Link>
        ))}
        {lista.length === 0 && <p className="note">No hay estudios en este filtro.</p>}
      </div>
    </Screen>
  );
}
