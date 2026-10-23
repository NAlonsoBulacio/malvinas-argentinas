"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";

function Steps({ current }) {
  const items = ["Datos", "Identidad", "Legales"];
  return (
    <div className="stepper">
      <div className="bar"><span style={{ width: current === 0 ? "18%" : current === 1 ? "50%" : "100%" }} /></div>
      {items.map((label, i) => (
        <div key={label} className={"step" + (i === current ? " on" : "") + (i < current ? " done" : "")}>
          <div className="dot">{i < current ? <Icon name="check" size={16} /> : i + 1}</div>
          {label}
        </div>
      ))}
    </div>
  );
}

export function StepsBar({ current }) {
  return <Steps current={current} />;
}

export default function RegistroPage() {
  const router = useRouter();
  const { draft, setDraft } = useApp();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({
    nombre: draft.nombre || "",
    dni: draft.dni || "",
    email: draft.email || "",
    celular: draft.celular || "",
    password: draft.password || "",
  });

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function submit(e) {
    e.preventDefault();
    setDraft(form);
    router.push("/registro/identidad");
  }

  const ok = form.nombre.trim().length > 3 && /^\d{7,8}$/.test(form.dni) && form.email.includes("@") && form.celular.trim().length > 6 && form.password.length >= 8;

  return (
    <Screen header="help" nav={null} back="/">
      <Steps current={0} />
      <div className="center" style={{ marginBottom: 12 }}>
        <h1 className="h1">Crear Cuenta</h1>
        <p className="lead">Completá tus datos para empezar a participar de los talleres municipales.</p>
      </div>
      <form className="form-card" onSubmit={submit}>
        <div className="field">
          <label>Nombre y Apellido</label>
          <div className="control soft">
            <span className="lead-ico"><Icon name="user" size={16} /></span>
            <input placeholder="Ej: Juan Pérez" value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>DNI</label>
          <div className="control soft">
            <span className="lead-ico"><Icon name="id" size={16} /></span>
            <input inputMode="numeric" placeholder="12589745" value={form.dni} onChange={(e) => set("dni", e.target.value.replace(/\D/g, "").slice(0, 8))} />
          </div>
          <span className="hint">Ingresá tu número sin puntos ni espacios</span>
        </div>
        <div className="field">
          <label>Email</label>
          <div className="control soft">
            <span className="lead-ico"><Icon name="mail" size={16} /></span>
            <input type="email" placeholder="usuario@ejemplo.com" value={form.email} onChange={(e) => set("email", e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Celular</label>
          <div className="control soft">
            <span className="lead-ico"><Icon name="phone" size={16} /></span>
            <input placeholder="11 1234 5678" value={form.celular} onChange={(e) => set("celular", e.target.value)} />
          </div>
        </div>
        <div className="field">
          <label>Contraseña</label>
          <div className="control soft">
            <span className="lead-ico"><Icon name="lock" size={16} /></span>
            <input type={show ? "text" : "password"} placeholder="Mínimo 8 caracteres" value={form.password} onChange={(e) => set("password", e.target.value)} />
            <button type="button" className="trail" onClick={() => setShow((v) => !v)} aria-label="Mostrar contraseña">
              <Icon name={show ? "eye-off" : "eye"} size={18} />
            </button>
          </div>
        </div>
        <button className="btn" disabled={!ok}>Continuar <Icon name="arrow" size={16} /></button>
      </form>
      <p className="center lead" style={{ marginTop: 16 }}>
        ¿Ya tenés cuenta? <Link className="link" href="/">Iniciar Sesión</Link>
      </p>
    </Screen>
  );
}
