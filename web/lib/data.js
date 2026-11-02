export const user = {
  nombre: "Juan Pérez García",
  dni: "32123456",
  email: "juan.perez@email.com",
  telefono: "+54 11 5555-1234",
};

export const zonas = [
  "Los Polvorines",
  "Grand Bourg",
  "Tortuguitas",
  "Villa de Mayo",
  "Pablo Nogués",
  "Tierras Altas",
];

export const mapCenter = { lat: -34.505, lng: -58.71, zoom: 12 };

export const salitas = [
  {
    id: "sal-1",
    nombre: "Salita 3 — Pediatría",
    centro: "Hospital Municipal Norte",
    direccion: "Av. Pte. Perón 1200",
    zona: "Los Polvorines",
    lat: -34.528,
    lng: -58.698,
    horario: "Lun a Vie · 8:00 – 18:00",
    distanciaKm: 1.2,
  },
  {
    id: "sal-2",
    nombre: "Salita 1 — Clínica médica",
    centro: "CAPS Grand Bourg",
    direccion: "Calle San Martín 450",
    zona: "Grand Bourg",
    lat: -34.487,
    lng: -58.727,
    horario: "Lun a Sáb · 7:30 – 19:00",
    distanciaKm: 2.8,
  },
  {
    id: "sal-3",
    nombre: "Salita 2 — Enfermería",
    centro: "Hospital Municipal Norte",
    direccion: "Av. Pte. Perón 1450",
    zona: "Los Polvorines",
    lat: -34.536,
    lng: -58.712,
    horario: "Lun a Vie · 9:00 – 17:00",
    distanciaKm: 1.6,
  },
  {
    id: "sal-4",
    nombre: "CAPS Tortuguitas",
    centro: "Centro de Salud Tortuguitas",
    direccion: "Av. Sarratea 2100",
    zona: "Tortuguitas",
    lat: -34.476,
    lng: -58.753,
    horario: "Lun a Vie · 8:00 – 16:00",
    distanciaKm: 4.1,
  },
  {
    id: "sal-5",
    nombre: "Salita Villa de Mayo",
    centro: "Unidad Sanitaria Villa de Mayo",
    direccion: "Av. Eva Perón 890",
    zona: "Villa de Mayo",
    lat: -34.511,
    lng: -58.68,
    horario: "Lun a Vie · 8:00 – 17:00",
    distanciaKm: 3.4,
  },
  {
    id: "sal-6",
    nombre: "CAPS Pablo Nogués",
    centro: "Centro Pablo Nogués",
    direccion: "Calle 9 de Julio 320",
    zona: "Pablo Nogués",
    lat: -34.493,
    lng: -58.704,
    horario: "Lun a Sáb · 8:00 – 13:00",
    distanciaKm: 2.2,
  },
  {
    id: "sal-7",
    nombre: "Unidad Tierras Altas",
    centro: "CAPS Tierras Altas",
    direccion: "Av. Oliden 500",
    zona: "Tierras Altas",
    lat: -34.548,
    lng: -58.719,
    horario: "Lun a Vie · 9:00 – 15:00",
    distanciaKm: 5.0,
  },
];

export const profesionales = [
  { id: "pro-1", salitaId: "sal-1", nombre: "Dra. Ana Morales", especialidad: "Pediatría", matricula: "MN 89432" },
  { id: "pro-2", salitaId: "sal-1", nombre: "Dr. Luis Fernández", especialidad: "Medicina general", matricula: "MN 77120" },
  { id: "pro-3", salitaId: "sal-2", nombre: "Dra. Carla Ruiz", especialidad: "Clínica médica", matricula: "MN 90211" },
  { id: "pro-4", salitaId: "sal-2", nombre: "Dr. Martín Soto", especialidad: "Cardiología", matricula: "MN 65400" },
  { id: "pro-5", salitaId: "sal-3", nombre: "Lic. Patricia Gómez", especialidad: "Enfermería — vacunación", matricula: "LE 12045" },
  { id: "pro-6", salitaId: "sal-3", nombre: "Dr. Diego Acosta", especialidad: "Medicina general", matricula: "MN 81233" },
  { id: "pro-7", salitaId: "sal-4", nombre: "Dra. Sofía Benítez", especialidad: "Ginecología", matricula: "MN 44190" },
  { id: "pro-8", salitaId: "sal-4", nombre: "Dr. Pablo Herrera", especialidad: "Pediatría", matricula: "MN 33012" },
  { id: "pro-9", salitaId: "sal-5", nombre: "Dra. Elena Vargas", especialidad: "Traumatología", matricula: "MN 22871" },
  { id: "pro-10", salitaId: "sal-6", nombre: "Dra. Marina López", especialidad: "Odontología", matricula: "MN 51904" },
  { id: "pro-11", salitaId: "sal-6", nombre: "Dr. Andrés Paredes", especialidad: "Clínica médica", matricula: "MN 67320" },
  { id: "pro-12", salitaId: "sal-7", nombre: "Lic. Laura Díaz", especialidad: "Enfermería — vacunación", matricula: "LE 18820" },
];

export const turnosIniciales = [
  { id: "t-1", profesionalId: "pro-1", fecha: "2026-10-24", hora: "09:00", disponible: true },
  { id: "t-2", profesionalId: "pro-1", fecha: "2026-10-24", hora: "09:30", disponible: false },
  { id: "t-3", profesionalId: "pro-1", fecha: "2026-10-24", hora: "10:00", disponible: true },
  { id: "t-4", profesionalId: "pro-1", fecha: "2026-10-25", hora: "11:00", disponible: true },
  { id: "t-5", profesionalId: "pro-2", fecha: "2026-10-24", hora: "14:00", disponible: true },
  { id: "t-6", profesionalId: "pro-2", fecha: "2026-10-24", hora: "15:30", disponible: true },
  { id: "t-7", profesionalId: "pro-3", fecha: "2026-10-23", hora: "08:30", disponible: true },
  { id: "t-8", profesionalId: "pro-3", fecha: "2026-10-23", hora: "10:00", disponible: true },
  { id: "t-9", profesionalId: "pro-4", fecha: "2026-10-26", hora: "16:00", disponible: true },
  { id: "t-10", profesionalId: "pro-5", fecha: "2026-10-22", hora: "11:00", disponible: true },
  { id: "t-11", profesionalId: "pro-5", fecha: "2026-10-22", hora: "12:00", disponible: true },
  { id: "t-12", profesionalId: "pro-6", fecha: "2026-10-25", hora: "09:00", disponible: true },
  { id: "t-13", profesionalId: "pro-7", fecha: "2026-10-27", hora: "09:30", disponible: true },
  { id: "t-14", profesionalId: "pro-8", fecha: "2026-10-27", hora: "11:00", disponible: true },
  { id: "t-15", profesionalId: "pro-9", fecha: "2026-10-28", hora: "15:00", disponible: true },
  { id: "t-16", profesionalId: "pro-10", fecha: "2026-10-24", hora: "10:30", disponible: true },
  { id: "t-17", profesionalId: "pro-11", fecha: "2026-10-24", hora: "12:00", disponible: true },
  { id: "t-18", profesionalId: "pro-12", fecha: "2026-10-23", hora: "09:00", disponible: true },
];

export const historialClinico = [
  {
    fecha: "2026-09-12",
    tipo: "Consulta",
    profesional: "Dra. Carla Ruiz",
    resumen: "Control anual. Presión arterial normal. Sin medicación nueva.",
  },
  {
    fecha: "2026-06-03",
    tipo: "Estudios",
    profesional: "Dr. Martín Soto",
    resumen: "Electrocardiograma dentro de parámetros habituales.",
  },
  {
    fecha: "2026-02-18",
    tipo: "Consulta",
    profesional: "Dra. Ana Morales",
    resumen: "Atención pediátrica familiar — orientación nutricional.",
  },
];

export const vacunasIniciales = [
  { id: "vac-1", nombre: "Antigripal", dosis: "Anual 2026", fechaAplicada: "2026-04-10", proximaDosis: "2026-11-18", centro: "CAPS Grand Bourg" },
  { id: "vac-2", nombre: "COVID-19", dosis: "Refuerzo", fechaAplicada: "2025-11-02", proximaDosis: null, centro: "Hospital Municipal Norte" },
  { id: "vac-3", nombre: "Hepatitis B", dosis: "3ª dosis", fechaAplicada: "2024-08-15", proximaDosis: null, centro: "CAPS Grand Bourg" },
  { id: "vac-4", nombre: "Doble adultos (dT)", dosis: "Refuerzo", fechaAplicada: "2016-03-12", proximaDosis: "2026-10-01", centro: "Hospital Municipal Norte" },
];

export const vacunasDisponibles = [
  "Antigripal",
  "COVID-19",
  "Hepatitis B",
  "DTPa",
  "Sarampión · Paperas · Rubéola",
  "Fiebre amarilla",
  "Doble adultos (dT)",
];

export const reservasIniciales = [
  {
    id: "res-mock-1",
    salitaNombre: "Salita 1 — Clínica médica",
    centro: "CAPS Grand Bourg",
    profesional: "Dra. Carla Ruiz",
    especialidad: "Clínica médica",
    fecha: "2026-09-20",
    hora: "10:30",
    estado: "Completada",
  },
];

export const avisosVacunacion = [
  {
    id: "av-1",
    titulo: "Campaña antigripal 2026",
    fecha: "2026-11-01",
    audiencia: "Mayores de 65, embarazadas, niñez y personas con factores de riesgo",
    texto: "Ya podés darte la antigripal sin turno en los CAPS del municipio, de 8 a 14. Llevá DNI y, si tenés, el carnet de vacunación.",
    lugar: "Todos los CAPS",
    vigencia: "Hasta el 30 de noviembre",
  },
  {
    id: "av-2",
    titulo: "Refuerzo de doble adultos",
    fecha: "2026-10-20",
    audiencia: "Personas con la última dosis de dT hace más de 10 años",
    texto: "Enfermería está aplicando el refuerzo de doble adultos. Si tu carnet figura vencido, acercate al vacunatorio de tu zona.",
    lugar: "Salitas de enfermería",
    vigencia: "Turno o demanda según el centro",
  },
  {
    id: "av-3",
    titulo: "Vacuna contra el dengue",
    fecha: "2026-10-15",
    audiencia: "Personas de 15 a 59 años",
    texto: "Está disponible la primera dosis en el Hospital Municipal Norte. Conviene reservar turno en la salita de vacunación.",
    lugar: "Hospital Municipal Norte",
    vigencia: "Cupos semanales",
  },
];

export const estudiosIniciales = [
  {
    id: "est-1",
    nombre: "Laboratorio de rutina",
    detalle: "Hemograma, glucemia y colesterol",
    pedidoPor: "Dra. Carla Ruiz",
    especialidad: "Clínica médica",
    fechaPedido: "2026-10-28",
    centro: "CAPS Grand Bourg",
    estado: "pedido",
    preparacion: "Ayuno de 8 horas. Podés tomar agua. Llevá DNI y la orden.",
    turno: null,
    resultado: null,
  },
  {
    id: "est-2",
    nombre: "Electrocardiograma",
    detalle: "Control cardiológico de seguimiento",
    pedidoPor: "Dr. Martín Soto",
    especialidad: "Cardiología",
    fechaPedido: "2026-10-20",
    centro: "Hospital Municipal Norte",
    estado: "con-turno",
    preparacion: "No requiere ayuno. Llegá 15 minutos antes y evitá café esa mañana.",
    turno: { fecha: "2026-11-06", hora: "09:30" },
    resultado: null,
  },
  {
    id: "est-3",
    nombre: "Radiografía de tórax",
    detalle: "Frente y perfil",
    pedidoPor: "Dr. Diego Acosta",
    especialidad: "Medicina general",
    fechaPedido: "2026-09-02",
    centro: "Hospital Municipal Norte",
    estado: "resultado",
    preparacion: "Sin preparación previa.",
    turno: { fecha: "2026-09-10", hora: "11:00" },
    resultado: "Sin hallazgos agudos. El informe queda disponible en el centro y en esta sección.",
  },
];
