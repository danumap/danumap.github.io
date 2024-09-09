import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
  // Define the map's initial center and zoom level
  const mapCenter = [0, 0]; // Adjust based on your map's starting point

  return (
    <MapContainer
      center={mapCenter}
      zoom={0} // Start at zoom level 0
      minZoom={0}
      maxZoom={3} // Adjust based on how many zoom levels you have
      style={{ height: "100vh", width: "100vw" }} // Fullscreen map
      crs={L.CRS.Simple} // Use Simple CRS for non-geographical maps
      worldCopyJump={false} // Prevent wrapping
    >
      <TileLayer
        url="/ancien/{z}/{x}/{y}.png" // Adjust the path to your tile images
        tileSize={512} // Set the correct tile size
        noWrap={true} // Prevent wrapping of the map on edges
      />
    </MapContainer>
  );
};

export default MapComponent;
