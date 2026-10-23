"use client";

import { useParams, useRouter } from "next/navigation";
import { Screen } from "@/components/chrome";
import { useApp } from "@/components/app-state";
import { tallerPorId } from "@/lib/talleres";

export default function EditarTallerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { extra, archivar, notify } = useApp();
  const taller = tallerPorId(id) || extra.find((t) => t.id === id);

  if (!taller) {
    return <Screen nav="gestion" active="talleres"><p>No encontramos ese taller.</p></Screen>;
  }

  return (
    <Screen header="profile" nav="gestion" active="talleres" back="/gestion/talleres">
      <div className="stack">
        <div>
          <h1 className="h1" style={{ color: "var(--navy-2)" }}>Editar Taller</h1>
          <p className="lead">{taller.nombre}</p>
        </div>
        <section className="g-card">
          <div className="field">
            <label>Nombre *</label>
            <div className="control line"><input defaultValue={taller.nombre} /></div>
          </div>
          <div className="field">
            <label>Docente</label>
            <div className="control line"><input defaultValue={taller.docente} /></div>
          </div>
          <div className="field">
            <label>Sede</label>
            <div className="control line"><input defaultValue={taller.sede} /></div>
          </div>
          <div className="field">
            <label>Horario</label>
            <div className="control line"><input defaultValue={taller.horario} /></div>
          </div>
          <div className="field">
            <label>Cupo máximo</label>
            <div className="control line"><input defaultValue={String(taller.total)} /></div>
          </div>
          <p className="lead">{taller.resumen}</p>
        </section>
        <button className="btn" type="button" onClick={() => { notify("Cambios guardados"); router.push("/gestion/talleres"); }}>Guardar taller</button>
        <button className="btn ghost" type="button" onClick={() => { archivar(taller.id); router.push("/gestion/talleres"); }}>Archivar taller</button>
      </div>
    </Screen>
  );
}
