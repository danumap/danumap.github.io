import React, { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [mapUrl, setMapUrl] = useState("ancien"); // Default map

  const mapCenter = [-512, 512]; // dont mess with this, u will be big mad


  const switchMap = (map) => {
    setMapUrl(map);
  };
  return (
    <>
    {/* Overlay for buttons */}
    <div className="map-overlay">
      <h3>Select Province</h3>
      <button onClick={() => switchMap("ancien")}>ancien</button>
      <button onClick={() => switchMap("innisgallia")}>innisgallia</button>
      <button onClick={() => switchMap("kerys")}>kerys</button>
      <button onClick={() => switchMap("merrie")}>merrie</button>
    </div>

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
        url={`/${mapUrl}/{z}/{x}/{y}.png`}
        tileSize={512} 
        noWrap={true} 
        key={mapUrl}
      />
    </MapContainer>
    </>
  );
};

export default MapComponent;
