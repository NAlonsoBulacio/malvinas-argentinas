"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@/components/icons";
import { StatusBar } from "@/components/chrome";
import { useApp } from "@/components/app-state";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useApp();
  const [dni, setDni] = useState("");
  const [pass, setPass] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!/^\d{7,8}$/.test(dni)) {
      setError("Ingresá tu DNI sin puntos ni espacios.");
      return;
    }
    if (pass.length < 4) {
      setError("La contraseña es demasiado corta.");
      return;
    }
    router.push(login(dni));
  }

  return (
    <div className="phone">
      <div className="login">
        <StatusBar />
        <div className="blob a" />
        <div className="blob b" />
        <div className="blob c" />
        <div className="login-brand">
          <span className="logo-badge">
            <img src="/figma/logo.png" alt="Municipalidad de Malvinas Argentinas" />
          </span>
          <div className="muni">Malvinas Argentinas</div>
          <h1>Talleres Culturales</h1>
          <p>
            Tu lugar para aprender y compartir.
            <br />
            Accedé a toda la oferta cultural
            <br />
            de tu municipio.
          </p>
        </div>
        <form className="login-card" onSubmit={submit}>
          <div>
            <h2>Bienvenido Vecino!</h2>
            <p className="sub">Ingresá tus datos para continuar</p>
          </div>
          <div className="field">
            <label htmlFor="dni">Número de DNI</label>
            <div className="control">
              <input id="dni" inputMode="numeric" placeholder="Ej: 12345678" value={dni} onChange={(e) => setDni(e.target.value.replace(/\D/g, "").slice(0, 8))} />
              <span className="trail"><Icon name="id" size={18} /></span>
            </div>
            <span className="hint">Ingresá tu número sin puntos ni espacios</span>
          </div>
          <div className="field">
            <label htmlFor="pass">Contraseña</label>
            <div className="control">
              <input id="pass" type={show ? "text" : "password"} placeholder="********" value={pass} onChange={(e) => setPass(e.target.value)} />
              <button type="button" className="trail" onClick={() => setShow((v) => !v)} aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}>
                <Icon name={show ? "eye-off" : "eye"} size={18} />
              </button>
            </div>
          </div>
          {error && <p className="hint" style={{ color: "var(--danger)" }}>{error}</p>}
          <button className="btn" type="submit">
            Ingresar con mi DNI <Icon name="arrow" size={18} />
          </button>
          <div className="center">
            <p className="lead">¿Aún no tenés cuenta?</p>
            <Link className="link" href="/registro">Registrarme</Link>
          </div>
          <div className="trust">
            <Icon name="shield" size={14} /> Sitio oficial de la Municipalidad
          </div>
          <p className="center" style={{ margin: 0 }}>
            <Link href="/gestion" onClick={(e) => { e.preventDefault(); router.push(login("00000000")); }} className="hint link">
              Acceso gestión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
