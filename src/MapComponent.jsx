import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {

  const mapCenter = [0, 0]; 

  return (
    <MapContainer
      center={mapCenter}
      zoom={0} 
      minZoom={0}
      maxZoom={3} 
      style={{ height: "100vh", width: "100vw" }} 
      crs={L.CRS.Simple} // Use Simple CRS for non-geographical maps
      worldCopyJump={false} 
    >
      <TileLayer
        url="/ancien/{z}/{x}/{y}.png" 
        tileSize={512} 
        noWrap={true} 
      />
    </MapContainer>
  );
};

export default MapComponent;
