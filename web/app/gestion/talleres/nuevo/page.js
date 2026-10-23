"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";

const CATS = ["Cultura", "Danza", "Tecnología", "Manualidades"];
const SEDES = ["Centro Cultural", "Polideportivo Municipal", "Plaza Saludable"];

export default function NuevoTallerPage() {
  const { addTaller } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: "Cerámica Inicial",
    descripcion: "Espacio teórico-práctico de introducción a las técnicas de modelado, moldeado y horneado de piezas cerámicas. Destinado a vecinos sin experiencia previa.",
    categoria: "Manualidades",
    sede: "Centro Cultural",
    cupo: "25",
    edadMin: "16",
    edadMax: "99",
    desde: "16:00",
    hasta: "18:00",
    docente: "Joaquín Sarmiento",
  });

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function guardar(e) {
    e.preventDefault();
    const id = form.nombre.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4);
    addTaller({
      id,
      nombre: form.nombre,
      docente: form.docente,
      sede: form.sede,
      horario: `${form.desde} - ${form.hasta}`,
      cronograma: [{ dia: "A confirmar", hora: `${form.desde} a ${form.hasta} hs` }],
      cupos: Number(form.cupo) || 0,
      total: Number(form.cupo) || 0,
      nivel: "Inicial",
      imagen: "/figma/canto.png",
      thumb: "/figma/thumb-yoga.png",
      resumen: form.descripcion,
      sobre: form.descripcion,
      requisitos: [`Edad ${form.edadMin} a ${form.edadMax}`],
      direccion: "Malvinas Argentinas",
      mapa: "/figma/mapa.png",
      catalogo: true,
      gestion: true,
      activo: true,
      espera: false,
      tema: form.categoria === "Tecnología" ? "Tecnología" : form.categoria === "Danza" || form.categoria === "Cultura" ? "Artes plásticas" : "Artes plásticas",
      tag: form.categoria.toUpperCase(),
      inscriptoInicial: false,
      asistencia: 0,
      faltas: "0/3",
    });
    router.push("/gestion/talleres");
  }

  return (
    <Screen header="profile" nav="gestion" active="talleres" back="/gestion/talleres">
      <form className="stack" onSubmit={guardar}>
        <div>
          <h1 className="h1" style={{ color: "var(--navy-2)" }}>Agregar Taller</h1>
          <p className="lead">Administra la oferta educativa y recreativa local.</p>
        </div>
        <section className="g-card">
          <strong style={{ display: "flex", gap: 8, color: "var(--navy)" }}><Icon name="info" size={16} /> Información general</strong>
          <div className="field" style={{ marginTop: 10 }}>
            <label>Nombre *</label>
            <div className="control line"><input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} required /></div>
          </div>
          <div className="field">
            <label>Descripción</label>
            <textarea value={form.descripcion} onChange={(e) => set("descripcion", e.target.value)} rows={4} style={{ width: "100%", borderRadius: 8, border: "1px solid var(--line)", padding: 10 }} />
          </div>
          <div className="field">
            <label>Categoría *</label>
            <div className="chip-row">
              {CATS.map((c) => (
                <button type="button" key={c} className={"chip" + (form.categoria === c ? " on" : "")} onClick={() => set("categoria", c)}>{c}</button>
              ))}
            </div>
          </div>
        </section>
        <section className="g-card">
          <strong style={{ display: "flex", gap: 8, color: "var(--navy)" }}><Icon name="pin" size={16} /> Ubicación y cupos</strong>
          <div className="field" style={{ marginTop: 10 }}>
            <label>Sede *</label>
            <div className="chip-row">
              {SEDES.map((c) => (
                <button type="button" key={c} className={"chip" + (form.sede === c ? " on" : "")} onClick={() => set("sede", c)}>{c}</button>
              ))}
            </div>
          </div>
          <div className="field">
            <label>Cupo máximo *</label>
            <div className="control line"><input inputMode="numeric" value={form.cupo} onChange={(e) => set("cupo", e.target.value)} /></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <div className="field">
              <label>Edad mínima *</label>
              <div className="control line"><input value={form.edadMin} onChange={(e) => set("edadMin", e.target.value)} /></div>
            </div>
            <div className="field">
              <label>Edad máxima *</label>
              <div className="control line"><input value={form.edadMax} onChange={(e) => set("edadMax", e.target.value)} /></div>
            </div>
          </div>
        </section>
        <section className="g-card">
          <strong style={{ display: "flex", gap: 8, color: "var(--navy)" }}><Icon name="clock" size={16} /> Horario</strong>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
            <div className="field">
              <label>Desde las</label>
              <div className="control line"><input value={form.desde} onChange={(e) => set("desde", e.target.value)} /></div>
            </div>
            <div className="field">
              <label>Hasta las</label>
              <div className="control line"><input value={form.hasta} onChange={(e) => set("hasta", e.target.value)} /></div>
            </div>
          </div>
          <p className="note">Duración de la clase: 2 hs</p>
        </section>
        <section className="g-card">
          <strong style={{ display: "flex", gap: 8, color: "var(--navy)" }}><Icon name="user" size={16} /> Docente</strong>
          <div className="field" style={{ marginTop: 10 }}>
            <label>Nombre y Apellido</label>
            <div className="control line"><input value={form.docente} onChange={(e) => set("docente", e.target.value)} /></div>
          </div>
          <p className="note">Completá los datos de la persona asignada a este taller</p>
        </section>
        <button className="btn" type="submit">Guardar taller</button>
      </form>
    </Screen>
  );
}
