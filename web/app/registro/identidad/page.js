"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { StepsBar } from "../page";

export default function IdentidadPage() {
  const router = useRouter();
  const { draft, setDraft } = useApp();
  const [foto, setFoto] = useState(draft.foto || "");

  function onFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setFoto(url);
    setDraft({ foto: url });
  }

  return (
    <Screen header="help" nav={null} back="/registro">
      <StepsBar current={1} />
      <div className="center">
        <h1 className="h2">¡Hola, Vecino!</h1>
        <p className="lead">Para generar tu carnet digital, necesitamos una foto de tu rostro.</p>
      </div>
      <div className="selfie" style={{ marginTop: 16 }}>
        <label className="ring">
          {foto ? <img src={foto} alt="Foto de rostro" /> : (
            <span>
              <Icon name="camera" size={36} />
              <div style={{ fontWeight: 700, marginTop: 8 }}>Subir foto de rostro</div>
            </span>
          )}
          <input type="file" accept="image/*" hidden onChange={onFile} />
        </label>
        <div className="checks">
          <span><Icon name="check" size={14} /> Fondo claro</span>
          <span><Icon name="check" size={14} /> Sin anteojos</span>
          <span><Icon name="check" size={14} /> Rostro visible</span>
        </div>
      </div>
      <div className="info-box soft" style={{ marginTop: 16 }}>
        <Icon name="info" size={20} />
        <p>Esta foto se utilizará para tu carnet municipal digital y acceso a edificios públicos.</p>
      </div>
      <button className="btn" style={{ marginTop: 16 }} disabled={!foto} onClick={() => router.push("/registro/terminos")}>
        Continuar <Icon name="arrow" size={16} />
      </button>
    </Screen>
  );
}
