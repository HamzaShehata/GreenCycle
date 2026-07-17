import { useEffect, useRef } from 'react';
import L from 'leaflet';

export default function RouteMap({ stops }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return;

    const map = L.map(mapContainerRef.current).setView(
      [stops[0]?.lat || 27.2579, stops[0]?.lng || 33.8116],
      13
    );
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    stops.forEach((stop, i) => {
      const numberIcon = L.divIcon({
        className: '',
        html: `<div style="
          background:${stop.color || '#22c55e'};
          color:#fff;
          width:28px;height:28px;
          border-radius:50%;
          display:flex;align-items:center;justify-content:center;
          font-weight:700;font-size:13px;
          border:2px solid #fff;
          box-shadow:0 2px 6px rgba(0,0,0,.25);
        ">${i + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });

      L.marker([stop.lat, stop.lng], { icon: numberIcon })
        .addTo(map)
        .bindPopup(`<strong>${stop.label}</strong><br/>${stop.sub || ''}`);
    });

    if (stops.length > 1) {
      const latLngs = stops.map((s) => [s.lat, s.lng]);
      L.polyline(latLngs, { color: '#22c55e', weight: 3, dashArray: '6 6' }).addTo(map);
      map.fitBounds(latLngs, { padding: [30, 30] });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: '360px',
        borderRadius: 'var(--r-lg)',
        border: '1px solid var(--n200)',
        overflow: 'hidden',
      }}
    />
  );
}