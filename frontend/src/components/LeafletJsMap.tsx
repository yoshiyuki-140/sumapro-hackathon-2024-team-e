'use client';
// leaflet.jsでのマップコンポーネント
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

type MapStyle = {
  height: string,
  width: string
};

// マップコンポーネントを定義
const LeafletMap = () => {

  // 緯度経度
  const center: LatLngExpression = [36.528866439173704, 136.62839452480387];

  // マップスタイル
  const mapStyle: MapStyle = {
    height: "100vh", width: "100%"
  };

  return (
    <MapContainer
      center={center}
      zoom={13}
      scrollWheelZoom={false}
      style={mapStyle}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={center}
      >
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default LeafletMap;