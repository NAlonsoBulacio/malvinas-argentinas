"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { profesionales, salitas } from "@/lib/data";
import { enFranja, fmtDia, FRANJAS } from "@/lib/salud";
import { useStore } from "@/components/store";

export default function TurnoPage() {
  const { profId } = useParams();
  const router = useRouter();
  const { turnos, reservar } = useStore();
  const pro = profesionales.find((p) => p.id === profId);
  const salita = salitas.find((s) => s.id === pro?.salitaId);
  const propios = useMemo(() => turnos.filter((t) => t.profesionalId === profId), [turnos, profId]);
  const fechas = [...new Set(propios.map((t) => t.fecha))].sort();

  const [fecha, setFecha] = useState("");
  const [franja, setFranja] = useState("");
  const [turnoId, setTurnoId] = useState("");
  const [hecha, setHecha] = useState(null);

  if (!pro || !salita) {
    return (
      <main className="page page-narrow">
        <p className="empty">No encontramos a ese profesional.</p>
      </main>
    );
  }

  const visibles = fecha ? propios.filter((t) => t.fecha === fecha && enFranja(t.hora, franja)) : [];
  const elegido = visibles.find((t) => t.id === turnoId && t.disponible);

  function confirmar() {
    if (!elegido) return;
    const reserva = {
      salitaNombre: salita.nombre,
      centro: salita.centro,
      profesional: pro.nombre,
      especialidad: pro.especialidad,
      fecha: elegido.fecha,
      hora: elegido.hora,
    };
    reservar(reserva, elegido.id);
    setHecha(reserva);
  }

  return (
    <main className="page page-narrow">
      <Link className="back" href={"/salita/" + salita.id}>← {salita.nombre}</Link>
      <div className="hero">
        <h1>Elegir turno</h1>
        <p>{pro.nombre} · {pro.especialidad}</p>
      </div>

      {hecha ? (
        <section className="panel success">
          <div className="success-icon" aria-hidden="true">✓</div>
          <h2 style={{ color: "var(--navy)", margin: "0 0 0.4rem" }}>Turno reservado</h2>
          <p className="muted">
            {fmtDia(hecha.fecha)} · {hecha.hora} hs en {salita.nombre}.
          </p>
          <button type="button" className="btn" onClick={() => router.push("/perfil")}>
            Ver en mi perfil
          </button>
        </section>
      ) : (
        <section className="panel">
          <label className="field">
            <span>Fecha</span>
            <input
              type="date"
              value={fecha}
              min={fechas[0] || ""}
              max={fechas[fechas.length - 1] || ""}
              onChange={(e) => {
                setFecha(e.target.value);
                setTurnoId("");
              }}
            />
          </label>
          <p className="small">Con turno: {fechas.map(fmtDia).join(" · ") || "sin fechas"}</p>

          <p className="label" style={{ marginTop: "1rem" }}>Horario</p>
          <div className="chips">
            {FRANJAS.map((f) => (
              <button
                key={f.id || "all"}
                type="button"
                className={franja === f.id ? "chip on" : "chip"}
                onClick={() => {
                  setFranja(f.id);
                  setTurnoId("");
                }}
              >
                {f.label}
              </button>
            ))}
          </div>

          <p className="label" style={{ marginTop: "1rem" }}>Horarios</p>
          {!fecha && <p className="empty">Elegí una fecha para ver los horarios.</p>}
          {fecha && visibles.length === 0 && <p className="empty">No hay turnos en esa fecha y horario.</p>}
          <div className="slots">
            {visibles.map((t) => (
              <button
                key={t.id}
                type="button"
                className={turnoId === t.id ? "slot on" : "slot"}
                disabled={!t.disponible}
                onClick={() => setTurnoId(t.id)}
              >
                {t.hora}
              </button>
            ))}
          </div>
          <button type="button" className="btn" disabled={!elegido} onClick={confirmar}>
            Confirmar reserva
          </button>
        </section>
      )}
    </main>
  );
}
