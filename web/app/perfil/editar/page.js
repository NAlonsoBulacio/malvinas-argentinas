"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Screen } from "@/components/chrome";
import { Icon } from "@/components/icons";
import { useApp } from "@/components/app-state";

export default function EditarPerfilPage() {
  const { perfil, savePerfil } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({
    nombre: perfil.nombre,
    email: perfil.email,
    telefono: perfil.telefono,
    foto: perfil.foto,
  });

  function set(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function foto(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    set("foto", URL.createObjectURL(file));
  }

  function save(e) {
    e.preventDefault();
    savePerfil({ ...form, emailPerfil: form.email });
    router.push("/perfil");
  }

  return (
    <Screen header="back" active="perfil" back="/perfil">
      <form className="stack" onSubmit={save}>
        <div className="big-avatar">
          <img src={form.foto || "/figma/perfil.png"} alt="" />
          <label className="cam">
            <Icon name="camera" size={16} />
            <input type="file" accept="image/*" hidden onChange={foto} />
          </label>
        </div>
        <div className="field">
          <label>Nombre completo</label>
          <div className="control line">
            <input value={form.nombre} onChange={(e) => set("nombre", e.target.value)} />
            <span className="trail"><Icon name="user" size={16} /></span>
          </div>
        </div>
        <div className="field">
          <label>DNI (Verificado)</label>
          <div className="control line" style={{ background: "var(--input)" }}>
            <input value={perfil.dni} readOnly />
            <span className="trail oficial"><Icon name="check" size={12} /> OFICIAL</span>
          </div>
        </div>
        <div className="field">
          <label>Correo electrónico</label>
          <div className="control line">
            <input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} />
            <span className="trail"><Icon name="mail" size={16} /></span>
          </div>
        </div>
        <div className="field">
          <label>Teléfono</label>
          <div className="control line">
            <input value={form.telefono} onChange={(e) => set("telefono", e.target.value)} />
            <span className="trail"><Icon name="phone" size={16} /></span>
          </div>
        </div>
        <button className="btn" type="submit">Guardar Cambios <Icon name="lock" size={16} /></button>
        <div className="info-box soft">
          <Icon name="info" size={18} />
          <p>
            <strong style={{ color: "var(--navy-2)" }}>Información de Seguridad</strong><br />
            Para modificar tu DNI o datos biométricos, debés acercarte personalmente a la municipalidad con tu documento físico.
          </p>
        </div>
      </form>
    </Screen>
  );
}
