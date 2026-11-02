"use client";

import Link from "next/link";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { avisosVacunacion, estudiosIniciales, vacunasIniciales } from "@/lib/data";
import { estadoVacuna, fmtDia } from "@/lib/salud";

export default function NotificacionesPage() {
  const { notify, vacunas = vacunasIniciales, estudios = estudiosIniciales } = useApp();
  const vacunasAviso = vacunas.filter((v) => estadoVacuna(v) !== "al-dia");
  const estudiosAviso = estudios.filter((e) => e.estado !== "resultado");

  return (
    <Screen header="help" active="perfil" back="/perfil">
      <div className="stack">
        <div>
          <h1 className="h1">Notificaciones</h1>
          <p className="lead">Mantenete al día con tus talleres y con tu salud.</p>
        </div>
        <h2 className="h2" style={{ color: "var(--navy-2)" }}>Salud</h2>
        {vacunasAviso.map((v) => {
          const vencida = estadoVacuna(v) === "vencida";
          return (
            <Link key={v.id} href="/salud/vacunas" className={vencida ? "notice bad" : "notice plain"}>
              <div className={vencida ? "ico-bubble bad" : "ico-bubble info"}><Icon name={vencida ? "alert" : "shield"} size={18} /></div>
              <div>
                <div className="head">
                  <h3>{vencida ? "Dosis vencida" : "Próxima vacuna"}</h3>
                  <time>{fmtDia(v.proximaDosis)}</time>
                </div>
                <p>{v.nombre} · {v.dosis}. Revisá el carnet y los vacunatorios del municipio.</p>
              </div>
            </Link>
          );
        })}
        {estudiosAviso.map((e) => (
          <Link key={e.id} href={"/salud/estudios/" + e.id} className="notice plain">
            <div className="ico-bubble info"><Icon name="file" size={18} /></div>
            <div>
              <div className="head">
                <h3>{e.estado === "con-turno" ? "Estudio con turno" : "Estudio pedido"}</h3>
                <time>{e.turno ? fmtDia(e.turno.fecha) : fmtDia(e.fechaPedido)}</time>
              </div>
              <p>
                {e.nombre}: {e.estado === "con-turno" && e.turno ? `te esperan el ${fmtDia(e.turno.fecha)} a las ${e.turno.hora} hs.` : "todavía no tiene turno."}
              </p>
            </div>
          </Link>
        ))}
        {avisosVacunacion.map((a) => (
          <Link key={a.id} href="/salud/vacunas?vista=avisos" className="notice plain ok">
            <div className="ico-bubble ok"><Icon name="bell" size={18} /></div>
            <div>
              <div className="head">
                <h3>{a.titulo}</h3>
                <time>{fmtDia(a.fecha)}</time>
              </div>
              <p>{a.texto}</p>
            </div>
          </Link>
        ))}
        <h2 className="h2" style={{ color: "var(--navy-2)" }}>Talleres</h2>
        <article className="notice bad">
          <div className="ico-bubble bad"><Icon name="alert" size={18} /></div>
          <div>
            <div className="head">
              <h3>Alerta de Inasistencia</h3>
              <time>Hace 2 horas</time>
            </div>
            <p>Registraste tu segunda inasistencia en el taller de <b>Teatro Juvenil</b>.</p>
            <p><b>Recordá:</b> Al completar 3 faltas perderás la vacante automáticamente.</p>
          </div>
        </article>
        <article className="notice plain">
          <div className="ico-bubble info"><Icon name="building" size={18} /></div>
          <div>
            <div className="head">
              <h3>Cambio de Aula</h3>
              <time>Ayer</time>
            </div>
            <p>El taller de <b>Programación Web</b> se dictará en el <b>Aula 204 (Planta Alta)</b> hoy a las 18:00 hs.</p>
          </div>
        </article>
        <article className="notice plain ok">
          <div className="ico-bubble ok"><Icon name="check" size={18} /></div>
          <div>
            <div className="head">
              <h3>Inscripción Exitosa</h3>
              <time>28 de Oct</time>
            </div>
            <p>¡Ya tenés tu lugar en el taller de <b>Huerta Orgánica</b>! Te esperamos el lunes 4 de noviembre.</p>
            <button className="link" type="button" style={{ background: "none", border: 0, padding: 0, marginTop: 8 }} onClick={() => notify("Comprobante descargado")}>
              Descargar comprobante
            </button>
          </div>
        </article>
        <div className="empty-old">
          <Icon name="refresh" size={28} />
          <p>No hay notificaciones más antiguas</p>
        </div>
      </div>
    </Screen>
  );
}
