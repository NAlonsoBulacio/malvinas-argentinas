"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import SaludMap from "@/components/SaludMap";
import { useApp } from "@/components/app-state";
import { profesionales, salitas, zonas } from "@/lib/data";
import { especialidadesDe, fmtDia, FRANJAS, proximoTurno } from "@/lib/salud";

export default function SaludPage() {
  const { turnos = [] } = useApp();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [zona, setZona] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [franja, setFranja] = useState("");

  const especialidades = useMemo(
    () => [...new Set(profesionales.map((p) => p.especialidad))].sort((a, b) => a.localeCompare(b, "es")),
    []
  );

  const lista = useMemo(() => {
    const query = q.trim().toLowerCase();
    return salitas.filter((s) => {
      if (zona && s.zona !== zona) return false;
      if (especialidad && !especialidadesDe(profesionales, s.id).includes(especialidad)) return false;
      if (query && !`${s.nombre} ${s.centro} ${s.direccion} ${s.zona}`.toLowerCase().includes(query)) return false;
      if (franja && !proximoTurno(turnos, profesionales, s.id, especialidad, franja)) return false;
      return true;
    });
  }, [q, zona, especialidad, franja, turnos]);

  return (
    <Screen header="brand" active="salud">
      <div className="stack">
        <div>
          <h1 className="h1">Salud municipal</h1>
          <p className="lead">Encontrá una salita, filtrá por zona o especialidad y reservá un turno.</p>
        </div>
        <div className="search">
          <Icon name="search" size={18} />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Dirección, centro o barrio" />
        </div>
        <div className="chip-row">
          {FRANJAS.map((f) => (
            <button key={f.id || "all"} type="button" className={"chip" + (franja === f.id ? " on" : "")} onClick={() => setFranja(f.id)}>
              {f.label}
            </button>
          ))}
        </div>
        <label className="field">
          <span>Zona</span>
          <select className="select" value={zona} onChange={(e) => setZona(e.target.value)}>
            <option value="">Todas las zonas</option>
            {zonas.map((z) => <option key={z} value={z}>{z}</option>)}
          </select>
        </label>
        <label className="field">
          <span>Especialidad</span>
          <select className="select" value={especialidad} onChange={(e) => setEspecialidad(e.target.value)}>
            <option value="">Todas las especialidades</option>
            {especialidades.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </label>
        <div className="salud-map">
          <SaludMap points={lista} onSelect={(id) => router.push("/salud/" + id)} />
        </div>
        <div className="row-between">
          <h2 className="h2" style={{ fontSize: 20 }}>{lista.length === 1 ? "1 salita" : `${lista.length} salitas`}</h2>
          <Link href="/salud/reservas" className="link">Mis reservas</Link>
        </div>
        {lista.map((s) => {
          const tags = [...new Set(especialidadesDe(profesionales, s.id))];
          const prox = proximoTurno(turnos, profesionales, s.id, especialidad, franja);
          return (
            <article key={s.id} className="g-card">
              <div className="row-between">
                <h3 style={{ color: "var(--navy)", fontSize: 18 }}>{s.nombre}</h3>
                <span className="pill">{s.distanciaKm} km</span>
              </div>
              <p className="lead" style={{ fontSize: 14, marginTop: 6 }}>{s.centro} · {s.zona}</p>
              <p className="note" style={{ textAlign: "left", marginTop: 4 }}>{s.direccion} · {s.horario}</p>
              <p style={{ marginTop: 8, color: prox ? "var(--green-ink)" : "var(--muted)", fontWeight: 600, fontSize: 14 }}>
                {prox ? `Próximo turno: ${fmtDia(prox.fecha)} · ${prox.hora} hs` : "Sin turnos libres con estos filtros"}
              </p>
              <div className="tags" style={{ marginTop: 10 }}>
                {tags.map((t) => <span key={t}>{t}</span>)}
              </div>
              <Link href={"/salud/" + s.id} className="btn slim" style={{ marginTop: 12 }}>Ver profesionales</Link>
            </article>
          );
        })}
        {lista.length === 0 && <p className="note">Ninguna salita coincide con esos filtros.</p>}
      </div>
    </Screen>
  );
}
