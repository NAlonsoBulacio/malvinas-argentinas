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

export function hoyISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function diasHasta(iso, desde = hoyISO()) {
  const [y, m, d] = String(iso).split("-").map(Number);
  const [y2, m2, d2] = String(desde).split("-").map(Number);
  return Math.round((Date.UTC(y, m - 1, d) - Date.UTC(y2, m2 - 1, d2)) / 86400000);
}

export function estadoVacuna(v) {
  if (!v?.proximaDosis) return "al-dia";
  const dias = diasHasta(v.proximaDosis);
  if (dias < 0) return "vencida";
  if (dias <= 45) return "proxima";
  return "al-dia";
}

export function textoProxima(iso) {
  const n = diasHasta(iso);
  if (n < 0) {
    const a = Math.abs(n);
    return a === 1 ? "Venció ayer" : `Venció hace ${a} días`;
  }
  if (n === 0) return "Te toca hoy";
  if (n === 1) return "Te toca mañana";
  return `Te toca en ${n} días`;
}

export function etiquetaVacuna(estado) {
  if (estado === "vencida") return "Dosis vencida";
  if (estado === "proxima") return "Próxima dosis";
  return "Al día";
}

export function etiquetaEstudio(estado) {
  if (estado === "pedido") return "Pedido";
  if (estado === "con-turno") return "Con turno";
  return "Resultado listo";
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
