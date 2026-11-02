"use client";

import Link from "next/link";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { avisosVacunacion, estudiosIniciales, vacunasIniciales } from "@/lib/data";
import { estadoVacuna, fmtDia } from "@/lib/salud";

const ACCESOS = [
  { href: "/salud/salitas", icon: "pin", titulo: "Salitas y turnos", texto: "Mapa, zonas y reserva" },
  { href: "/salud/vacunas", icon: "shield", titulo: "Vacunas", texto: "Carnet y próximas dosis" },
  { href: "/salud/estudios", icon: "file", titulo: "Estudios", texto: "Pedidos y resultados" },
  { href: "/salud/reservas", icon: "calendar", titulo: "Mis reservas", texto: "Turnos confirmados" },
];

export default function SaludPage() {
  const { vacunas = vacunasIniciales, estudios = estudiosIniciales } = useApp();
  const vencida = vacunas.find((v) => estadoVacuna(v) === "vencida");
  const proxima = vacunas.find((v) => estadoVacuna(v) === "proxima");
  const abiertos = estudios.filter((e) => e.estado !== "resultado");

  return (
    <Screen header="brand" active="salud">
      <div className="stack">
        <div>
          <h1 className="h1">Salud municipal</h1>
          <p className="lead">Turnos, vacunas y el seguimiento de los estudios que te piden.</p>
        </div>

        {vencida && (
          <Link href="/salud/vacunas" className="alert">
            <Icon name="alert" size={22} />
            <p>
              <strong>Dosis vencida</strong><br />
              {vencida.nombre} figura fuera de fecha. Revisá el carnet y el aviso del vacunatorio.
            </p>
          </Link>
        )}
        {proxima && (
          <Link href="/salud/vacunas" className="info-box">
            <Icon name="shield" size={20} />
            <p>
              <strong>Próxima vacuna</strong><br />
              {proxima.nombre} · {fmtDia(proxima.proximaDosis)}
            </p>
          </Link>
        )}
        {abiertos.length > 0 && (
          <Link href="/salud/estudios" className="info-box soft">
            <Icon name="file" size={20} />
            <p>
              <strong>{abiertos.length === 1 ? "1 estudio por hacer" : `${abiertos.length} estudios por hacer`}</strong><br />
              {abiertos.map((e) => e.nombre).join(" · ")}
            </p>
          </Link>
        )}

        <div className="hub-grid">
          {ACCESOS.map((item) => (
            <Link key={item.href} href={item.href} className="hub-card">
              <span className="ico-bubble info"><Icon name={item.icon} size={18} /></span>
              <span>
                <strong style={{ display: "block" }}>{item.titulo}</strong>
                <em>{item.texto}</em>
              </span>
            </Link>
          ))}
        </div>

        <div className="row-between">
          <h2 className="h2" style={{ fontSize: 20 }}>Avisos de vacunación</h2>
          <Link href="/salud/vacunas?vista=avisos" className="link">Ver todos</Link>
        </div>
        {avisosVacunacion.slice(0, 2).map((a) => (
          <Link key={a.id} href="/salud/vacunas?vista=avisos" className="notice plain">
            <div className="ico-bubble info"><Icon name="bell" size={18} /></div>
            <div>
              <div className="head">
                <h3>{a.titulo}</h3>
                <time>{fmtDia(a.fecha)}</time>
              </div>
              <p style={{ marginTop: 6 }}>{a.texto}</p>
            </div>
          </Link>
        ))}

        <Link href="/salud/historial" className="btn ghost">Historial clínico</Link>
      </div>
    </Screen>
  );
}
