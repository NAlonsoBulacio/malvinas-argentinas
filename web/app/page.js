"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { profesionales, salitas, zonas } from "@/lib/data";
import { especialidadesDe, FRANJAS, fmtDia, proximoTurno } from "@/lib/salud";
import { useStore } from "@/components/store";

const SaludMap = dynamic(() => import("@/components/SaludMap"), { ssr: false });

export default function SaludPage() {
  const router = useRouter();
  const { turnos } = useStore();
  const [zona, setZona] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [q, setQ] = useState("");
  const [franja, setFranja] = useState("");

  const especialidades = useMemo(
    () => [...new Set(profesionales.map((p) => p.especialidad))].sort((a, b) => a.localeCompare(b, "es")),
    []
  );

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return salitas.filter((s) => {
      if (zona && s.zona !== zona) return false;
      if (especialidad && !especialidadesDe(profesionales, s.id).includes(especialidad)) return false;
      if (query && !`${s.nombre} ${s.centro} ${s.direccion} ${s.zona}`.toLowerCase().includes(query)) return false;
      if (franja && !proximoTurno(turnos, profesionales, s.id, especialidad, franja)) return false;
      return true;
    });
  }, [zona, especialidad, q, franja, turnos]);

  return (
    <main className="page">
      <div className="hero">
        <h1>Salitas de salud</h1>
        <p>Elegí un centro en el mapa o filtrá por zona, especialidad y horario.</p>
      </div>

      <div className="filters">
        <label className="field">
          <span>Horario</span>
          <div className="chips">
            {FRANJAS.map((f) => (
              <button
                key={f.id || "all"}
                type="button"
                className={franja === f.id ? "chip on" : "chip"}
                onClick={() => setFranja(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </label>
        <label className="field">
          <span>Zona</span>
          <select value={zona} onChange={(e) => setZona(e.target.value)}>
            <option value="">Todas las zonas</option>
            {zonas.map((z) => (
              <option key={z} value={z}>{z}</option>
            ))}
          </select>
        </label>
        <label className="field">
          <span>Especialidad</span>
          <select value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
            <option value="">Todas</option>
            {especialidades.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
        </label>
        <label className="field" style={{ gridColumn: "1 / -1" }}>
          <span>Ubicación</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Dirección, centro o barrio" />
        </label>
      </div>

      <div className="layout">
        <section className="cards" aria-label="Listado de salitas">
          <p className="muted" style={{ marginTop: 0 }}>
            {filtered.length === 1 ? "1 salita" : `${filtered.length} salitas`}
          </p>
          {filtered.map((s) => {
            const next = proximoTurno(turnos, profesionales, s.id, especialidad, franja);
            const tags = [...new Set(especialidadesDe(profesionales, s.id))];
            return (
              <Link key={s.id} href={"/salita/" + s.id} className="card">
                <div className="card-top">
                  <h2>{s.nombre}</h2>
                  <span className="pill">{s.distanciaKm} km</span>
                </div>
                <p className="muted">{s.centro} · {s.zona}</p>
                <p className="small">{s.direccion} · {s.horario}</p>
                <p className="next">
                  {next ? `Próximo turno: ${fmtDia(next.fecha)} · ${next.hora} hs` : "Sin turnos en ese horario"}
                </p>
                <div className="tags">
                  {tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </Link>
            );
          })}
          {filtered.length === 0 && <p className="empty">Ninguna salita coincide con esos filtros.</p>}
        </section>
        <SaludMap points={filtered} onSelect={(id) => router.push("/salita/" + id)} />
      </div>
      <p className="foot">Demo municipal · datos ficticios</p>
    </main>
  );
}
