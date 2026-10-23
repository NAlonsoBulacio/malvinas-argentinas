"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { tallerPorId, talleres } from "@/lib/talleres";

export default function TallerPage() {
  const { id } = useParams();
  const router = useRouter();
  const taller = tallerPorId(id);
  const { inscribir, inscriptos, espera } = useApp();
  if (!taller) return <Screen active="talleres"><p>No encontramos ese taller.</p></Screen>;

  const ya = inscriptos.includes(taller.id);
  const enEspera = espera.includes(taller.id) || (taller.espera && !ya);
  const relacionados = talleres.filter((t) => t.relacionado && t.id !== taller.id);

  function confirmar() {
    if (taller.espera) {
      inscribir(taller.id, true);
      router.push("/talleres");
      return;
    }
    inscribir(taller.id, false);
    router.push("/inscripcion/" + taller.id);
  }

  return (
    <Screen header="profile" active="talleres" flush>
      <div className="hero-photo">
        <img src={taller.imagen} alt="" />
      </div>
      <div className="stack" style={{ padding: "16px 16px 0" }}>
        <div>
          <h1 className="h1">{taller.nombre}</h1>
          <p className="lead">{taller.resumen}</p>
        </div>
        <div className="meta">
          <span><Icon name="user" size={16} /> <span><small style={{ color: "var(--muted)" }}>Docente</small><br /><b>{taller.docente}</b></span></span>
          <span><Icon name="pin" size={16} /> <span><small style={{ color: "var(--muted)" }}>Sede</small><br /><b>{taller.sede}</b></span></span>
        </div>
        <div className="req">
          <strong>Requisitos</strong>
          <ul>
            {taller.requisitos.map((r) => (
              <li key={r}><Icon name="check" size={16} /> {r}</li>
            ))}
          </ul>
        </div>
        <button className="btn" onClick={confirmar} disabled={ya}>
          {ya ? "Ya estás inscripto" : enEspera ? "Anotarme en lista de espera" : "Confirmar Inscripción"}
        </button>
        <p className="note">{taller.espera ? "Sin cupo. Podés anotarte en lista de espera." : `Quedan ${taller.cupos} lugares disponibles`}</p>
        <section className="panel">
          <h2 className="h2">Sobre el Taller</h2>
          <p className="lead" style={{ marginTop: 8 }}>{taller.sobre}</p>
        </section>
        <section>
          <h2 className="h2">Cronograma</h2>
          <div className="schedule" style={{ marginTop: 8 }}>
            {taller.cronograma.map((c) => (
              <div className="slot" key={c.dia}><b>{c.dia}</b><span>{c.hora}</span></div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h2 className="h2">Ubicación</h2>
          <div className="map" style={{ margin: "10px 0" }}><img src={taller.mapa} alt="Mapa de la sede" /></div>
          <p className="lead">{taller.direccion}</p>
        </section>
        <section>
          <h2 className="h2">Otros talleres que podrían interesarte</h2>
          <div className="related" style={{ marginTop: 10 }}>
            {relacionados.map((r) => (
              <Link key={r.id} href={"/talleres/" + r.id}>
                <img src={r.imagen} alt="" />
                <div>
                  <span className="pill">{r.tag}</span>
                  <strong style={{ display: "block", color: "var(--navy)", marginTop: 4 }}>{r.nombre}</strong>
                  <span className="lead" style={{ fontSize: 13 }}>{r.horario}</span>
                  <div className="link">Ver más</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </Screen>
  );
}
