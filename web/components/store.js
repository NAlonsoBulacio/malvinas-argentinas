"use client";

import { createContext, useContext, useMemo, useState } from "react";
import { reservasIniciales, turnosIniciales, vacunasIniciales } from "@/lib/data";

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [turnos, setTurnos] = useState(turnosIniciales);
  const [reservas, setReservas] = useState(reservasIniciales);
  const [vacunas, setVacunas] = useState(vacunasIniciales);

  const api = useMemo(
    () => ({
      turnos,
      reservas,
      vacunas,
      reservar(reserva, turnoId) {
        setTurnos((list) => list.map((t) => (t.id === turnoId ? { ...t, disponible: false } : t)));
        setReservas((list) => [{ ...reserva, id: "res-" + Date.now(), estado: "Confirmada" }, ...list]);
      },
      registrarVacuna(vacuna) {
        setVacunas((list) => [{ ...vacuna, id: "vac-" + Date.now(), proximaDosis: null }, ...list]);
      },
    }),
    [turnos, reservas, vacunas]
  );

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore fuera del provider");
  return ctx;
}
