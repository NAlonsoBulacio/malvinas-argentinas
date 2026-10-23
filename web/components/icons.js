export function Icon({ name, size = 18 }) {
  const p = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  const paths = {
    signal: (
      <svg {...p} fill="currentColor" stroke="none">
        <rect x="2" y="14" width="3" height="6" rx="0.5" />
        <rect x="7.5" y="10" width="3" height="10" rx="0.5" />
        <rect x="13" y="6" width="3" height="14" rx="0.5" />
        <rect x="18.5" y="2" width="3" height="18" rx="0.5" />
      </svg>
    ),
    battery: (
      <svg {...p} viewBox="0 0 28 14" stroke="none" fill="currentColor">
        <rect x="0.8" y="1" width="22" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <rect x="2.6" y="2.8" width="15" height="8.4" rx="1" />
        <rect x="24" y="4.2" width="2.4" height="5.6" rx="0.6" />
      </svg>
    ),
    eye: (
      <svg {...p}>
        <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
    "eye-off": (
      <svg {...p}>
        <path d="M3 4l18 16" />
        <path d="M9.5 6.2A10 10 0 0 1 12 6c6.5 0 10 6 10 6a18 18 0 0 1-3.2 3.6" />
        <path d="M6.2 7.8A18 18 0 0 0 2 12s3.5 6 10 6a10 10 0 0 0 4.2-.9" />
      </svg>
    ),
    id: (
      <svg {...p}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="12" r="2" />
        <path d="M14 11h4M14 14h3" />
      </svg>
    ),
    arrow: (
      <svg {...p}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    ),
    back: (
      <svg {...p}>
        <path d="M15 6l-6 6 6 6" />
      </svg>
    ),
    shield: (
      <svg {...p}>
        <path d="M12 3l7 3v6c0 4.5-3 7-7 9-4-2-7-4.5-7-9V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    bell: (
      <svg {...p}>
        <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16z" />
        <path d="M10 19a2 2 0 0 0 4 0" />
      </svg>
    ),
    search: (
      <svg {...p}>
        <circle cx="11" cy="11" r="6" />
        <path d="M16 16l4 4" />
      </svg>
    ),
    sliders: (
      <svg {...p}>
        <path d="M4 7h16M4 17h16" />
        <circle cx="9" cy="7" r="2" fill="currentColor" />
        <circle cx="15" cy="17" r="2" fill="currentColor" />
      </svg>
    ),
    music: (
      <svg {...p}>
        <path d="M9 18V6l10-2v12" />
        <circle cx="7" cy="18" r="2.2" fill="currentColor" stroke="none" />
        <circle cx="17" cy="16" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    ),
    laptop: (
      <svg {...p}>
        <rect x="4" y="5" width="16" height="11" rx="1.5" />
        <path d="M2 19h20" />
      </svg>
    ),
    palette: (
      <svg {...p}>
        <path d="M12 4a8 8 0 1 0 0 16h1.2a2 2 0 0 0 0-4H12a2 2 0 0 1-2-2 6 6 0 0 1 2-10z" />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="8" r="1" fill="currentColor" />
        <circle cx="16" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
    pin: (
      <svg {...p}>
        <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10z" />
        <circle cx="12" cy="11" r="2" />
      </svg>
    ),
    user: (
      <svg {...p}>
        <circle cx="12" cy="8" r="3" />
        <path d="M5 19c1.5-3 3.8-4.5 7-4.5S17.5 16 19 19" />
      </svg>
    ),
    heart: (
      <svg {...p}>
        <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
      </svg>
    ),
    check: (
      <svg {...p}>
        <path d="M5 12.5l4.2 4.2L19 7" />
      </svg>
    ),
    calendar: (
      <svg {...p}>
        <rect x="4" y="5" width="16" height="15" rx="2" />
        <path d="M8 3v4M16 3v4M4 10h16" />
      </svg>
    ),
    cap: (
      <svg {...p}>
        <path d="M3 10l9-5 9 5-9 5-9-5z" />
        <path d="M7 12.5V16c0 1 2.2 3 5 3s5-2 5-3v-3.5" />
      </svg>
    ),
    card: (
      <svg {...p}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    ),
    pencil: (
      <svg {...p}>
        <path d="M4 20l4.2-1.1L19 8.2 15.8 5 5.1 15.8 4 20z" />
      </svg>
    ),
    chevron: (
      <svg {...p}>
        <path d="M9 6l6 6-6 6" />
      </svg>
    ),
    alert: (
      <svg {...p}>
        <path d="M12 4l9 16H3L12 4z" />
        <path d="M12 10v4M12 17h.01" />
      </svg>
    ),
    info: (
      <svg {...p}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 11v5M12 8h.01" />
      </svg>
    ),
    download: (
      <svg {...p}>
        <path d="M12 4v10M8 10l4 4 4-4M5 19h14" />
      </svg>
    ),
    camera: (
      <svg {...p}>
        <path d="M4 8h3l2-2h6l2 2h3v10H4V8z" />
        <circle cx="12" cy="13" r="3" />
      </svg>
    ),
    grid: (
      <svg {...p}>
        <rect x="4" y="4" width="6" height="6" rx="1" />
        <rect x="14" y="4" width="6" height="6" rx="1" />
        <rect x="4" y="14" width="6" height="6" rx="1" />
        <rect x="14" y="14" width="6" height="6" rx="1" />
      </svg>
    ),
    users: (
      <svg {...p}>
        <circle cx="9" cy="9" r="3" />
        <circle cx="16" cy="10" r="2.2" />
        <path d="M4 18c1-2.5 2.8-3.8 5-3.8s4 1.3 5 3.8" />
        <path d="M14 15.2c1.6.2 3 1.2 4 2.8" />
      </svg>
    ),
    chart: (
      <svg {...p}>
        <path d="M4 19V5M4 19h16" />
        <path d="M8 15l4-4 3 2 5-6" />
      </svg>
    ),
    plus: (
      <svg {...p}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    ),
    x: (
      <svg {...p}>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    ),
    clock: (
      <svg {...p}>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v5l3 2" />
      </svg>
    ),
    mail: (
      <svg {...p}>
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M4 7l8 6 8-6" />
      </svg>
    ),
    phone: (
      <svg {...p}>
        <path d="M8 3h3l1.5 4-2 1.2a12 12 0 0 0 5.3 5.3L17 12l4 1.5V17a2 2 0 0 1-2.2 2A16 16 0 0 1 5 7.2 2 2 0 0 1 7 5z" />
      </svg>
    ),
    lock: (
      <svg {...p}>
        <rect x="5" y="11" width="14" height="9" rx="2" />
        <path d="M8 11V8a4 4 0 0 1 8 0v3" />
      </svg>
    ),
    help: (
      <svg {...p}>
        <circle cx="12" cy="12" r="8" />
        <path d="M9.5 9.5a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.8-1.2 1.6V14" />
        <path d="M12 17h.01" />
      </svg>
    ),
    wallet: (
      <svg {...p}>
        <rect x="3" y="6" width="18" height="13" rx="2" />
        <path d="M3 10h18" />
        <circle cx="16" cy="14" r="1" fill="currentColor" />
      </svg>
    ),
    file: (
      <svg {...p}>
        <path d="M7 3h7l5 5v13H7V3z" />
        <path d="M14 3v5h5" />
      </svg>
    ),
    refresh: (
      <svg {...p}>
        <path d="M20 12a8 8 0 1 1-2.2-5.5" />
        <path d="M20 4v5h-5" />
      </svg>
    ),
    building: (
      <svg {...p}>
        <rect x="4" y="8" width="16" height="12" rx="1" />
        <path d="M8 8V5h8v3M9 12h2M13 12h2M9 16h2M13 16h2" />
      </svg>
    ),
    health: (
      <svg {...p}>
        <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 5.6-7 10-7 10z" />
        <path d="M12 9v6M9 12h6" />
      </svg>
    ),
    qr: (
      <svg {...p}>
        <rect x="4" y="4" width="6" height="6" />
        <rect x="14" y="4" width="6" height="6" />
        <rect x="4" y="14" width="6" height="6" />
        <path d="M14 14h2v2h-2zM18 14h2v6h-2zM14 18h2v2h-2z" />
      </svg>
    ),
  };
  return paths[name] || null;
}
