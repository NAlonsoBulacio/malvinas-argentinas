"use client";

import { useParams } from "next/navigation";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { QrCode } from "@/components/Qr";
import { useApp } from "@/components/app-state";
import { tallerPorId } from "@/lib/talleres";

export default function InscripcionPage() {
  const { id } = useParams();
  const taller = tallerPorId(id);
  const { perfil, notify } = useApp();
  if (!taller) return <Screen active="talleres"><p>Taller no encontrado.</p></Screen>;

  function calendario() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${taller.nombre}`,
      `LOCATION:${taller.sede}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = taller.id + ".ics";
    a.click();
    URL.revokeObjectURL(url);
    notify("Evento listo para tu calendario");
  }

  return (
    <Screen header="profile" active="talleres">
      <div className="stack center">
        <div className="success-ico"><Icon name="check" size={30} /></div>
        <h1 className="h2">Inscripción exitosa!</h1>
        <p className="lead">
          <b>Felicitaciones!</b><br />
          Ya estás registrado en el taller.<br />
          Te enviamos un correo con los detalles.
        </p>
        <article className="carnet" style={{ textAlign: "left", width: "100%" }}>
          <header>
            Carnet digital
            <Icon name="card" size={18} />
          </header>
          <div className="pad">
            <div className="kicker">Participante</div>
            <strong style={{ color: "var(--navy)", letterSpacing: "-0.3px" }}>{perfil.nombre.toUpperCase()}</strong>
            <div className="kicker" style={{ marginTop: 12 }}>Taller</div>
            <strong style={{ color: "var(--navy)" }}>{taller.nombre}</strong>
            <div className="dash"><div className="qr-frame"><QrCode /></div></div>
          </div>
        </article>
        <button className="btn ghost" onClick={calendario}>
          <Icon name="calendar" size={18} /> Agregar a mi Calendario
        </button>
        <div className="info-box" style={{ textAlign: "left" }}>
          <Icon name="help" size={22} />
          <p>
            <strong>Información importante:</strong> Tu vacante está asegurada. Recordá que con 3 inasistencias se libera el cupo automáticamente.
          </p>
        </div>
      </div>
    </Screen>
  );
}
