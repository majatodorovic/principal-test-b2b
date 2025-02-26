import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

type Location = {
  position: [number, number];
  text: string;
};

const customIcon = L.icon({
  iconUrl: '/images/location-pin.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

export default function Map({ data }: any) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will ensure the map is only rendered on the client
  }, []);

  if (!isClient) return null; // Return null or a loading spinner until the client-side rendering is done

  return (
    <MapContainer
      center={[44.52727658035047, 20.57307492964115]}
      zoom={8}
      style={{
        width: '100%',
        borderRadius: '32px',
      }}
      className="h-[600px] xl:h-[1000px]"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.locations.map((location: Location, index: number) => (
        <Marker key={index} position={location.position} icon={customIcon}>
          <Popup>{location.text}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
