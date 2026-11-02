"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { estudiosIniciales } from "@/lib/data";
import { etiquetaEstudio, fmtDia } from "@/lib/salud";

export default function EstudioPage() {
  const { id } = useParams();
  const { estudios = estudiosIniciales, registrarEstudioHecho } = useApp();
  const estudio = estudios.find((e) => e.id === id);

  if (!estudio) {
    return (
      <Screen header="back" active="salud" back="/salud/estudios">
        <p className="note">No encontramos ese estudio.</p>
      </Screen>
    );
  }

  return (
    <Screen header="back" active="salud" back="/salud/estudios">
      <div className="stack">
        <div>
          <p className="kicker">{etiquetaEstudio(estudio.estado)}</p>
          <h1 className="h1" style={{ marginTop: 6 }}>{estudio.nombre}</h1>
          <p className="lead">{estudio.detalle}</p>
        </div>
        <section className="g-card">
          <p><strong style={{ color: "var(--navy)" }}>Pedido por</strong><br />{estudio.pedidoPor} · {estudio.especialidad}</p>
          <p style={{ marginTop: 10 }}><strong style={{ color: "var(--navy)" }}>Fecha del pedido</strong><br />{fmtDia(estudio.fechaPedido)}</p>
          <p style={{ marginTop: 10 }}><strong style={{ color: "var(--navy)" }}>Dónde hacerlo</strong><br />{estudio.centro}</p>
          {estudio.turno && (
            <p style={{ marginTop: 10 }}><strong style={{ color: "var(--navy)" }}>Turno</strong><br />{fmtDia(estudio.turno.fecha)} · {estudio.turno.hora} hs</p>
          )}
        </section>
        <div className="info-box soft">
          <Icon name="info" size={18} />
          <p><strong>Preparación</strong><br />{estudio.preparacion}</p>
        </div>
        {estudio.estado === "resultado" && estudio.resultado && (
          <div className="info-box">
            <Icon name="check" size={18} />
            <p><strong>Informe</strong><br />{estudio.resultado}</p>
          </div>
        )}
        {estudio.estado === "pedido" && (
          <Link href="/salud/salitas" className="btn">Buscar un turno</Link>
        )}
        {estudio.estado === "con-turno" && (
          <button type="button" className="btn" onClick={() => registrarEstudioHecho(estudio.id)}>
            Ya me lo realicé
          </button>
        )}
      </div>
    </Screen>
  );
}
