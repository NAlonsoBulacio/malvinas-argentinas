"use client";

import { useEffect, useRef } from "react";
import { mapCenter } from "@/lib/data";

export default function SaludMap({ points, onSelect }) {
  const ref = useRef(null);
  const onSelectRef = useRef(onSelect);
  const seq = useRef(0);
  onSelectRef.current = onSelect;
  const pointsKey = points.map((p) => p.id).join(",");

  useEffect(() => {
    const token = ++seq.current;
    const current = points;
    let map;

    (async () => {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (token !== seq.current || !ref.current) return;

      map = L.map(ref.current, { zoomControl: true }).setView([mapCenter.lat, mapCenter.lng], mapCenter.zoom);
      if (token !== seq.current) {
        map.remove();
        map = null;
        return;
      }

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      const bounds = [];
      current.forEach((p) => {
        const marker = L.circleMarker([p.lat, p.lng], {
          radius: 10,
          color: "#1d3567",
          weight: 2,
          fillColor: "#d4ef6a",
          fillOpacity: 1,
        }).addTo(map);
        marker.bindTooltip(`${p.nombre} · ${p.zona}`, { direction: "top" });
        marker.on("click", () => onSelectRef.current(p.id));
        bounds.push([p.lat, p.lng]);
      });

      if (bounds.length === 1) map.setView(bounds[0], 14);
      else if (bounds.length > 1) map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });
      setTimeout(() => {
        if (token === seq.current) map.invalidateSize();
      }, 80);
    })();

    return () => {
      seq.current += 1;
      if (map) {
        map.remove();
        map = null;
      }
    };
  }, [pointsKey]);

  return (
    <div className="map-panel">
      <div ref={ref} className="map-canvas" />
      <p className="map-note">Partido de Malvinas Argentinas</p>
    </div>
  );
}
