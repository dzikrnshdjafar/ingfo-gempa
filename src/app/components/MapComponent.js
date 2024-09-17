'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Custom icon for map markers
const customIcon = new L.Icon({
  iconUrl: 'https://media3.giphy.com/media/ResO0sxZ3U7kMyC1B8/giphy.webp?cid=ecf05e47zkbwc3c3gd2cssf99vfgi6iw971ep431as0xpxtn&ep=v1_gifs_related&rid=giphy.webp&ct=s',
  iconSize: [40, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function MapComponent({ gempaData }) {
  // Extract valid coordinates and calculate center
  const validCoordinates = gempaData
    .map(gempa => {
      const [lat, lon] = gempa.Coordinates.split(',').map(Number);
      return (!isNaN(lat) && !isNaN(lon)) ? { lat, lon } : null;
    })
    .filter(coord => coord !== null);

  if (validCoordinates.length === 0) {
    return <p>No valid coordinates available.</p>;
  }

  const center = validCoordinates.reduce(
    (acc, { lat, lon }) => {
      acc.lat += lat;
      acc.lon += lon;
      return acc;
    },
    { lat: 0, lon: 0, count: validCoordinates.length }
  );

  const averageLat = center.lat / center.count;
  const averageLon = center.lon / center.count;

  return (
    <MapContainer
      center={[averageLat, averageLon]}
      zoom={5}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {validCoordinates.map((coord, index) => (
        <Marker key={index} position={[coord.lat, coord.lon]} icon={customIcon}>
          <Popup>
            <div>
              {gempaData[index] && (
                <>
                  <p><strong>Magnitude:</strong> {gempaData[index].Magnitude}</p>
                  <p><strong>Kedalaman:</strong> {gempaData[index].Kedalaman}</p>
                  <p><strong>Wilayah:</strong> {gempaData[index].Wilayah}</p>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
