"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { reservasIniciales, turnosIniciales, vacunasIniciales } from "@/lib/data";
import { alumnos as alumnosSeed, talleres, VECINO } from "@/lib/talleres";

const Ctx = createContext(null);
const KEY = "ma-talleres";

const inicial = {
  user: null,
  draft: {},
  inscriptos: talleres.filter((t) => t.inscriptoInicial).map((t) => t.id),
  espera: [],
  favoritos: [],
  asistenciaClase: { guitarra: "pendiente", teatro: "confirmada" },
  perfil: { ...VECINO },
  alumnos: alumnosSeed,
  extra: [],
  archivados: [],
  turnos: turnosIniciales,
  reservas: reservasIniciales,
  vacunas: vacunasIniciales,
  toast: "",
};

export function AppStateProvider({ children }) {
  const [state, setState] = useState(inicial);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) setState((s) => ({ ...s, ...JSON.parse(raw), toast: "" }));
    } catch {
      /* sesión vacía */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const { toast, ...rest } = state;
    sessionStorage.setItem(KEY, JSON.stringify(rest));
  }, [state, ready]);

  const api = useMemo(() => {
    const patch = (fn) =>
      setState((s) => {
        const next = fn(s);
        try {
          const { toast, ...rest } = next;
          sessionStorage.setItem(KEY, JSON.stringify(rest));
        } catch {
          /* sin storage */
        }
        return next;
      });
    return {
      ...state,
      ready,
      login(dni) {
        const gestion = String(dni).replace(/\D/g, "") === "00000000";
        setState((s) => {
          const user = { ...s.perfil, rol: gestion ? "gestion" : "vecino" };
          const next = { ...s, user };
          try {
            const { toast, ...rest } = next;
            sessionStorage.setItem(KEY, JSON.stringify(rest));
          } catch {
            /* sin storage */
          }
          return next;
        });
        return gestion ? "/gestion" : "/talleres";
      },
      activarCuenta() {
        patch((s) => {
          const perfil = {
            ...s.perfil,
            nombre: s.draft.nombre || s.perfil.nombre,
            dni: s.draft.dni || s.perfil.dni,
            email: s.draft.email || s.perfil.email,
            emailPerfil: s.draft.email || s.perfil.emailPerfil,
            telefono: s.draft.celular || s.perfil.telefono,
            foto: s.draft.foto || s.perfil.foto,
          };
          return { ...s, perfil, user: { ...perfil, rol: "vecino" } };
        });
      },
      logout() {
        patch((s) => ({ ...s, user: null }));
      },
      setDraft(draft) {
        patch((s) => ({ ...s, draft: { ...s.draft, ...draft } }));
      },
      finishRegistro() {
        patch((s) => ({
          ...s,
          user: {
            nombre: s.draft.nombre || s.perfil.nombre,
            dni: s.draft.dni || s.perfil.dni,
            email: s.draft.email || s.perfil.email,
            emailPerfil: s.draft.email || s.perfil.emailPerfil,
            telefono: s.draft.celular || s.perfil.telefono,
            foto: s.draft.foto || s.perfil.foto,
            rol: "vecino",
          },
          perfil: {
            ...s.perfil,
            nombre: s.draft.nombre || s.perfil.nombre,
            dni: s.draft.dni || s.perfil.dni,
            email: s.draft.email || s.perfil.email,
            emailPerfil: s.draft.email || s.perfil.emailPerfil,
            telefono: s.draft.celular || s.perfil.telefono,
            foto: s.draft.foto || s.perfil.foto,
          },
        }));
      },
      savePerfil(perfil) {
        patch((s) => ({
          ...s,
          perfil: { ...s.perfil, ...perfil },
          user: s.user ? { ...s.user, ...perfil } : s.user,
          toast: "Cambios guardados",
        }));
      },
      notify(msg) {
        patch((s) => ({ ...s, toast: msg }));
      },
      clearToast() {
        patch((s) => ({ ...s, toast: "" }));
      },
      toggleFav(id) {
        patch((s) => ({
          ...s,
          favoritos: s.favoritos.includes(id) ? s.favoritos.filter((x) => x !== id) : [...s.favoritos, id],
        }));
      },
      inscribir(id, enEspera) {
        patch((s) => ({
          ...s,
          inscriptos: enEspera || s.inscriptos.includes(id) ? s.inscriptos : [...s.inscriptos, id],
          espera: enEspera && !s.espera.includes(id) ? [...s.espera, id] : s.espera,
        }));
      },
      confirmarAsistencia(id) {
        patch((s) => ({ ...s, asistenciaClase: { ...s.asistenciaClase, [id]: "confirmada" }, toast: "Asistencia confirmada" }));
      },
      setAlumno(id, estado) {
        patch((s) => ({
          ...s,
          alumnos: s.alumnos.map((a) => (a.id === id ? { ...a, estado } : a)),
        }));
      },
      addTaller(taller) {
        patch((s) => ({ ...s, extra: [...s.extra, taller], toast: "Taller guardado" }));
      },
      archivar(id) {
        patch((s) => ({
          ...s,
          archivados: s.archivados?.includes(id) ? s.archivados : [...(s.archivados || []), id],
          extra: s.extra.map((t) => (t.id === id ? { ...t, activo: false } : t)),
          toast: "Taller archivado",
        }));
      },
      reservarTurno(reserva, turnoId) {
        patch((s) => ({
          ...s,
          turnos: (s.turnos || turnosIniciales).map((t) => (t.id === turnoId ? { ...t, disponible: false } : t)),
          reservas: [{ ...reserva, id: "res-" + Date.now(), estado: "Confirmada" }, ...(s.reservas || reservasIniciales)],
          toast: "Turno reservado",
        }));
      },
      registrarVacuna(vacuna) {
        patch((s) => ({
          ...s,
          vacunas: [{ ...vacuna, id: "vac-" + Date.now(), proximaDosis: null }, ...(s.vacunas || vacunasIniciales)],
          toast: "Vacuna registrada",
        }));
      },
    };
  }, [state, ready]);

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useApp() {
  return useContext(Ctx);
}
