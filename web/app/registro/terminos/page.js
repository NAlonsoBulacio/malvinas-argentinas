"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";
import { legales } from "@/lib/talleres";
import { StepsBar } from "../page";

export default function TerminosPage() {
  const router = useRouter();
  const { activarCuenta } = useApp();
  const [ok, setOk] = useState(true);
  const [done, setDone] = useState(false);

  function finish() {
    activarCuenta();
    setDone(true);
  }

  if (done) {
    return (
      <Screen header="none" nav={null}>
        <div className="center stack" style={{ paddingTop: 40 }}>
          <div className="success-ico"><Icon name="check" size={30} /></div>
          <h1 className="h2">¡Registro completo!</h1>
          <p className="lead">Tu cuenta ya está activa. Ya podés explorar los talleres municipales de Malvinas Argentinas.</p>
          <button className="btn" onClick={() => router.push("/talleres")}>Empezar</button>
        </div>
      </Screen>
    );
  }

  return (
    <Screen header="help" nav={null} back="/registro/identidad">
      <StepsBar current={2} />
      <div className="card" style={{ padding: 16, marginBottom: 16, position: "relative", overflow: "hidden" }}>
        <div style={{ width: 48, height: 48, borderRadius: 8, background: "var(--green)", color: "var(--navy)", display: "grid", placeItems: "center" }}>
          <Icon name="shield" size={22} />
        </div>
        <h2 className="h2" style={{ marginTop: 8 }}>Tu seguridad es nuestra prioridad</h2>
        <p className="lead">Tus datos están encriptados y protegidos bajo los más altos estándares de ciberseguridad municipal.</p>
      </div>
      <div className="card" style={{ padding: 16 }}>
        <h1 className="h1">Términos y Condiciones</h1>
        <p className="lead" style={{ margin: "8px 0 12px" }}>
          Por favor, leé atentamente los términos legales para finalizar tu registro en la plataforma ciudadana de Malvinas Argentinas.
        </p>
        <div className="legal">
          {legales.map((b) => (
            <section key={b.titulo}>
              <h3>{b.titulo}</h3>
              <p>{b.texto}</p>
            </section>
          ))}
          <p style={{ fontStyle: "italic", fontSize: 12, marginTop: 16 }}>
            Última actualización: Mayo 2024.
            <br />
            Malvinas Argentinas, Provincia de Buenos Aires.
          </p>
        </div>
        <label className="checkline" style={{ marginTop: 12 }}>
          <input type="checkbox" checked={ok} onChange={(e) => setOk(e.target.checked)} />
          <span>
            Acepto los <span className="link">términos y condiciones</span> y la política de privacidad de la Municipalidad. Comprendo que mi identidad se validará para acceder a servicios digitales personalizados.
          </span>
        </label>
        <button className="btn" style={{ marginTop: 14 }} disabled={!ok} onClick={finish}>Finalizar Registro</button>
      </div>
      <div className="help-card" style={{ marginTop: 16 }}>
        <strong style={{ color: "var(--navy)", display: "flex", gap: 8, alignItems: "center" }}>
          <Icon name="help" size={18} /> ¿Necesitás ayuda?
        </strong>
        <p className="lead">Si tenés dudas sobre el tratamiento de tus datos, podés contactarnos.</p>
        <a className="link" href="mailto:cultura@malvinasargentinas.gob.ar">Consultar guía de ayuda</a>
      </div>
      <div style={{ textAlign: "center", marginTop: 28, color: "var(--muted)" }}>
        <div className="footer-bars"><i /><i /><i /></div>
        <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.4 }}>© 2026 Municipalidad de Malvinas Argentinas</p>
      </div>
    </Screen>
  );
}
