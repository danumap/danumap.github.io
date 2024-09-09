import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  const [mapUrl, setMapUrl] = useState("ancien"); 
  const [coords, setCoords] = useState({ lat: 0, lng: 0 }); 

  const mapCenter = [-512, 512]; 

  const switchMap = (map) => {
    setMapUrl(map);
  };

  const MapEvents = () => {
    useMapEvents({
      mousemove(e) {
        setCoords(e.latlng);
      }
    });
    return null;
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

        <p>Latitude: {-coords.lat.toFixed()}</p>
        <p>Longitude: {coords.lng.toFixed()}</p>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={0}
        minZoom={0}
        maxZoom={3}
        style={{ height: "100vh", width: "100vw" }}
        crs={L.CRS.Simple}
        worldCopyJump={false}
      >
        <TileLayer
          url={`/${mapUrl}/{z}/{x}/{y}.png`}
          tileSize={512}
          noWrap={true}
          key={mapUrl}
        />
        <MapEvents />
      </MapContainer>
    </>
  );
};

export default MapComponent;
