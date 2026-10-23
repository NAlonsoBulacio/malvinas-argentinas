"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { talleres, tematicas } from "@/lib/talleres";

export default function CatalogoPage() {
  const { favoritos, toggleFav, inscriptos, espera } = useApp();
  const [q, setQ] = useState("");
  const [tema, setTema] = useState("");
  const [soloCupo, setSoloCupo] = useState(false);
  const [open, setOpen] = useState(false);

  const lista = useMemo(() => {
    return talleres.filter((t) => t.catalogo).filter((t) => {
      if (!t.catalogo) return false;
      if (tema && t.tema !== tema) return false;
      if (soloCupo && (t.espera || t.cupos <= 0)) return false;
      if (q && !`${t.nombre} ${t.docente} ${t.tema}`.toLowerCase().includes(q.toLowerCase())) return false;
      return true;
    });
  }, [q, tema, soloCupo]);

  return (
    <Screen header="brand" active="talleres">
      <div className="stack">
        <div>
          <h1 className="h1">Talleres Municipales</h1>
          <p className="lead">Descubrí todas las propuestas gratuitas para potenciar tu talento.</p>
        </div>
        <div className="search">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="¿Qué taller buscás?" />
        </div>
        <button className="btn lime" type="button" onClick={() => setOpen(true)}>
          <Icon name="sliders" size={18} /> Filtrar
        </button>
        <h2 className="h2">Temáticas populares</h2>
        {tematicas.map((t) => (
          <button key={t.id} className={"theme" + (tema === t.id ? " on" : "")} type="button" onClick={() => setTema(tema === t.id ? "" : t.id)}>
            <i><Icon name={t.icon} size={20} /></i>
            <span style={{ fontWeight: 500, fontSize: 16 }}>{t.label}</span>
          </button>
        ))}
        {lista.map((t) => {
          const ya = inscriptos.includes(t.id) || espera.includes(t.id);
          const wait = t.espera || espera.includes(t.id);
          return (
            <article key={t.id} className="course">
              <Link href={"/talleres/" + t.id} className="photo">
                <img src={t.imagen} alt="" />
                <span className="badge">{t.tag}</span>
              </Link>
              <div className="body">
                <div className="title-row">
                  <Link href={"/talleres/" + t.id}><h3>{t.nombre}</h3></Link>
                  <button className={"heart" + (favoritos.includes(t.id) ? " on" : "")} type="button" aria-label="Guardar" onClick={() => toggleFav(t.id)}>
                    <Icon name="heart" size={20} />
                  </button>
                </div>
                <div className="meta">
                  <span><Icon name="user" size={14} /> Docente: {t.docente}</span>
                  <span><Icon name="pin" size={14} /> {t.sede}</span>
                  <span><Icon name="clock" size={14} /> {t.horario}</span>
                </div>
                <div className="row-between">
                  <span className={"spots" + (wait ? " wait" : "")}>
                    <i style={{ width: 8, height: 8, borderRadius: 99, background: wait ? "var(--danger)" : "var(--green-ink)", display: "inline-block" }} />
                    {wait ? "Lista de espera" : `${t.cupos} cupos libres`}
                  </span>
                  <Link href={"/talleres/" + t.id} className={"btn slim" + (wait && !ya ? " wait" : "")}>
                    {ya ? "Ver taller" : wait ? "Lista de espera" : "Inscribirme"}
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
        {lista.length === 0 && <p className="note">Ningún taller coincide con la búsqueda.</p>}
      </div>
      {open && (
        <div className="sheet" onClick={() => setOpen(false)}>
          <div className="panel" onClick={(e) => e.stopPropagation()}>
            <h2 className="h2">Filtrar</h2>
            <div className="chip-row" style={{ margin: "12px 0" }}>
              <button type="button" className={"chip" + (!tema ? " on" : "")} onClick={() => setTema("")}>Todas</button>
              {tematicas.map((t) => (
                <button key={t.id} type="button" className={"chip" + (tema === t.id ? " on" : "")} onClick={() => setTema(t.id)}>{t.label}</button>
              ))}
            </div>
            <label className="checkline">
              <input type="checkbox" checked={soloCupo} onChange={(e) => setSoloCupo(e.target.checked)} />
              <span>Solo talleres con cupo disponible</span>
            </label>
            <button className="btn" style={{ marginTop: 14 }} onClick={() => setOpen(false)}>Aplicar</button>
          </div>
        </div>
      )}
    </Screen>
  );
}
