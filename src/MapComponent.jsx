import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const markers = [
  { map: "innisgallia", coords: [-797, 134], name: "Freyja's Lakehouse", type: "house" },
  { map: "ancien", coords: [-300, 500], name: "Example Town", type: "town" },
  { map: "kerys", coords: [-492, 540], name: "The Golden City", type: "town" },
  { map: "innisgallia", coords: [-810, 196], name: "Ravenhall", type: "town" },
  { map: "merrie", coords: [-650, 300], name: "faceless boiiis", type: "house" }
];

const getIcon = (type) => {
  switch (type) {
    case 'house':
      return new L.Icon({
        iconUrl: '/icons/icon-house.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -20]
      });
    case 'town':
      return new L.Icon({
        iconUrl: '/icons/icon-town.png',
        iconSize: [50, 50],
        iconAnchor: [25, 25],
        popupAnchor: [0, -30]
      });
    default:
      return new L.Icon.Default();
  }
};

const MapComponent = () => {
  const [mapUrl, setMapUrl] = useState("ancien");
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  const mapCenter = [-512, 512];
  const markersRef = useRef([]);

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

  const filteredMarkers = markers.filter(marker => marker.map === mapUrl);

  useEffect(() => {
    markersRef.current.forEach((marker, index) => {
      if (marker) {
        marker.on('mouseover', () => marker.openPopup());
        marker.on('mouseout', () => marker.closePopup());
      }
    });
  }, [filteredMarkers, mapUrl]); // Make sure useEffect runs when filteredMarkers or mapUrl changes

  return (
    <>
      {/* Overlay for buttons */}
      <div className="map-overlay">
        <h3>Select Province</h3>
        <button onClick={() => switchMap("ancien")}>ancien</button>
        <button onClick={() => switchMap("innisgallia")}>innisgallia</button>
        <button onClick={() => switchMap("kerys")}>kerys</button>
        <button onClick={() => switchMap("merrie")}>merrie</button>

        <p>Latitude: {coords.lat.toFixed()}</p>
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
          url={`${import.meta.env.BASE_URL}${mapUrl}/{z}/{x}/{y}.png`}
          tileSize={512}
          noWrap={true}
          key={mapUrl}
        />
        <MapEvents />
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.coords}
            icon={getIcon(marker.type)}
            ref={el => markersRef.current[index] = el}
          >
            <Popup>{marker.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
};

export default MapComponent;
