"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { profesionales, salitas, turnosIniciales } from "@/lib/data";
import { enFranja, fmtDia, FRANJAS } from "@/lib/salud";

export default function TurnoPage() {
  const { profId } = useParams();
  const { turnos = turnosIniciales, reservarTurno } = useApp();
  const pro = profesionales.find((p) => p.id === profId);
  const salita = salitas.find((s) => s.id === pro?.salitaId);
  const propios = useMemo(() => turnos.filter((t) => t.profesionalId === profId), [turnos, profId]);
  const fechas = [...new Set(propios.map((t) => t.fecha))].sort();
  const [fecha, setFecha] = useState(fechas[0] || "");
  const [franja, setFranja] = useState("");
  const [turnoId, setTurnoId] = useState("");
  const [hecha, setHecha] = useState(null);

  if (!pro || !salita) {
    return <Screen header="back" active="salud" back="/salud"><p className="note">No encontramos a ese profesional.</p></Screen>;
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
    reservarTurno(reserva, elegido.id);
    setHecha(reserva);
  }

  return (
    <Screen header="back" active="salud" back={"/salud/" + salita.id}>
      <div className="stack">
        <div>
          <h1 className="h1">Elegir turno</h1>
          <p className="lead">{pro.nombre} · {pro.especialidad}</p>
        </div>
        {hecha ? (
          <section className="panel" style={{ textAlign: "center" }}>
            <div className="success-ico"><Icon name="check" size={28} /></div>
            <h2 className="h2" style={{ fontSize: 22 }}>Turno reservado</h2>
            <p className="lead" style={{ marginTop: 8 }}>
              {fmtDia(hecha.fecha)} · {hecha.hora} hs en {salita.nombre}.
            </p>
            <Link href="/salud/reservas" className="btn" style={{ marginTop: 16 }}>Ver mis reservas</Link>
            <Link href="/salud" className="btn ghost" style={{ marginTop: 8 }}>Volver a Salud</Link>
          </section>
        ) : (
          <>
            <section className="panel">
              <p style={{ fontWeight: 700, color: "var(--navy)" }}>{salita.nombre}</p>
              <p className="note" style={{ textAlign: "left", marginTop: 4 }}>{salita.centro}</p>
            </section>
            <div>
              <p className="kicker">Fecha</p>
              <div className="chip-row" style={{ marginTop: 8 }}>
                {fechas.map((iso) => (
                  <button key={iso} type="button" className={"chip" + (fecha === iso ? " on" : "")} onClick={() => { setFecha(iso); setTurnoId(""); }}>
                    {fmtDia(iso)}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="kicker">Horario</p>
              <div className="chip-row" style={{ marginTop: 8 }}>
                {FRANJAS.map((f) => (
                  <button key={f.id || "all"} type="button" className={"chip" + (franja === f.id ? " on" : "")} onClick={() => { setFranja(f.id); setTurnoId(""); }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="kicker">Horarios</p>
              {visibles.length === 0 && <p className="note" style={{ marginTop: 8 }}>No hay turnos en esa fecha y horario.</p>}
              <div className="hours" style={{ marginTop: 8 }}>
                {visibles.map((t) => (
                  <button key={t.id} type="button" className={turnoId === t.id ? "on" : ""} disabled={!t.disponible} onClick={() => setTurnoId(t.id)}>
                    {t.hora}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" className="btn" disabled={!elegido} onClick={confirmar}>Confirmar reserva</button>
          </>
        )}
      </div>
    </Screen>
  );
}
