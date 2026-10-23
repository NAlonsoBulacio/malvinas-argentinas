"use client";

import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { QrCode } from "@/components/Qr";
import { useApp } from "@/components/app-state";

export default function CarnetPage() {
  const { perfil, notify } = useApp();

  function pdf() {
    window.print();
    notify("Preparando el PDF del carnet");
  }

  return (
    <Screen header="help" active="carnet" back="/talleres">
      <div className="stack">
        <div className="center">
          <h1 className="h2">Mi Carnet Digital</h1>
          <p className="lead">Carnet Municipal de Talleres</p>
        </div>
        <article className="credential">
          <div className="who">
            <img src={perfil.foto || "/figma/perfil.png"} alt="" />
            <strong style={{ color: "var(--navy)", letterSpacing: "-0.3px" }}>{perfil.nombre.toUpperCase()}</strong>
            <div className="dni-pill" style={{ marginTop: 8 }}><b>DNI</b>: {perfil.dni}</div>
          </div>
          <div style={{ padding: "8px 20px 18px" }}>
            <p style={{ color: "var(--navy)", fontWeight: 700, display: "flex", gap: 8, justifyContent: "center" }}>
              <Icon name="info" size={18} /> Presentá este código al ingresar a tu taller
            </p>
            <p className="lead">Este código es personal e intransferible. Válido para centros culturales y deportivos municipales.</p>
            <div className="qr-frame" style={{ width: "fit-content", margin: "12px auto", background: "#fff" }}>
              <QrCode />
            </div>
          </div>
          <div className="cred-foot">
            <span>CARNET ACTIVO 2026</span>
            <span><i className="dot-live" /> VERIFICADO</span>
          </div>
        </article>
        <div className="actions-2">
          <button className="btn ghost" type="button" onClick={() => notify("Listo para agregar a Wallet")}>
            <Icon name="wallet" size={18} /> Guardar en Wallet
          </button>
          <button className="btn green" type="button" onClick={pdf}>
            <Icon name="file" size={18} /> Descargar PDF
          </button>
        </div>
        <div className="info-box soft">
          <Icon name="shield" size={20} />
          <p>
            <strong style={{ color: "var(--navy)" }}>Privacidad y Seguridad</strong><br />
            Tus datos están protegidos bajo la ley de protección de datos personales. Este carnet digital tiene validez oficial dentro del partido de Malvinas Argentinas.
          </p>
        </div>
      </div>
    </Screen>
  );
}
