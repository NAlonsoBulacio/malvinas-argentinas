/** Router demo — Talleres · Salud · Perfil */
(function () {
  const state = {
    tab: "talleres",
    talleres: { mode: "embed", carouselIndex: 0 },
    salud: {
      screen: "list",
      salitaId: null,
      profId: null,
      turnoId: null,
      filters: { zona: "", especialidad: "", q: "" },
    },
    perfil: { screen: "menu" },
    pendingBooking: null,
    sessionReservations: [],
    sessionVacunas: [],
    vacunaModalOpen: false,
    toast: null,
  };

  const tabState = { talleres: null, salud: null, perfil: null };

  const root = document.getElementById("app-root");
  const list = document.getElementById("screen-list");
  const extNav = document.getElementById("phone-external-nav");
  const extPrev = document.getElementById("ext-prev");
  const extNext = document.getElementById("ext-next");
  const extLabel = document.getElementById("ext-label");
  const phoneHelp = document.getElementById("phone-help");
  let saludMap = null;
  let qTimer = null;

  function blankFilters() {
    return { zona: "", especialidad: "", q: "", dia: "", franja: "" };
  }

  function sidebarItems() {
    const items = [
      { id: "talleres:embed", label: "Figma — Prototipo interactivo" },
      { id: "talleres:carousel", label: "Figma — Modo capturas PNG" },
    ];
    window.MOCK.talleresScreens.forEach((s, i) => {
      items.push({ id: `talleres:screen:${i}`, label: `PNG · ${s.title}` });
    });
    items.push(
      { id: "salud:list", label: "Salud — Salitas" },
      { id: "perfil:menu", label: "Perfil — Inicio" },
      { id: "perfil:historial", label: "Perfil — Historial clínico" },
      { id: "perfil:vacunas", label: "Perfil — Vacunación" },
      { id: "perfil:reservas", label: "Perfil — Reservas salud" }
    );
    return items;
  }

  function saveTabSnapshot() {
    tabState[state.tab] = {
      talleres: { ...state.talleres },
      salud: { ...state.salud, filters: { ...(state.salud.filters || blankFilters()) } },
      perfil: { ...state.perfil },
    };
  }

  function restoreTabSnapshot(tab) {
    const snap = tabState[tab];
    if (snap) {
      state.talleres = { ...snap.talleres };
      state.salud = {
        ...snap.salud,
        filters: { ...(snap.salud.filters || blankFilters()) },
      };
      state.perfil = { ...snap.perfil };
    } else if (tab === "talleres") {
      state.talleres = { mode: "embed", carouselIndex: 0 };
    } else if (tab === "salud") {
      state.salud = {
        screen: "list",
        salitaId: null,
        profId: null,
        turnoId: null,
        filters: blankFilters(),
      };
    } else if (tab === "perfil") {
      state.perfil = { screen: "menu" };
    }
  }

  function setTab(tab) {
    if (tab === state.tab) return;
    saveTabSnapshot();
    state.tab = tab;
    restoreTabSnapshot(tab);
    render();
  }

  function currentRouteId() {
    if (state.tab === "talleres") {
      if (state.talleres.mode === "embed") return "talleres:embed";
      if (state.talleres.mode === "carousel") {
        return `talleres:screen:${state.talleres.carouselIndex}`;
      }
    }
    if (state.tab === "salud") return "salud:list";
    if (state.tab === "perfil") {
      const map = {
        menu: "perfil:menu",
        datos: "perfil:menu",
        historial: "perfil:historial",
        vacunas: "perfil:vacunas",
        reservas: "perfil:reservas",
      };
      return map[state.perfil.screen] || "perfil:menu";
    }
    return "talleres:embed";
  }

  function renderPhoneContent() {
    const S = window.Screens;
    let inner = "";

    if (state.tab === "talleres") {
      inner =
        state.talleres.mode === "carousel"
          ? S.talleresCarousel(state.talleres.carouselIndex)
          : S.talleresFigmaEmbed();
    } else if (state.tab === "salud") {
      switch (state.salud.screen) {
        case "salita":
          inner = S.saludSalita(state.salud.salitaId);
          break;
        case "turnos":
          inner = S.saludTurnos(state.salud.profId, state.salud.turnoId, state.salud.slot);
          break;
        case "confirm":
          inner = S.saludConfirm(state.pendingBooking);
          break;
        case "success":
          inner = S.saludSuccess();
          break;
        default:
          inner = S.saludList(state.salud.filters);
      }
    } else if (state.tab === "perfil") {
      switch (state.perfil.screen) {
        case "datos":
          inner = S.perfilDatos();
          break;
        case "historial":
          inner = S.perfilHistorial();
          break;
        case "vacunas":
          inner = S.perfilVacunas(state.sessionVacunas);
          break;
        case "reservas":
          inner = S.perfilReservas(state.sessionReservations);
          break;
        default:
          inner = S.perfilMenu();
      }
    }

    const tabs = `<nav class="ma-tabs" aria-label="Secciones">
      <button type="button" class="ma-tab" data-tab="talleres" ${state.tab === "talleres" ? 'aria-current="page"' : ""}>Talleres</button>
      <button type="button" class="ma-tab" data-tab="salud" ${state.tab === "salud" ? 'aria-current="page"' : ""}>Salud</button>
      <button type="button" class="ma-tab" data-tab="perfil" ${state.tab === "perfil" ? 'aria-current="page"' : ""}>Perfil</button>
    </nav>`;

    return `<div class="ma-app">${inner}${tabs}${S.vacunaModal(state.vacunaModalOpen)}${S.toast(state.toast)}</div>`;
  }

  function updateExternalChrome() {
    const onCarousel =
      state.tab === "talleres" && state.talleres.mode === "carousel";
    extNav.hidden = !onCarousel;
    if (onCarousel) {
      const screens = window.MOCK.talleresScreens;
      const i = state.talleres.carouselIndex;
      extLabel.textContent = `${screens[i].title} (${i + 1}/${screens.length})`;
      extPrev.disabled = i === 0;
      extNext.disabled = i === screens.length - 1;
    }
    if (state.tab === "talleres" && state.talleres.mode === "embed") {
      phoneHelp.textContent =
        "Talleres: interactuá dentro del marco del celular. Salud/Perfil: usá los tabs en la parte inferior del mockup.";
    } else if (onCarousel) {
      phoneHelp.textContent = "Modo capturas: flechas debajo del celular o teclado ← →.";
    } else {
      phoneHelp.textContent =
        "Salud: filtrá por mañana o tarde, zona y especialidad. La fecha se elige al reservar.";
    }
  }

  function updateSidebar() {
    const route = currentRouteId();
    list.querySelectorAll("button").forEach((btn) => {
      btn.setAttribute("aria-current", btn.dataset.route === route ? "true" : "false");
    });
  }

  function mountSaludMap() {
    const el = document.getElementById("salud-map");
    if (!el || !window.L) return;
    const ids = (el.dataset.ids || "").split(",").filter(Boolean);
    const points = window.MOCK.salitas.filter((s) => ids.includes(s.id));
    const center = window.MOCK.mapCenter;
    const map = window.L.map(el, { zoomControl: true, attributionControl: true }).setView(
      [center.lat, center.lng],
      center.zoom
    );
    window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    const bounds = [];
    points.forEach((s) => {
      const marker = window.L.circleMarker([s.lat, s.lng], {
        radius: 9,
        color: "#1d3567",
        weight: 2,
        fillColor: "#c5e84d",
        fillOpacity: 1,
      }).addTo(map);
      marker.bindTooltip(`${s.nombre} · ${s.zona}`, { direction: "top", opacity: 0.95 });
      marker.on("click", () => handleAction("salud:salita", { dataset: { id: s.id } }));
      bounds.push([s.lat, s.lng]);
    });
    if (bounds.length === 1) map.setView(bounds[0], 14);
    else if (bounds.length > 1) map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });
    saludMap = map;
    setTimeout(() => map.invalidateSize(), 60);
  }

  function render() {
    if (saludMap) {
      saludMap.remove();
      saludMap = null;
    }
    root.innerHTML = renderPhoneContent();
    updateSidebar();
    updateExternalChrome();
    mountSaludMap();
    if (state._restoreFocus) {
      const el = document.getElementById(state._restoreFocus);
      state._restoreFocus = null;
      if (el) {
        el.focus();
        if (typeof el.setSelectionRange === "function") {
          const n = el.value.length;
          el.setSelectionRange(n, n);
        }
      }
    }
    if (state.toast) {
      setTimeout(() => {
        state.toast = null;
        render();
      }, 2600);
    }
  }

  function goCarousel(index) {
    const max = window.MOCK.talleresScreens.length - 1;
    state.tab = "talleres";
    state.talleres.mode = "carousel";
    state.talleres.carouselIndex = Math.max(0, Math.min(max, index));
    render();
  }

  function navigateSidebar(routeId) {
    if (routeId === "talleres:embed") {
      state.tab = "talleres";
      state.talleres = { mode: "embed", carouselIndex: 0 };
    } else if (routeId === "talleres:carousel") {
      goCarousel(0);
      return;
    } else if (routeId.startsWith("talleres:screen:")) {
      goCarousel(parseInt(routeId.split(":")[2], 10));
      return;
    } else if (routeId === "salud:list") {
      state.tab = "salud";
      state.salud = {
        screen: "list",
        salitaId: null,
        profId: null,
        turnoId: null,
        filters: blankFilters(),
      };
      state.pendingBooking = null;
    } else if (routeId.startsWith("perfil:")) {
      state.tab = "perfil";
      const screen = routeId.replace("perfil:", "");
      state.perfil.screen = screen === "menu" ? "menu" : screen;
    }
    render();
  }

  function handleAction(action, el) {
    const M = window.MOCK;

    if (action.startsWith("salud:salita:")) {
      state.tab = "salud";
      state.salud.screen = "salita";
      state.salud.salitaId = action.split(":")[2];
      render();
      return;
    }

    switch (action) {
      case "talleres:embed":
        state.tab = "talleres";
        state.talleres.mode = "embed";
        render();
        break;
      case "talleres:carousel":
        goCarousel(state.talleres.carouselIndex || 0);
        break;
      case "talleres:prev":
        goCarousel(state.talleres.carouselIndex - 1);
        break;
      case "talleres:next":
        goCarousel(state.talleres.carouselIndex + 1);
        break;
      case "salud:list":
        state.tab = "salud";
        state.salud.screen = "list";
        state.salud.salitaId = null;
        state.salud.profId = null;
        state.salud.turnoId = null;
        state.pendingBooking = null;
        render();
        break;
      case "salud:salita":
        state.tab = "salud";
        state.salud.screen = "salita";
        state.salud.salitaId = el.dataset.id;
        render();
        break;
      case "salud:turnos":
        state.tab = "salud";
        state.salud.screen = "turnos";
        state.salud.profId = el.dataset.id;
        state.salud.turnoId = null;
        state.salud.slot = {
          dia: "",
          franja: state.salud.filters?.franja || "",
        };
        render();
        break;
      case "salud:dia":
        state.salud.filters.dia = el.dataset.id || "";
        render();
        break;
      case "salud:franja":
        state.salud.filters.franja = el.dataset.id || "";
        render();
        break;
      case "salud:slotDia":
        state.salud.slot = state.salud.slot || { dia: "", franja: "" };
        state.salud.slot.dia = el.dataset.id || "";
        state.salud.turnoId = null;
        render();
        break;
      case "salud:slotFranja":
        state.salud.slot = state.salud.slot || { dia: "", franja: "" };
        state.salud.slot.franja = el.dataset.id || "";
        state.salud.turnoId = null;
        render();
        break;
      case "salud:selectTurno":
        if (el.disabled) return;
        state.salud.turnoId = el.dataset.id;
        render();
        break;
      case "salud:confirm": {
        const turno = M.turnos.find((t) => t.id === state.salud.turnoId);
        const pro = M.profesionales.find((p) => p.id === state.salud.profId);
        const salita = M.salitas.find((s) => s.id === pro?.salitaId);
        if (!turno || !pro || !salita) return;
        state.pendingBooking = {
          salitaNombre: salita.nombre,
          centro: salita.centro,
          profesional: pro.nombre,
          especialidad: pro.especialidad,
          fecha: turno.fecha,
          hora: turno.hora,
          turnoId: turno.id,
        };
        state.salud.screen = "confirm";
        render();
        break;
      }
      case "salud:turnosBack":
        state.salud.screen = "turnos";
        render();
        break;
      case "salud:submit": {
        if (!state.pendingBooking) return;
        state.sessionReservations.push({
          id: "res-" + Date.now(),
          salitaNombre: state.pendingBooking.salitaNombre,
          centro: state.pendingBooking.centro,
          profesional: state.pendingBooking.profesional,
          especialidad: state.pendingBooking.especialidad,
          fecha: state.pendingBooking.fecha,
          hora: state.pendingBooking.hora,
          estado: "Confirmada",
        });
        const tid = state.pendingBooking.turnoId;
        const slot = M.turnos.find((t) => t.id === tid);
        if (slot) slot.disponible = false;
        state.pendingBooking = null;
        state.salud.screen = "success";
        render();
        break;
      }
      case "perfil:menu":
        state.tab = "perfil";
        state.perfil.screen = "menu";
        render();
        break;
      case "perfil:datos":
        state.perfil.screen = "datos";
        render();
        break;
      case "perfil:historial":
        state.perfil.screen = "historial";
        render();
        break;
      case "perfil:vacunas":
        state.perfil.screen = "vacunas";
        render();
        break;
      case "perfil:reservas":
        state.tab = "perfil";
        state.perfil.screen = "reservas";
        render();
        break;
      case "vacuna:openModal":
        state.vacunaModalOpen = true;
        render();
        break;
      case "vacuna:closeModal":
        state.vacunaModalOpen = false;
        render();
        break;
      case "vacuna:submit": {
        const nombre = document.getElementById("vacuna-select")?.value || "Vacuna";
        const dosis = document.getElementById("vacuna-dosis")?.value || "—";
        const fechaAplicada = document.getElementById("vacuna-fecha")?.value || "2026-10-22";
        const centro = document.getElementById("vacuna-centro")?.value || "CAPS";
        state.sessionVacunas.push({
          id: "vac-s-" + Date.now(),
          nombre,
          dosis,
          fechaAplicada,
          proximaDosis: null,
          centro,
        });
        state.vacunaModalOpen = false;
        state.toast = "Vacuna registrada (demo)";
        state.perfil.screen = "vacunas";
        render();
        break;
      }
      default:
        break;
    }
  }

  function buildSidebar() {
    sidebarItems().forEach((item) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.dataset.route = item.id;
      btn.textContent = item.label;
      btn.addEventListener("click", () => navigateSidebar(item.id));
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function readFilters() {
    const prev = state.salud.filters || blankFilters();
    state.salud.filters = {
      zona: document.getElementById("filtro-zona")?.value || "",
      especialidad: document.getElementById("filtro-esp")?.value || "",
      q: document.getElementById("filtro-q")?.value || "",
      dia: prev.dia || "",
      franja: prev.franja || "",
    };
  }

  root.addEventListener("change", (e) => {
    if (e.target.id === "turno-fecha") {
      state.salud.slot = state.salud.slot || { dia: "", franja: "" };
      state.salud.slot.dia = e.target.value || "";
      state.salud.turnoId = null;
      render();
      return;
    }
    if (e.target.id === "filtro-zona" || e.target.id === "filtro-esp") {
      readFilters();
      render();
    }
  });

  root.addEventListener("input", (e) => {
    if (e.target.id !== "filtro-q") return;
    clearTimeout(qTimer);
    qTimer = setTimeout(() => {
      readFilters();
      state._restoreFocus = "filtro-q";
      render();
    }, 280);
  });

  root.addEventListener("click", (e) => {
    const modalBg = e.target.closest(".ma-modal-backdrop");
    if (modalBg && e.target === modalBg) {
      handleAction("vacuna:closeModal");
      return;
    }

    const tabBtn = e.target.closest("[data-tab]");
    if (tabBtn) {
      setTab(tabBtn.dataset.tab);
      return;
    }

    const actionEl = e.target.closest("[data-action]");
    if (actionEl) {
      handleAction(actionEl.dataset.action, actionEl);
    }
  });

  extPrev.addEventListener("click", () => handleAction("talleres:prev"));
  extNext.addEventListener("click", () => handleAction("talleres:next"));

  document.addEventListener("keydown", (e) => {
    if (state.tab !== "talleres" || state.talleres.mode !== "carousel") return;
    if (e.key === "ArrowLeft") handleAction("talleres:prev");
    if (e.key === "ArrowRight") handleAction("talleres:next");
  });

  buildSidebar();
  render();
})();
