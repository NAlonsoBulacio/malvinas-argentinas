const DIA = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

export const FRANJAS = [
  { id: "", label: "Todo el día" },
  { id: "manana", label: "Mañana" },
  { id: "tarde", label: "Tarde" },
];

export function fmtDia(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  const dd = String(d).padStart(2, "0");
  const mm = String(m).padStart(2, "0");
  return `${DIA[dt.getDay()]} ${dd}/${mm}`;
}

export function enFranja(hora, franja) {
  if (!franja) return true;
  const h = parseInt(String(hora).slice(0, 2), 10);
  if (franja === "manana") return h < 13;
  if (franja === "tarde") return h >= 13 && h < 19;
  return true;
}

export function especialidadesDe(profesionales, salitaId) {
  return profesionales.filter((p) => p.salitaId === salitaId).map((p) => p.especialidad);
}

export function proximoTurno(turnos, profesionales, salitaId, especialidad, franja) {
  const ids = new Set(
    profesionales
      .filter((p) => p.salitaId === salitaId && (!especialidad || p.especialidad === especialidad))
      .map((p) => p.id)
  );
  return turnos
    .filter((t) => ids.has(t.profesionalId) && t.disponible && enFranja(t.hora, franja))
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))[0];
}
