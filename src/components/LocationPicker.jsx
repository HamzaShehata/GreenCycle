import { useEffect, useRef } from 'react';
import L from 'leaflet';

// أيقونة الماركر الافتراضية في Leaflet بتحتاج تعديل بسيط عشان تظهر صح مع Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LocationPicker({ onLocationSelect, initialLat = 27.2579, initialLng = 33.8116 }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) return; // الخريطة اتعملت بالفعل، متتعملش تاني

    const map = L.map(mapContainerRef.current).setView([initialLat, initialLng], 13);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const marker = L.marker([initialLat, initialLng], { draggable: true }).addTo(map);
    markerRef.current = marker;

    const updateLocation = (lat, lng) => {
      if (onLocationSelect) onLocationSelect({ lat, lng });
    };

    marker.on('dragend', () => {
      const pos = marker.getLatLng();
      updateLocation(pos.lat, pos.lng);
    });

    map.on('click', (e) => {
      marker.setLatLng(e.latlng);
      updateLocation(e.latlng.lat, e.latlng.lng);
    });

    // نبعت الموقع الابتدائي أول ما الخريطة تفتح
    updateLocation(initialLat, initialLng);

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: '220px',
        borderRadius: 'var(--r-lg)',
        border: '1px solid var(--g200)',
        overflow: 'hidden',
      }}
    />
  );
}