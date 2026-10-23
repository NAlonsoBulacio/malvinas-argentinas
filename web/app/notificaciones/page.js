"use client";

import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";

export default function NotificacionesPage() {
  const { notify } = useApp();
  return (
    <Screen header="help" active="perfil" back="/perfil">
      <div className="stack">
        <div>
          <h1 className="h1">Notificaciones</h1>
          <p className="lead">Mantenete al día con tus talleres.</p>
        </div>
        <h2 className="h2" style={{ color: "var(--navy-2)" }}>Recientes</h2>
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
