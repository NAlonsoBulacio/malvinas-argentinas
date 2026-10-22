/** Renderizado de pantallas dentro del teléfono */
(function () {
  const M = () => window.MOCK;
  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function statusBar() {
    return `<div class="ma-status" aria-hidden="true">
      <span>9:30</span>
      <span class="ma-status-icons">▮▮▮ ▮▮ 80%</span>
    </div>`;
  }

  function appHeader(title, backAction) {
    const back = backAction
      ? `<button type="button" class="ma-back" data-action="${esc(backAction)}" aria-label="Volver">← Volver</button>`
      : `<span class="ma-logo-mark" aria-hidden="true">M</span>`;
    return `<header class="ma-header">
      ${back}
      <h2 class="ma-header-title">${esc(title)}</h2>
      <span class="ma-header-spacer"></span>
    </header>`;
  }

  function demoFooter() {
    return `<p class="ma-demo-foot">Demo — datos ficticios</p>`;
  }

  const DIA_NOMBRE = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
  const FRANJAS = [
    { id: "", label: "Todo el día" },
    { id: "manana", label: "Mañana" },
    { id: "tarde", label: "Tarde" },
  ];

  function fmtDia(iso) {
    const [y, m, d] = String(iso).split("-").map(Number);
    const dt = new Date(y, m - 1, d);
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    return {
      nombre: DIA_NOMBRE[dt.getDay()],
      num: String(dt.getDate()),
      corto: `${DIA_NOMBRE[dt.getDay()]} ${dd}/${mm}`,
    };
  }

  function enFranja(hora, franja) {
    if (!franja) return true;
    const h = parseInt(String(hora).slice(0, 2), 10);
    if (franja === "manana") return h < 13;
    if (franja === "tarde") return h >= 13 && h < 19;
    return true;
  }

  function turnosDeSalita(salitaId, especialidad) {
    const data = M();
    const ids = new Set(
      data.profesionales
        .filter((p) => p.salitaId === salitaId && (!especialidad || p.especialidad === especialidad))
        .map((p) => p.id)
    );
    return data.turnos.filter((t) => ids.has(t.profesionalId) && t.disponible);
  }

  function dayChips(fechas, selected, action) {
    const todos = `<button type="button" class="ma-day ma-day-all${selected ? "" : " ma-day-on"}" data-action="${action}" data-id="" aria-pressed="${selected ? "false" : "true"}">
      <span>Cualquier</span><strong>día</strong>
    </button>`;
    const rest = fechas
      .map((iso) => {
        const d = fmtDia(iso);
        const on = selected === iso;
        return `<button type="button" class="ma-day${on ? " ma-day-on" : ""}" data-action="${action}" data-id="${esc(iso)}" aria-pressed="${on ? "true" : "false"}">
          <span>${esc(d.nombre)}</span><strong>${esc(d.num)}</strong>
        </button>`;
      })
      .join("");
    return `<div class="ma-days" role="group" aria-label="Día">${todos}${rest}</div>`;
  }

  function franjaChips(selected, action) {
    return `<div class="ma-franjas" role="group" aria-label="Horario">${FRANJAS.map((f) => {
      const on = (selected || "") === f.id;
      return `<button type="button" class="ma-chip${on ? " ma-chip-on" : ""}" data-action="${action}" data-id="${esc(f.id)}" aria-pressed="${on ? "true" : "false"}">${esc(f.label)}</button>`;
    }).join("")}</div>`;
  }

  window.Screens = {
    talleresFigmaEmbed() {
      const src = M().figmaProtoEmbed;
      return `<div class="ma-embed-shell">
        <div class="ma-embed-banner">
          <span>Prototipo Figma</span>
          <button type="button" class="ma-embed-link" data-action="talleres:carousel">Ver capturas PNG</button>
        </div>
        <iframe
          class="ma-figma-embed"
          src="${esc(src)}"
          title="Prototipo interactivo Malvinas Argentinas"
          allowfullscreen
        ></iframe>
        <p class="ma-embed-hint">Tocá o clickeá <strong>dentro</strong> del celular para seguir el flujo del diseño (login, talleres, etc.).</p>
      </div>`;
    },

    talleresCarousel(index) {
      const screens = M().talleresScreens;
      const s = screens[index];
      return `${statusBar()}
        ${appHeader("Capturas Figma", "talleres:embed")}
        <div class="ma-scroll ma-carousel">
          <p class="ma-caption">${esc(s.title)} · ${index + 1}/${screens.length}</p>
          <img src="assets/${esc(s.file)}" alt="${esc(s.title)}" class="ma-screenshot" />
          <p class="ma-small ma-muted">Usá las flechas debajo del celular o ← → en el teclado.</p>
          <button type="button" class="ma-btn ma-btn-secondary ma-btn-block" data-action="talleres:embed">
            Volver al prototipo interactivo
          </button>
        </div>`;
    },

    saludList(filters) {
      const f = filters || { zona: "", especialidad: "", q: "", dia: "", franja: "" };
      const data = M();
      const espDe = (salitaId) =>
        data.profesionales.filter((p) => p.salitaId === salitaId).map((p) => p.especialidad);
      const especialidades = [...new Set(data.profesionales.map((p) => p.especialidad))].sort((a, b) =>
        a.localeCompare(b, "es")
      );
      const q = (f.q || "").trim().toLowerCase();
      const cupos = (s) =>
        turnosDeSalita(s.id, f.especialidad)
          .filter((t) => enFranja(t.hora, f.franja))
          .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));
      const filtered = data.salitas.filter((s) => {
        if (f.zona && s.zona !== f.zona) return false;
        if (f.especialidad && !espDe(s.id).includes(f.especialidad)) return false;
        if (q) {
          const blob = `${s.nombre} ${s.centro} ${s.direccion} ${s.zona}`.toLowerCase();
          if (!blob.includes(q)) return false;
        }
        if (f.franja && cupos(s).length === 0) return false;
        return true;
      });
      const zonaOpts = data.zonas
        .map((z) => `<option value="${esc(z)}"${f.zona === z ? " selected" : ""}>${esc(z)}</option>`)
        .join("");
      const espOpts = especialidades
        .map(
          (e) => `<option value="${esc(e)}"${f.especialidad === e ? " selected" : ""}>${esc(e)}</option>`
        )
        .join("");
      const cards = filtered
        .map((s) => {
          const tags = [...new Set(espDe(s.id))]
            .map((e) => `<span class="ma-tag">${esc(e)}</span>`)
            .join("");
          return `<button type="button" class="ma-card ma-card-btn" data-action="salud:salita" data-id="${esc(s.id)}">
          <div class="ma-card-top">
            <strong>${esc(s.nombre)}</strong>
            <span class="ma-pill">${esc(s.distanciaKm)} km</span>
          </div>
          <p class="ma-muted">${esc(s.centro)} · ${esc(s.zona)}</p>
          <p class="ma-small">${esc(s.direccion)} · ${esc(s.horario)}</p>
          <p class="ma-next">${
            cupos(s)[0]
              ? `Próximo turno: ${esc(fmtDia(cupos(s)[0].fecha).corto)} · ${esc(cupos(s)[0].hora)} hs`
              : "Sin turnos libres con estos filtros"
          }</p>
          <div class="ma-tags">${tags}</div>
        </button>`;
        })
        .join("");
      const empty = filtered.length
        ? ""
        : `<p class="ma-empty">Ninguna salita coincide con esos filtros.</p>`;
      return `${statusBar()}
        ${appHeader("Salud municipal")}
        <div class="ma-scroll">
          <p class="ma-lead">Filtrá por horario, zona o especialidad. La fecha se elige al reservar el turno.</p>
          <div class="ma-filters">
            <p class="ma-label">Horario</p>
            ${franjaChips(f.franja || "", "salud:franja")}
            <label class="ma-label">Zona
              <select id="filtro-zona" class="ma-input">
                <option value="">Todas las zonas</option>
                ${zonaOpts}
              </select>
            </label>
            <label class="ma-label">Especialidad
              <select id="filtro-esp" class="ma-input">
                <option value="">Todas las especialidades</option>
                ${espOpts}
              </select>
            </label>
            <label class="ma-label">Ubicación
              <input id="filtro-q" class="ma-input" type="search" placeholder="Dirección, centro o barrio" value="${esc(f.q || "")}" />
            </label>
          </div>
          <div id="salud-map" class="ma-map" data-ids="${esc(filtered.map((s) => s.id).join(","))}" role="region" aria-label="Mapa de salitas en Malvinas Argentinas"></div>
          <p class="ma-map-credit">Mapa del partido · © OpenStreetMap</p>
          <h3 class="ma-section">${filtered.length} salita${filtered.length === 1 ? "" : "s"}</h3>
          ${cards}
          ${empty}
          ${demoFooter()}
        </div>`;
    },

    saludSalita(salitaId) {
      const salita = M().salitas.find((s) => s.id === salitaId);
      if (!salita) return Screens.saludList();
      const pros = M().profesionales.filter((p) => p.salitaId === salitaId);
      const list = pros
        .map(
          (p) => `<button type="button" class="ma-card ma-card-btn" data-action="salud:turnos" data-id="${esc(p.id)}">
          <strong>${esc(p.nombre)}</strong>
          <p class="ma-muted">${esc(p.especialidad)}</p>
          <p class="ma-small">Mat. ${esc(p.matricula)}</p>
        </button>`
        )
        .join("");
      return `${statusBar()}
        ${appHeader(salita.nombre, "salud:list")}
        <div class="ma-scroll">
          <div class="ma-info-box">
            <p><strong>${esc(salita.centro)}</strong></p>
            <p class="ma-small">${esc(salita.direccion)} · ${esc(salita.zona || "")}</p>
            <p class="ma-small">${esc(salita.horario)}</p>
          </div>
          <h3 class="ma-section">Profesionales en esta salita</h3>
          ${list || "<p class=\"ma-muted\">Sin profesionales cargados.</p>"}
        </div>`;
    },

    saludTurnos(profId, selectedTurnoId, slot) {
      const pro = M().profesionales.find((p) => p.id === profId);
      if (!pro) return Screens.saludList();
      const salita = M().salitas.find((s) => s.id === pro.salitaId);
      const view = slot || { dia: "", franja: "" };
      const turnos = M().turnos.filter((t) => t.profesionalId === profId);
      const fechas = [...new Set(turnos.map((t) => t.fecha))].sort();
      const hayFecha = Boolean(view.dia);
      const visibles = hayFecha
        ? turnos.filter((t) => t.fecha === view.dia && enFranja(t.hora, view.franja))
        : [];
      const elegido = visibles.some((t) => t.id === selectedTurnoId && t.disponible);
      const slots = visibles
        .map((t) => {
          const sel = t.id === selectedTurnoId ? " ma-slot-selected" : "";
          const dis = !t.disponible ? " disabled" : "";
          return `<button type="button" class="ma-slot${sel}" data-action="salud:selectTurno" data-id="${esc(t.id)}"${dis}>
            <strong>${esc(t.hora)}</strong>
          </button>`;
        })
        .join("");
      const vacio = !hayFecha
        ? `<p class="ma-empty">Elegí una fecha para ver los horarios.</p>`
        : visibles.length
          ? ""
          : `<p class="ma-empty">No hay turnos en esa fecha y horario.</p>`;
      const diasConTurno = fechas.map((iso) => fmtDia(iso).corto).join(" · ");
      return `${statusBar()}
        ${appHeader("Elegir turno", `salud:salita:${esc(pro.salitaId)}`)}
        <div class="ma-scroll">
          <div class="ma-info-box">
            <p><strong>${esc(pro.nombre)}</strong></p>
            <p class="ma-muted">${esc(pro.especialidad)} · ${esc(salita?.nombre || "")}</p>
          </div>
          <label class="ma-label" for="turno-fecha">Fecha
            <input id="turno-fecha" class="ma-input" type="date" value="${esc(view.dia || "")}" min="${esc(fechas[0] || "")}" max="${esc(fechas[fechas.length - 1] || "")}" />
          </label>
          <p class="ma-small">Con turno: ${esc(diasConTurno || "sin fechas")}</p>
          <p class="ma-label">Horario</p>
          ${franjaChips(view.franja || "", "salud:slotFranja")}
          <h3 class="ma-section">Horarios</h3>
          <div class="ma-slots">${slots}</div>
          ${vacio}
          <button type="button" class="ma-btn ma-btn-primary ma-btn-block" data-action="salud:confirm" ${elegido ? "" : "disabled"}>
            Continuar
          </button>
        </div>`;
    },

    saludConfirm(pending) {
      if (!pending) return Screens.saludList();
      return `${statusBar()}
        ${appHeader("Confirmar reserva", "salud:turnosBack")}
        <div class="ma-scroll">
          <div class="ma-info-box ma-info-highlight">
            <p><strong>${esc(pending.salitaNombre)}</strong></p>
            <p class="ma-muted">${esc(pending.centro)}</p>
            <hr class="ma-hr" />
            <p>${esc(pending.profesional)}</p>
            <p class="ma-muted">${esc(pending.especialidad)}</p>
            <p class="ma-big">${esc(fmtDia(pending.fecha).corto)} · ${esc(pending.hora)} hs</p>
          </div>
          <p class="ma-small ma-muted">Al confirmar, la reserva quedará visible en tu perfil (solo en esta sesión de demo).</p>
          <button type="button" class="ma-btn ma-btn-primary ma-btn-block" data-action="salud:submit">
            Confirmar reserva
          </button>
        </div>`;
    },

    saludSuccess() {
      return `${statusBar()}
        ${appHeader("Reserva confirmada")}
        <div class="ma-scroll ma-center-block">
          <div class="ma-success-icon" aria-hidden="true">✓</div>
          <h3>¡Turno reservado!</h3>
          <p class="ma-muted">Podés verlo en Perfil → Mis reservas de salud.</p>
          <button type="button" class="ma-btn ma-btn-primary ma-btn-block" data-action="perfil:reservas">
            Ir a mis reservas
          </button>
          <button type="button" class="ma-btn ma-btn-ghost ma-btn-block" data-action="salud:list">
            Volver a Salud
          </button>
        </div>`;
    },

    perfilMenu() {
      const u = M().user;
      return `${statusBar()}
        ${appHeader("Mi perfil")}
        <div class="ma-scroll">
          <div class="ma-profile-head">
            <div class="ma-avatar" aria-hidden="true">${esc(u.nombre.charAt(0))}</div>
            <div>
              <strong>${esc(u.nombre)}</strong>
              <p class="ma-muted">DNI ${esc(u.dni)}</p>
            </div>
          </div>
          <nav class="ma-menu">
            <button type="button" data-action="perfil:datos">Datos personales</button>
            <button type="button" data-action="perfil:historial">Historial clínico</button>
            <button type="button" data-action="perfil:vacunas">Vacunación</button>
            <button type="button" data-action="perfil:reservas">Mis reservas de salud</button>
          </nav>
          ${demoFooter()}
        </div>`;
    },

    perfilDatos() {
      const u = M().user;
      return `${statusBar()}
        ${appHeader("Datos personales", "perfil:menu")}
        <div class="ma-scroll">
          <dl class="ma-dl">
            <dt>Nombre</dt><dd>${esc(u.nombre)}</dd>
            <dt>DNI</dt><dd>${esc(u.dni)}</dd>
            <dt>Email</dt><dd>${esc(u.email)}</dd>
            <dt>Teléfono</dt><dd>${esc(u.telefono)}</dd>
          </dl>
        </div>`;
    },

    perfilHistorial() {
      const items = M()
        .historialClinico.map(
          (h) => `<article class="ma-timeline-item">
          <time>${esc(h.fecha)}</time>
          <strong>${esc(h.tipo)}</strong>
          <p class="ma-muted">${esc(h.profesional)}</p>
          <p>${esc(h.resumen)}</p>
        </article>`
        )
        .join("");
      return `${statusBar()}
        ${appHeader("Historial clínico", "perfil:menu")}
        <div class="ma-scroll">
          <p class="ma-lead">Registro de atenciones en el sistema municipal (mock).</p>
          <div class="ma-timeline">${items}</div>
        </div>`;
    },

    perfilVacunas(extraVacunas) {
      const all = [...M().vacunas, ...extraVacunas];
      const items = all
        .map(
          (v) => `<article class="ma-card">
          <strong>${esc(v.nombre)}</strong>
          <p class="ma-muted">${esc(v.dosis)}</p>
          <p class="ma-small">Aplicada: ${esc(v.fechaAplicada)}${v.proximaDosis ? ` · Próxima: ${esc(v.proximaDosis)}` : ""}</p>
          <p class="ma-small">${esc(v.centro)}</p>
        </article>`
        )
        .join("");
      return `${statusBar()}
        ${appHeader("Vacunación", "perfil:menu")}
        <div class="ma-scroll">
          <button type="button" class="ma-btn ma-btn-primary ma-btn-block" data-action="vacuna:openModal">
            Registrar vacuna
          </button>
          <h3 class="ma-section">Esquema registrado</h3>
          ${items}
        </div>`;
    },

    perfilReservas(sessionReservas) {
      const all = [...M().reservasSalud, ...sessionReservas];
      const items = all
        .map(
          (r) => `<article class="ma-card">
          <div class="ma-card-top">
            <strong>${esc(r.salitaNombre)}</strong>
            <span class="ma-pill ma-pill-navy">${esc(r.estado)}</span>
          </div>
          <p class="ma-muted">${esc(r.centro)}</p>
          <p>${esc(r.profesional)} · ${esc(r.especialidad)}</p>
          <p class="ma-big">${esc(r.fecha)} · ${esc(r.hora)} hs</p>
        </article>`
        )
        .join("");
      return `${statusBar()}
        ${appHeader("Mis reservas", "perfil:menu")}
        <div class="ma-scroll">
          ${items || "<p class=\"ma-muted\">No hay reservas.</p>"}
        </div>`;
    },

    vacunaModal(open) {
      if (!open) return "";
      const opts = M()
        .vacunasDisponibles.map((v) => `<option value="${esc(v)}">${esc(v)}</option>`)
        .join("");
      return `<div class="ma-modal-backdrop" data-action="vacuna:closeModal">
        <div class="ma-modal" role="dialog" aria-labelledby="vac-modal-title" aria-modal="true" data-stop-prop="">
          <h3 id="vac-modal-title">Registrar vacuna</h3>
          <label class="ma-label">Vacuna
            <select id="vacuna-select" class="ma-input">${opts}</select>
          </label>
          <label class="ma-label">Dosis
            <input type="text" id="vacuna-dosis" class="ma-input" value="1ª dosis" />
          </label>
          <label class="ma-label">Fecha aplicada
            <input type="date" id="vacuna-fecha" class="ma-input" value="2026-10-22" />
          </label>
          <label class="ma-label">Centro
            <input type="text" id="vacuna-centro" class="ma-input" value="CAPS Barrio Uno" />
          </label>
          <div class="ma-row ma-row-gap">
            <button type="button" class="ma-btn ma-btn-ghost" data-action="vacuna:closeModal">Cancelar</button>
            <button type="button" class="ma-btn ma-btn-primary" data-action="vacuna:submit">Guardar</button>
          </div>
        </div>
      </div>`;
    },

    toast(message) {
      if (!message) return "";
      return `<div class="ma-toast" role="status">${esc(message)}</div>`;
    },
  };
})();
