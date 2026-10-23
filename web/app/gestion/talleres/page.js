"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { talleres } from "@/lib/talleres";

export default function GestionTalleresPage() {
  const { extra, archivados = [] } = useApp();
  const [q, setQ] = useState("");
  const lista = useMemo(() => {
    const base = [
      ...talleres.filter((t) => t.gestion).map((t) => ({ ...t, activo: archivados.includes(t.id) ? false : t.activo })),
      ...extra,
    ];
    return base.filter((t) => !q || `${t.nombre} ${t.docente}`.toLowerCase().includes(q.toLowerCase()));
  }, [q, extra, archivados]);

  return (
    <Screen header="profile" nav="gestion" active="talleres" back="/gestion">
      <div className="stack">
        <div>
          <h1 className="h1">Gestión de Talleres</h1>
          <p className="lead">Administra la oferta educativa y recreativa local.</p>
        </div>
        <div className="search">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar taller o profesor..." />
        </div>
        {lista.map((t) => {
          const usados = t.total - t.cupos;
          const pct = Math.round((usados / t.total) * 100);
          return (
            <article key={t.id} className={"g-card" + (t.activo ? "" : " off")}>
              <div className="row-between">
                <span className={t.activo ? "pill ok" : "pill"}>{t.activo ? "ACTIVO" : "INACTIVO"}</span>
                {t.activo ? (
                  <img className="thumb" src={t.thumb || "/figma/thumb-guitarra.png"} alt="" />
                ) : (
                  <Link href="/gestion/talleres/nuevo" className="plus" aria-label="Agregar taller"><Icon name="plus" size={20} /></Link>
                )}
              </div>
              <Link href={"/gestion/talleres/" + t.id}>
                <h3 style={{ color: "var(--navy)", margin: "8px 0 4px" }}>{t.nombre}</h3>
              </Link>
              <div className="meta">
                <span><Icon name="user" size={14} /> Docente: {t.docente}</span>
                <span><Icon name="pin" size={14} /> {t.sede}</span>
              </div>
              <div className="row-between" style={{ fontSize: 13, color: "var(--muted)" }}>
                <span>Cupos</span>
                <b style={{ color: "var(--navy)" }}>{usados} / {t.total}</b>
              </div>
              <div className="bar"><i className={pct >= 100 ? "" : "navy"} style={{ width: Math.min(pct, 100) + "%", background: pct >= 100 ? "var(--green)" : undefined }} /></div>
              <p className="note" style={{ textAlign: "right", marginTop: 6 }}>
                {t.esperaCount ? `${t.esperaCount} vecinos en lista de espera` : t.activo ? `Quedan ${t.cupos} cupos` : "Sin inscriptos"}
              </p>
            </article>
          );
        })}
        <Link className="btn" href="/gestion/talleres/nuevo">Agregar taller</Link>
      </div>
    </Screen>
  );
}
